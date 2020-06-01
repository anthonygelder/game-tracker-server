const express = require('express')
const AuthService = require('./auth-service')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
.post('/login', jsonBodyParser, (req, res, next) => {
    const { user_email, password } = req.body
    const loginUser = { user_email, password }

    for (const [key, value] of Object.entries(loginUser))
        if (value == null)
        return res.status(400).json({
            error: `Missing '${key}' in request body`
        })
    
    AuthService.getUserWithUserName(
        req.app.get('db'),
        loginUser.user_email
    )
    .then(dbUser => {
        if (!dbUser)
        return res.status(400).json({
            error: 'Incorrect user_email or password',
        })
    
    res.send('ok')
            res.send('ok')
        })
        .catch(next)
})

module.exports = authRouter