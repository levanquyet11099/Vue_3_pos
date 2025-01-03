
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
          item-value="id"
          hide-no-data
          variant="solo"
          theme="light"
          class="h-[40px] w-full"
          flat
          placeholder="Tìm theo tên hoặc sđt"
          @input="searchCustomer"
        ></v-autocomplete>
        <button class="text-blue-500 flex items-center ml-2" @click="openAddCustomer = true">
          <IconAdd class="mr-2"></IconAdd>
        </button>
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
      <div class="mb-4">
        <button class="text-blue-500 flex items-center">
          Coupon
          <IconDown2 class="ml-2"></IconDown2>
        </button>
        <div class="mt-2 border p-2 rounded-lg hidden" id="couponBox">
          <input type="text" class="border rounded px-2 py-1 w-3/4" placeholder="Nhập mã coupon" />
          <button class="bg-blue-500 text-white px-4 py-1 rounded ml-2">Áp dụng</button>
        </div>
      </div>

      <!-- Discount -->
      <div class="flex justify-between items-center mb-4">
        <span class="">Chiết khấu</span>
        <input
          v-model="discount"
          type="text"
          class="rounded px-2 py-1 w-1/4 ml-2 text-right border-b-2 focus:outline-none"
          placeholder="0"
        />
      </div>

      <!-- Payment Details -->
      <div class="flex justify-between items-center mb-4 border-b-2 pb-4">
        <span class="font-semibold text-[16px]">Thu khách hàng</span>
        <strong class="font-semibold text-[16px]">{{ totalPay }}</strong>
      </div>
      <div class="flex justify-between items-center mb-4">
        <span class="font-semibold text-[16px]">Tiền khách đưa (F8)</span>
        <input
          type="text"
          class="border-b-2 rounded px-2 py-1 text-right w-1/3 focus:outline-none"
        />
      </div>

      <!-- Payment Methods -->
      <div class="mb-4">
        <span class="font-semibold">Phương thức thanh toán</span>
        <div class="flex items-center mt-2">
          <label class="flex items-center">
            <input type="radio" name="payment-method" value="cash" class="mr-2" />
            Tiền mặt
          </label>
          <label class="flex items-center ml-4">
            <input type="radio" name="payment-method" value="bank" class="mr-2" />
            Chuyển khoản
          </label>
        </div>
      </div>

      <!-- Change -->
      <div class="flex justify-between items-center mb-4">
        <span class="font-semibold">Tiền thừa trả khách</span>
        <strong class="text-blue-600 text-lg"></strong>
      </div>
    </div>

    <footer class="">
      <!-- Auto-print -->
      <div class="mb-4 justify-end">
        <label class="flex items-center">
          <input type="checkbox" class="mr-2" />
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
      <button class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-4">
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
import { ref, computed, watch } from 'vue'
import { Helper } from '../helper.js'
import Posservice from '@/service/Posservice.js'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import AddCustomer from '@/components/customer/AddCustomer.vue'

const keywords = ref('')
let searchResults = ref([])
let loading = ref(false)
let openAddCustomer = ref(false)
const selectedCustomer = ref(null)
// Định nghĩa props
const props = defineProps({
  itemSelect: {
    type: Object,
    required: false,
  },
})
const components = {
  IconAdd,
  IconSearch,
  IconDown2,
  Multiselect,
  AddCustomer,
}
const searchCustomer = (input) => {
  console.log('searchCustomer', input.data)
  if (input.data.trim() === '') {
    searchResults.value = []
    return
  }
  loading.value = true
  // Gọi API tìm kiếm khách hàng
  Posservice.customer(input.data).then((res) => {
    // Cập nhật danh sách khách hàng
    // localItemSelect.value = res.data.data
    searchResults.value = res.data.data.map((customer) => ({
      ...customer,
      title: `${customer.fullname} - ${customer.mobile}`,
    }))
    // searchResults.value = res.data.data
    // console.log('searchCustomer', searchResults.value)
    loading.value = false
  })
}

// Nếu bạn muốn sử dụng ref để tạo ra một biến riêng
const localItemSelect = ref(props.itemSelect)
const discount = ref(0)
// Tính toán tổng tiền hàng
const totalAmount = computed(() => {
  return Helper.calculateTotalAmount(localItemSelect.value?.products || [])
})
const totalPay = computed(() => {
  return Helper.calculateTotalPay(localItemSelect.value?.products, discount.value)
})

// Theo dõi sự thay đổi của props để cập nhật localItemSelect
watch(
  () => props.itemSelect,
  (newItem) => {
    localItemSelect.value = newItem
  }
)
</script>
<script   lang="ts">
export default {
  name: 'InvoiceOrder',
}
</script>
<style scoped>
</style>