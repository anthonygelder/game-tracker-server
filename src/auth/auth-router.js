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
    
    AuthService.getUserWithUserEmail(
        req.app.get('db'),
        loginUser.user_email
    )
    .then(dbUser => {
        if (!dbUser)
        return res.status(400).json({
            error: 'Incorrect Email or Password.',
        })
    
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
            .then(compareMatch => {
                if (!compareMatch)
                return res.status(400).json({
                    error: 'Incorrect Email or Password.',
                })
            
                const sub = dbUser.user_email
                const payload = { user_id: dbUser.id }
                res.send({
                    email: user_email,
                    userId: payload.user_id,
                    authToken: AuthService.createJwt(sub, payload),
                })
            })
        })
        .catch(next)
})

// authRouter.post('/refresh', requireAuth, (req, res) => {
//     const sub = req.user.user_name
//     const payload = { user_id: req.user.id }
//     res.send({
//         authToken: AuthService.createJwt(sub, payload),
//     })
// })

module.exports = authRouter