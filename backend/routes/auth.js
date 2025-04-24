import express from "express";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { verify } = pkg;

import { pool } from "../db/index.js";
import {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} from "../utils/tokens.js";

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
    const addNewUser = await pool.query(newUserQuery, [email, user_name, hashedPassword]);
    if (addNewUser.rows)
      res.status(200).json({
        message: "User created successfully! 🥳",
        type: "success",
        user: addNewUser.rows[0],
      });
  } catch (error) {
    res.status(500).json({
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
      return res.status(500).json({
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
      sendAccessToken(req, res, accessToken);
    }
  } catch (error) {
    res.status(500).json({
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
      res.status(500).json({
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
    if (!user) {
      return res.status(500).json({
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
    res.status(500).json({
      message: "Error refreshing token!",
      type: "error",
      error,
    });
  }
});

export default router;
