<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Titre principal du panneau d'administration -->
    <h1 class="text-4xl font-extrabold mb-6 text-gray-800">Admin Panel</h1>
    
    <section class="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-3xl font-semibold mb-4 text-gray-700">Manage Users</h2>
      
      <div class="flex justify-between mb-4">
        <!-- Bouton pour ajouter un nouvel utilisateur -->
        <button @click="newUser" class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">Add User</button>
      </div>
      
      <!-- Modal pour éditer un utilisateur existant -->
      <EditUserModal
        v-model:modelValue="isModalVisible"
        :user="selectedUser"
        @save="updateUser"
      />
      
      <!-- Modal pour ajouter un nouvel utilisateur -->
      <NewUserModal
        v-model:modelValue="showModalNewUser"
        @userAdded="fetchUsers"
      />
      
      <!-- Tableau liste des utilisateurs -->
      <table class="min-w-full bg-white border border-gray-200 rounded-md">
        <thead>
          <tr class="bg-gray-200 text-gray-700 border-b">
            <th class="py-3 px-4">Name</th>
            <th class="py-3 px-4">Email</th>
            <th class="py-3 px-4">Role</th>
            <th class="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b">
            <td class="py-2 px-4">{{ user.name }}</td>
            <td class="py-2 px-4">{{ user.email }}</td>
            <td class="py-2 px-4">{{ user.role }}</td>
            <td class="py-2 px-4 text-center">
              <!-- Boutons pour éditer et supprimer un utilisateur -->
              <button @click="editUser(user)" class="text-blue-500 hover:underline">
                <PencilIcon class="w-5 h-5" />
              </button>
              <button @click="deleteUser(user.id)" class="text-red-500 hover:underline ml-2">
                <TrashIcon class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-3xl font-semibold mb-4 text-gray-700">Manage Tasks</h2>
      
      <div class="flex justify-between mb-4">
        <!-- Bouton pour ajouter une nouvelle tâche -->
        <button @click="showNewTaskModal" class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">Add Task</button>
      </div>
      
      <!-- Modal pour ajouter une nouvelle tâche -->
      <NewTaskModal
        v-model:modelValue="isNewTaskModalVisible"
        @taskAdded="fetchTasks"
      />

      <!-- Modal édite tâche -->
      <EditTaskModal
        :modelValue="isEditModalVisible"
        :task="selectedTask"
        @update:modelValue="isEditModalVisible = $event"
        @taskUpdated="fetchTasks"
      />

      <table class="min-w-full bg-white border border-gray-200 rounded-md">
        <thead>
          <tr class="bg-gray-200 text-gray-700 border-b">
            <th class="py-3 px-4">Name</th>
            <th class="py-3 px-4">Description</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-4">Assigned To</th>
            <th class="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id" class="border-b">
            <td class="py-2 px-4">{{ task.name }}</td>
            <td class="py-2 px-4">{{ task.description }}</td>
            <td class="py-2 px-4">{{ task.status }}</td>
            <td class="py-2 px-4">{{ getUserName(task.Pid_person) }}</td>
            <td class="py-2 px-4 text-center">
              <!-- Boutons pour éditer et supprimer une tâche -->
              <button @click="editTask(task)" class="text-blue-500 hover:underline">
                <PencilIcon class="w-5 h-5" />
              </button>
              <button @click="deleteTask(task.id)" class="text-red-500 hover:underline ml-2">
                <TrashIcon class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
// Configuration de la page pour utiliser le middleware d'authentification
definePageMeta({
  middleware: 'auth'
});

// Importation des icônes pour les actions d'édition et de suppression
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

// Importation des fonctionnalités de Vue
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Importation des composants modaux
import EditUserModal from '../components/EditUserModal.vue';
import NewUserModal from '../components/NewUserModal.vue';
import NewTaskModal from '../components/NewTaskModal.vue';
import EditTaskModal from '../components/EditTaskModal.vue'; 

// Références pour la gestion des modaux
const showModalNewUser = ref(false);
const isModalVisible = ref(false);
const selectedUser = ref(null);
const isNewTaskModalVisible = ref(false);
const isEditModalVisible = ref(false);
const selectedTask = ref(null);

// Fonctions pour afficher les modaux
const showNewTaskModal = () => {
  isNewTaskModalVisible.value = true;
};

// Références pour les utilisateurs et les tâches
const users = ref([]);
const tasks = ref([]);

// Importation des stores pour les tâches et les utilisateurs
import { useTaskStore } from '~/stores/task';
import { useUserStore } from '~/stores/user';

const taskStore = useTaskStore();
const userStore = useUserStore();

// fct pour récupérer les utilisateurs depuis le store
const fetchUsers = async () => {
  await userStore.fetchUsers();
  users.value = userStore.users;
};

// Fonction pour récupérer les tâches depuis le store
const fetchTasks = async () => {
  await taskStore.fetchTasks();
  tasks.value = taskStore.tasks;
};

// Appel des fonctions pour récupérer les données lorsque le composant est monté
onMounted(() => {
  fetchUsers();
  fetchTasks();
});

// Fonction pour supprimer un utilisateur et mettre à jour la liste des utilisateurs
const deleteUser = async (userId) => {
  await userStore.deleteUser(userId);
  fetchUsers();
};

// fonction pour éditer une tâche en définissant la tâche sélectionnée et en affichant le modal d'édition
const editTask = (task) => {
  selectedTask.value = task;
  isEditModalVisible.value = true;
};

// Fonction pour supprimer une tâche et mettre à jour la liste des tâches
const deleteTask = async (taskId) => {
  await taskStore.deleteTask(taskId);
  fetchTasks();
};

// Fonction pour afficher le modal de création d'un nouvel utilisateur
function newUser() {
  showModalNewUser.value = true;
}

// fonction pour définir l'utilisateur sélectionné et afficher le modal d'édition
function editUser(user) {
  selectedUser.value = { ...user };
  isModalVisible.value = true;
}

// Fonction pour mettre à jour un utilisateur
function updateUser(updatedUser) {
  const index = users.value.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    users.value[index] = updatedUser;
  }
}

// fonction pour obtenir le nom d'un utilisateur en fonction de son ID
const getUserName = (userId) => {
  const user = users.value.find(user => user.id === userId);
  return user ? user.name : 'Unknown';
};
</script>
