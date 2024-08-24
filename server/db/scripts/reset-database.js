import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables
    await pool.query(`
            DROP TABLE IF EXISTS modules CASCADE;
            DROP TABLE IF EXISTS learnings CASCADE;
        `);

    // Create the modules table
    await pool.query(`
            CREATE TABLE modules (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
            rag_status VARCHAR(5),
            learning_notes VARCHAR(255)
            );
        `);

    // Insert Data into the modules table
    await pool.query(`
            INSERT INTO modules (module_name, description)
            VALUES ('Onboarding', 'An intro to the team, problem solving, learning to learn and high performance routines')
        `);

    // Insert data into the learnings table
    await pool.query(`
            INSERT INTO learnings (learning_name, module_id, rag_status, learning_notes)
            VALUES
                ('Problem Solving', 1, 'Amber', 'Through various games and challenges like Murdle and Puzzle king')
        `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

// ('High Performance Routines', 1, 'Green', 'Ensuring you're in the best condition to perform through mindfulness, exercise, sleep, nsdr and having your environment in the right state'),
// ('Git and Github', 1, 'Green', 'Version control, the difference between git and github and some practice'),
// ('Computational Thinking', 1, 'Amber', 'How to be methodical, break things down into the simplest possible option and work from there'),
// ('7 Steps programming', 1, 'Amber', 'Similar to computational thinking, it's about working through a problem methodically'),
// ('Team Programming', 1, 'Green', 'The value of working together, having others to bounce ideas off of and gain knowledge from'),
// ('Flow Diagrams', 1, 'Amber', 'A way to visualise and break down problems and user flows')

await resetDatabase();
