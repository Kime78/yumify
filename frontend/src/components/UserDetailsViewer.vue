<template>
  <div v-if="loading">Se incarca..</div>
  <div v-else>
    <p>User: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Address: {{ user.address }}</p>
    <p>Phone Number: {{ user.phoneNumber }}</p>
    <p>favorite Food: {{ user.favoriteFood }}</p>
    <button @click="onOkBtn">Ok</button>
  </div>
</template>

<script setup>
import router from "@/router";
import { reactive, ref } from "vue";
import { loggedInID } from "@/router";

const user = reactive({
  name: "",
  email: "",
  address: "",
  phoneNumber: "",
  favoriteFood: "",
});

const loading = ref(true);

function onOkBtn() {
  router.push("/recipes");
}

async function fetchUser() {
  const res = await fetch("http://localhost:3000/api/users");
  const res2 = await fetch(
    "http://localhost:3000/api/get-user-details/" + loggedInID
  );
  const users = await res.json();

  const user_details = await res2.json();
  const user2 = users.find((u) => u.user_id == user_details[0].user_id);
  user.name = user2.name;
  user.email = user2.email;
  user.address = user_details[0].address;
  user.phoneNumber = user_details[0].phone_number;
  user.favoriteFood = user_details[0].favorite_food;

  console.log(users);
  console.log(user_details);
  loading.value = false;
}

fetchUser();
</script>
