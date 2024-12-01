<template>
  <DataTable
    v-if="categories && categories.length > 0"
    :value="categories"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perPage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="categoriesTotal && Array.isArray(categoriesTotal) ? categoriesTotal.length : 0"
    @page="onPageChange"
    responsive-layout="scroll"
    :laading="true"
    :first="offset"
  >
    <Column field="id" header="№" />
    <Column field="name" header="Наименование категории" />
  </DataTable>
  <p v-else>Загружаем данные...</p>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'CategoriesList',
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perPage: 5,
      offset: 0
    }
  },
  computed: {
    categories() {
      return this.dataStore.categories
    },
    categoriesTotal() {
      return this.dataStore.categories_total
    }
  },
  mounted() {
    console.log('Categories component MOUNTED!')
    this.fetchCategories()
    console.log('Categories=', this.categories)
  },
  methods: {
    fetchCategories() {
      this.dataStore.get_categories()
      this.dataStore.get_categories_total()
    },
    onPageChange(event) {
      this.offset = event.first
      this.perPage = event.rows
      this.dataStore.get_categories({
        page: this.offset / this.perPage,
        rows: this.perPage
      })
    }
  }
}
</script>
