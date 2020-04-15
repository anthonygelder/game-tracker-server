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

    describe(`GET /games`, () => {
        context(`Given no games`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                .get('/games')
                .expect(200, [])
            })
        })

        context('Given there are games in the database', () => {
            const testGames = makeGamesArray()
        
            beforeEach('insert games', () => {
            return db
                .into('games')
                .insert(testGames)
            })

            it('responds with 200 and all of the games', () => {
                return supertest(app)
                    .get('/games')
                    .expect(200, testGames)
            })        
        })
    })

    describe(`GET /games/:game_id`, () => {
        context(`Given no games`, () => {
            it(`responds with 404`, () => {
                const gameId = 123456
                return supertest(app)
                .get(`/games/${gameId}`)
                .expect(404, { error: { message: `Game doesn't exist` } })
            })
        })

        context('Given there are games in the database', () => {
            const testGames = makeGamesArray()
        
            beforeEach('insert games', () => {
            return db
                .into('games')
                .insert(testGames)
            })

            it('responds with 200 and the specified game', () => {
                const gameId = 2
                const expectedGame = testGames[gameId - 1]
                return supertest(app)
                    .get(`/games/${gameId}`)
                    .expect(200, expectedGame)
            })
        })
    })

    describe.only(`POST /games`, () => {
        it(`creates a game and responds with 201 and the game`, function() {
            this.retries(3)
            const newGame = {
                game: "Game 2",
                status: "Just Started"
            }
            return supertest(app)
                .post(`/games`)
                .send(newGame)
                .expect(201)
                .expect(res => {
                    expect(res.body.game).to.eql(newGame.game)
                    expect(res.body.status).to.eql(newGame.status)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/games/${res.body.id}`)
                    const expected = new Date().toLocaleString('en', { timeZone: 'UTC' })
                    const actual = new Date(res.body.date_created).toLocaleString()
                    expect(actual).to.eql(expected)
                })
                .then(postRes =>
                    supertest(app)
                        .get(`/games/${postRes.body.id}`)
                        .expect(postRes.body)
                )
        })
    })
})