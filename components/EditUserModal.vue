<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close" aria-label="Close">&times;</button>
      <h2 class="modal-title">Edit User</h2>
      <form @submit.prevent="save" class="modal-form">
        <div class="form-group">
          <label for="name" class="form-label">Username:</label>
          <input v-model="user.name" id="name" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email:</label>
          <input v-model="user.email" id="email" type="email" class="form-input" />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password:</label>
          <input v-model="user.password" id="password" type="password" class="form-input" />
        </div>
        <button type="submit" class="submit-button">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
import axios from 'axios';
import { useUserStore } from '~/stores/user';


// Définition des propriétés attendues depuis le composant parent
const props = defineProps({
  modelValue: Boolean, // Contrôle la visibilité du modal
  user: Object // Objet utilisateur à modifier
});

const emit = defineEmits(['update:modelValue', 'save']);
const userStore = useUserStore();



// Initialisation de la visibilité 
const isVisible = ref(props.modelValue);
const user = ref({
  ...props.user,
  password: '' // Initialise le mot de passe comme une chaîne vide
});

//  pour fermer le modal
const close = () => {
  emit('update:modelValue', false); // Émet un événement pour signaler la fermeture du modal
};

//  pour sauvegarder les données utilisateur
const save = async () => {
  await userStore.updateUser(user.value.id, user.value);
  emit('save', user.value); // Émet les données utilisateur mises à jour
  close(); // Ferme le modal
};

// Surveillance des changements dans la visibilité du modal et les données utilisateur
watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal; 
});

watch(() => props.user, (newUser) => {
  user.value = {
    ...newUser,
    password: '' // Assure que le mot de passe est réinitialisé à une chaîne vide lorsque les données utilisateur changent
  };
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
  padding: 24px;
  border-radius: 12px;
  position: relative;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #333;
}

.modal-title {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}

.modal-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555; 
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box; 
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
