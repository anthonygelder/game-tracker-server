const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

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

    context('Given there are games in the database', () => {
        const testGames = [
        {
            id: 1,
            game: 'First test post!',
            status: 'How-to',
            rating: null,
            user_id: null,
            date_created: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 2,
            game: 'Second test post!',
            status: 'News',
            rating: null,
            user_id: null,
            date_created: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 3,
            game: 'Third test post!',
            status: 'Listicle',
            rating: null,
            user_id: null,
            date_created: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 4,
            game: 'Fourth test post!',
            status: 'Story',
            rating: null,
            user_id: null,
            date_created: '2029-01-22T16:28:32.615Z'
        },
        ];
    
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
    })
})