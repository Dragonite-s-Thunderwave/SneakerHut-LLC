const express = require("express")
const usersRouter = express.Router()
const jwt = require('jsonwebtoken');
const {JWT_SECRET="thisIsASecret"} = process.env
const {createUser, getUserByUsername, getUser, updateUser} = require('../db/models/user')
const { requireUser, requireAdmin } = require('./utils')

//POST /api/users/login

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body.user;

    if (!username || !password) {
        
        res.status(404).send({
            error: 'IncorrectCredentialsError',
            name: 'IncorrectCredentialsError',
            message: 'Sorry, your username or password is incorrect'
        });
    }
    
    try {

        const user = await getUserByUsername(username);

        if (user) {
            const token = jwt.sign({
                id: user.id, 
                username: user.username},
                JWT_SECRET,
                {expiresIn: '1y'});
            res.send({user: user, message: "You're logged in!", token});
        } else {
            res.status(401).send({
                name: "IncorrectCredentialsError",
                message: "Sorry, your username or password is incorrect"
            });
        }
    } catch(error) {
        next(error)
    }
});

//POST /api/users/register

usersRouter.post('/register', async (req, res, next) => {
    
    const { username, password, email, fullName, creditCardInfo, address, city, state, zip } = req.body.user;

    

    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            next({
                error: 'UserExistsError',
                name: 'UserExistsError',
                message: `User ${_user.username} is already taken.`
            });
        }

        if (password.length < 8) {
            next({
                error: "PasswordError",
                name: "PasswordError",
                message: "Password Too Short!"
            });
        }

        const user = await createUser({
            username,
            password,
            email,
            isAdmin,
            fullName,
            creditCardInfo,
            address,
            city,
            state,
            zip
        });

        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, JWT_SECRET, {
            expiresIn: '1y'
        });

        res.send({
            message: 'Thank you for signing up!',
            token: token,
            user: user
        });
    } catch({error, name, message}) {
        next({error, name, message})
    }
});

//GET /api/users/me
usersRouter.get('/me', requireUser, async (req, res, next) => {

    const user = req.user;

    try {
        res.send(user)
    } catch(error) {
        next(error);
    }
});

//PATCH /api/users/:userId
usersRouter.patch('/:userId', requireAdmin, async (req, res, next) => {
    const id = Number(req.params.userId);
    const {username, password, email, isAdmin, fullName, creditCardInfo, address, city, state, zip} = req.body;

    try {
        const updatedUser = await updateUser({
            id,
            username,
            password,
            email,
            isAdmin,
            fullName,
            creditCardInfo,
            address,
            city,
            state,
            zip
        });

        res.send(updatedUser)
    } catch(error) {
        console.error("There was an error updating user", error);
    }
})


module.exports = usersRouter; 
