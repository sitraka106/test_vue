import { defineStore } from 'pinia';
import { useRouter } from '#app';
import axios from 'axios';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: useStorage('token', null),
    tokenExpiration: useStorage('tokenExpiration', null),
  }),
  persist: {
    enabled: true, // Activer la persistance
    strategies: [
      {
        storage: process.client ? localStorage : undefined,
        paths: ['user', 'token', 'tokenExpiration'], // Champs à persister
      }
    ]
  },
  actions: {
    setUser(user) {
      this.user = user
    },
    setToken(token) {
      this.token = token
    },
    setTokenExpiration(tokenExpirationE) {
      this.tokenExpiration = tokenExpirationE
    },
    clearUser() {
      this.user = null
      this.token = null
      this.tokenExpiration = null
    },
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
        const token = response.data.token;
        const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 1 day in milliseconds

        this.setToken(token);
        this.setTokenExpiration(expirationTime);
        this.setUser(response.data.user);

        // Set axios default headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const router = useRouter();
        if (response.data.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Authentication failed');
      }
    },
    logout() {
      this.clearUser();
      delete axios.defaults.headers.common['Authorization'];
      const router = useRouter();
      router.push('/login');
    },
    isTokenExpired() {
      if (!this.token || !this.tokenExpiration) return true;
      return new Date().getTime() > this.tokenExpiration;
    },
    async checkAuth() {
      if (this.isTokenExpired()) {
        this.logout();
        return false;
      }

      // Ensure token is set for axios
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
      
      return true;
    },
  },
});
