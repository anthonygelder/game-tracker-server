function makeGamesArray() {
    return [
        {
            id: 1,
            game: 'First test post!',
            status: 'How-to',
            rating: null,
            user_id: null,
            date_created: new Date(),
        },
        {
            id: 2,
            game: 'Second test post!',
            status: 'News',
            rating: null,
            user_id: null,
            date_created: new Date(),
        },
        {
            id: 3,
            game: 'Third test post!',
            status: 'Listicle',
            rating: null,
            user_id: null,
            date_created: new Date(),
        },
        {
            id: 4,
            game: 'Fourth test post!',
            status: 'Story',
            rating: null,
            user_id: null,
            date_created: new Date(),
        }
    ]
}

module.exports = {
    makeGamesArray
}