// Import the pool object to be able to do things with the postgress database
import { pool } from "../db/index.js";

// Helper function to get all modules
export async function getModules(userId) {
  const query = "SELECT * FROM modules WHERE user_id=$1";
  try {
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error("Error executing query", error.stack);
    throw error;
  }
}

// Helper function to create a new module
export async function createModule(module) {
  const { moduleName, description, userId } = module;
  if (!moduleName) throw new Error("missing module name");
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

export async function updateModule(module, id) {
  const setValues = [];
  const queryParams = [];
  let paramCounter = 1;

  if (module.moduleName !== undefined) {
    setValues.push(`module_name = $${paramCounter}`);
    queryParams.push(module.moduleName);
    paramCounter++;
  }

  if (module.description !== undefined) {
    setValues.push(`description = $${paramCounter}`);
    queryParams.push(module.description);
    paramCounter++;
  }

  queryParams.push(id);

  const queryText = `UPDATE modules SET ${setValues.join(
    ", "
  )} WHERE id = $${paramCounter} RETURNING *`;

  try {
    const result = await pool.query(queryText, queryParams);
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query:", {
      message: error.message,
      stack: error.stack,
      query,
      values,
    });
  }
}
