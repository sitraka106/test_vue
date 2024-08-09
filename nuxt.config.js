export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  
  // Configuration du middleware global
  router: {
    middleware: ['auth']
  },
  
  // Configuration de Pinia
  pinia: {
    autoImports: [
      'defineStore', // import { defineStore } from 'pinia'
    ],
  },
  server: {
    port: 3001,
  },
  
  // Autres configurations Nuxt si nécessaire
  buildModules: ['@pinia/nuxt'],
})