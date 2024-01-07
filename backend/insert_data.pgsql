INSERT INTO users (name, email, password)
VALUES ('John Doe', 'johndoe@email.com', 'password123');

INSERT INTO users (name, email, password)
VALUES ('Jane Smith', 'janesmith@email.com', 'password456');

INSERT INTO users (name, email, password)
VALUES ('Peter Jones', 'peterjones@email.com', 'password789');

INSERT INTO users (name, email, password)
VALUES ('Sarah Brown', 'sarahbrown@email.com', 'password101112');

INSERT INTO users (name, email, password)
VALUES ('David Williams', 'davidwilliams@email.com', 'password131415');


INSERT INTO user_details (user_id, address, phone_number, favorite_food)
VALUES (1, '123 Main Street, Anytown, USA', '0712345678', 'Pizza');

INSERT INTO user_details (user_id, address, phone_number, favorite_food)
VALUES (2, '456 Elm Street, Everytown, USA', '0798765432', 'Burgers');

INSERT INTO user_details (user_id, address, phone_number, favorite_food)
VALUES (3, '789 Oak Street, Bigtown, USA', '0734567890', 'Sushi');

INSERT INTO user_details (user_id, address, phone_number, favorite_food)
VALUES (4, '1011 Pine Street, Smalltown, USA', '0723456789', 'Pasta');

INSERT INTO user_details (user_id, address, phone_number, favorite_food)
VALUES (5, '1213 Maple Street, Sunnytown, USA', '0745678901', 'Curry');


INSERT INTO recipes (title, description, instructions, cook_time, servings, author_id)
VALUES ('Chocolate Chip Cookies', 'A classic recipe for chewy chocolate chip cookies',
        'Preheat oven to 375 degrees F (190 degrees C). Cream together the butter, brown sugar, and white sugar until light and fluffy. Beat in the egg and vanilla extract. Gradually add the dry ingredients to the wet ingredients, mixing until just combined. Stir in the chocolate chips. Drop by rounded tablespoons onto ungreased baking sheets. Bake for 10-12 minutes, or until edges are golden brown. Cool on baking sheets for a few minutes before transferring to a wire rack to cool completely.',
        30, 12, 1);

INSERT INTO recipes (title, description, instructions, cook_time, servings, author_id)
VALUES ('Spaghetti Carbonara', 'A rich and creamy Italian pasta dish',
        'Bring a large pot of salted water to a boil. Cook the spaghetti according to package directions. While the pasta is cooking, heat the olive oil in a large skillet over medium heat. Add the pancetta and cook until browned and crispy. Add the garlic and cook for 30 seconds more. Whisk in the heavy cream and Parmesan cheese until smooth. Season with salt and pepper to taste. Drain the pasta and add it to the skillet with the sauce. Toss to coat, and serve immediately.',
        20, 4, 2);

INSERT INTO recipes (title, description, instructions, cook_time, servings, author_id)
VALUES ('Thai Red Curry', 'A flavorful and fragrant Thai curry',
        'Heat the vegetable oil in a large pot or Dutch oven over medium heat. Add the onion, ginger, and garlic and cook until softened, about 5 minutes. Add the red curry paste and cook for 1 minute more, until fragrant. Stir in the coconut milk, chicken broth, and fish sauce. Bring to a boil, then reduce heat to low and simmer for 10 minutes. Add the chicken, mushrooms, and broccoli. Simmer for 5 more minutes, or until the chicken is cooked through and the vegetables are tender. Stir in the lime juice, cilantro, and sriracha sauce (if using). Season with salt and pepper to taste. Serve hot over rice or noodles.', 40, 5, 1);


INSERT INTO recipes (title, description, instructions, cook_time, servings, author_id)
VALUES ('Creamy Tomato Soup', 'A comforting and flavorful tomato soup',
        'In a large pot, heat the olive oil over medium heat. Add the onion and cook until softened, about 5 minutes. Add the garlic and cook for 30 seconds more. Pour in the crushed tomatoes, vegetable broth, and vegetable stock. Bring to a boil, then reduce heat to low and simmer for 20 minutes, or until the vegetables are tender.',
        25, 4, 1);

