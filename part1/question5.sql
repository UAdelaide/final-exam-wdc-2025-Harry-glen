-- 5 users
INSERT INTO Users(username, email. password_hash, role)
VALUES
    ('name', 'email', 'hashpass', 'role')
    ('name', 'email', 'hashpass', 'role')
    ('name', 'email', 'hashpass', 'role')
    ('name', 'email', 'hashpass', 'role')
    ('name', 'email', 'hashpass', 'role')
    ('name', 'email', 'hashpass', 'role')

-- 5 dogs
INSERT INTO Dogs (owner_id, name, size)
VALUES (
    (SELECT user_id FROM Users WHERE username='name'),
    'dogname',
    'medium';
    (SELECT user_id FROM Users WHERE username='name'),
    'dogname',
    'medium';
    (SELECT user_id FROM Users WHERE username='name'),
    'dogname',
    'medium';
    (SELECT user_id FROM Users WHERE username='name'),
    'dogname',
    'medium';
    (SELECT user_id FROM Users WHERE username='name'),
    'dogname',
    'medium';
);

-- 5 wlak requests
INSERT INTO WalkRequests(dog_id, requested_time, duration_minutes, location, status)