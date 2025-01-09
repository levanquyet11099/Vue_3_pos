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
import ProductList from './ProductList.vue'
import TheWelcome from '@/components/TheWelcome.vue'
import InvoiceOrder from './InvoiceOrder.vue'
import { Helper } from '../../helper.js'
import { ref, reactive, onMounted, watch, watchEffect, nextTick } from 'vue'
import { TrademarkList, CategoryList, UserInfo } from '../../stores/store.js'
import Posservice from '../../service/Posservice'
import Select2 from '@/components/select2/Select2.vue'
// import SelectMunti from '@/components/select2/SelectMunti.vue'

interface User {
  status: number
  shop_id: string
  user_id: number
  avatar: string
  brand_selected: object | null
  point_shop: {
    point_status: number
    point_rate: number
  }
  data: string
}
interface Product {
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
  quantity?: number
  total?: number
}
interface Item {
  title: string
  key: number
  products: Product[]
}
// Removed unnecessary ProductList interface
// const products = ref<Product | null>(null)

const products = ref<Product[]>([])
const products1 = ref<Product[]>([])
const selectedProduct = ref<Product | null>(null)
const searchResults = ref<Product[]>([])
const Userinfo = ref<User>(null)
if (localStorage.getItem('products') && localStorage.getItem('products') !== 'undefined') {
  console.log('get products from local storage')
  products.value = JSON.parse(localStorage.getItem('products') || '')
}
// Lấy danh sách sản phẩm từ API
Posservice.getProducts().then((res) => {
  console.log('get products from api')
  products.value = res.data.data
  localStorage.setItem('products', JSON.stringify(res.data.data))
})

let loaduser = ref(false)
let user = defineProps(['user'])
let quantityOffline = ref(0)
watch(user, (val: any) => {
  loaduser.value = true
  Userinfo.value = UserInfo().get as User
  const data_local_order = localStorage.getItem('orderListOffline_' + Userinfo?.value?.shop_id)
  if (data_local_order) {
    quantityOffline.value = JSON.parse(data_local_order).length
  }
})

// Import các thành phần cần dùng
const components = {
  More,
  IconZoomOut,
  IconSearch,
  InforUser,
  IconDelete1,
  IconAdd,
  ProductList,
  InvoiceOrder,
  IconAddTab,
  IconDeleteTab,
  TheWelcome,
  Select2,
  // SelectMunti,
}
Posservice.trademark().then((res) => {
  const trademarks = TrademarkList()
  trademarks.set(res.data.data)
})
Posservice.category().then((res) => {
  const categories = CategoryList()
  categories.set(res.data.data)
})
// Reactive dữ liệu của component
const showProduct = ref(false)
const tab = ref(0)
const items = reactive<Item[]>([
  {
    title: 'Đơn 1',
    key: 1,
    products: [],
  },
  {
    title: 'Đơn 2',
    key: 2,
    products: [],
  },
])
const itemSelect = ref<Item | null>(null)
const selectProduct = ref<Product | null>(null)
watch(selectedProduct, (val: Product | null) => {
  if (val) {
    addproduct(val)
  }
  selectedProduct.value = null
})
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
const addproduct = (product: Product) => {
  const selectedProduct = itemSelect.value?.products.find((p) => p.id === product.id)
  if (selectedProduct) {
    selectedProduct.quantity += 1
    selectedProduct.total = selectedProduct.quantity * selectedProduct.price
  } else {
    itemSelect.value?.products.push({ ...product, quantity: 1, total: product.price })
  }
}

const searchProducts = (event: InputEvent) => {
  const query = (event.target as HTMLInputElement).value
  if (typeof query !== 'string') return
  searchResults.value = products.value.filter(
    (product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase()) ||
      product.sku.toLowerCase().includes(query.toLowerCase()),
  )
  searchResults.value = searchResults.value.map((product) => ({
    ...product,
    title: `${product.product_name} - ${product.sku}`,
    value: product,
  }))
}

