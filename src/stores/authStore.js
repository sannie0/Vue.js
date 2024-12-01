import { defineStore } from 'pinia'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // Данные пользователя
    token: localStorage.getItem('token') || null, // Токен из localStorage
    isAuthenticated: false, // Статус аутентификации
    errorMessage: '' // Сообщение об ошибке
  }),

  actions: {
    async login(credentials) {
      this.errorMessage = ''
      try {
        console.log(backendUrl + '/login')
        const response = await axios.post(backendUrl + '/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        this.isAuthenticated = true
        localStorage.setItem('token', response.data.token)
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },
    async getUser() {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/user', {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
        this.user = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },
    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false

      localStorage.removeItem('token')
    }
  }
})
