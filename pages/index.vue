<template>
  <div class="p-6 bg-white min-h-screen ">
    <div class="flex justify-between items-center mb-6">
      <!-- Titre principal du panneau d'administration -->
      <h1 class="text-4xl font-extrabold text-gray-800">Mes taches</h1>
      <!-- Bouton de déconnexion aligné à droite -->
      <button @click="logout" class="flex flex-row bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        <ArrowRightStartOnRectangleIcon  class="h-6 w-6 mr-2" />
        Logout
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
        <thead class="bg-gray-100 text-gray-600 border-b">
          <tr>
            <th class="py-3 px-4 text-left">Name</th>
            <th class="py-3 px-4 text-left">Description</th>
            <th class="py-3 px-4 text-left">Status</th>
            <th class="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in taskStore.tasks" :key="task.id" class="border-b hover:bg-gray-50">
            <td class="py-3 px-4">{{ task.name }}</td>
            <td class="py-3 px-4">{{ task.description }}</td>
            <td class="py-3 px-4">
              <span :class="statusClass(task.status)">
                {{ task.status }}
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <button @click="openTaskModal(task.id)" class="text-blue-500 hover:text-blue-700 transition">
                <PencilIcon class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <TaskModal 
      :isVisible="isTaskModalVisible" 
      :taskId="selectedTaskId" 
      @update:isVisible="isTaskModalVisible = $event"
      @statusUpdated="fetchTasks" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
});
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { PencilIcon } from '@heroicons/vue/24/outline';
import TaskModal from '../components/TaskModal.vue';
import { ArrowRightStartOnRectangleIcon  } from '@heroicons/vue/24/outline'; 
import { useAuthStore } from '~/stores/auth'; 

// Accéder au store 
const authStore = useAuthStore();
const isTaskModalVisible = ref(false);
const selectedTaskId = ref(null);

import { useTaskStore } from '~/stores/task';
const taskStore = useTaskStore();
const fetchTasks = async () => {
  await taskStore.fetchTasks();
};
const logout = () => {
  authStore.logout();
};


onMounted(fetchTasks);

const openTaskModal = (taskId) => {
  selectedTaskId.value = taskId;
  isTaskModalVisible.value = true;
};

const statusClass = (status) => {
  switch (status) {
    case 'à faire':
      return 'text-yellow-600'; // Yellow for "To Do"
    case 'en cours':
      return 'text-blue-600'; // Blue for "In Progress"
    case 'terminé':
      return 'text-green-600'; // Green for "Completed"
    default:
      return 'text-gray-600'; // Default color
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
