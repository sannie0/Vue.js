<template>
  <DataTable
    v-if="itemsWithNumbers && itemsWithNumbers.length > 0"
    :value="itemsWithNumbers"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perPage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="itemsTotal ? itemsTotal.length : 0"
    @page="onPageChange"
    responsive-layout="scroll"
    :laading="true"
    :first="offset"
  >
    <Column field="number" header="№" />
    <Column field="name" header="Наименование товара" />
  </DataTable>
  <p v-else>Загрузка данных...</p>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'ItemList',
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perPage: 5,
      offset: 0
    }
  },
  computed: {
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
    console.log('Items component MOUNTED!')
    this.fetchCategories()
    console.log('Items=', this.items)
  },
  methods: {
    fetchCategories() {
      this.dataStore.get_items()
      this.dataStore.get_items_total()
    },
    onPageChange(event) {
      this.offset = event.first
      this.perPage = event.rows
      this.dataStore.get_items({ page: this.offset / this.perPage, rows: this.perPage })
    }
  }
}
</script>
