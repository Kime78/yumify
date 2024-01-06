<template>
  <div class="recipes-container">
    <p>Logged on user id {{ loggedInID }}</p>
    <h3>Recipes :D</h3>

    <div v-if="loading">
      <p>Se incarca smecheria...</p>
    </div>

    <div v-else>
      <div class="recipe" v-for="recipe in recipes" :key="recipe.recipe_id">
        <h4>{{ recipe.title }}</h4>
        <h5>Descriere:</h5>
        <p>{{ recipe.description }}</p>
        <h5>Instructiuni:</h5>
        <p>{{ recipe.instructions }}</p>

        <h5>Ingrediente:</h5>

        <ul>
          <li
            v-for="ingredient in recipe.ingredients"
            :key="ingredient.ingredient_id"
          >
            {{ ingredient.name }} ({{ ingredient.amount }}
            {{ ingredient.unit }})
          </li>
        </ul>

        <div class="recipe-actions">
          <button v-if="recipe.author_id === loggedInID" class="delete-button">
            Sterge
          </button>

          <button v-if="recipe.author_id === loggedInID" class="edit-button">
            Edit
          </button>

          <button class="heart-button">Like</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { loggedInID } from "@/router";

const recipes = ref([]);
const loading = ref(true);

async function fetchRecipes() {
  loading.value = true;

  try {
    const response = await fetch("http://localhost:3000/api/recipes");
    const recipesData = await response.json();
    recipes.value = recipesData;

    for (const recipe of recipesData) {
      const ingredientsData = await fetchIngredients(recipe.recipe_id);
      recipe.ingredients = ingredientsData;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function fetchIngredients(recipe_id) {
  const response = await fetch(
    "http://localhost:3000/api/ingredients/" + recipe_id
  );
  const ingredientsData = await response.json();
  return ingredientsData;
}

fetchRecipes();
</script>

<style scoped>
.recipes-container {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

h3 {
  text-align: center;
  margin-bottom: 20px;
}

.recipe {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

h4 {
  margin-bottom: 5px;
}

ul {
  list-style-type: disc;
  margin-bottom: 10px;
}
</style>
