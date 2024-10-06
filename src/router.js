import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Items from '@/components/Items.vue'
import Categories from '@/components/Categories.vue'
import User from '@/components/User.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/categories',
    component: Categories
  },
  {
    path: '/items',
    component: Items
  },
  {
    path: '/user',
    component: User
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
