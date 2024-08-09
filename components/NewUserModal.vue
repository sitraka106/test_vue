<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close" aria-label="Close">&times;</button>
      <h2 class="modal-title">Add New User</h2>
      <form @submit.prevent="addUser" class="modal-form">
        <div class="form-group">
          <label for="name" class="form-label">Name:</label>
          <input v-model="newUser.name" id="name" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label for="lastname" class="form-label">Lastname:</label>
          <input v-model="newUser.lastname" id="lastname" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email:</label>
          <input v-model="newUser.email" id="email" type="email" class="form-input" />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password:</label>
          <input v-model="newUser.password" id="password" type="password" class="form-input" />
        </div>
        <button type="submit" class="submit-button">Add User</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
import axios from 'axios';
import { useUserStore } from '~/stores/user';

const props = defineProps({
  modelValue: Boolean
});
const userStore = useUserStore();

const emit = defineEmits(['update:modelValue', 'userAdded']);

const isVisible = ref(props.modelValue);
const newUser = ref({
  name: '',
  lastname: '',
  email: '',
  password: '',
  role: 'user',
});

const close = () => {
  emit('update:modelValue', false);
};

const addUser = async () => {
  try {
    await userStore.createUser(newUser.value);
    emit('userAdded');
    close();
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal;
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  position: relative;
  width: 450px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #333;
}

.modal-title {
  font-size: 26px;
  margin-bottom: 20px;
  color: #333;
}

.modal-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
}

.submit-button {
  background-color: #4CAF50;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
