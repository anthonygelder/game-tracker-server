const express = require('express')
const GamesService = require('./games-service')
const xss = require('xss')
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
    .all((req, res, next) => {
      GamesService.getById(
        req.app.get('db'),
        req.params.game_id
      )
        .then(game => {
          if (!game) {
            return res.status(404).json({
              error: { message: `Game doesn't exist` }
            })
          }
          res.game = game // save the game for the next middleware
          next() // don't forget to call next so the next middleware happens!
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json({
            id: res.game.id,
            game: xss(res.game.game),
            status: xss(res.game.status),
            rating: res.game.rating,
            user_id: res.game.user_id,
            date_created: new Date(game.date_created),
        })
    })
    .delete((req, res, next) => {
        GamesService.deleteGame(
            req.app.get('db'),
            req.params.game_id
            )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = gamesRouter