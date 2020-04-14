const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeGamesArray } = require('./games.fixtures')

describe.only('Games Endpoints', function() {
    let db

    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
      })
      app.set('db', db)
    })
  
    after('disconnect from db', () => db.destroy())
  
    before('clean the table', () => db('games').truncate())

    afterEach('cleanup', () => db('games').truncate())

    context('Given there are games in the database', () => {
        const testGames = makeGamesArray()
    
        beforeEach('insert games', () => {
        return db
            .into('games')
            .insert(testGames)
        })

        it('GET /games responds with 200 and all of the games', () => {
            return supertest(app)
                .get('/games')
                .expect(200, testGames)
        })

        it('GET /games/:game_id responds with 200 and the specified game', () => {
            const gameId = 2
            const expectedGame = testGames[gameId - 1]
            return supertest(app)
                .get(`/games/${gameId}`)
                .expect(200, expectedGame)
        })
    })
})