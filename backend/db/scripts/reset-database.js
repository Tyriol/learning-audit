import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables
    await pool.query(`
            DROP TABLE IF EXISTS users CASCADE;
            DROP TABLE IF EXISTS modules CASCADE;
            DROP TABLE IF EXISTS learnings CASCADE;
        `);

    // Create the users table
    await pool.query(`
        CREATE TABLE users (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        user_name VARCHAR(25) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(72) NOT NULL,
        email_confirmed BOOLEAN,
        refresh_token VARCHAR(256)
        );
      `);

    // Create the modules table
    await pool.query(`
            CREATE TABLE modules (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            module_name VARCHAR(50) NOT NULL,
            description VARCHAR(255) NOT NULL
            );
        `);

    // Create the learnings table
    await pool.query(`
            CREATE TABLE learnings (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            learning_name VARCHAR(50) NOT NULL,
            module_id INT REFERENCES modules(id) ON DELETE CASCADE,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            rag_status VARCHAR(5),
            focused BOOLEAN,
            learning_notes VARCHAR(255)
            );
        `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
