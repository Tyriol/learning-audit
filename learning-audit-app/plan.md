## The problem

- Make a list containing a list item for each Course Module you've done so far (On-boarding, Software, Frontend, Backend, Database).
- For each item (Course Module) make a sub list containing the things we asked you to learn that week.
- Next to each sub list item give yourself a confidence rating of (Green, Orange or Red).
- Now prioritise and pick 3 items to take action on (self-study / practice).
- Now learn and practice.

## The plan

1. Setup starter files for the front end (HTML, CSS, JS) ✅
2. Setup backend files for an express app
   1. Initialise a node project ✅
   2. Create an app.js file ✅
   3. Install express ✅
   4. Install helmet ✅
   5. Install the logging tool ✅
   6. Add a `.gitignore` file with node_modules ✅
3. Setup backend files for database interactions
   1. Create an index.js for db interaction ✅
   2. Install the pg npm package ✅
   3. Create a reset-database file ✅
4. Design the front-end (whiteboard)
   1. Header ✅
   2. Input for Course Module ✅
   3. Input for things we've been asked to learn ✅
      1. With a way to link it to course Module ✅
      2. And a way to mark it Red, Amber or Green ✅
   4. Display for each course module with it's associated list ✅
   5. BONUS: A way to select 3 to focus on.
5. Flesh out HTML using following flow:
   1. User adds a course ✅
   2. User adds a learning linked to that course ✅
   3. User assigns it a RAG value ✅
   4. User views a list of courses and their learnings ✅
6. Add basic styling
   1. So it's not completely awful, just mildly so... ✅
7. Create Express app
   1. Link to express ✅
   2. Add middleware ✅
   3. Create empty routes for GET all and POST ✅
   4. Open up listening port 3001 ✅
8. Design DB Schema
   - Using lucidchart and mermaid ✅
   - copy export to `./db/reset-database.js` ✅
   - upload png of ERD ✅
9. Create postgres db using Render ✅
10. Setup logic for the DB scripts
    - `/db/index.js` setup with to create a pool of connections between db and app ✅
    - `/db/scripts/reset-database.js` set up with ability to:
      - Drop tables ✅
      - Create tables ✅
      - Initial seed data ✅
11. Create helper function file for modules
    - Get a GET endpoint working ✅
    - Get a POST endpoint working ✅
12. Create helper function file for learnings
    - Get a GET endpoint working ✅
    - Get a POST endpoint working
    - Get a GET Request endpoint working that returns a module AND it's linked learnings
13. Link up the front end

    - Test a connection using Modules
    - Create a list of learnings linked to a module on the display panel
    - Add ability to add a new module
    - Add ability to add a new learning

14. Convert to a Next.js React app

- Set up next app
- install express and other dependencies
- copy over code
- create header component
- create a component for the forms to live in
- create form components?
