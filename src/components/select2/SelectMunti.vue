<script lang="ts" setup>
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

// Định nghĩa props
const props = defineProps({
  products: {
    type: Array as () => Array<{ id: number; product_name: string }>,
    default: () => [],
  },
})

// Định nghĩa emit
const emit = defineEmits(['update:selectedCountries'])

// Khai báo các biến trạng thái
const selectedCountries = ref<any[]>([])
const countries = ref<any[]>([])
const isLoading = ref(false)

// Các phương thức
const limitText = (count: number) => {
  return `and ${count} other countries`
}

const asyncFind = (query: string) => {
  isLoading.value = true
  // Lọc ra từ mảng products
  countries.value = props.products.filter((product) =>
    product.product_name.toLowerCase().includes(query.toLowerCase())
  )
  isLoading.value = false
}

const clearAll = () => {
  selectedCountries.value = []
  emit('update:selectedCountries', selectedCountries.value)
}
</script>

<template>
  <div>
    <multiselect
      v-model="selectedCountries"
      :options="countries"
      :searchable="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Select countries"
      label="product_name"
      track-by="id"
      :limit="3"
      :limit-text="limitText"
      @search-change="asyncFind"
      @input="emit('update:selectedCountries', selectedCountries)"
    >
    </multiselect>
    <button @click="clearAll">Clear All</button>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
