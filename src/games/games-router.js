const path = require('path')
const express = require('express')
const GamesService = require('./games-service')
const { requireAuth } = require('../middleware/jwt-auth')
const xss = require('xss')
const gamesRouter = express.Router()
const jsonParser = express.json()

gamesRouter
    .route(`/`)
    // .all(requireAuth)
    .get((req, res, next) => {
        
        GamesService.getAllGamesByUserId(req.app.get('db'),req.headers.user_id)
            .then(games => {
                console.log(games)
                res.json(games)
            })
            .catch(next)
        })
    .post( jsonParser, (req, res, next) => {
        
        const { game, status, year, image } = req.body
        const newGame = { game, status, year, image }
        
        for (const [key, value] of Object.entries(newGame)) {
            if (value == null) {
                return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
                })
            }
        }
        newGame.user_id = req.body.user_id
        console.log('------------')
        console.log(newGame)
        GamesService.insertGame(
            req.app.get('db'),
            newGame
        )
        .then(game => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl + `${game.id}`))
                .json(game)
            })
            .catch(next)
        })


gamesRouter
    .route('/:game_id')
    // .all(requireAuth)
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
            year: res.game.year,
            image: res.game.image,
            user_id: res.game.user_id,
            // date_created: game.date_created
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
    .patch(jsonParser, (req, res, next) => {
        const { game, status, rating, year, image } = req.body
        const gameToUpdate = { game, status, rating, year, image }
        const numberOfValues = Object.values(gameToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'game', 'status', 'year', 'image' or 'rating'`
                }
            })
        }
        
        GamesService.updateGame(
            req.app.get('db'),
            req.params.game_id,
            gameToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

module.exports = gamesRouter