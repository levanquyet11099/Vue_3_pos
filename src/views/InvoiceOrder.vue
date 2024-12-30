
<template>
  <div class="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
    <!-- Search Customer -->
    <div class="flex items-center border rounded-lg px-2 py-1 mb-4">
      <input
        type="text"
        placeholder="Tìm khách hàng theo tên, sđt (F4)"
        class="flex-grow focus:outline-none px-2 py-1"
      />
      <button class="text-blue-600 ml-2">
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <!-- Total Products -->
    <p class="font-semibold mb-2 flex">
      Tổng tiền hàng
      <span class="text-gray-500 ml-1">
        ({{ localItemSelect?.products?.length || 0 }} sản phẩm)</span
      >
      <span class="ml-auto">{{ totalAmount }}</span>
    </p>

    <!-- Coupon -->
    <div class="mb-4">
      <button class="text-blue-500 hover:underline flex items-center" @click="toggleCoupon">
        Coupon <i class="fa fa-caret-down ml-1"></i>
      </button>
      <div class="mt-2 border p-2 rounded-lg hidden" id="couponBox">
        <input type="text" class="border rounded px-2 py-1 w-3/4" placeholder="Nhập mã coupon" />
        <button class="bg-blue-500 text-white px-4 py-1 rounded ml-2">Áp dụng</button>
      </div>
    </div>

    <!-- Discount -->
    <div class="flex justify-between items-center mb-4">
      <span class="font-semibold">Chiết khấu</span>
      <button class="text-blue-500 hover:underline" @click="toggleDiscount">Giá trị</button>
      <div class="mt-2 border p-2 rounded-lg hidden" id="discountBox">
        <div class="flex items-center">
          <button class="bg-blue-500 text-white px-4 py-1 rounded">Giá trị</button>
          <button class="border px-4 py-1 rounded ml-2">% Discount</button>
          <input
            type="text"
            class="border rounded px-2 py-1 w-1/3 ml-2 text-right"
            placeholder="0"
          />
        </div>
      </div>
    </div>

    <!-- Payment Details -->
    <div class="flex justify-between items-center mb-4">
      <span class="font-semibold">Thu khách hàng</span>
      <strong class="text-blue-600 text-lg"></strong>
    </div>
    <div class="flex justify-between items-center mb-4">
      <span class="font-semibold">Khách thanh toán (F8)</span>
      <input type="text" class="border rounded px-2 py-1 text-right w-1/2" />
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

    <!-- Auto-print -->
    <div class="mb-4">
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
    <button class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
      Thanh toán (F9)
    </button>
  </div>
</template>


<script setup>
import { ref, defineProps, computed, watch } from 'vue'
import { Helper } from '../helper.js'

// Định nghĩa props
const props = defineProps({
  itemSelect: {
    type: Object,
    required: false,
  },
})

// Nếu bạn muốn sử dụng ref để tạo ra một biến riêng
const localItemSelect = ref(props.itemSelect)

// Tính toán tổng tiền hàng
const totalAmount = computed(() => {
  return Helper.calculateTotalAmount(localItemSelect.value?.products || [])
})

// Theo dõi sự thay đổi của props để cập nhật localItemSelect
watch(
  () => props.itemSelect,
  (newItem) => {
    localItemSelect.value = newItem
  }
)
</script>
