<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Helper } from '@/helper'
import Posservice from '../service/Posservice'

// Khai báo các biến trạng thái
const emit = defineEmits(['addproduct'])
const selectedCategory = ref<string>('all')
const selectedType = ref<string>('all')
const selectedSupplier = ref<string>('all')
const products = ref<
  Array<{
    id: number
    product_name: string
    name: string
    sku: string
    category: Array<{
      category_id: number
      category_name: string
    }>
    price_sale: number
    unit_price: number
    description: string
    slug: string
    seo_title: string | null
    seo_description: string
    unit_name: string | null
    content: string
    photos: Array<{
      photo: string
      thumb: string
    }>
    type: number
    licence_api_key: string | null
    licence_api_url: string | null
    price: number | null
    image_json: string
    thumb_url: string
    external_link: string | null
    package_height: string
    weight: string
    package_length: string
    package_width: string
    unit: Array<number>
    store_id: number | null
    parent_id: number
    trademark: number
    inventory: number | null
    enable_order: number
    supplier: string
  }>
>([])
// Lấy danh sách sản phẩm từ API
Posservice.getProducts().then((res) => {
  console.log(res.data)
  products.value = res.data.data
})
const addproduct = (product: any) => {
  emit('addproduct', product)
}

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    return (
      (selectedCategory.value === 'all' ||
        product.category.some((cat) => cat.category_name === selectedCategory.value)) &&
      (selectedSupplier.value === 'all' || product.supplier === selectedSupplier.value)
    )
  })
})
</script>
 
<script lang="ts">
export default {
  name: 'ProductList',
}
</script>
<template>
  <div class="absolute bg-[#F3F3F3] rounded-[8px] h-[431px] shadow-top" style="bottom: 104px">
    <header class="flex justify-between">
      <div class="flex space-x-4 py-4 px-4">
        <select v-model="selectedType" class="border rounded p-2 w-[104px] h-[39px]">
          <option value="all">Tất cả</option>
          <option value="sweater">Sản phẩm</option>
          <option value="shirt">Combo</option>
        </select>
        <select v-model="selectedCategory" class="border rounded p-2 w-[200px] h-[39px]">
          <option value="all">Danh mục</option>
          <option value="sweater">Áo khoác</option>
          <option value="shirt">Áo sơ mi</option>
        </select>
        <select v-model="selectedSupplier" class="border rounded p-2 w-[200px] h-[39px]">
          <option value="all">Nhà cung cấp</option>
          <option value="supplier1">Nhà cung cấp 1</option>
          <option value="supplier2">Nhà cung cấp 2</option>
        </select>
      </div>
    </header>
    <div
      class="grid grid-cols-4 gap-4 p-4 pt-0 overflow-y-auto no-scrollbar"
      style="height: calc(100% - 70px)"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        @click="addproduct(product)"
        class="border rounded-[8px] p-2 w-full max-w-[308.75px] h-full max-h-[104px] bg-white flex"
      >
        <div>
          <img
            :src="product.thumb_url || 'https://static.salekit.com//public/images/no-image.png'"
            alt="Product Image"
            class="w-[88px] h-[88px] bg-gray-200 rounded-[8px] min-w-[88px] min-h-[88px]"
          />
        </div>
        <div class="ml-2 py-3">
          <h2
            class="text-[14px] font-[600] whitespace-nowrap truncate max-w-[180px]"
            :title="product.product_name"
          >
            {{ product.product_name }}
          </h2>
          <p
            class="text-[12px] text-[#428BCA] whitespace-nowrap truncate max-w-[180px]"
            :title="product.name"
          >
            {{ product.name }}
          </p>
          <p class="font-[600]">{{ Helper.formatCurrency(product.price_sale) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
