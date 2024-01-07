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
        res.status(201).json({
          message: "Authenticated!",
          user_id: results.rows[0].user_id,
        });
      else res.status(401).json({ message: "Please try again!" });
    }
  );
});

app.get("/api/ingredients-list", jsonParser, async (req, res) => {
  await pool.query("SELECT * FROM INGREDIENTS", (error, result) => {
    if (error) res.status(500).json(error.message);
    res.status(201).json(result.rows);
  });
});

app.post("/api/new-ingredient", jsonParser, async (req, res) => {
  const name = req.body.name;
  const unit = req.body.unit;

  pool.query(
    "INSERT INTO ingredients (name, unit) VALUES ($1, $2)",
    [name, unit],
    (error, result) => {
      if (error) res.status(500).json(error.message);
      res.status(201).json({ message: "Ingredient created successfully" });
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

app.post("/api/new-recipe-link", jsonParser, async (req, res) => {
  const recipe_id = req.body.recipe_id;
  const ingredient_id = req.body.ingredient_id;
  const amount = req.body.amount;

  await pool.query(
    "INSERT INTO RECIPE_INGREDIENTS (recipe_id, ingredient_id, amount) VALUES ($1, $2, $3)",
    [recipe_id, ingredient_id, amount],
    (error, results) => {
      if (error) res.status(500).json(error.message);
      else
        res.status(201).json({ message: "Recipe link created successfully" });
    }
  );
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
            SELECT DISTINCT I.NAME, RI.AMOUNT, I.UNIT 
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

  pool.query(
    `
      UPDATE RECIPES SET
      title = $1,
      description = $2,
      instructions = $3,
      cook_time = $4,
      servings = $5
      WHERE recipe_id = $6`,
    [title, description, instructions, cook_time, servings, recipe_id],
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
    DELETE FROM RECIPE_INGREDIENTS where RECIPE_ID = $1
  `,
    [recipe_id]
  );
  pool.query(
    `
      DELETE FROM RECIPES
      WHERE recipe_id = $1; `,
    [recipe_id],
    (error, result) => {
      if (error) res.status(500).json(error.message);
      else res.status(201).json({ message: "Deleted successfully." });
    }
  );
});

app.post("/api/add-user-details/:user_id", jsonParser, async (req, res) => {
  const user_id = req.params.user_id;

  const address = req.body.address;
  const phone_number = req.body.phone_number;
  const favorite_food = req.body.favorite_food;

  pool.query(
    `
    INSERT INTO user_details 
    (user_id, address, phone_number, favorite_food) 
    VALUES 
    ($1, $2, $3, $4)`,

    [user_id, address, phone_number, favorite_food],
    (error, result) => {
      if (error) res.status(500).json(error.message);
      else res.status(201).json({ message: "Detailes added succesfully" });
    }
  );
});

app.get("/api/get-user-details/:user_id", jsonParser, async (req, res) => {
  const user_id = req.params.user_id;

  pool.query(
    "SELECT * FROM user_details WHERE user_id = $1",
    [user_id],
    (error, result) => {
      if (error) res.status(500).json(error.message);
      else res.status(201).json(result.rows);
    }
  );
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