INSERT INTO recipes (title, description, instructions, cook_time, servings, author_id)
VALUES ('Classic Omelet', 'A simple and versatile omelet, perfect for breakfast or lunch',
        'Melt the butter in a nonstick skillet over medium heat. Whisk the eggs together in a bowl with a pinch of salt and pepper. Add the eggs to the skillet and cook, gently stirring, until set around the edges but still runny in the center. Add your desired fillings, such as cheese, vegetables, or meat, and fold the omelet in half. Cook for a few more seconds until the filling is heated through. Slide the omelet onto a plate and serve immediately.',
        15, 1, 2);

INSERT INTO ingredients (name, unit)
VALUES ('Butter', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Brown sugar', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('White sugar', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Egg', 'count');

INSERT INTO ingredients (name, unit)
VALUES ('Vanilla extract', 'teaspoon');

INSERT INTO ingredients (name, unit)
VALUES ('All-purpose flour', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Salt', 'teaspoons');

INSERT INTO ingredients (name, unit)
VALUES ('Chocolate chips', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Olive oil', 'tablespoons');

INSERT INTO ingredients (name, unit)
VALUES ('Pancetta', 'ounces');

INSERT INTO ingredients (name, unit)
VALUES ('Parmesan cheese', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Heavy cream', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Spaghetti', 'pounds');

INSERT INTO ingredients (name, unit)
VALUES ('Vegetable oil', 'tablespoons');

INSERT INTO ingredients (name, unit)
VALUES ('Onion', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Ginger', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Garlic', 'cloves');

INSERT INTO ingredients (name, unit)
VALUES ('Red curry paste', 'tablespoons');

INSERT INTO ingredients (name, unit)
VALUES ('Chicken broth', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Fish sauce', 'tablespoons');

INSERT INTO ingredients (name, unit)
VALUES ('Coconut milk', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Lime juice', 'tablespoons');

INSERT INTO ingredients (name, unit)
VALUES ('Cilantro', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Sriracha sauce', 'tablespoons');

INSERT INTO ingredients (name, unit)
VALUES ('Chicken', 'pounds');

INSERT INTO ingredients (name, unit)
VALUES ('Mushrooms', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Broccoli', 'cups');

INSERT INTO ingredients (name, unit)
VALUES ('Olive oil', 'tablespoons');

INSERT INTO ingredients (name, unit)
VALUES ('Crushed tomatoes', 'cans');

INSERT INTO ingredients (name, unit)
VALUES ('Vegetable broth', 'cans');

INSERT INTO ingredients (name, unit)
VALUES ('Salt', 'teaspoons');

INSERT INTO ingredients (name, unit)
VALUES ('Pepper', 'teaspoons');

INSERT INTO ingredients (name, unit)
VALUES ('Butter', 'tablespoons');

INSERT INTO ingredients (name, unit)
VALUES ('Egg', 'count');

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (1, 1, 0.5);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (1, 2, 1.0);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (1, 3, 0.5);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (1, 4, 1.0);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (1, 5, 0.5);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (1, 6, 2.0);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (1, 7, 0.25);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (1, 8, 0.5);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (2, 9, 2.0);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (2, 10, 4.0);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (2, 11, 0.75);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (2, 12, 0.75);

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, amount)
VALUES (2, 13, 1.0);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (3, 10, 2.0);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (3, 14, 1.5);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (3, 15, 1.5);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (3, 16, 2.0);

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, amount)
VALUES (3, 17, 1.0);

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, amount)
VALUES (3, 18, 0.25);

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, amount)
VALUES (3, 19, 0.5);

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, amount)
VALUES (3, 20, 0.25);

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, amount)
VALUES (3, 21, 2.0);

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, amount)
VALUES (3, 22, 1.5);

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, amount)
VALUES (3, 23, 1.5);

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, amount)
VALUES (3, 24, 2.0);

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, amount)
VALUES (3, 25, 0.25);

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, amount)
VALUES (3, 26, 1.0);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (4, 9, 2.0);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (4, 10, 1.5);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (4, 11, 1.0);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (4, 12, 0.5);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (5, 14, 2.0);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES (5, 15, 1.0);
