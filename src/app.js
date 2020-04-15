require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const GamesService = require('./games-service')

const app = express()
const jsonParser = express.json()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.get('/games', (req, res, next) => {
  const knexInstance = req.app.get('db')
  GamesService.getAllGames(knexInstance)
    .then(games => {
      res.json(games)
    })
    .catch(next)
})

app.get('/games/:game_id', (req, res, next) => {
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

app.post('/games', jsonParser, (req, res, next) => {
  const { game, status } = req.body
  const newGame = { game, status }
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

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

// app.listen(8000, () => {
//   console.log('Express server is listening on port 8000!');
// });

module.exports = app
