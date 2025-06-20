const express = require('express');
const mysql = require('mysql2/promise');

async function main() {

    const connection = await mysql.createConnection({
        host:   'localhost',
        user:   'root',
        password: ' ',
        database: 'DogWalkService'
    });

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
        INSERT INTO Users(username, email, password_hash, role)
        VALUES
        ('alice123', 'alice@example.com', 'hashed123', 'owner'),
        ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
        ('carol123', 'carol@example.com', 'hashed789', 'owner'),
        ('harrywalker', 'harry@example.com', 'hased987', 'walker'),
        ('dave234', 'dave@example.com', 'hased650', 'owner');
    `);

}