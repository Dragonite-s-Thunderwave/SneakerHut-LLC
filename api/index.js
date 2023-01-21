const express = require('express');
const apiRouter = express.Router()
const jwt = require('jsonwebtoken');
const { server } = require('..');
// const { server } = require('..');
const {getUserById} = require("../db");
const { use } = require('./users.js');
const {JWT_SECRET="thisIsASecret"} = process.env



apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

//ROUTER: /api/users
const usersRouter = require('./users.js');
apiRouter.use('/users', usersRouter)


apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if(!auth) {
    next();
  } else if(auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const parseToken = jwt.verify(token, JWT_SECRET);

      const id = parseToken && parseToken.id

      if(id) {
        req.user = await getUserById(id)

        next();
      }
    } catch(error) {
      next(error)
    }
  } else {
    next({name: "AuthorizationHeaderError", message: `Authorization token must start with ${prefix}`})
  }
})

// place your routers here
// server.use('/', routes)


//RUTER:

module.exports = apiRouter;

