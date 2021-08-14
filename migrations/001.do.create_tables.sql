CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    game TEXT NOT NULL,
    status TEXT NOT NULL,
    rating INTEGER,
    year INTEGER,
    image TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL,
    user_email VARCHAR(320) UNIQUE,
    date_created TIMESTAMP NOT NULL DEFAULT now()
);

ALTER TABLE games
    ADD COLUMN
        user_id INTEGER REFERENCES users(id) 
        ON DELETE SET NULL;