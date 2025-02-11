<template>
  <div v-if="isAuthenticated">
    <DataTable
      :value="categories"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="categories_total"
      @page="onPageChange"
      responsive-layout="scroll"
      :laading="true"
      :first="offset"
    >
      <Column field="id" header="№" />
      <Column field="name" header="Наименование категории" />
    </DataTable>
  </div>
  <div v-else>
    <p>Войдите для просмотра содержимого</p>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDataStore } from '@/stores/dataStore'
import { useAuthStore } from '@/stores/authStore' // Подключаем хранилище авторизации

export default {
  name: 'Categories',
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      authStore: useAuthStore(), // Используем хранилище авторизации
      perpage: 5,
      offset: 0
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated // Проверяем, авторизован ли пользователь
    },
    categories() {
      return this.dataStore.categories
    },
    categories_total() {
      return this.dataStore.categories_total
    }
  },
  mounted() {
    if (this.isAuthenticated) {
      this.dataStore.get_categories()
      this.dataStore.get_categories_total()
    }
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first
      this.perpage = event.rows
      this.dataStore.get_categories(this.offset / this.perpage, this.perpage)
    }
  }
}
</script>

<style scoped></style>
