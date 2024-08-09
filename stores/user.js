import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      this.users = await $fetch('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${useAuthStore().token}` },
      })
      return this.users
    },
    async createUser(taskData) {
      await $fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: taskData,
        headers: { Authorization: `Bearer ${useAuthStore().token}` },
      })
      this.fetchUsers()
    },
    async updateUser(id, taskData) {
      await $fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        body: taskData,
        headers: { Authorization: `Bearer ${useAuthStore().token}` },
      })
      this.fetchUsers()
    },
    async deleteUser(id) {
      await $fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${useAuthStore().token}` },
      })
      this.fetchUsers()
    },
  },
})