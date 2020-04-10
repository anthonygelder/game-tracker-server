require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const GamesService = require('./games-service')

const app = express()

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

app.get('/', (req, res) => {
  res.send('Hello, world!')
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
