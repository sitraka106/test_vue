<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Mes Tâches</h1>
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

const isTaskModalVisible = ref(false);
const selectedTaskId = ref(null);

import { useTaskStore } from '~/stores/task';
const taskStore = useTaskStore();
const fetchTasks = async () => {
  await taskStore.fetchTasks();
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
