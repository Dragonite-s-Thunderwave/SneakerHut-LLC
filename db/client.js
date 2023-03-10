// Connect to DB
const { Client } = require('pg');

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'sneakerhut-dev';

const CONNECTION_STRING =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

let client = new Client({
  connectionString: CONNECTION_STRING,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

// github actions client config
// if (process.env.CI) {
//   client = new Client({
//     host: 'localhost',
//     port: 5432,
//     user: 'postgres',
//     password: 'postgres',
//     database: 'postgres',
//   });
// } else {
//   // local / heroku client config
//   client = new Client(DB_URL);
// }

module.exports = { client };
