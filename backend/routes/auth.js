import express from "express";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { verify } = pkg;

import { pool } from "../db/index.js";
import {
  createAccessToken,
  createRefreshToken,
  createPasswordResetToken,
  sendAccessToken,
  sendRefreshToken,
} from "../utils/tokens.js";
import {
  transporter,
  createPasswordResetUrl,
  passwordResetTemplate,
  passwordResetConfirmationTemplate,
} from "../utils/email.js";
import verifyAccess from "../utils/protected.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth Route here 🔒");
});

router.post("/signup", async (req, res) => {
  const findUserQuery = "SELECT * FROM users WHERE email = $1";
  try {
    const { email, user_name, password } = req.body;
    if (!email || !user_name || !password) {
      return res.status(400).json({
        message: "All fields are required!",
        type: "error",
      });
    }
    // Check if user exists
    const result = await pool.query(findUserQuery, [email]);
    if (result.rows.length > 0)
      return res.status(409).json({
        message: "User already exists! Try logging in. 😄",
        type: "warning",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserQuery = `INSERT INTO users (email, user_name, password)
                          VALUES ($1, $2, $3)
                          RETURNING *`;
    const newUser = await pool.query(newUserQuery, [email, user_name, hashedPassword]);
    if (newUser.rows) {
      const accessToken = createAccessToken(newUser.rows[0].id);
      const refreshToken = createRefreshToken(newUser.rows[0].id);
      const refreshTokenQuery = ` UPDATE users 
                                SET refresh_token = $1
                                WHERE id = $2
                                RETURNING *`;
      const addRefreshToken = await pool.query(refreshTokenQuery, [
        refreshToken,
        newUser.rows[0].id,
      ]);
      if (addRefreshToken.rows.length === 1) {
        sendRefreshToken(res, refreshToken);
        const responseData = sendAccessToken(req, res, accessToken);
        return res.json(responseData);
      }
    }
  } catch (error) {
    return res.status(500).json({
      type: "error",
      message: "Error creating user!",
      error: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUserQuery = "SELECT * FROM users WHERE email = $1";
    const user = await pool.query(findUserQuery, [email]);
    if (user.rows.length === 0)
      return res.status(404).json({
        message: "User doesn't exist! 😢 Try signing in.",
        type: "error",
      });

    const isPassMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isPassMatch)
      return res.status(500).json({
        message: "Password is incorrect! ⚠️",
        type: "error",
      });

    const accessToken = createAccessToken(user.rows[0].id);
    const refreshToken = createRefreshToken(user.rows[0].id);
    // add to db
    const refreshTokenQuery = ` UPDATE users 
                                SET refresh_token = $1
                                WHERE id = $2
                                RETURNING *`;
    const addRefreshToken = await pool.query(refreshTokenQuery, [refreshToken, user.rows[0].id]);
    if (addRefreshToken.rows.length === 1) {
      sendRefreshToken(res, refreshToken);
      const responseData = sendAccessToken(req, res, accessToken);
      return res.json(responseData);
    }
  } catch (error) {
    return res.status(500).json({
      type: "error",
      message: "Error signing in!",
      error,
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshtoken");
  return res.json({
    message: "Logged out successfully 👋",
    type: "success",
  });
});

router.post("/refresh_token", async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    if (!refreshtoken) {
      return res.status(500).json({
        message: "No refresh token 🤔",
        type: "error",
      });
    }
    let id;
    try {
      id = verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET).id;
    } catch (error) {
      return res.status(500).json({
        message: "Invalid refresh token 🤔",
        type: "error",
      });
    }
    if (!id) {
      return res.status(500).json({
        message: "Invalid refresh token 🤔",
        type: "error",
      });
    }
    const findUserQuery = "SELECT * FROM users WHERE id = $1";
    const user = await pool.query(findUserQuery, [id]);
    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "User does not exist 😢",
        type: "error",
      });
    }
    const accessToken = createAccessToken(user.rows[0].id);
    const newRefreshToken = createRefreshToken(user.rows[0].id);
    const refreshTokenQuery = ` UPDATE users 
                                SET refresh_token = $1
                                WHERE id = $2
                                RETURNING *`;
    const addRefreshToken = await pool.query(refreshTokenQuery, [newRefreshToken, user.rows[0].id]);
    if (addRefreshToken.rows.length === 1) {
      sendRefreshToken(res, newRefreshToken);
      return res.json({
        message: "Refreshed Successfully 😁",
        type: "success",
        accessToken,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error refreshing token!",
      type: "error",
      error,
    });
  }
});

// router.get("/verify-token", verifyAccess, async (req, res) => {
//   try{
//     if(req.user)
//   }
// });

router.get("/protected", verifyAccess, async (req, res) => {
  const user = req.user;
  try {
    if (user) {
      return res.json({
        message: "You are logged in! 😁",
        type: "success",
        user: user.user_name,
      });
    }
    return res.status(500).json({
      message: "You are not logged in! 😢",
      type: "error",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting protected route 💀",
      type: "error",
      error,
    });
  }
});

router.post("/send-password-reset-email", async (req, res) => {
  try {
    const { email } = req.body;
    const findUserQuery = "SELECT * FROM users WHERE email = $1";
    const user = await pool.query(findUserQuery, [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "User with that email does not exist 😢",
        type: "error",
      });
    }
    const token = createPasswordResetToken({ ...user.rows[0] });
    const url = createPasswordResetUrl(user.rows[0].id, token);
    const mailOptions = passwordResetTemplate(user.rows[0], url);
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({
          message: "Error sending email 😢",
          type: "error",
        });
      }
      return res.json({
        message: "Password reset link has been sent to your email 📫",
        type: "success",
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error sending email!",
      type: "error",
      error,
    });
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    const findUserQuery = "SELECT * FROM users WHERE id = $1";
    const user = await pool.query(findUserQuery, [id]);
    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "User does not exist 😢",
        type: "error",
      });
    }
    const isValid = verify(token, user.rows[0].password);

    if (!isValid) {
      return res.status(500).json({
        message: "Invalid token 😢",
        type: "error",
      });
    }
    const hashedNewPassword = await bcrypt.hash(password, 10);
    const updatePasswordQuery = ` UPDATE users 
                                SET password = $1
                                WHERE id = $2
                                RETURNING *`;
    const addNewPassword = await pool.query(updatePasswordQuery, [
      hashedNewPassword,
      user.rows[0].id,
    ]);
    if (addNewPassword.rows.length === 0) {
      return res.status(500).json({
        message: "Error saving new password",
        type: "error",
      });
    }
    const mailOptions = passwordResetConfirmationTemplate(user.rows[0]);
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({
          message: "Error sending email! 😢",
          type: "error",
        });
      }
      return res.json({
        message: "Email sent 📫",
        type: "success",
      });
    });
  } catch (error) {
    return res.status(500).json({
      type: "error",
      message: "Error sending email!",
      error,
    });
  }
});

export default router;
