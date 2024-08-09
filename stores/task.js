import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      this.tasks = await $fetch('http://localhost:3000/api/tasks', {
        headers: { Authorization: `Bearer ${useAuthStore().token}` },
      })
      return this.tasks
    },
    async createTask(taskData) {
      await $fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        body: taskData,
        headers: { Authorization: `Bearer ${useAuthStore().token}` },
      })
      this.fetchTasks()
    },
    async updateTask(id, taskData) {
      await $fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'PUT',
        body: taskData,
        headers: { Authorization: `Bearer ${useAuthStore().token}` },
      })
      this.fetchTasks()
    },
    async deleteTask(id) {
      await $fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${useAuthStore().token}` },
      })
      this.fetchTasks()
    },
  },
})