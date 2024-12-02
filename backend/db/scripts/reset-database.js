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
        user_name VARCHAR(25) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(72) NOT NULL
        );
      `);

    // Create the modules table
    await pool.query(`
            CREATE TABLE modules (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id INT REFERENCES users(id),
            module_name VARCHAR(50) NOT NULL,
            description VARCHAR(255) NOT NULL
            );
        `);

    // Create the learnings table
    await pool.query(`
            CREATE TABLE learnings (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            learning_name VARCHAR(50) NOT NULL,
            module_id INT REFERENCES modules(id),
            user_id INT REFERENCES users(id),
            rag_status VARCHAR(5),
            learning_notes VARCHAR(255)
            );
        `);

    // Insert Data into the users table
    await pool.query(`
        INSERT INTO users (user_name, email, password)
        VALUES ('Tyriol', 'ryanshaunsmith@gmail.com', 'aNoGoodPassword')
      `);

    // Insert Data into the modules table
    await pool.query(`
            INSERT INTO modules (module_name, user_id, description)
            VALUES ('Onboarding', 1, 'An intro to the team, problem solving, learning to learn and high performance routines')
        `);

    // Insert data into the learnings table
    await pool.query(`
            INSERT INTO learnings (learning_name, module_id, user_id, rag_status, learning_notes)
            VALUES
                ('Problem Solving', 1, 1, 'Amber', 'Through various games and challenges like Murdle and Puzzle king')
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
