// import the pg package
import pg from "pg";

// Get the connection string from environmental variables
const connectionString = process.env.DB_CONNECTION_STRING;

// Check to see if the connection string is not defined
if (!connectionString) {
  throw new Error(
    "No connection string defined, is it present in your environment variables?"
  );
}

// Export a new instance of pg.Pool to interact with the postgres db
export const pool = new pg.Pool({
  // give it the connection string
  connectionString,
  ssl: {
    rejectUnauthorized: false, // risky unless you're not dealing with sensitive data
  },
});
