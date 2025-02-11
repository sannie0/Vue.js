<template>
  <div v-if="isAuthenticated">
    <DataTable
      v-if="itemsWithNumbers && itemsWithNumbers.length > 0"
      :value="itemsWithNumbers"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="itemsTotal"
      @page="onPageChange"
      responsive-layout="scroll"
      :laading="true"
      :first="offset"
    >
      <Column field="number" header="№" />
      <Column field="name" header="Наименование товара" />
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
  name: 'Item',
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
    itemsWithNumbers() {
      if (!this.items) return []
      return this.items.map((item, index) => ({
        ...item,
        number: this.offset + index + 1
      }))
    },
    items() {
      return this.dataStore.items
    },
    itemsTotal() {
      return this.dataStore.items_total
    }
  },
  mounted() {
    if (this.isAuthenticated) {
      this.dataStore.get_items()
      this.dataStore.get_items_total()
    }
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first
      this.perpage = event.rows
      this.dataStore.get_items(this.offset / this.perpage, this.perpage)
    }
  }
}
</script>
