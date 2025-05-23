import express from "express";

// helper imports
import { getModules, createModule, updateModule } from "../utils/modules.js";
import {
  getLearnings,
  createLearning,
  getLearningsByModule,
  updateLearning,
} from "../utils/learnings.js";
import verifyAccess from "../utils/protected.js";

const router = express.Router();

// route handler to get all modules
router.get("/api/modules/", verifyAccess, async (req, res) => {
  const user = req.user;
  try {
    if (user) {
      const modules = await getModules(user.id);
      res.status(200).json({
        status: "success",
        payload: modules,
      });
    } else {
      res.status(401).json({
        status: "failure",
        payload: "You don't have access to this resource",
      });
    }
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

// update a module
router.patch("/api/modules/:id", verifyAccess, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const moduleUpdates = req.body;
  try {
    if (user) {
      const updatedModule = await updateModule(moduleUpdates, id);
      if (!updatedModule) {
        return res.status(404).json({
          status: "failure",
          payload: "Module not found",
        });
      }
      res.status(200).json({
        status: "success",
        payload: updatedModule,
      });
    } else {
      res.status(401).json({
        status: "failure",
        payload: "You don't have access to this resource",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failure",
      payload: error,
    });
  }
});

// route handler to get all learnings for a specific user
router.get("/api/learnings/", verifyAccess, async (req, res) => {
  const user = req.user;
  try {
    if (user) {
      const learnings = await getLearnings(user.id);
      res.status(200).json({
        status: "success",
        payload: learnings,
      });
    } else {
      res.status(401).json({
        status: "failure",
        payload: "You don't have access to this resource",
      });
    }
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

// update a learning
router.patch("/api/learnings/:id", verifyAccess, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const learningUpdates = req.body;
  try {
    if (user) {
      const updatedLearning = await updateLearning(learningUpdates, id);
      if (!updatedLearning) {
        return res.status(404).json({
          status: "failure",
          payload: "Learning not found",
        });
      }
      res.status(200).json({
        status: "success",
        payload: updatedLearning,
      });
    } else {
      res.status(401).json({
        status: "failure",
        payload: "You don't have access to this resource",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failure",
      payload: error,
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
