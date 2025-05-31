// Import the pool object to be able to do things with the postgress database
import { pool } from "../db/index.js";

// Helper function to get all learnings
export async function getLearnings(userId) {
  const query = "SELECT * FROM learnings WHERE user_id=$1";
  try {
    const result = await pool.query(query, [userId]);
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

export async function updateLearning(learning, id) {
  const { learningName, description, ragStatus, learningNotes } = learning;
  const setValues = [];
  const queryParams = [];
  let paramCounter = 1;

  if (learningName !== undefined) {
    setValues.push(`learning_name = $${paramCounter}`);
    queryParams.push(learningName);
    paramCounter++;
  }

  if (description !== undefined) {
    setValues.push(`description = $${paramCounter}`);
    queryParams.push(description);
    paramCounter++;
  }

  if (ragStatus !== undefined) {
    setValues.push(`rag_status = $${paramCounter}`);
    queryParams.push(ragStatus);
    paramCounter++;
  }

  if (learningNotes !== undefined) {
    setValues.push(`learning_notes = $${paramCounter}`);
    queryParams.push(learningNotes);
    paramCounter++;
  }

  if (setValues.length === 0) {
    throw new Error("No valid fields provided for update.");
  }

  queryParams.push(id);

  const queryText = `UPDATE learnings SET ${setValues.join(
    ", "
  )} WHERE id = $${paramCounter} RETURNING *`;

  try {
    const result = await pool.query(queryText, queryParams);
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query:", {
      message: error.message,
      stack: error.stack,
      queryText,
      queryParams,
    });
    throw error;
  }
}

export async function deleteLearning(id) {
  const query = `DELETE FROM learnings WHERE id = $1 RETURNING *`;
  try {
    const result = await pool.query(query, [id]);
    return result.rows;
  } catch (e) {
    console.error("Error executing query", {
      message: e.message,
      stack: e.stack,
      query,
    });
  }
}
