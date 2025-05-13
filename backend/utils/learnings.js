// Import the pool object to be able to do things with the postgress database
import { pool } from "../db/index.js";

// Helper function to get all learnings
export async function getLearnings() {
  const query = "SELECT * FROM learnings";
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (e) {
    console.error("Error executing query", {
      message: e.message,
      stack: e.stack,
      query,
    });
    throw error;
  }
}

// Helper function to learnings for a specific module
export async function getLearningsByModule(moduleId) {
  const query = "SELECT * FROM learnings WHERE module_id = $1";
  try {
    const result = await pool.query(query, [moduleId]);
    return result.rows;
  } catch (e) {
    console.error("Error executing query", {
      message: e.message,
      stack: e.stack,
      query,
    });
    throw error;
  }
}

// Helper function to post a new learning
export async function createLearning(data) {
  const { learningName, moduleId, ragStatus, learningNotes, userId } = data;
  if (!learningName || !moduleId) throw new Error("missing learning name or module id");
  const query = `
        INSERT INTO learnings (learning_name, module_id, rag_status, learning_notes, user_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
  const newLearning = [learningName, moduleId, ragStatus, learningNotes, userId];
  try {
    const result = await pool.query(query, newLearning);
    return result.rows[0];
  } catch (e) {
    console.error("Error executing query", {
      message: e.message,
      stack: e.stack,
      query,
      newLearning,
    });
    throw error;
  }
}
