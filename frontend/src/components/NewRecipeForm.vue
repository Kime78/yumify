<template>
  <div>
    <h5>Add new recipe:</h5>
    <input placeholder="Recipe name" v-model="newRecipeName" />
    <input placeholder="Recipe description" v-model="newRecipeDescription" />
    <input placeholder="Recipe instructions" v-model="newRecipeInstructions" />
    <input placeholder="Recipe cook time" v-model="newRecipeCookTime" />
    <input placeholder="Recipe servings" v-model="newRecipeServings" />
    <hr />
    <h4>Ingredients:</h4>
    <div class="ingredients">
      <div
        class="ingredient"
        v-for="ingredient in newRecipeIngredients"
        :key="ingredient.ingredient_id"
        :ingredient="ingredient"
        @removeIngredient="onRemoveIngredient"
      >
        {{ ingredient.name }} {{ ingredient.amount }} {{ ingredient.unit }}
      </div>
    </div>
    <h5>Add New Ingredient:</h5>
    <input
      type="text"
      placeholder="Enter ingredient name"
      v-model="newIngredientName"
    />
    <input
      type="number"
      placeholder="Enter ingredient amount"
      v-model="newIngredientAmount"
    />
    <select v-model="newIngredientUnit">
      <option value="g">Grams</option>
      <option value="ml">Milliliters</option>
      <option value="pcs">Pieces</option>
    </select>
    <button @click="onAddIngredient">Add Ingredient</button>
  </div>
  <button @click="onAddRecipe">Add Recipe</button>
</template>

<script setup>
import router, { loggedInID } from "@/router";
import { ref } from "vue";

const newIngredientName = ref("");
const newIngredientAmount = ref(0);
const newIngredientUnit = ref("g");
const newRecipeName = ref("");
const newRecipeDescription = ref("");
const newRecipeInstructions = ref("");
const newRecipeIngredients = ref([]);
const newRecipeCookTime = ref(0);
const newRecipeServings = ref(0);
const allIngredients = ref([]);

async function fetchIngredients() {
  const response = await fetch("http://localhost:3000/api/ingredients-list/");
  const ingredientsData = await response.json();
  return ingredientsData;
}

allIngredients.value = fetchIngredients();

async function onAddIngredient() {
  let ingredients = await allIngredients.value;
  const name = newIngredientName.value;
  const amount = newIngredientAmount.value;
  const unit = newIngredientUnit.value;

  const test = ingredients.some((ingredient) => {
    return ingredient.name == newIngredientName.value;
  });

  if (!test) {
    //add new ingredient to DB
    await fetch("http://localhost:3000/api/new-ingredient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        unit: unit,
      }),
    });
  }
  allIngredients.value = fetchIngredients();
  ingredients = await allIngredients.value;
  const id = ingredients.find((elem) => elem.name == name).ingredient_id;
  const temp = newRecipeIngredients.value.slice();
  temp.push({
    name,
    amount,
    unit,
    id,
  });
  newRecipeIngredients.value = temp;
  console.log(loggedInID);
}

function onRemoveIngredient() {
  alert("not implemented!");
}

async function onAddRecipe() {
  const title = newRecipeName.value;
  const description = newRecipeDescription.value;
  const instructions = newRecipeInstructions.value;
  const servings = newRecipeServings.value;
  const cookTime = newRecipeCookTime.value;
  await fetch("http://localhost:3000/api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
      instructions: instructions,
      cook_time: cookTime,
      servings: servings,
      author_id: loggedInID,
    }),
  });
  const response = await fetch("http://localhost:3000/api/recipes");
  const array = await response.json();
  const recipe_id = array[array.length - 1].recipe_id;
  for (const ingredient of newRecipeIngredients.value) {
    await fetch("http://localhost:3000/api/new-recipe-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe_id: recipe_id,
        ingredient_id: ingredient.id,
        amount: ingredient.amount,
      }),
    });
  }

  router.push("/recipes");
}
</script>
