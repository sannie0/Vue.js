<template>
  <header>
    <nav class="navbar">
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
    </nav>
  </header>
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
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.welcome-section {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

.btn-logout {
  margin-left: 10px;
  padding: 8px 15px;
  background-color: #7b42d8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  margin-bottom: 5px;
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

/* Добавим отступы для мобильных устройств */
@media (max-width: 600px) {
  .login-form {
    width: 90%;
  }
}
</style>
