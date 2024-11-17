<template>
  <Menubar :model="items" class="menu-bar">
    <template #start>
      <span class="mr-4">
        <img src="@/images/logo2.png" width="60" />
      </span>
    </template>

    <template #item="{ item }">
      <router-link v-if="item.route" :to="item.route" class="flex items-center m-6 p-4">
        <span :class="item.icon"></span>
        <span class="ml-1">{{ item.label }}</span>
      </router-link>
    </template>

    <template #end>
      <div class="flex items-center gap-2">
        <div v-if="isAuthenticated && user">
          <span class="pi pi-fw pi-user mr-4" /> {{ user.name }}
          <Button @click="logout" class="ml-4">Выйти</Button>
        </div>
        <div v-else>
          <form @submit.prevent="login">
            <InputText
              v-model="email"
              type="email"
              id="email"
              required
              placeholder="Логин"
              class="m-2 sm:w-auto"
              :class="{ 'p-invalid': authError }"
            />
            <InputText
              v-model="password"
              type="password"
              id="password"
              required
              placeholder="Пароль"
              class="m-2 sm:w-auto"
              :class="{ 'p-invalid': authError }"
            />
            <Button type="submit">Войти</Button>
          </form>
          <div class="m-2">
            <small v-if="authError" class="error">{{ authError }}</small>
          </div>
        </div>
      </div>
    </template>
  </Menubar>
  <router-view />
</template>

<style scoped>
:root {
  --primary-color: rgb(126, 113, 177); /* Основной цвет кнопки */
  --primary-color-hover: rgb(145, 128, 193); /* Цвет кнопки при наведении */
}

.p-button {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.p-button:hover {
  background-color: var(--primary-color-hover);
  border-color: var(--primary-color-hover);
}
</style>

<script>
import { useAuthStore } from '@/stores/authStore'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'

export default {
  components: { Button, Menubar, InputText },
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(), // Подключаем Pinia store
      items: [
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/',
          shortcut: [
            //submenu
          ]
        },
        {
          label: 'Категории',
          icon: 'pi pi-fw pi-folder',
          route: '/categories'
        },
        {
          label: 'Товары',
          icon: 'pi pi-fw pi-box',
          route: '/items'
        }
      ]
    }
  },

  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated
    },
    user() {
      return this.authStore.user
    },
    authError() {
      return this.authStore.errorMessage
    }
  },

  methods: {
    logout() {
      this.authStore.logout()
    },
    login() {
      this.authStore.login({ email: this.email, password: this.password })
    }
  },

  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.authStore.isAuthenticated = true
      this.authStore.getUser()
    }
  }
}
</script>
