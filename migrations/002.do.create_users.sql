CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    user_email VARCHAR(320)
    date_created TIMESTAMP NOT NULL DEFAULT now()
);

ALTER TABLE games
    ADD COLUMN
        user_id INTEGER REFERENCES users(id)
        ON DELETE SET NULL;