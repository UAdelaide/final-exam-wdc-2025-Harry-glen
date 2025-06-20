const express = require('express');
const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection({
        host;   'localhost',
        user:   'root',
        password: ' ',
        database: 'DogWalkService'
    })
}