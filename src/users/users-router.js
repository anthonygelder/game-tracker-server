const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const { password, user_name, user_email } = req.body
        for (const field of ['user_email', 'user_name', 'password']) {
            if (!req.body[field]) {
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })
            }
        }
        const passwordError = UsersService.validatePassword(password)
        
        if (passwordError) {
            return res.status(400).json({ error: passwordError })
        }
        
        UsersService.hasUserWithUserEmail(
            req.app.get('db'),
            user_email
        )
        .then(hasUserWithUserEmail => {
            if (hasUserWithUserEmail) {
                return res.status(400).json({ error: `User with this email already exists.` })
            }
        
            return UsersService.hashPassword(password)
                .then(hashedPassword => {
                    const newUser = {
                        user_name,
                        password: hashedPassword,
                        user_email,
                        date_created: 'now()',
                    }

                    return UsersService.insertUser(
                        req.app.get('db'),
                        newUser
                    )
                    .then(user => {
                        res
                        .status(201)
                        .location(path.posix.join(req.originalUrl, `/${user.id}`))
                        .json(UsersService.serializeUser(user))
                    })
                })
        })
        .catch(next)
    })

module.exports = usersRouter