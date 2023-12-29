const express = require('express');
const pg = require('pg');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const app = express();

// Connect to PostgreSQL database
const connectionString = `postgres://postgres:password@localhost:5432`;
const pool = new pg.Pool({ connectionString });


// Define routes for handling API requests
app.get('/users', async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    res.json(users);
});

app.post('/users', jsonParser, async (req, res) => {

    const user_id = req.body.user_id;
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const sql = `INSERT INTO USERS (user_id, name, email, password) VALUES ($1, $2, $3, $4)`;

    const result = await pool.query(sql, [user_id, name, email, password]);
    
    res.status(201).json({ message: 'Recipe created successfully' });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
