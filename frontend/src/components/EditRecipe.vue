<template>
  <input placeholder="Recipe name" v-model="changedRecipe.name" />
  <input placeholder="Recipe description" v-model="changedRecipe.description" />
  <input
    placeholder="Recipe instructions"
    v-model="changedRecipe.instructions"
  />
  <input placeholder="Recipe cook time" v-model="changedRecipe.cook_time" />
  <input placeholder="Recipe servings" v-model="changedRecipe.servings" />
  <button @click="onEditBtn">Edit</button>
</template>

<script setup>
import router from "@/router";
import { reactive } from "vue";
import { useRoute } from "vue-router";
const changedRecipe = reactive({
  name: "",
  description: "",
  instructions: "",
  cook_time: "",
  servings: "",
});

// const recipeID = computed(() => {
//   const { params } = useRoute();
//   return params.id;
// });
const { params } = useRoute();

async function loadRecipe() {
  const currentRecipe = await fetchRecipe();
  changedRecipe.name = currentRecipe.title;
  changedRecipe.description = currentRecipe.description;
  changedRecipe.instructions = currentRecipe.instructions;
  changedRecipe.cook_time = currentRecipe.cook_time;
  changedRecipe.servings = currentRecipe.servings;
}

loadRecipe();

async function onEditBtn() {
  await fetch("http://localhost:3000/api/update-recipe/" + params.id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: changedRecipe.name,
      description: changedRecipe.description,
      instructions: changedRecipe.instructions,
      cook_time: changedRecipe.cook_time,
      servings: changedRecipe.servings,
    }),
  });
  router.push("/recipes");
}

async function fetchRecipe() {
  const res = await fetch("http://localhost:3000/api/recipes");
  const recipes = await res.json();

  return recipes.find((recipe) => recipe.recipe_id == params.id);
}

fetchRecipe();
</script>
