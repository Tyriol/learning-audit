// package imports
import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";

// app setup
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`We are live on port ${PORT}`);
});
