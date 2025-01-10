<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import { UserInfo } from '@/stores/store'
import { Helper } from '@/helper'
import IconSee from '@/components/icons/IconSee.vue'
import IconDelete1 from '@/components/icons/IconDelete1.vue'
import IconDeleteTab from '@/components/icons/IconDeleteTab.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import OrderDetail from './OrderDetail.vue'
import IconDocument from '@/components/icons/IconDocument.vue'
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
  payment_method: number
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
const searchOrder = ref<string>('')
const emit = defineEmits(['userChange'])
const props = defineProps(['user'])
let showOrderdetail = ref<boolean>(false)
let user = ref<User>(null)

let dataOrderDetail = ref<Order>(null)
let orders = ref<Order[]>([])
onMounted(() => {
  user.value = UserInfo().get as User
  const list_order = localStorage.getItem('orderListOffline_' + user.value.shop_id)
  if (list_order) {
    orders.value = JSON.parse(list_order) as Order[]
  }
})
watch(
  () => props.user,
  (val) => {
    if (val) {
      user.value = UserInfo().get as User
      const list_order = localStorage.getItem('orderListOffline_' + user.value.shop_id)
      if (list_order) {
        orders.value = JSON.parse(list_order) as Order[]
      }
    }
  },
)
const detailOrder = (order: Order) => {
  showOrderdetail.value = true
  dataOrderDetail.value = order
}
const deleteOrder = (index: number) => {
  if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
    orders.value.splice(index, 1)
    localStorage.setItem('orderListOffline_' + user.value.shop_id, JSON.stringify(orders.value))
    emit('userChange')
  }
}
const orderListFilter = computed(() => {
  if (searchOrder.value) {
    return orders.value.filter((order) => {
      return (
        order.id.toLowerCase().includes(searchOrder.value.toLowerCase()) ||
        order.full_name.toLowerCase().includes(searchOrder.value.toLowerCase()) ||
        order.phone.toLowerCase().includes(searchOrder.value.toLowerCase())
      )
    })
  } else {
    return orders.value
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
  <div
    class="container mx-auto bg-white rounded-[8px] mt-[16px] h-full"
    style="max-height: calc(100% - 86px)"
  >
    <div class="flex border-b p-4">
      <h2 class="text-xl font-semibold">Đồng bộ đơn hàng Offline ({{ orders.length || 0 }})</h2>
      <RouterLink to="/" class="flex ml-auto">
        <IconDeleteTab class="size-lg items-center justify-center h-full w-[30px]"></IconDeleteTab>
      </RouterLink>
    </div>
    <!-- body -->
    <div class="p-4 w-full" v-if="orders.length > 0">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center border rounded-md w-[361px] h-[39px]">
          <IconSearch class="ml-2"></IconSearch>
          <input
            type="text"
            v-model="searchOrder"
            class="focus:outline-none rounded-md p-2 pr-0 w-full text-[14px] text-gray-500"
            placeholder="Tìm kiếm mã đơn, tên, số điện thoại khách hàng"
          />
        </div>

        <button class="bg-blue-500 text-white px-4 rounded w-auto h-[42px] text-nowrap">
          Đồng bộ đơn hàng
        </button>
      </div>
      <table class="min-w-full bg-white p-4 rounded-[16px] w-full">
        <thead>
          <tr class="bg-gray-200 rounded-[16px]">
            <th class="px-4 py-2 text-left rounded-l-[8px]">ID</th>
            <th class="px-4 py-2">Khách hàng</th>
            <th class="px-4 py-2">Giá trị</th>
            <th class="px-4 py-2">Thời gian</th>
            <th class="px-4 py-2">Trạng thái</th>
            <th class="px-4 py-2 rounded-r-[8px]">Hành động</th>
          </tr>
        </thead>
        <tbody class="overflow-y-auto w-full">
          <tr
            v-for="(order, index) in orderListFilter"
            :key="index"
            class="border-b items-center justify-center"
          >
            <td class="px-4 py-4 text-primary">{{ order.id }}</td>
            <td class="px-4 py-4 text-center">{{ order.full_name }}</td>
            <td class="px-4 py-4 text-center">
              {{ Helper.calculateTotalPay(order.products, order.discount) }}
            </td>
            <td class="px-4 py-4 text-center">{{ order.time }}</td>
            <td class="px-4 py-4 text-center">
              {{ order.status == 0 ? 'Chưa đồng bộ' : 'Chưa đồng bộ' }}
            </td>
            <td class="flex px-4 py-4 items-center justify-center">
              <button class="text-blue-500 hover:underline" @click="detailOrder(order)">
                <IconSee></IconSee>
              </button>
              <button
                class="text-red-500 rounded-[8px] ml-2 hover:bg-blue-200"
                @click="deleteOrder(index)"
              >
                <IconDelete1></IconDelete1>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="p-4 w-full">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center border rounded-md w-[361px] h-[39px]">
          <IconSearch class="ml-2"></IconSearch>
          <input
            type="text"
            class="focus:outline-none rounded-md p-2 pr-0 w-full text-[14px] text-gray-500"
            placeholder="Tìm kiếm mã đơn, tên, số điện thoại khách hàng"
          />
        </div>

        <button class="bg-blue-500 text-white px-4 rounded w-auto h-[42px] text-nowrap">
          Đồng bộ đơn hàng
        </button>
      </div>
      <table class="min-w-full bg-white p-4 rounded-[16px] w-full">
        <thead>
          <tr class="bg-gray-200 rounded-[16px]">
            <th class="px-4 py-2 text-left rounded-l-[8px]">ID</th>
            <th class="px-4 py-2">Khách hàng</th>
            <th class="px-4 py-2">Giá trị</th>
            <th class="px-4 py-2">Thời gian</th>
            <th class="px-4 py-2">Trạng thái</th>
            <th class="px-4 py-2 rounded-r-[8px]">Hành động</th>
          </tr>
        </thead>
      </table>
      <div class="flex items-center justify-center h-[200px]">
        <div class="text-center justify-center">
          <div class="flex text-gray-500 items-center justify-center">
            <IconDocument></IconDocument>
          </div>

          <p class="text-gray-500 mt-4">Không tìm thấy kết quả nào phù hợp</p>
        </div>
      </div>
    </div>
  </div>
  <OrderDetail
    v-if="showOrderdetail == true"
    :dataOrderDetail="dataOrderDetail"
    @closePopup="showOrderdetail = false"
  >
  </OrderDetail>
</template>
