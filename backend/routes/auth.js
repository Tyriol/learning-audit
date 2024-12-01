import express from "express";
// import bcrypt from "bcryptjs";
import { pool } from "../db/index.js";

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
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUserQuery = `INSERT INTO users (email, user_name, password)
                          VALUES ($1, $2, $3)
                          RETURNING *`;
    const addNewUser = await pool.query(newUserQuery, [
      email,
      user_name,
      password,
    ]);
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

export default router;
