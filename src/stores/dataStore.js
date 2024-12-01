import { defineStore } from 'pinia'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useDataStore = defineStore('data', {
  state: () => ({
    categories: [],
    categories_total: null,
    items: [],
    items_total: null,
    errorMessage: ''
  }),

  actions: {
    async get_categories(page = 0, perpage = 5) {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/category', {
          params: {
            page: page,
            perpage: perpage
          }
        })
        this.categories = response.data[0] || []
        console.log('Raw response:', response)
        console.log('Response data:', response.data)
        console.log('Response data:', response.data[0])
        console.log('Categories after fetch:', this.categories) //test
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
    async get_categories_total() {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/categories_total')
        this.categories_total = response.data
        console.log('Raw response:', response)
        console.log('Response data:', response.data)

        console.log('Categories after fetch:', this.categories_total)
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
    async get_items(page = 0, perpage = 5) {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/items', {
          params: {
            page: page,
            perpage: perpage
          }
        })
        this.items = response.data[0] || []
        console.log('Raw response:', response)
        console.log('Response data:', response.data)
        console.log('Response data:', response.data[0])
        console.log('Items after fetch:', this.items) //test
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
    async get_items_total() {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/items_total')
        this.items_total = response.data
        console.log('Raw response:', response)
        console.log('Response data:', response.data)
        console.log('Items after fetch:', this.items_total)
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
    }
  }
})
