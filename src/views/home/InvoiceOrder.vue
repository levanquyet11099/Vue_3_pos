<template>
  <div
    class="mx-auto bg-white rounded-lg p-4 w-full mr-[16px] ml-[16px] mt-[16px] pb-0 flex flex-col"
    style="height: calc(100vh -50px); max-height: calc(100vh - 84px)"
  >
    <div class="flex-grow">
      <!-- Search Customer -->
      <!-- <div class="flex items-center border px-2 py-1 mb-4 pt-0 rounded-full h-[40px]"> -->
      <div
        class="autocomplete-container flex items-center border px-2 py-1 mb-4 pt-0 rounded-full h-[40px] space-x-2"
      >
        <IconSearch class="text-gray-500"></IconSearch>
        <!-- v-input__control="'input__control '"
          v-field_input="'field__input'"
          v-field__field="'field__field'"
          v-input="'input'"
          v-list-item="'list-item'" -->
        <v-autocomplete
          v-model="selectedCustomer"
          :items="searchResults"
          item-text="fullname - mobile"
          hide-no-data
          variant="solo"
          class="h-[40px] w-full"
          flat
          min-width=""
          transition="v-menu__content:translateY(12px) !important"
          placeholder="Tìm theo tên hoặc sđt"
          @input="searchCustomer"
          :menu-props="{ closeOnContentClick: true, offset: [8, 33] }"
        >
          <!-- <template #item="{ item }">
            <div
              class="flex items-center mb-3 ml-2 max-w-[21vw] overflow-x-hidden cursor-pointer hover:bg-gray-200"
              @click="selectedCustomer = item.value"
            >
              <span class="text-nowrap truncate text-[14px]"
                >{{ item.value.fullname }} - {{ item.value.mobile }}</span
              >
            </div>
          </template> -->
        </v-autocomplete>
        <button class="text-blue-500 flex items-center ml-2" @click="openAddCustomer = true">
          <IconAdd class="mr-2"></IconAdd>
        </button>
      </div>
      <!-- User_data.point_shop.point_status == 1 && -->
      <div v-if="selectedCustomer && selectedCustomer.point > 0">
        <div class="flex items-center mb-4 bg-gray-100 p-2 rounded-[8px] w-1/2">
          <span class="font-500 ml-1">Điểm Thưởng:</span>
          <span class="ml-2 text-green">{{ selectedCustomer.point }} điểm </span>
        </div>
        <div class="flex items-center justify-between mb-4 w-full space-x-2">
          <div class="flex items-center">
            <input id="toggle" v-model="usePoint" type="checkbox" class="hidden" />
            <label for="toggle" class="flex items-center cursor-pointer">
              <div class="relative">
                <div
                  class="block w-[30px] h-[16px] rounded-full"
                  :class="[usePoint == true ? 'bg-blue-300' : 'bg-white border border-gray-300']"
                ></div>
                <div
                  class="dot absolute w-[13px] h-[12px] rounded-full transition transform duration-300 ease-in-out pt-[0px] pl-[1px] py-auto -mt-[14px] ml-[2px]"
                  :class="[
                    usePoint == true ? 'translate-x-[14px] bg-white' : 'translate-x-0 bg-gray-300',
                  ]"
                ></div>
              </div>
            </label>
            <div class="ml-2">Dùng điểm thưởng</div>
          </div>
          <div v-if="usePoint && usePoint == true" class="flex justify-end">
            <input
              v-model.number="pointOrder"
              v-bind:max="selectedCustomer.point"
              @change="pointOrder = Math.min(Math.max(pointOrder, 0), selectedCustomer.point)"
              type="number"
              class="rounded px-2 pr-0 w-1/2 ml-2 text-right border-b focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>
      </div>
      <!-- </div> -->

      <!-- Total Products -->
      <p class="font-semibold mb-2 flex border-t-2 pt-[16px]">
        Tổng tiền hàng
        <span class="text-gray-500 ml-1">
          ({{ localItemSelect?.products?.length || 0 }} sản phẩm)</span
        >
        <span class="ml-auto">{{ totalAmount }}</span>
      </p>

      <!-- Coupon -->
      <div class="mb-4 flex justify-between items-center pr-0">
        <div>
          <button class="text-blue-500 flex items-center py-1" @click="toggleCouponBox">
            Coupon
            <IconDown2 class="ml-2"></IconDown2>
          </button>
        </div>
        <div
          v-if="localItemSelect?.products?.length > 0"
          class="p-2 pr-0 rounded-lg focus:outline-none"
          :class="{ hidden: !showCouponBox }"
          id="couponBox"
        >
          <input
            v-model="coupon_id"
            type="text"
            class="border rounded px-2 py-1 focus:outline-none"
            placeholder="Nhập mã coupon"
          />
          <button class="bg-blue-500 text-white px-4 py-1 rounded ml-2" @click="checkCoupon">
            Áp dụng
          </button>
        </div>
      </div>

      <!-- Discount -->
      <div class="flex justify-between items-center mb-4">
        <span class="">Chiết khấu</span>
        <input
          v-model.number="discount"
          v-show="showInputDiscount == true"
          @change="showInputDiscount = false"
          type="number"
          class="rounded px-2 pr-0 py-1 w-1/4 ml-2 text-right border-b focus:outline-none"
          placeholder="0"
        />
        <span
          class="rounded px-2 pr-0 py-1 w-1/4 ml-2 text-right"
          v-show="showInputDiscount == false"
          @click="showInputDiscount = true"
        >
          {{ Helper.formatCurrency(discount) }}
        </span>
      </div>

      <div v-if="usePoint" class="flex justify-between items-center mb-4">
        <span class="">Đã dùng điểm thưởng</span>
        <span class="rounded px-2 pr-0 py-1 w-1/4 ml-2 text-right" placeholder="0">
          {{ Helper.formatCurrency(totalPointPay) }}</span
        >
      </div>

      <!-- Payment Details -->
      <div class="flex justify-between items-center mb-4 border-b-2 pb-4">
        <span class="font-semibold text-[16px]">Thu khách hàng</span>
        <strong class="font-semibold text-[16px]">{{ totalPay }}</strong>
      </div>
      <div class="flex justify-between items-center mb-4">
        <span class="font-semibold text-[16px]">Tiền khách đưa (F8)</span>
        <span
          class="border-b rounded px-2 pr-0 py-1 text-right w-1/3 focus:outline-none"
          @click="showInputPayment = true"
          v-show="showInputPayment == false"
        >
          {{ Helper.formatCurrency(PaymentCustomer) }}
        </span>
        <input
          v-model="PaymentCustomer"
          v-show="showInputPayment == true"
          @change="showInputPayment = false"
          type="number"
          class="border-b rounded px-2 pr-0 py-1 text-right w-1/3 focus:outline-none"
        />
      </div>

      <!-- Payment Methods -->
      <div class="mb-4">
        <span class="font-semibold">Phương thức thanh toán</span>
        <div class="flex items-center mt-2">
          <label class="flex items-center">
            <input
              v-model="PaymentMethod"
              type="radio"
              name="payment-method"
              value="6"
              class="mr-2"
            />
            Tiền mặt
          </label>
          <label class="flex items-center ml-4">
            <input
              v-model="PaymentMethod"
              type="radio"
              name="payment-method"
              value="2"
              class="mr-2"
            />
            Chuyển khoản
          </label>
        </div>
      </div>

      <!-- Change -->
      <div class="flex justify-between items-center mb-4">
        <span class="font-semibold">Tiền thừa trả khách</span>
        <strong v-if="PaymentCustomer - totalPayNumber >= 0" class="text-600 text-lg">{{
          Helper.formatCurrency(PaymentCustomer - totalPayNumber)
        }}</strong>
      </div>
    </div>

    <footer class="">
      <!-- Auto-print -->
      <div class="mb-4 justify-end">
        <label class="flex items-center">
          <input v-model="autoPrint" type="checkbox" class="mr-2" />
          In hóa đơn tự động
        </label>
      </div>

      <!-- Notes -->
      <textarea
        placeholder="Ghi chú"
        class="border rounded w-full px-2 py-1 mb-4"
        rows="3"
      ></textarea>

      <!-- Payment Button -->
      <button
        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-4"
        @click="create_Order()"
      >
        Thanh toán (F9)
      </button>
    </footer>
  </div>
  <AddCustomer v-if="openAddCustomer" @close="openAddCustomer = false" />
