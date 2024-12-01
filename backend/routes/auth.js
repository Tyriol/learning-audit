import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth Route here 🔒");
});

export default router;
