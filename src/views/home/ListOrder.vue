<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { UserInfo } from '@/stores/store'
import { Helper } from '@/helper'
import IconSee from '@/components/icons/IconSee.vue'
import IconDelete1 from '@/components/icons/IconDelete1.vue'
import IconDeleteTab from '@/components/icons/IconDeleteTab.vue'
// import { Order } from '@/types/order'
// import { OrderStatus } from '@/types/orderStatus'
// import { OrderType } from '@/types/orderType'
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
}
interface typePrice {
  text: string
  number: number
}
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
let user = ref<User>({
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
user.value = UserInfo().get as User

let orders = ref<Order[]>([
  {
    id: 'OR0000012',
    customer: 'Nguyễn Văn A',
    value: '200.000',
    time: '20/11/2024 08:00',
    status: 'Chưa đồng bộ',
    create_by_order: 1,
    discount: 0,
    email: 'nguyenvana@example.com',
    full_name: 'Nguyễn Văn A',
    note: null,
    phone: '0123456789',
    products: [],
    ref_sub: '',
    sale_id: 1,
    store_id: 1,
    user_id: 1,
    utm_source: '',
  },
])
onMounted(() => {
  const list_order = localStorage.getItem('orderListOffline_' + user.value.shop_id)
  if (list_order) {
    orders.value = JSON.parse(list_order) as Order[]
  }
})
// if (user.value) {
//   console.log('listorder', user.value)
//   const list_order = localStorage.getItem('listorderOffline_' + user.value.shop_id)
//   if (list_order) {
//     orders.value = JSON.parse(list_order) as Order[]
//   }
// }
</script>
<template>
  <div class="container mx-auto p-4 bg-white rounded-[8px]">
    <div>
      <h2 class="text-xl font-semibold mb-4">
        Đồng bộ đơn hàng Offline ({{ orders.length || 0 }})
      </h2>
    </div>

    <div class="flex items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Tìm kiếm mã đơn, tên, số điện thoại khách hàng"
        class="border rounded-md p-2 w-[361px]"
      />
      <button class="bg-blue-500 text-white px-4 rounded w-auto h-[42px] text-nowrap">
        Đồng bộ đơn hàng
      </button>
    </div>

    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2">Khách hàng</th>
          <th class="px-4 py-2">Giá trị</th>
          <th class="px-4 py-2">Thời gian</th>
          <th class="px-4 py-2">Trạng thái</th>
          <th class="px-4 py-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, index) in orders"
          :key="index"
          class="border-b items-center justify-center"
        >
          <td class="px-4 py-4 text-primary">{{ order.id }}</td>
          <td class="px-4 py-4 text-center">{{ order.full_name }}</td>
          <td class="px-4 py-4 text-center">
            {{ Helper.calculateTotalPay(order.products, order.discount, 1) }}
          </td>
          <td class="px-4 py-4 text-center">{{ order.time }}</td>
          <td class="px-4 py-4 text-center">
            {{ order.status == 0 ? 'Chưa đồng bộ' : 'Chưa đồng bộ' }}
          </td>
          <td class="flex px-4 py-4 items-center justify-center">
            <button class="text-blue-500 hover:underline"><IconSee></IconSee></button>
            <button class="text-red-500 hover:underline ml-2"><IconDelete1></IconDelete1></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
