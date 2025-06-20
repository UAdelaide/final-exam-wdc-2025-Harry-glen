const express = require('express');
const mysql = require('mysql2/promise');

async function main() {
    // connect
    const connection = await mysql.createConnection({
        host:   'localhost',
        user:   'root',
        password: ' ',
        database: 'DogWalkService'
    });

    // seed data
    await connection.query(`
        INSERT INTO Users(username, email, password_hash, role)
        VALUES
        ('alice123', 'alice@example.com', 'hashed123', 'owner'),
        ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
        ('carol123', 'carol@example.com', 'hashed789', 'owner'),
        ('harrywalker', 'harry@example.com', 'hased987', 'walker'),
        ('dave234', 'dave@example.com', 'hased650', 'owner');
    `);

    await connection.query(`
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
    `);

    await connection.query(`
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
    `);

    // set up express
    const app = express();

    // GET /api/dogs
    app.get('/api/dogs', async (req, res) => {
        try{
            const [rows] = await connection.query(`
                SELECT
                    d.name  AS dog_name
                    d.size,
                    u.username AS owner_username
                FROM Dogs d
                JOIN Users u ON d.owner_ = u.user_id
            `);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message});

        }
    });

    // GET  /api/walkerreuqests/open
        app.get('/api/walkerreuqests/open', async (req, res) => {
        try{
            const [rows] = await connection.query(`
                SELECT
                    wr.request_id
                    d,name      AS dog_name
                    wr.requested_time,
                    wr.duration_minutes,
                    wr.location,
                    u.username      AS owner_username
                FROM WalkRequests wr
                JOIN Dogs d     ON wr.dog_id    = d.dog_id
                JOIN Users u    ON d.owner_id    = u.users_id
                WHERE wr.status = 'open'
            `);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message});
        }
    });

    // GET /api/walkers/summary
    app.get('/api/walkers/summary', async (req, res) => {
        try{
            const [rows] = await connection.query(`
                SELECT
                    u.username      AS owner_username,
                    COUNT(wr.request_id)        AS completed_walks,
                    COUNT(wr2.rating_id)        AS total_ratings,
                    CASE
                        WHEN COUNT(wr2.rating_id)=0 THEN NULL
                        ELSE ROUND(AVG(wr2.raitng),2)
                    END                                 AS average_rating
                FROM Users u
                LEFT JOIN WalkApplications wa
                    ON wa.walker_id = u.user_id
                LEFT JOIN WalkRequests wr
                    ON wa.request_id = wr.request_id
                        AND wr.status = 'completed
                LEFT JOIN WalkRatings wr2
                    ON wr2.walker_id = u.user_id
                WHERE u.role = 'walker'
                GROUP BY u.username
            `);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message});
        }
    });

    // Start server
    app.listen(3000, () =>{
        console.log('Server running on http://localhost:3000');
    });
}
}