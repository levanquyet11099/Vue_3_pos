<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import IconDown from '@/components/icons/IconDown.vue'
import { Helper } from '@/helper'
import Posservice from '../service/Posservice'
import { TrademarkList, CategoryList } from '../stores/store.js'

interface Trademark {
  id: number
  code: string
  fullname: string
  email: string | null
  mobile: string | null
  address: string | null
  company: string
}
interface Category {
  id: number
  name: string
}
// Khai báo các biến trạng thái

const components = {
  IconDown,
}
const Trademark = TrademarkList().get
const Category = CategoryList().get
const selectedSupplier = ref<Trademark>({
  id: 0,
  code: '',
  fullname: 'Nhà cung cấp',
  email: '',
  mobile: '',
  address: '',
  company: '',
})
const selectedCategory = ref<Category>({
  id: 0,
  name: 'Danh mục',
})

const selectedType = ref<string>('all')
const emit = defineEmits(['addproduct'])
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
if (localStorage.getItem('products')) {
  console.log('get products from local storage')
  products.value = JSON.parse(localStorage.getItem('products') || '')
}
// Lấy danh sách sản phẩm từ API
Posservice.getProducts().then((res) => {
  console.log('get products from api')
  products.value = res.data.data
  localStorage.setItem('products', JSON.stringify(res.data.data))
})
const addproduct = (product: any) => {
  emit('addproduct', product)
}

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    return (
      (selectedType.value === 'all' ||
        (selectedType.value === 'product' && product.type === 0) ||
        (selectedType.value === 'combo' && product.type === 5)) &&
      (selectedCategory.value.id == 0 ||
        product.category.some((cat) => cat.category_name === selectedCategory.value.name)) &&
      (selectedSupplier.value.id === 0 || product.trademark === selectedSupplier.value.id)
    )
  })
})

const checktype = () => {
  console.log(selectedType.value, selectedCategory.value, selectedSupplier.value)
}
</script>

<script lang="ts">
export default {
  name: 'ProductList',
}
</script>
<template>
  <div class="absolute bg-[#F3F3F3] rounded-[8px] h-[439px] shadow-top" style="bottom: 122px">
    <header class="flex justify-between">
      <div class="flex space-x-4 py-4 px-4">
        <div class="relative flex border rounded bg-white">
          <select
            v-model="selectedType"
            class="pl-2 max-w-[110px] h-[39px] appearance-none pr-8 focus:outline-none"
          >
            <option value="all">Tất cả</option>
            <option value="product">Sản phẩm</option>
            <option value="combo">Combo</option>
          </select>
          <IconDown
            class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
          ></IconDown>
        </div>
        <div class="relative flex border rounded bg-white">
          <select
            v-model="selectedCategory"
            @change="checktype()"
            class="border rounded p-2 w-[200px] h-full appearance-none focus:outline-none"
          >
            <option :value="{ id: 0, name: 'Danh mục' }">Danh mục</option>
            <option v-for="category in Category" :key="category.id" :value="category">
              {{ category.name }}
            </option>
          </select>
          <IconDown
            class="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none"
          ></IconDown>
        </div>

        <div class="relative flex border rounded bg-white">
          <select
            v-model="selectedSupplier"
            @change="checktype()"
            class="border rounded p-2 w-[200px] h-full appearance-none focus:outline-none"
          >
            <option
              :value="{
                id: 0,
                code: '',
                fullname: 'Nhà cung cấp',
                email: '',
                mobile: '',
                address: '',
                company: '',
              }"
            >
              Nhà cung cấp
            </option>
            <option v-for="supplier in Trademark" :key="supplier.id" :value="supplier.id">
              {{ supplier.fullname }}
            </option>
          </select>
          <IconDown
            class="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none"
          ></IconDown>
        </div>
      </div>
    </header>
    <div
      class="grid grid-cols-4 gap-4 pr-4 pl-4 pt-0 overflow-y-auto no-scrollbar"
      style="height: calc(100% - 98px)"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        @click="addproduct(product)"
        class="border rounded-[8px] p-2 w-full max-w-[308.75px] h-full max-h-[104px] h-[104px] w-[308px] bg-white flex cursor-pointer hover:shadow-lg hover:border-2"
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

