<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close">&times;</button>
      <h2>Change Task Status</h2>
      <form @submit.prevent="updateStatus">
        <div class="mb-4">
          <label for="status" class="block mb-2">New Status:</label>
          <select v-model="newStatus" id="status" class="w-full p-2 border border-gray-300 rounded">
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>
        <button type="submit" class="submit-button">Update Status</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useTaskStore } from '~/stores/task';
const taskStore = useTaskStore();

const props = defineProps({
  isVisible: Boolean,
  taskId: Number,
});

const emit = defineEmits(['update:isVisible', 'statusUpdated']);

const newStatus = ref('');

// Initialize newStatus when the modal opens
watch(() => props.isVisible, async (newValue) => {
  if (newValue) {
    const task = taskStore.tasks.find(t => t.id === props.taskId);
    if (task) {
      newStatus.value = task.status;
    }
  }
});
const close = () => {
  emit('update:isVisible', false);
};

const updateStatus = async () => {
  try {
    taskStore.updateTask(props.taskId, {status: newStatus.value });
    close();
  } catch (error) {
    console.error('Error updating status:', error);
  }
};
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
