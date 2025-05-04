import pkg from "jsonwebtoken";
import { pool } from "../db/index.js";
const { verify } = pkg;

const verifyAccess = async (req, res, next) => {
  const authorisation = req.headers["authorization"];
  if (!authorisation) {
    return res.status(401).json({
      message: "No token 🤔",
      type: "error",
    });
  }
  const token = authorisation.split(" ")[1];
  let id;
  try {
    id = verify(token, process.env.ACCESS_TOKEN_SECRET).id;
  } catch (error) {
    return res.status(500).json({
      message: "Invalid Token 🤔",
      type: "error",
    });
  }
  if (!id) {
    return res.status(500).json({
      message: "Invalid Token 🤔",
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
  req.user = user.rows[0];
  next();
};

export default verifyAccess;
