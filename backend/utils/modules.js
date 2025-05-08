// Import the pool object to be able to do things with the postgress database
import { pool } from "../db/index.js";

// Helper function to get all modules
export async function getModules() {
  const query = "SELECT * FROM modules";
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error executing query", error.stack);
    throw error;
  }
}

// Helper function to create a new module
export async function createModule(module) {
  const { moduleName, description, userId } = module;
  const query = `
    INSERT INTO modules (module_name, description, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [moduleName, description, userId];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query:", {
      message: error.message,
      stack: error.stack,
      query,
      values,
    });
    throw error;
  }
}
