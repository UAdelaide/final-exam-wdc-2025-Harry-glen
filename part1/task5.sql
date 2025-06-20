INSERT INTO Users (username, email, password_hash, role)
VALUES
    ('alice123', 'alice@example.com', 'hashed123', 'owner'),
    ('alice123', 'alice@example.com', 'hashed123', 'owner');

INSERT INTO Dogs (owner_id, name, size)
VALUES (
  (SELECT user_id FROM Users WHERE username='alice123'),
  'Fido',
  'medium'
);