const addTab = () => {
  const maxKey = items.length ? Math.max(...items.map((item) => item.key)) : 0
  items.push({ title: `Đơn ${maxKey + 1}`, key: maxKey + 1, products: [] })
  tab.value = items.length - 1
  itemSelect.value = items[tab.value]
}
const deleteAll = (item: Item) => {
  item.products = []
}
const createOrderSusccess = (data: boolean) => {
  if (data) {
    const tabdelete = tab.value
    if (items.length === 1) {
      addTab()
      deleteTab(tabdelete)
    } else {
      deleteTab(tab.value)
    }

    quantityOffline.value += 1
  }
}
const deleteTab = (index: number) => {
  if (items.length <= 1) return // Không cho phép xóa tab duy nhất còn lại

  if (index === 0 && tab.value === 0) {
    tab.value = 1
  }
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
  <div
    class="h-[52px] w-full flex"
    style="background: linear-gradient(90deg, #1f83c9 0%, #a940bb 100%)"
  >
    <div>
      <RouterLink to="/">
        <img
          src="https://salekit.com/assets/pos1/img/icon-salekit-06.2ad457de.png"
          class="w-[39px] h-[39px] ml-[20px] mt-[6px]"
        />
      </RouterLink>
    </div>
    <div v-if="$route.path === '/'" class="flex max-w-[25vw] w-full">
      <div
        class="autocomplete-container bg-white min-w-[22vw] ml-4 mt-2 flex items-center border px-2 py-1 mb-4 pt-0 rounded-full h-[40px] space-x-2"
      >
        <IconSearch class="text-gray-500 mt-1 ml-2"></IconSearch>
        <v-autocomplete
          v-model="selectedProduct"
          :items="searchResults"
          item-text="product_name"
          append-icon="thumb_url"
          hide-no-data
          item-color="#428BCA"
          variant="solo"
          class="h-[40px] w-full max-w-[18vw] mt-2 ml-0"
          flat
          transition="v-menu__content:translateY(12px) !important"
          min-width="15vw"
          placeholder="Tìm theo tên hoặc sđt"
          @input="searchProducts"
          :menu-props="{ closeOnContentClick: true, offset: [8, 33] }"
        >
          <template #item="{ item }">
            <div
              class="flex items-center mb-3 mt-3 max-w-[21vw] overflow-x-hidden cursor-pointer hover:bg-gray-200"
              @click="addproduct(item.value)"
            >
              <img
                :src="
                  item.value.thumb_url || 'https://static.salekit.com//public/images/no-image.png'
                "
                class="w-[45px] h-[45px] mr-2 ml-2"
              />
              <span class="text-nowrap truncate text-[14px]"
                >{{ item.value.product_name }} - {{ item.value.sku }}</span
              >
            </div>
          </template>
        </v-autocomplete>
        <button class="text-blue-500 flex items-center ml-2">
          <IconAdd class="mr-2"></IconAdd>
        </button>
      </div>
    </div>
    <div
      v-if="$route.path === '/'"
      class="flex gap-4 ml-[100px] pt-[15px] max-w-[30vw] flex-no-wrap overflow-x-auto overflow-y-hidden"
    >
      <div
        v-for="(n, index) in items"
        :key="n.key"
        :text="`Item ${n.title}`"
        :value="n.title"
        class="bg-white rounded-t-[10px] w-[87px] min-w-[87px] cursor-pointer items-center justify-center h-[39px] text-center flex"
        :class="{ 'opacity-50': tab !== index }"
      >
        <div class="flex no-wrap text-center pt-[5px]">
          <div @click="changeTab(index)">{{ n.title }}</div>

          <button
            v-if="items.length > 1"
            @click="deleteTab(index)"
            class="hover:bg-gray-200 hover:rounded-lg ml-2"
          >
            <IconDeleteTab></IconDeleteTab>
          </button>
        </div>
      </div>
    </div>
    <IconAddTab
      v-if="$route.path === '/'"
      @click="addTab()"
      class="hover:cursor-pointer mt-5 ml-4"
    />
    <InforUser :user="loaduser" :quantityOffline="quantityOffline"></InforUser>
  </div>

  <div class="flex bg-gray-200">
    <TheWelcome></TheWelcome>
    <div
      v-if="$route.path === '/'"
      class="pl-[20px] mr-[16px] ml-[75px] max-w-[70vw] mt-[16px] rounded-[8px] bg-white min-w-[70vw] h-[calc(100vh - 84px)]"
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
          class="overflow-y-auto overflow-x-hidden mb-4 no-scrollbar"
          style="height: calc(84% - 16px); max-height: calc(83% -50px)"
        >
          <div v-for="(p, index) in itemSelect.products" :key="p.id" :value="p.id">
            <div
              class="w-[70vw] flex flex-nowrap gap-[20px] p-[12px] border-b-[2px] pr-[16px]"
              style="width: calc(70vw - 32px)"
            >
              <img
                :src="p.thumb_url || 'https://static.salekit.com//public/images/no-image.png'"
                class="w-[56px] h-[56px] min-w-[56px] min-h-[56px]"
              />
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
        <ProductList
          style="max-width: calc(70vw - 40px); width: calc(70vw - 40px); position: absolute"
          v-if="showProduct"
          @addproduct="addproduct"
        ></ProductList>
        <!-- button open popup product list -->
        <div class="max-w-[70vw] rounded-b-[8px] justify-end relative">
          <div class="border-t-[2px] pt-[16px]">
            <button
              @click="showProduct = !showProduct"
              class="flex items-center border border-gray-300 rounded-md p-2 hover:bg-gray-100"
            >
              <IconForsquater></IconForsquater>
              <span class="ml-2 text-gray-700">Danh sách sản phẩm</span>
              <More v-if="showProduct" class="ml-2"></More>
              <IconZoomOut v-else class="ml-2"></IconZoomOut>
            </button>
          </div>
        </div>
      </div>
    </div>
    <InvoiceOrder
      v-if="$route.path === '/'"
      :itemSelect="itemSelect"
      @createOrderSusccess="createOrderSusccess"
    ></InvoiceOrder>
  </div>
</template>
<style scoped></style>
