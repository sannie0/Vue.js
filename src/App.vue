<template>
  <header class="header">
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/categories">Категория</router-link></li>
        <li><router-link to="/items">Товары</router-link></li>
        <li><router-link to="/user">Профиль</router-link></li>
      </ul>
    </nav>
  </header>

  <div class="content">
    <div v-if="isAuthenticated && user" class="welcome-section">
      Welcome, {{ user.name }}
      <button @click="logout" class="btn-logout">Logout</button>
    </div>
    <div v-else class="login-section">
      <label>Авторизация</label><br />
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="input-field"
            placeholder="Введите email"
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="input-field"
            placeholder="Введите пароль"
          />
        </div>
        <button type="submit" class="btn-submit">Войти</button><br />
        <p v-if="authError" class="error">{{ authError }}</p>
      </form>
    </div>
  </div>
  <br /><br /><br /><br /><br /><br /><br />
  <div class="router_view"><router-view></router-view></div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'

export default {
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore() // Подключаем Pinia store
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

<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-right: 600px;
}

.navbar ul {
  list-style-type: none;

  display: flex;
  gap: 50px;
}

.navbar ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.navbar ul li a:hover {
  background-color: #ddd;
  border-radius: 5px;
}

.content {
  margin-left: 200px;
}

.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.btn-submit {
  padding: 10px;
  background-color: #7b42d8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  text-align: center;
  color: rgb(245, 13, 13);
  font-weight: bold;
}

.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.welcome-section .btn-logout {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #7b42d8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.router_view {
  padding: 40px;
}
</style>
