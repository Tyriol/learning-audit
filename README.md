# My Learning Audit

## What is this all about?

Pause, Reflect, Plan then Take Action
Review how things are going each week<br>
Highlight using RAG which areas I feel good about, so so, or not strong enough<br>
Make a plan to improve on three of the items listed

## How I'm going to do it?

As I feel like I might need general polishing in all areas, I will try and turn this into a simple express app!
Let's see how it goes.

## Getting Started

First, clone down the repo.

Then you will need to install the dependencies using `npm install` or `npm i`

Create a `.env` file to store the following:

```yaml
DB_CONNECTION_STRING="your postgres SQL database external connection string"
PORT=of your choosing
URL="http://localhost:the port you chose above"
```

Configure the database by running:

`npm run reset-database`

You can also use that later if you need to clear the db and start again.

You will need two terminals to run the app.

In the first terminal run `npm run server` this get's the express api up and running and allows you to talk to the database

In the second terminal start the development server using:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the app.
