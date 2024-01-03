<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit" ref="loginForm">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="userCredentials.email" required />

      <label for="password">Password:</label>
      <input
        id="password"
        type="password"
        v-model="userCredentials.password"
        required
      />

      <button
        type="submit"
        ref="submitBtnRef"
        :disabled="!isValidPassword || !isValidEmail"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue";

const userCredentials = reactive({
  email: "",
  password: "",
});

const isValidEmail = computed(() => {
  return userCredentials.email.trim().length > 0;
});

const isValidPassword = computed(() => {
  return userCredentials.password.trim().length > 0;
});

const submitBtnRef = ref(null);

const handleSubmit = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userCredentials.email,
        password: userCredentials.password,
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error sending fetch request:", error);
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 0 auto;
}

label {
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
}

p {
  color: red;
}
</style>
