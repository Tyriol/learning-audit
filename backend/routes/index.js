import express from "express";

// helper imports
import { getModules, createModule } from "../utils/modules.js";
import {
  getLearnings,
  createLearning,
  getLearningsByModule,
} from "../utils/learnings.js";

const router = express.Router();

// route handler to get all modules
router.get("/api/modules/", async (req, res) => {
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
router.post("/api/modules/", async (req, res) => {
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
router.get("/api/learnings/", async (req, res) => {
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
router.post("/api/learnings/", async (req, res) => {
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
router.get("/api/learnings/:moduleId", async (req, res) => {
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

export default router;
