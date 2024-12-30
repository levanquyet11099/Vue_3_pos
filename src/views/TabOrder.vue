<script lang="ts" setup>
import IconAddTab from '@/components/icons/IconAddTab.vue'
import IconDeleteTab from '@/components/icons/IconDeleteTab.vue'
import More from '@/components/icons/More.vue'
import TheWelcome from '@/components/TheWelcome.vue'
import InvoiceOrder from './InvoiceOrder.vue'
import { Helper } from '../helper.js'
import { ref, reactive, onMounted, watchEffect, nextTick } from 'vue'

interface Product {
  id: number
  image: string
  product_name: string
  price: number
  quantity: number
  total: number
}
interface Item {
  title: string
  key: number
  products: Product[]
}
// Import các thành phần cần dùng
const components = {
  More,
  InvoiceOrder,
  IconAddTab,
  IconDeleteTab,
  TheWelcome,
}

// Reactive dữ liệu của component
const tab = ref(0)
const items = reactive<Item[]>([
  {
    title: 'Hóa đơn',
    key: 0,
    products: [
      {
        id: 12,
        image: 'https://shopdunk.com/images/thumbs/0011842_midnight.webp',
        product_name: 'name_product',
        price: 1000,
        quantity: 1,
        total: 1000,
      },
      {
        id: 13,
        image: 'https://shopdunk.com/images/thumbs/0011842_midnight.webp',
        product_name: 'name_product1',
        price: 1001,
        quantity: 1,
        total: 1001,
      },
    ],
  },
  {
    title: 'Hóa đơn 1',
    key: 1,
    products: [
      {
        id: 14,
        image: 'https://shopdunk.com/images/thumbs/0011842_midnight.webp',
        product_name: 'name_product11',
        price: 1000,
        quantity: 1,
        total: 1000,
      },
    ],
  },
  {
    title: 'Hóa đơn 2',
    key: 2,
    products: [
      {
        id: 16,
        image: 'https://shopdunk.com/images/thumbs/0011842_midnight.webp',
        product_name: 'name_product2',
        price: 1000,
        quantity: 1,
        total: 1000,
      },
    ],
  },
  {
    title: 'Hóa đơn 3',
    key: 3,
    products: [
      {
        id: 15,
        image: 'https://shopdunk.com/images/thumbs/0011842_midnight.webp',
        product_name: 'name_product3',
        price: 1000,
        quantity: 1,
        total: 1000,
      },
    ],
  },
  {
    title: 'Hóa đơn 4',
    key: 4,
    products: [
      {
        id: 17,
        image: 'https://shopdunk.com/images/thumbs/0011842_midnight.webp',
        product_name: 'name_product4',
        price: 1000,
        quantity: 1,
        total: 1000,
      },
    ],
  },
])
const itemSelect = ref<Item | null>(null)

// Khi component được mount, chọn tab đầu tiên
onMounted(() => {
  itemSelect.value = items[tab.value] || null
})
// Các phương thức
const changeTab = (newTab: number) => {
  tab.value = newTab
  itemSelect.value = items[newTab] || null
}
function updateQuantity(product: Product, change: number) {
  const selectedProduct = itemSelect.value?.products.find((p) => p.id === product.id)
  const index_ = itemSelect.value?.products.findIndex((p) => p.id === product.id)
  if (selectedProduct) {
    selectedProduct.quantity += change // Cộng/trừ số lượng
    if (selectedProduct.quantity < 1) selectedProduct.quantity = 1 // Không cho phép số lượng nhỏ hơn 1
    selectedProduct.total = selectedProduct.quantity * selectedProduct.price
    // if (itemSelect.value) {
    //   itemSelect.value.products[index_] = selectedProduct
    // }
  }
}

const addTab = () => {
  const maxKey = items.length ? Math.max(...items.map((item) => item.key)) : 0
  items.push({ title: `Hóa đơn ${maxKey + 1}`, key: maxKey + 1, products: [] })
  tab.value = items.length - 1
  itemSelect.value = items[tab.value]
}

const deleteTab = async (index: number) => {
  if (index <= 0) return // Không cho phép xóa tab đầu tiên

  // Nếu xóa phần tử cuối cùng và đang được chọnchọn, chuyển tab về phần tử trước đó
  if (index === items.length - 1 && tab.value === items.length - 1) {
    tab.value = items.length - 2 // Chuyển về phần tử kế cuối
  } else if (tab.value >= index) {
    // Nếu xóa phần tử trước tab hiện tại, điều chỉnh tab
    tab.value = tab.value - 1
  } else if (tab.value < index) {
    // Nếu xóa phần tử sau tab hiện tại, không cần điều chỉnh tab
  }
  items.splice(index, 1)
  itemSelect.value = items[tab.value]
}

