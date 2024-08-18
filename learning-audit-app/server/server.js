// package imports
import express from "express";
import cors from "cors";
import "dotenv/config";

// helper imports
import { getModules, createModule } from "./resources/modules.js";

// app setup
const app = express();

// middleware
app.use(cors());

// route handler to get all modules
app.get("/api/modules/", async (req, res) => {
  try {
    const modules = await getModules();
    res.status(200).json({
      status: "success",
      payload: modules,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "failure",
      payload: e,
    });
  }
});

// create a new module
app.post("/api/modules/", async (req, res) => {
  const data = req.body;
  try {
    const newModule = await createModule(data);
    res.status(201).json({
      status: "success",
      payload: newModule,
    });
  } catch (e) {
    res.status(500).json({
      status: "failure",
      payload: e.message,
    });
  }
});

app.listen(3010, () => {
  console.log(`We are live on port 3010`);
});