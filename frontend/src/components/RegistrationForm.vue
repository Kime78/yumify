<template>
  <h3>Register now</h3>
  <form @submit.prevent="handleRegister" ref="registerRef">
    <input placeholder="Name" type="text" v-model="userCredentials.name" />
    <input placeholder="Email" type="email" v-model="userCredentials.email" />
    <input placeholder="Address*" type="text" v-model="userDetails.address" />
    <input
      placeholder="Phone Number*"
      type="text"
      v-model="userDetails.phoneNumber"
    />
    <input
      placeholder="Favorite Food*"
      type="text"
      v-model="userDetails.favoriteFood"
    />
    <input
      placeholder="Password"
      type="password"
      v-model="userCredentials.password"
    />
    <input
      placeholder="Confirm Password"
      type="password"
      v-model="userCredentials.confirmedPassword"
    />

    <button
      type="submit"
      ref="registerBtnRef"
      :disabled="
        !isValidName ||
        !isValidEmail ||
        !isValidPassword ||
        !isValidConfirmedPassword
      "
    >
      Register
    </button>
  </form>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const userCredentials = reactive({
  email: "",
  name: "",
  password: "",
  confirmedPassword: "",
});

const userDetails = reactive({
  address: "",
  phoneNumber: "",
  favoriteFood: "",
});

const isValidName = computed(() => {
  return userCredentials.name.trim().length > 0;
});

const isValidEmail = computed(() => {
  return userCredentials.email.trim().length > 0;
});

const isValidPassword = computed(() => {
  return userCredentials.password.trim().length > 0;
});

const isValidConfirmedPassword = computed(() => {
  return (
    userCredentials.confirmedPassword.trim().length > 0 &&
    userCredentials.password.trim() == userCredentials.confirmedPassword.trim()
  );
});

const registerBtnRef = ref(null);

const handleRegister = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userCredentials.email,
        name: userCredentials.name,
        password: userCredentials.password,
      }),
    });

    const response = await fetch("http://localhost:3000/api/users");
    const array = await response.json();
    const user_id = array[array.length - 1].user_id;

    await fetch("http://localhost:3000/api/add-user-details/" + user_id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: userDetails.address,
        phone_number: userDetails.phoneNumber,
        favorite_food: userDetails.favoriteFood,
      }),
    });
    const data = await res.json();

    if (data.message == "User created successfully") {
      router.push("/recipes");
    } else {
      console.error("Register failed:", data.message);
    }
  } catch (error) {
    console.error("Error sending fetch request:", error);
  }
};
</script>

<style scoped></style>
