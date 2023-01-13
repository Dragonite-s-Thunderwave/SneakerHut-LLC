// This is the Web Server
const express = require('express');
const app = express();

// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require('cors');
app.use(cors());

// create logs for everything
const morgan = require('morgan');
app.use(morgan('dev'));

// handle application/json requests
app.use(express.json());

// here's our static files
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

// here's our API
const apiRouter = require("./api")
app.use('/api', apiRouter);

// by default serve up the react app if we don't recognize the route
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// bring in the DB connection
const { client } = require('./db/client');

// connect to the server
const PORT = process.env.PORT || 4000;

// define a server handle to close open tcp connection after unit tests have run
const handle = app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error('Database is closed for repairs!\n', error);
  }
});

app.get('*', (req, res) => {
  res.status(404).send({
    error: "404 - not found",
    message: "No route found for the request"
  });
});

app.use((error, req, res, next) => {
  res.status(500)
  res.send({error: error.message, name: error.name, message: error.message})
})

// export server and handle for routes/*.test.js
module.exports = { server, handle };
