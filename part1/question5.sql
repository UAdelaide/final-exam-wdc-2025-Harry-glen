-- 5 users
INSERT INTO Users(username, email, password_hash, role)
VALUES
    ('alice123', 'alice@example.com', 'hashed123', 'owner'),
    ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
    ('carol123', 'carol@example.com', 'hashed789', 'owner'),
    ('harrywalker', 'harry@example.com', 'hased987', 'walker'),
    ('dave234', 'dave@example.com', 'hased650', 'owner');


-- 5 dogs
INSERT INTO Dogs (owner_id, name, size)
VALUES (
    (SELECT user_id FROM Users WHERE username='alice123'),
    'Max',
    'medium'
    ),
    (
    (SELECT user_id FROM Users WHERE username='carol123'),
    'Bella',
    'small'
    ),
    (
    (SELECT user_id FROM Users WHERE username='dave234'),
    'Roxy',
    'medium'
    ),
    (
    (SELECT user_id FROM Users WHERE username='carol123'),
    'Beast',
    'small'
    ),
    (
    (SELECT user_id FROM Users WHERE username='dave234'),
    'Tiny',
    'large'
);

-- 5 walk requests
INSERT INTO WalkRequests(dog_id, requested_time, duration_minutes, location, status)
VALUES(
    (SELECT dog_id FROM Dogs WHERE name='Max'),
    '2025-06-10 08:00:00',
    30,
    'Parklands',
    'open'
    ),
    (
    (SELECT dog_id FROM Dogs WHERE name='Bella'),
    '2025-06-10 09:30:00',
    45,
    'Beachside Ave',
    'accepted'
    ),
    (
        (SELECT dog_id FROM Dogs WHERE name='Roxy'),
    '2024-06-10 16:30:00',
    55,
    'Golden Rd',
    'completed'
    ),
    (
        (SELECT dog_id FROM Dogs WHERE name='Tiny'),
    '2025-06-10 08:30:00',
    5,
    'Salty Springs',
    'open'
    ),
    (
        (SELECT dog_id FROM Dogs WHERE name='Beast'),
    '2025-08-10 21:00:00',
    120,
    'CBD',
    'cancelled'
);
