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

// Helper function to post a new learning
export async function createLearning(data) {
  const { learning_name, module_id, rag_status, learning_notes } = data;
  const query = `
        INSERT INTO learnings (learning_name, module_id, rag_status, learning_notes)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
  const newLearning = [learning_name, module_id, rag_status, learning_notes];
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
