const express = require('express');
const pg = require('pg');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const app = express();

// Connect to PostgreSQL database
const connectionString = `postgres://postgres:password@localhost:5432`;
const pool = new pg.Pool({ connectionString });


// Define routes for handling API requests
app.get('/api/users', async (req, res) => {
    pool.query('SELECT * FROM users',
        (error, results) => {
            if (error)
                throw error;
            res.json(results.rows)
        });
});

app.get('/api/recipes', async (req, res) => {
    pool.query('SELECT * FROM recipes',
        (error, results) => {
            if (error)
                throw error;
            res.json(results.rows)
        });

});

app.post('/api/users', jsonParser, async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const sql = `INSERT INTO USERS (name, email, password) VALUES ($1, $2, $3)`;

    pool.query(sql, [name, email, password],
        (error, results) => {
            if (error)
                throw error;
            res.status(201).json({ message: 'User created successfully' });
        });
});

app.post('/api/recipes', jsonParser, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const instructions = req.body.instructions;
    const cook_time = req.body.cook_time;
    const servings = req.body.servings;
    const author_id = req.body.author_id;

    const sql = `INSERT INTO RECIPES (title, description, instructions, cook_time, servings, author_id) VALUES ($1, $2, $3, $4, $5, $6)`;

    pool.query(sql, [title, description, instructions, cook_time, servings, author_id],
        (error, results) => {
            if (error)
                throw error;
            res.status(201).json({ message: 'Recipe created successfully' });
        }
    );
});

app.get('/api/ingredients/:recipe_id', jsonParser, async (req, res) => {
    const recipe_id = req.params.recipe_id;

    pool.query(`
        SELECT DISTINCT I.NAME, RI.AMOUNT, RI.UNIT 
        FROM INGREDIENTS I 
        JOIN RECIPE_INGREDIENTS RI 
        ON I.INGREDIENT_ID = RI.INGREDIENT_ID
        WHERE RI.RECIPE_ID = $1
        ORDER BY I.NAME ASC
    `,
        [recipe_id],
        (error, results) => {
            if (error)
                throw error;
            res.json(results.rows)
        }
    )
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
