// package imports
import express from "express";
import cors from "cors";
import "dotenv/config";

// helper imports
import { getModules, createModule } from "./resources/modules.js";
import {
  getLearnings,
  createLearning,
  getLearningsByModule,
} from "./resources/learnings.js";

// app setup
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

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

// route handler to get all learnings
app.get("/api/learnings/", async (req, res) => {
  try {
    const learnings = await getLearnings();
    res.status(200).json({
      status: "success",
      payload: learnings,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "failure",
      payload: e,
    });
  }
});

// create a new learning
app.post("/api/learnings/", async (req, res) => {
  const data = req.body;
  try {
    const newLearning = await createLearning(data);
    res.status(201).json({
      status: "success",
      payload: newLearning,
    });
  } catch (e) {
    res.status(500).json({
      status: "failure",
      payload: e.message,
    });
  }
});

// fetch learnings by module id
app.get("/api/learnings/:moduleId", async (req, res) => {
  const moduleId = req.params.moduleId;
  try {
    const learnings = await getLearningsByModule(moduleId);
    res.status(200).json({
      status: "success",
      payload: learnings,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "failure",
      payload: e,
    });
  }
});

app.listen(port, () => {
  console.log(`We are live on port ${port}`);
});
