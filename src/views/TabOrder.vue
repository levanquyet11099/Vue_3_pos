<script lang="ts" setup>
import IconAddTab from '@/components/icons/IconAddTab.vue'
import InforUser from './InforUser.vue'
import IconZoomOut from '@/components/icons/IconZoomOut.vue'
import IconForsquater from '@/components/icons/IconForSquater.vue'
import IconDelete1 from '@/components/icons/IconDelete1.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
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
  price_sale: number
  quantity: number
  total: number
  sku: string
  atributte: string
}
interface Item {
  title: string
  key: number
  products: Product[]
}

// Import các thành phần cần dùng
const components = {
  More,
  IconZoomOut,
  IconSearch,
  InforUser,
  IconDelete1,
  IconAdd,
  InvoiceOrder,
  IconAddTab,
  IconDeleteTab,
  TheWelcome,
}

// Reactive dữ liệu của component
const showProduct = ref(false)
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
        price: 0,
        price_sale: 70000,
        quantity: 1,
        total: 1000,
        sku: 'sku1',
        atributte: 'atributte1',
      },
      {
        id: 13,
        image: 'https://shopdunk.com/images/thumbs/0011842_midnight.webp',
        product_name: 'name_product1',
        price: 1001,
        price_sale: 70000,
        quantity: 1,
        total: 1001,
        sku: 'sku2',
        atributte: 'atributte2',
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
        price_sale: 70000,
        quantity: 1,
        total: 1000,
        sku: 'sku3',
        atributte: 'atributte3',
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
        price_sale: 70000,
        quantity: 1,
        total: 1000,
        sku: 'sku4',
        atributte: 'atributte4',
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
        price_sale: 70000,
        quantity: 1,
        total: 1000,
        sku: 'sku5',
        atributte: 'atributte5',
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
        price_sale: 70000,
        sku: 'sku6',
        atributte: 'atributte6',
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
const deleteAll = (item: Item) => {
  item.products = []
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
  <div class="h-[52px] w-full" style="background: linear-gradient(90deg, #1f83c9 0%, #a940bb 100%)">
    <div class="flex">
      <img
        src="https://salekit.com/assets/pos1/img/icon-salekit-06.2ad457de.png"
        class="w-[39px] h-[39px] ml-[20px] mt-[6px]"
      />
      <div
        class="flex items-center bg-gray-200 rounded-full p-2 ml-[15px] max-w-[22vw] w-full h-[35px] mt-[12px]"
      >
        <IconSearch></IconSearch>
        <input
          type="text"
          class="flex-grow bg-transparent border-none outline-none px-2 py-2 rounded-l-full placeholder-gray-600"
          placeholder="Nhập mã, tên sản phẩm (F3)"
        />
        <button class="text-gray-700 text-[24px] font-bold rounded-full px-4 py-2 ml-2">
          <a href="https://salekit.com/product/create/" target="_blank"> <IconAdd></IconAdd></a>
        </button>
      </div>
      <div class="flex gap-4 ml-[100px] pt-[15px]">
        <div
          v-for="(n, index) in items"
          :key="n.key"
          :text="`Item ${n.title}`"
          :value="n.title"
          class="bg-white rounded-t-[10px] w-[120px] cursor-pointer items-center justify-center h-[37px] text-center flex"
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
      <InforUser></InforUser>
    </div>
  </div>
  <div class="flex bg-gray-200">
    <TheWelcome></TheWelcome>
    <div
      class="pl-[20px] ml-[75px] max-w-[70vw] mt-[16px] rounded-[8px] bg-white"
      style="height: calc(100vh - 84px); max-height: calc(100vh - 84px)"
    >
      <div class="bg-white pt-[4px] pr-[16px] rounded-[8px] h-full">
        <div
          class="flex flex-nowrap gap-[20px] p-[12px] border-b-[2px] mt-[12px] bg-gray-200 rounded-[8px]"
        >
          <p class="text-[14px] text-left font-bold text-[#7a7a7a] w-2/5 ml-[70px]">
            Sản phẩm
            {{ itemSelect?.products?.length ? '(' + itemSelect.products.length + ') ' : '' }}
          </p>
          <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5">Giá bán</p>
          <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-1/5">Số lượng</p>
          <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5">Thành tiền</p>
          <p
            class="text-[14px] text-center font-bold text-red-500 w-1/5 cursor-pointer hover:bg-white rounded-[12px]"
            @click="deleteAll(itemSelect)"
          >
            Xóa tất cả
          </p>
        </div>
        <div
          v-if="itemSelect && itemSelect.products"
          class=""
          style="height: 86%; max-height: aclc(85% -40px)"
        >
          <div v-for="(p, index) in itemSelect.products" :key="p.id" :value="p.id">
            <div
              class="w-[70vw] flex flex-nowrap gap-[20px] p-[12px] border-b-[2px] pr-[16px]"
              style="width: calc(70vw - 32px)"
            >
              <img :src="p.image" class="w-[50px] h-[50px]" />
              <p class="text-[14px] text-left font-bold text-[#7a7a7a] w-2/5 py-3">
                {{ p.product_name }}
              </p>
              <div class="w-2/5 text-[14px] text-center">
                <p class="text-[#428BCA]" :class="{ 'py-3': !p.price }">
                  {{ Helper.formatCurrency(p.price_sale) }}
                </p>
                <p v-if="p.price" class="text-gray-500 line-through">
                  {{ Helper.formatCurrency(p.price) }}
                </p>
              </div>
              <div
                class="flex items-center w-1/5 border-[1px] border-[#7a7a7a] rounded-[4px] h-[40px] py-3"
              >
                <!-- Nút trừ -->
                <button
                  class="px-2 py-1 hover:bg-gray-300 text-[14px] font-bold w-1/3 h-[38px] rounded-l-[4px]"
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
                  class="px-2 py-1 hover:bg-gray-300 text-[14px] font-bold w-1/3 h-[38px] rounded-r-[4px]"
                  @click="updateQuantity(p, 1)"
                >
                  +
                </button>
              </div>

              <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5 py-3">
                {{ Helper.formatCurrency(p.total) }}
              </p>
              <div
                class="flex items-center justify-center w-1/5 cursor-pointer py-3 h-[45px] rounded-[12px]"
              >
                <div
                  @click="deleteProduct(index)"
                  class="w-1/3 h-[45px] flex items-center justify-center hover:bg-gray-200 rounded-[12px]"
                >
                  <IconDelete1 class="flex items-center justify-center"></IconDelete1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-[70vw] bg-white bg-bule-200 rounded-b-[8px] justify-end">
          <div class="px-4 border-t-[2px] p-2 pl-2">
            <button
              class="flex items-center border border-gray-300 rounded-md p-2 hover:bg-gray-100"
            >
              <IconForsquater></IconForsquater>
              <span class="ml-2 text-gray-700">Danh sách sản phẩm</span>
              <More v-if="showProduct" @click="showProduct = !showProduct" class="ml-2"></More>
              <IconZoomOut v-else @click="showProduct = !showProduct" class="ml-2"></IconZoomOut>
            </button>
          </div>
        </div>
      </div>
    </div>
    <InvoiceOrder
      :itemSelect="itemSelect"
      style="height: calc(100vh -50px); max-height: calc(100vh)"
    ></InvoiceOrder>
  </div>
</template>
