const GamesService = {
    getAllGames(knex) {
        return knex.select('*').from('games')
    },
    getAllGamesByUserId(knex, user_id) {
        return knex.select('*').from('games').where('user_id', user_id)
    },
    insertGame(knex, newGame) {

        console.log(knex)
        console.log('------------')
        console.log(newGame)
        return knex
            .insert(newGame)
            .into('games')
            .returning('*')
                .then(rows => {
                    return rows[0]
                })
    },
    getById(knex, id) {
        return knex.from('games').select('*').where('id', id).first()
    },
    deleteGame(knex, id) {
        return knex('games')
            .where({ id })
            .delete()
    },
    updateGame(knex, id, newGameFields) {
        return knex('games')
            .where({ id })
            .update(newGameFields)
    },
}

module.exports = GamesService