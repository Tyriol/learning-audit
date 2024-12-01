import express from "express";
import hash from "bcryptjs";
import { pool } from "../db/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth Route here 🔒");
});

router.post("/signup", async (req, res) => {
  console.log("Hello");
  const findUserQuery = "SELECT * FROM users WHERE email = $1";
  try {
    const { email, username, password } = req.body;
    console.log(email, username, password);
    // Check if user exists
    const result = await pool.query(findUserQuery, email);
    console.log(result);
    const user = result.rows;
    console.log(user);
    if (user)
      return res.status(500).json({
        message: "User already exists! Try logging in. 😄",
        type: "warning",
      });
    const hashedPassword = await hash(password, 10);
    const newUserQuery = `INSERT INTO users (email, user_name, password)
                          VALUES ($1, $2, $3)
                          RETURNING *`;
    const addNewUser = await pool.query(
      newUserQuery,
      email,
      username,
      hashedPassword
    );
    if (addNewUser.rows)
      res.status(200).json({
        message: "User created successfully! 🥳",
        type: "success",
      });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Error creating user!",
      error,
    });
  }
});

export default router;
