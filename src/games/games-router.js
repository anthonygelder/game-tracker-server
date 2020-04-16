const express = require('express')
const GamesService = require('./games-service')

const gamesRouter = express.Router()
const jsonParser = express.json()

gamesRouter
    .route(`/`)
    .get((req, res, next) => {
        GamesService.getAllGames(
            req.app.get('db')
            )
            .then(games => {
                res.json(games)
            })
            .catch(next)
        })
    .post(jsonParser, (req, res, next) => {
        const { game, status } = req.body
        const newGame = { game, status }

        for (const [key, value] of Object.entries(newGame)) {
            if (value == null) {
                return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        GamesService.insertGame(
            req.app.get('db'),
            newGame
        )
            .then(game => {
            res
                .status(201)
                .location(`/games/${game.id}`)
                .json(game)
            })
            .catch(next)
        })


gamesRouter
    .route('/:game_id')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        GamesService.getById(knexInstance, req.params.game_id)
        .then(game => {
            if (!game) {
            return res.status(404).json({
                error: { message: `Game doesn't exist` }
            })
            }
            res.json({
                id: game.id,
                game: game.game,
                style: game.style,
                status: game.status,
                rating: null,
                user_id: null,
                date_created: new Date(game.date_created),
            })
        })
        .catch(next)
    })
    


module.exports = gamesRouter