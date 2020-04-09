BEGIN;

TRUNCATE
    games,
    users
    RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, password, user_email)
VALUES
    ('dunder', 'password1','dunder@Mifflin.com'),
    ('b.deboop', 'password2', 'odeep@Deboop.com'),
    ('c.bloggs', 'password3', 'arlie@Bloggs.com'),
    ('s.smith', 'password4', 'Sam@Smith.com'),
    ('lexlor', 'password5', 'Alex@aylor.com'),
    ('wippy', 'password6', 'Ping@WonIn.com');

INSERT INTO games (game, status, user_id)
VALUES
    ('game 1', 'Just started', 1),
    ('game 2', 'In Progress', 2),
    ('game 3', 'In Progress', 2),
    ('game 4', 'Backlog', 3),
    ('game 5', 'In Progress', 2),
    ('game 6', 'In Progress', 3),
    ('game 7', 'In Progress', 1),
    ('game 8', 'In Progress', 3),
    ('game 9', 'In Progress', 2),
    ('game 10', 'Finished', 1);

COMMIT;