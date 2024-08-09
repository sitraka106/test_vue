<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form @submit.prevent="login" class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">Login</h2>
      <div class="mb-6">
        <label class="block text-lg font-semibold mb-2 text-gray-700" for="email">Email</label>
        <input v-model="email" type="email" id="email" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="mb-6">
        <label class="block text-lg font-semibold mb-2 text-gray-700" for="password">Password</label>
        <input v-model="password" type="password" id="password" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <!-- Error message display -->
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
        {{ errorMessage }}
      </div>
      <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">Login</button>
    </form>
  </div>
</template>

<script setup>


import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const authStore = useAuthStore();

const login = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
    errorMessage.value = ''; // Clear error message on successful login
  } catch (error) {
    // Handle and display error message
    errorMessage.value = 'Authentication failed. Please check your email and password.';
  }
};
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
