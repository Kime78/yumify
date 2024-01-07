CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  CONSTRAINT email_format_check CHECK (email ~* '^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
  CONSTRAINT name_no_numbers CHECK (LOWER(name) ~* '[a-z]+$')
);


CREATE TABLE IF NOT EXISTS user_details (
  user_details_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  address VARCHAR(255),
  phone_number VARCHAR(255),
  favorite_food VARCHAR(255),

  FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT phone_number_prefix CHECK (phone_number LIKE '07%')
);

CREATE TABLE IF NOT EXISTS recipes (
  recipe_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT NOT NULL,
  cook_time INT NOT NULL,
  servings INT NOT NULL,
  author_id INT NOT NULL,
  
  FOREIGN KEY (author_id) REFERENCES users(user_id),
  CONSTRAINT cook_time_check CHECK (cook_time > 0),
  CONSTRAINT servings_check CHECK (servings > 0)
);

CREATE TABLE IF NOT EXISTS ingredients (
  ingredient_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  unit VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
  recipe_ingredient_id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  amount FLOAT NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
  CONSTRAINT amount_check CHECK (amount > 0)
);


