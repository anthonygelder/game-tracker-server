CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    game TEXT NOT NULL,
    status TEXT NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT now()
);