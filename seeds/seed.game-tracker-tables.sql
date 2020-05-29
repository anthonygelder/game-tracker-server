BEGIN;

TRUNCATE
    games,
    users
    RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, password, user_email)
VALUES
    ('dunder', '$2a$12$.XoP9Ol7.IK.70LrxXxKseYCciE7mqRWqol06lBXEm6ug.Zb.boyC','dunder@Mifflin.com'),
    ('b.deboop', '$2a$12$3BbSk20y0RRQQd9c73QB..VXcOqqEcspxB3FoeiEiGQRYjZAWGXri', 'odeep@Deboop.com'),
    ('c.bloggs', '$2a$12$BeymVBvJiJ5srZe98.j5MeVJoRR1PN/WpDEB1plX.CN/zDZNTC1F.', 'arlie@Bloggs.com'),
    ('s.smith', '$2a$12$2bvwe/j3lDMMYzmC1vmUDu1S2HAQedIe5PGkmFWwk50lP7x31Y/H.', 'Sam@Smith.com'),
    ('lexlor', '$2a$12$BJG0exE6vugsD9BPxPwkJuu/ruJEkekwFCDycfDuwBcJ8Hi8wH/Ae', 'Alex@aylor.com'),
    ('wippy', '$2a$12$cnAxuCJUrd7jTxo8rVSNkuzL5Oo7XxpAZinaFEgiTKVaDggjkLWoy', 'Ping@WonIn.com');

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