const deleteProduct = (index: number) => {
  itemSelect.value?.products.splice(index, 1)
}
</script>
<template>
  <div class="h-[50px] bg-[#0090da] w-full">
    <div class="flex gap-4 ml-[20vw] pt-[15px]">
      <div
        v-for="(n, index) in items"
        :key="n.key"
        :text="`Item ${n.title}`"
        :value="n.title"
        class="bg-white rounded-t-[10px] w-[120px] cursor-pointer items-center justify-center h-[35px] text-center flex"
        :class="{ 'opacity-50': tab !== index }"
      >
        <div class="flex no-wrap text-center pt-[5px]">
          <div @click="changeTab(index)">{{ n.title }}</div>

          <button
            v-if="index != 0"
            @click="deleteTab(index)"
            class="hover:bg-gray-200 hover:rounded-lg ml-2"
          >
            <IconDeleteTab></IconDeleteTab>
          </button>
        </div>
      </div>
      <IconAddTab @click="addTab()" class="hover:cursor-pointer mt-[5px]" />
    </div>
  </div>
  <div class="flex" style="height: calc(100vh - 130px); max-height: calc(100vh-130px)">
    <TheWelcome></TheWelcome>
    <div class="pl-[20px] ml-[75px] max-w-[70vw] bg-white">
      <div class="">
        <div class="w-[70vw] flex flex-nowrap gap-[20px] p-[12px] border-b-[2px]">
          <p class="text-[14px] text-left font-bold text-[#7a7a7a] w-2/5 ml-[70px]">
            Sản phẩm
            {{ itemSelect?.products?.length ? '(' + itemSelect.products.length + ') ' : '' }}
          </p>
          <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5">Giá bán</p>
          <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-1/5">Số lượng</p>
          <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5">Thành tiền</p>
          <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-1/5">Xóa</p>
        </div>
      </div>
      <div v-if="itemSelect && itemSelect.products" class="">
        <div v-for="(p, index) in itemSelect.products" :key="p.id" :value="p.id">
          <div class="w-[70vw] flex flex-nowrap gap-[20px] p-[12px] border-b-[2px]">
            <img :src="p.image" class="w-[50px] h-[50px]" />
            <p class="text-[14px] text-left font-bold text-[#7a7a7a] w-2/5 py-3">
              {{ p.product_name }}
            </p>
            <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5 py-3">
              {{ Helper.formatCurrency(p.price) }}
            </p>
            <div
              class="flex items-center w-1/5 border-[1px] border-[#7a7a7a] rounded-[4px] h-[40px] py-3"
            >
              <!-- Nút trừ -->
              <button
                class="px-2 py-1 hover:bg-gray-300 text-[14px] font-bold w-1/3 h-[38px] rounded-[4px]"
                @click="updateQuantity(p, -1)"
              >
                -
              </button>

              <!-- Hiển thị số lượng -->
              <p
                id="quantityDisplay"
                class="py-2 text-[14px] text-center font-bold text-[#7a7a7a] w-1/3 border-[1px] border-[#7a7a7a] h-[40px]"
              >
                {{ p.quantity }}
              </p>

              <!-- Nút cộng -->
              <button
                class="px-2 py-1 hover:bg-gray-300 text-[14px] font-bold w-1/3 h-[38px] rounded-[4px]"
                @click="updateQuantity(p, 1)"
              >
                +
              </button>
            </div>

            <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5 py-3">
              {{ Helper.formatCurrency(p.total) }}
            </p>
            <p
              class="text-[14px] text-center font-bold text-[#7a7a7a] w-1/5 cursor-pointer py-3"
              @click="deleteProduct(index)"
            >
              Xóa
            </p>
          </div>
        </div>
      </div>
    </div>
    <InvoiceOrder :itemSelect="itemSelect"></InvoiceOrder>
  </div>
  <div class="ml-[75px] max-w-[70vw] h-full bg-white bg-bule-200">
    <div class="ml-4 px-4 border-t p-2 pl-2"></div>
    <button class="ml-4 flex items-center border border-gray-300 rounded-md p-2 hover:bg-gray-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 text-gray-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
      </svg>
      <span class="ml-2 text-gray-700">Danh sách sản phẩm</span>
      <More class="ml-2"></More>
    </button>
  </div>
</template>
