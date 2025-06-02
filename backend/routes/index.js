import express from "express";

// helper imports
import { getModules, createModule, updateModule } from "../utils/modules.js";
import {
  getLearnings,
  createLearning,
  getLearningsByModule,
  updateLearning,
  deleteLearning,
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
        payload: modules,
      });
    } else {
      res.status(401).json({
        payload: "You don't have access to this resource",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
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
      payload: newModule,
    });
  } catch (e) {
    res.status(500).json({
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
          payload: "Module not found",
        });
      }
      res.status(200).json({
        payload: updatedModule,
      });
    } else {
      res.status(401).json({
        payload: "You don't have access to this resource",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
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
        payload: learnings,
      });
    } else {
      res.status(401).json({
        payload: "You don't have access to this resource",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
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
      payload: newLearning,
    });
  } catch (e) {
    res.status(500).json({
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
          payload: "Learning not found",
        });
      }
      res.status(200).json({
        payload: updatedLearning,
      });
    } else {
      res.status(401).json({
        payload: "You don't have access to this resource",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      payload: error.message,
    });
  }
});

// delete a learning
router.delete("/api/learnings/:id", verifyAccess, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  if (!user) {
    // TODO: Update all endpoints to handle falsy user
    return res.status(401).json({
      payload: "You don't have access to this resource",
    });
  }
  try {
    const deletedLearning = await deleteLearning(id, user.id);
    if (deletedLearning) {
      return res.status(200).json({
        payload: deletedLearning,
      });
    } else {
      return res.status(404).json({
        payload: "A learning with that ID could not be found",
      });
    }
  } catch (error) {
    res.status(500).json({
      payload: error.message,
    });
  }
});

// fetch learnings by module id
router.get("/api/learnings/:moduleId", async (req, res) => {
  const moduleId = req.params.moduleId;
  try {
    const learnings = await getLearningsByModule(moduleId);
    res.status(200).json({
      payload: learnings,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      payload: e,
    });
  }
});

export default router;
