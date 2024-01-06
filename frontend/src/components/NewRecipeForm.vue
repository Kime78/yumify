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
import { loggedInID } from "@/router";
import { ref } from "vue";

const newIngredientName = ref("");
const newIngredientAmount = ref(0);
const newIngredientUnit = ref("g");
const newRecipeName = ref("");
const newRecipeDescription = ref("");
const newRecipeInstructions = ref("");
const newRecipeIngredients = ref([]);
const allIngredients = ref([]);

async function fetchIngredients() {
  const response = await fetch("http://localhost:3000/api/ingredients-list/");
  const ingredientsData = await response.json();
  return ingredientsData;
}

allIngredients.value = fetchIngredients();

async function onAddIngredient() {
  // Add ingredient to the recipe
  // daca un igredient e deja folosesti pe ala daca nu creezi unul nou
  const ingredients = await allIngredients.value;
  const name = newIngredientName.value;
  const amount = newIngredientAmount.value;
  const unit = newIngredientUnit.value;

  const test = ingredients.some((ingredient) => {
    return ingredient.name == newIngredientName.value;
  });

  const id = ingredients.find((elem) => elem.name == name).ingredient_id;

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
  const name = newRecipeName.value;
  const description = newRecipeDescription.value;
  const instructions = newRecipeInstructions.value;
  await fetch("http://localhost:3000/api/new-recipe", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      description: description,
      instructions: instructions,
    }),
  });
  for (const ingredient of newRecipeIngredients.value) {
    console.log(ingredient.id);
  }
}
</script>
