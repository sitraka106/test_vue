<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close">&times;</button>
      <h2>Add New Task</h2>
      <form @submit.prevent="addTask">
        <div class="mb-4">
          <label for="name" class="block mb-2">Name:</label>
          <input v-model="newTask.name" id="name" type="text" class="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div class="mb-4">
          <label for="description" class="block mb-2">Description:</label>
          <input v-model="newTask.description" id="description" type="text" class="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div class="mb-4">
          <label for="status" class="block mb-2">Status:</label>
          <select v-model="newTask.status" id="status" class="w-full p-2 border border-gray-300 rounded">
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="pid_person" class="block mb-2">Assign To:</label>
          <select v-model="newTask.Pid_person" id="pid_person" class="w-full p-2 border border-gray-300 rounded">
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>
        <button type="submit" class="submit-button">Add Task</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '~/stores/user';
import { useTaskStore } from '~/stores/task';
const taskStore = useTaskStore();
const userStore = useUserStore();


const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'taskAdded']);

const isVisible = ref(props.modelValue);
const newTask = ref({
  name: '',
  description: '',
  status: 'à faire',
  Pid_person: null
});
const users = ref([]);

const fetchUsers = async () => {
  try {
  await userStore.fetchUsers();
    users.value = userStore.users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const close = () => {
  emit('update:modelValue', false);
};

const addTask = async () => {
  try {
    await taskStore.createTask(newTask.value);
    emit('taskAdded');
    close();
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

onMounted(() => {
  fetchUsers();
});

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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 400px;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.submit-button {
  background-color: #4CAF50;
  color: white;
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
