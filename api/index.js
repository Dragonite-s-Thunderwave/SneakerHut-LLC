const express = require('express');
const apiRouter = express.Router()
const jwt = require('jsonwebtoken');
// const { server } = require('..');
const {getUserById} = require("../db")
const {JWT_SECRET="thisIsASecret"} = process.env

// apiRouter.get('/', (req, res, next) => {
//   res.send({
//     message: 'API is under construction!',
//   });
// });

// apiRouter.get('/health', (req, res, next) => {
//   res.send({
//     healthy: true,
//   });
// });

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
  
//ROUTER: /api/users
const usersRouter = require('./users.js');
apiRouter.use('/users', usersRouter)

const ordersRouter = require('./order.js');
apiRouter.use('/orders', ordersRouter)

const shoesRouter = require('./shoes');
apiRouter.use('/shoes', shoesRouter)

const reviewsRouter = require('./reviews.js');
apiRouter.use('/reviews', reviewsRouter)



})

//ROUTER: /api/users
const usersRouter = require('./users.js');
apiRouter.use('/users', usersRouter)

const ordersRouter = require('./order.js');
apiRouter.use('/orders', ordersRouter)

const shoesRouter = require('./shoes');
apiRouter.use('/shoes', shoesRouter)

const reviewsRouter = require('./reviews.js');
apiRouter.use('/reviews', reviewsRouter)


// place your routers here
// server.use('/', routes)


//RUTER:

module.exports = apiRouter;

