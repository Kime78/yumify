INSERT INTO ingredients (name) VALUES
  ('Flour'),
  ('Sugar'),
  ('Baking powder'),
  ('Salt'),
  ('Butter'),
  ('Eggs'),
  ('Chocolate chips'),
  ('Vanilla extract'),
  ('Milk');

INSERT INTO recipes (title, description, instructions, cook_time, servings, author_id) VALUES
  ('Chocolate chip cookies', 'Soft and chewy chocolate chip cookies made with simple ingredients.', 'Preheat oven to 375 degrees F (190 degrees C). Line a baking sheet with parchment paper.', 10, 24, 1),
  ('Chocolate cake', 'Rich and decadent chocolate cake with a fluffy chocolate frosting.', 'Preheat oven to 350 degrees F (175 degrees C). Grease and flour two 9-inch round cake pans.', 30, 1, 1),
  ('Chocolate mousse', 'Creamy and decadent chocolate mousse made with just a few ingredients.', 'Beat egg whites until stiff peaks form. Set aside.', 30, 6, 1);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount) VALUES
  (1, 1, 1),
  (1, 2, 1),
  (1, 3, 1 ),
  (1, 4, 1),
  (1, 5, 1),
  (1, 6, 2),
  (1, 7, 1),
  (1, 8, 1),
  (1, 9, 1);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount) VALUES
  (2, 1, 1),
  (2, 2, 2 ),
  (2, 3, 1 ),
  (2, 4, 1 ),
  (2, 5, 1),
  (2, 6, 2),
  (2, 7, 1),
  (2, 8, 1),
  (2, 9, 1 );

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount) VALUES
  (3, 9, 2);