</template>

<script lang="ts" setup>
import IconAdd from '@/components/icons/IconAdd.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconDown2 from '@/components/icons/IconDown2.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { UserInfo, BrandSelect } from '@/stores/store'
import { Helper } from '../../helper.js'
import Posservice from '@/service/Posservice.js'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import AddCustomer from '@/components/customer/AddCustomer.vue'
import { useToast } from 'vue-toastification'
const toast = useToast()
// const keywords = ref('')
const emit = defineEmits(['createOrderSusccess'])
let searchResults = ref([])
let loading = ref(false)
let PaymentMethod = ref(6)
let autoPrint = ref(true)
let coupon_id = ref('')
let PaymentCustomer = ref(0)
let showInputDiscount = ref(false)
let showInputPayment = ref(false)
let openAddCustomer = ref(false)
let usePoint = ref(false)
let pointOrder = ref(0)
let edit_discount = ref(false)
let showCouponBox = ref(false)

const toggleCouponBox = () => {
  showCouponBox.value = !showCouponBox.value
}
interface Brand {
  id: number
  shop_id: number
  name: string
  store_id: number
}
interface Customer {
  id: number
  fullname: string
  mobile: string
  email: string
  address: string
  point: number
}
interface typePrice {
  text: string
  number: number
}
interface Order {
  id: string
  customer: string
  value: string
  time: string
  status: number
  create_by_order: number
  discount: number
  email: string
  full_name: string
  note: string | null
  phone: string
  products: Array<any>
  ref_sub: string
  sale_id: number
  store_id: number
  user_id: number
  utm_source: string
  point: number
  rate_point: number
  payment_method: number
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
  attribute: string
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
const selectedCustomer = ref<Customer>(null)
const BrandSelected = ref<Brand>(null)
const discount = ref(0)
const storeUser = UserInfo()
// Định nghĩa props
const props = defineProps({
  itemSelect: {
    type: Object,
    required: false,
  },
})
const localItemSelect = ref(props.itemSelect)
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
let User_data = ref<User>({
  status: 0,
  shop_id: '',
  user_id: 0,
  avatar: '',
  brand_selected: null,
  point_shop: {
    point_status: 0,
    point_rate: 0,
  },
  data: '',
})

// let User = UserInfo().get
const isOnline = ref(navigator.onLine)
const checkCoupon = () => {
  if (coupon_id.value.trim() === '') {
    toast.error('Vui lòng nhập mã coupon', { timeout: 2000 })
    return
  }
  // Gọi API kiểm tra mã coupon
  Posservice.checkCoupon(coupon_id.value).then((res) => {
    if (res.data.data) {
      toast.success('Áp dụng mã coupon thành công', { timeout: 2000 })
      discount.value = res.data.data.discount
    } else {
      toast.error('Mã coupon không hợp lệ', { timeout: 2000 })
    }
  })
  toggleCouponBox()
}
const searchCustomer = (input: { data: string }) => {
  if (input.data && input.data.trim() === '') {
    searchResults.value = []
    return
  }
  loading.value = true
  // Gọi API tìm kiếm khách hàng
  Posservice.customer(input.data).then((res) => {
    // Cập nhật danh sách khách hàng
    // localItemSelect.value = res.data.data
    searchResults.value = res.data.data.map((customer: Customer) => ({
      ...customer,
      title: `${customer.fullname} - ${customer.mobile}`,
      value: customer,
    }))
    // searchResults.value = res.data.data
    // console.log('searchCustomer', searchResults.value)
    loading.value = false
  })
}
const create_Order = () => {
  User_data.value = storeUser.get as User
  BrandSelected.value = BrandSelect().get as Brand
  if (!selectedCustomer.value) {
    toast.error('Vui lòng chọn khách hàng', { timeout: 2000 })
    return
  }
  if (!localItemSelect.value?.products?.length) {
    toast.error('Vui lòng chọn sản phẩm', { timeout: 2000 })
    return
  }
  let products: {
    price_sale: number
    product_id: number
    product_name: string
    quantity: number
    discount: number
    thumb_url?: string
    product_sku?: string
    attribute: string
  }[] = []
  // console.log('localItemSelect', localItemSelect.value)
  localItemSelect.value.products.forEach(
    (product: {
      price_sale: number
      id: number
      product_name: string
      quantity: number
      thumb_url: string
      sku: string
      attribute: string
    }) => {
      products.push({
        price_sale: product.price_sale,
        product_id: product.id,
        product_name: product.product_name,
        quantity: product.quantity,
        discount: 0,
        thumb_url: product.thumb_url,
        product_sku: product.sku,
        attribute: product.attribute,
      })
    },
  )
  let time = new Date().toISOString().replace('T', ' ').replace('Z', '').substring(0, 16)
  let formattedTime = new Date().toLocaleDateString('en-GB').replace(/\//g, '-')
  time = `${formattedTime} ${time.split(' ')[1]}`
  let data = {
    id: Helper.getMaxId(User_data.value.shop_id),
    time: time,
    store_id: BrandSelected.value.store_id,
    full_name: selectedCustomer.value.fullname,
    phone: selectedCustomer.value.mobile,
    email: selectedCustomer.value.email,
    note: null,
    utm_source: 'POS',
    ref_sub: 'POS',
    payment_method: PaymentMethod.value,
    pay_type: PaymentMethod.value,
    discount: discount.value,
    coupon_id: '',
    products: products,
    create_by_order: 1,
    status: 0,
    point: 0,
    rate_point: 0,
    pay_status: 1,
    pay_money: totalPayNumber.value,
    sale_id: User_data.value.user_id,
    user_id: User_data.value.user_id,
  }
  if (usePoint.value) {
    data.point = pointOrder.value
    data.rate_point = User_data.value.point_shop.point_rate
  }
  let shop_id = User_data.value.shop_id
  if (isOnline.value) {
    console.log('online')
    delete data.id
    delete data.time
    // delete data.status
    // Helper.pushOrderLocal(data, shop_id)
    Posservice.createOrder(data, selectedCustomer.value.id).then(async (res) => {
      if (autoPrint.value) {
        const printUrl = `https://salekit.com/order/printOrderList?order_id=${res.data.order_id}&store_id=&type=invoice&pos=1`
        const printWindow = window.open(printUrl, '_blank', 'width=1024,height=800')
        printWindow.onload = () => {
          printWindow.print()
        }
      }
    })
    PaymentCustomer.value = 0
    selectedCustomer.value = null
    pointOrder.value = 0
    emit('createOrderSusccess', true)
    toast.success('Đơn hàng đã được tạo thành công!', { timeout: 2000 })
  } else {
    console.log('offline')
    Helper.pushOrderLocal(data, shop_id)
    selectedCustomer.value = null
    PaymentCustomer.value = 0
    emit('createOrderSusccess', true)
    toast.success('Đơn hàng đã được tạo thành công!', { timeout: 2000 })
  }
}
const updateStatus = () => {
  isOnline.value = navigator.onLine
}
onMounted(() => {
  window.addEventListener('online', updateStatus)
  window.addEventListener('offline', updateStatus)
  updateStatus()
})
// Nếu bạn muốn sử dụng ref để tạo ra một biến riêng

// Tính toán tổng tiền hàng
const totalAmount = computed(() => {
  return Helper.calculateTotalAmount(localItemSelect.value?.products || [])
})
const totalPay = computed(() => {
  const data = Helper.calculateTotalPay(
    localItemSelect.value?.products,
    discount.value,
    totalPointPay.value as number,
  )
  return data
})
const totalPointPay = computed<number>(() => {
  return Helper.calculatePoint(pointOrder.value, User_data.value.point_shop.point_rate)
})
const totalPayNumber = computed<number>(() => {
  const result = Helper.calculateTotalPay(
    localItemSelect.value?.products,
    discount.value,
    totalPointPay.value,
    1,
  )
  return typeof result === 'number' ? result : 0
})

// Theo dõi sự thay đổi của props để cập nhật localItemSelect
watch(
  () => props.itemSelect,
  (newItem) => {
    localItemSelect.value = newItem
  },
)
</script>
<script lang="ts">
export default {
  name: 'InvoiceOrder',
}
</script>
<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
/* input:checked + label .dot {
  transform: translateX(100%);
} */
</style>
