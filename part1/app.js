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
        INSERT INTO Users(username, email, password_hash, role)
        VALUES
        ('alice123', 'alice@example.com', 'hashed123', 'owner'),
        ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
        ('carol123', 'carol@example.com', 'hashed789', 'owner'),
        ('harrywalker', 'harry@example.com', 'hased987', 'walker'),
        ('dave234', 'dave@example.com', 'hased650', 'owner');
    `);

}