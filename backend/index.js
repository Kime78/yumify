const express = require("express");
const pg = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const app = express();

const connectionString = `postgres://postgres:password@localhost:5432`;
const pool = new pg.Pool({ connectionString });
app.use(cors());

app.get("/api/users", async (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) res.status(500).json(error.message);
    else res.json(results.rows);
  });
});

app.get("/api/recipes", async (req, res) => {
  pool.query("SELECT * FROM recipes", (error, results) => {
    if (error) res.status(500).json(error.message);
    else res.json(results.rows);
  });
});

app.post("/api/login", jsonParser, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  pool.query(
    "SELECT PASSWORD, USER_ID FROM USERS WHERE EMAIL = $1",
    [email],
    async (error, results) => {
      let match = await bcrypt.compare(password, results.rows[0].password);
      if (error) res.status(500).json(error.message);
      if (match)
        res
          .status(201)
          .json({
            message: "Authenticated!",
            user_id: results.rows[0].user_id,
          });
      else res.status(401).json({ message: "Please try again!" });
    }
  );
});

app.post("/api/users", jsonParser, async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  let password = req.body.password;
  password = await bcrypt.hash(password, 11);
  const sql = `INSERT INTO USERS (name, email, password) VALUES ($1, $2, $3)`;

  pool.query(sql, [name, email, password], (error, results) => {
    if (error) res.status(500).json(error.message);
    else res.status(201).json({ message: "User created successfully" });
  });
});

app.post("/api/recipes", jsonParser, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const instructions = req.body.instructions;
  const cook_time = req.body.cook_time;
  const servings = req.body.servings;
  const author_id = req.body.author_id;

  const sql = `
        INSERT INTO RECIPES 
        (title, description, instructions, cook_time, servings, author_id) 
        VALUES 
        ($1, $2, $3, $4, $5, $6)`;

  pool.query(
    sql,
    [title, description, instructions, cook_time, servings, author_id],
    (error, results) => {
      if (error) res.status(500).json(error.message);
      else res.status(201).json({ message: "Recipe created successfully" });
    }
  );
});

app.get("/api/ingredients/:recipe_id", jsonParser, async (req, res) => {
  const recipe_id = req.params.recipe_id;

  pool.query(
    `
            SELECT DISTINCT I.NAME, RI.AMOUNT, RI.UNIT 
            FROM INGREDIENTS I 
            JOIN RECIPE_INGREDIENTS RI 
            ON I.INGREDIENT_ID = RI.INGREDIENT_ID
            WHERE RI.RECIPE_ID = $1
            ORDER BY I.NAME ASC`,
    [recipe_id],
    (error, results) => {
      if (error) res.status(501).json(error.message);
      else res.json(results.rows);
    }
  );
});

app.post("/api/update-recipe/:recipe_id", jsonParser, async (req, res) => {
  const recipe_id = req.params.recipe_id;

  const title = req.body.title;
  const description = req.body.description;
  const instructions = req.body.instructions;
  const cook_time = req.body.cook_time;
  const servings = req.body.servings;
  const author_id = req.body.author_id;

  pool.query(
    `
            UPDATE RECIPES SET
            title = $1,
            description = $2,
            instructions = $3,
            cook_time = $4,
            servings = $5,
            author_id = $6
            WHERE recipe_id = $7`,
    [
      title,
      description,
      instructions,
      cook_time,
      servings,
      author_id,
      recipe_id,
    ],
    (error, result) => {
      if (error) res.status(500).json(error.message);
      else res.status(201).json(result);
    }
  );
});

app.post("/api/delete-recipe/:recipe_id", jsonParser, async (req, res) => {
  const recipe_id = req.params.recipe_id;

  pool.query(
    `
            DELETE FROM RECIPES
            WHERE recipe_id = $1`,
    [recipe_id],
    (error, result) => {
      if (error) res.status(500).json(error.message);
      else res.status(201).json({ message: "Deleted successfully." });
    }
  );
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
