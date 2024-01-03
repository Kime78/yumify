<template>
  <div class="login-container">
    <h1>Login</h1>
    <form ref="loginForm">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="userCredentials.email" required>
      <p v-if="!isValidEmail">Please enter a valid email address.</p>

      <label for="password">Password:</label>
      <input id="password" type="password" v-model="userCredentials.password" required>
      <p v-if="!isValidPassword">Please enter a valid password.</p>

      <button @click="handleSubmit" ref="submitBtnRef" :disabled="!isValidPassword || !isValidEmail">Submit</button>
    </form>
  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue';

const userCredentials = reactive({
  email: '',
  password: '',
});

const isValidEmail = computed(() => {
  return userCredentials.email.trim().length > 0;
});

const isValidPassword = computed(() => {
  return userCredentials.password.trim().length > 0;
})

const submitBtnRef = ref(null);

const handleSubmit = () => {
  console.log('Form submitted');

  submitBtnRef.value.disabled = true;

  setTimeout(() => {
    submitBtnRef.value.disabled = false;
    alert('Login successful!');
  }, 2000);
};

export default {
  name: 'LoginForm',
  setup() {
    return {
      userCredentials,
      isValidEmail,
      isValidPassword,
      submitBtnRef,
      handleSubmit,
    };
  },
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
