<script lang="ts" setup>
import { ref } from 'vue'
// import { Helper } from '../helper.js'
import Posservice from '@/service/Posservice.js'
import { useToast } from 'vue-toastification'
const toast = useToast()
const emit = defineEmits(['save', 'close'])
const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  gender: 1,
})
const submitForm = () => {
  Posservice.createCustomer(formData.value).then((res) => {
    if (res.data.status === 1) {
      toast.success('Thêm khách hàng thành công', { timeout: 2000 })
      const datauser = localStorage.getItem('UserInfo')
        ? JSON.parse(localStorage.getItem('UserInfo'))
        : {}
      const customerList = localStorage.getItem('customerList_' + datauser.shop_id)
        ? JSON.parse(localStorage.getItem('customerList_' + datauser.shop_id))
        : []
      customerList.push({
        id: res.data.data.customer_id,
        fullname: formData.value.name,
        mobile: formData.value.phone,
        email: formData.value.email,
        address: formData.value.address,
        point: 0,
      })
      localStorage.setItem('customerList_' + datauser.shop_id, JSON.stringify(customerList))
      emit('save', res)
      emit('close', true)
    } else {
      toast.error('Không thêm được khách hàng', { timeout: 2000 })
    }
  })
  // Gọi API thêm khách hàng

  //   emit('close', true)
}
const close = () => {
  emit('close', true)
}
</script>

<template>
  <div class="fixed top-1/4 left-1/3 w-1/4 h-1/2 bg-opacity-0 z-50">
    <div class="max-w-md mx-auto p-5 rounded-[12px] shadow-lg border-t">
      <h2 class="text-xl font-semibold mb-4">Thêm Khách Hàng</h2>
      <form @submit.prevent="submitForm">
        <!-- Họ tên* -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Họ tên*</label>
          <input
            type="text"
            v-model="formData.name"
            required
            class="mt-1 block w-full border-b-2 rounded-md shadow-sm focus:ring focus:outline-none focus:border-blue-500 p-2"
            placeholder="Nhập họ tên"
          />
        </div>
        <!-- E-mail -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            v-model="formData.email"
            class="mt-1 block w-full border-b-2 rounded-md shadow-sm focus:ring focus:outline-none focus:border-blue-500 p-2"
            placeholder="Nhập email"
          />
        </div>
        <!-- Số điện thoại* -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Số điện thoại*</label>
          <input
            type="tel"
            v-model="formData.phone"
            required
            class="mt-1 block w-full border-b-2 rounded-md shadow-sm focus:ring focus:outline-none focus:border-blue-500 p-2"
            placeholder="Nhập số điện thoại"
          />
        </div>
        <!-- dia chi  -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Địa chỉ*</label>
          <input
            type="text"
            v-model="formData.address"
            required
            class="mt-1 block w-full border-b-2 rounded-md shadow-sm focus:ring focus:outline-none focus:border-blue-500 p-2"
            placeholder="Nhập địa chỉ"
          />
        </div>
        <!-- Chọn giới tính  -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Giới tính</label>
          <div class="flex items-center space-x-4 pt-2 ml-2">
            <label class="inline-flex items-center">
              <input
                type="radio"
                v-model="formData.gender"
                value="1"
                required
                class="form-radio text-blue-500"
              />
              <span class="ml-2">Nam</span>
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                v-model="formData.gender"
                value="2"
                required
                class="form-radio text-blue-500"
              />
              <span class="ml-2">Nữ</span>
            </label>
          </div>
        </div>

        <div class="flex justify-between space-x-4">
          <button
            type="submit"
            class="w-1/2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Lưu
          </button>
          <button
            type="button"
            @click="close"
            class="w-1/2 bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
          >
            Đóng
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'InvoiceOrder',
}
</script>
