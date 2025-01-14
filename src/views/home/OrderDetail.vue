<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex mt-[52px] justify-center z-50">
    <div
      class="max-w-[960px] max-h-[730px] h-full w-full mx-auto mt-[16px] bg-white shadow-md rounded-lg"
    >
      <div class="h-[56px] flex items-center justify-between mb-4 border-b p-4 mt-1">
        <h2 class="text-[20px] font-700 font-[Open Sans] text-left">
          Chi tiết đơn hàng {{ OrderDetail.id }}
        </h2>
        <div class="h-[56px] flex items-center justify-center cursor-pointer">
          <IconDeleteTab class="h-full w-[30px]" @click="closePopup"></IconDeleteTab>
        </div>
      </div>

      <div class="p-6 pt-0 px-4">
        <div class="space-y-4">
          <div class="flex justify-between w-full space-x-4">
            <div class="max-w-[456px] w-full bg-gray-100 max-h-[62px] h-[62px] p-2 rounded-[8px]">
              <div class="font-200 text-gray-500">Người tạo</div>
              <div class="text-[#333333]">{{ OrderDetail.sale_name || 'Nguyễn Văn A' }}</div>
            </div>
            <div class="max-w-[456px] w-full bg-gray-100 max-h-[62px] h-[62px] p-2 rounded-[8px]">
              <div class="font-200 text-gray-500">Ngày tạo</div>
              <div class="text-[#333333]">{{ OrderDetail.time }}</div>
            </div>
          </div>
          <div class="flex justify-between w-full space-x-4">
            <div class="max-w-[456px] w-full bg-gray-100 max-h-[62px] h-[62px] p-2 rounded-[8px]">
              <div class="font-200 text-gray-500">Khách hàng</div>
              <div class="text-[#333333]">{{ OrderDetail.full_name }}</div>
            </div>
            <div class="max-w-[456px] w-full bg-gray-100 max-h-[62px] h-[62px] p-2 rounded-[8px]">
              <div class="font-200 text-gray-500">Trạng thái:</div>
              <div class="text-[#333333]">{{ OrderDetail.status == 0 ? 'Chưa đồng bộ' : '' }}</div>
            </div>
          </div>
        </div>
        <div
          class="flex justify-between w-full space-x-4 bg-gray-100 mt-4 h-[195px]"
          v-if="OrderDetail.payment_method == 2"
        >
          <div class="flex items-center space-x-4 max-w-[456px] w-full">
            <div>
              <IconPayOnline></IconPayOnline>
            </div>
            <div class="flex">
              <div>
                <div class="font-[600]">Chuyển khoản</div>
                <div class="flex justify-between space-x-4">
                  <div class="font-[400] text-[#333333]">Vietcombank</div>
                  <div class="text-blue-500 font-[400] text-[14px] bg-[#E8F4FF]">Đã thanh toán</div>
                </div>

                <div class="text-font-100 text-gray-600">049117317544</div>
              </div>
            </div>
          </div>
          <div class="justify-between max-w-[456px] w-full space-y-3 p-3">
            <div class="flex justify-between">
              <span class="font-[400] text-left text-[#333333]">Tổng tiền hàng</span> 390.000 VNĐ
            </div>
            <div class="flex justify-between">
              <span class="font-[400] text-left text-[#333333]">Coupon</span> KM50
            </div>
            <div class="flex justify-between">
              <span class="font-[400] text-left text-[#333333]">Chiết khấu</span> 5.000 VNĐ
            </div>
            <div class="flex justify-between">
              <span class="font-[400] text-left text-[#333333]">Đã dùng điểm thưởng</span> 100.000
              VNĐ
            </div>
            <div class="flex justify-between">
              <div class="font-[600] text-left">Thu khách hàng</div>
              395.000 VNĐ
            </div>
          </div>
        </div>
        <div class="flex justify-between w-full space-x-4 bg-gray-100 mt-4 h-[160px]" v-else>
          <div class="flex items-center space-x-4 max-w-[456px] w-full">
            <div class="ml-3">
              <IconPayOnline></IconPayOnline>
            </div>
            <div class="flex justify-between space-x-4">
              <div class="font-[600]">Tiền mặt</div>
              <div class="text-blue-500 font-[400] text-[14px] bg-[#E8F4FF] h-[20px]">
                Đã thanh toán
              </div>
            </div>
          </div>
          <div class="justify-between max-w-[456px] w-full space-y-3 p-3">
            <div class="flex justify-between">
              <span class="font-[400] text-left text-[#333333]">Tổng tiền hàng</span>
              {{ Helper.calculateTotalAmount(OrderDetail.products) }}
            </div>
            <div class="flex justify-between">
              <span class="font-[400] text-left text-[#333333]">Coupon</span
              >{{ OrderDetail.coupon_id }}
            </div>
            <div class="flex justify-between">
              <span class="font-[400] text-left text-[#333333]">Chiết khấu</span
              >{{ Helper.formatCurrency(OrderDetail.discount) }}
            </div>
            <div class="flex justify-between">
              <div class="font-[600] text-left">Thu khách hàng</div>
              {{ Helper.calculateTotalPay(OrderDetail.products, OrderDetail.discount) }}
            </div>
          </div>
        </div>
        <div class="mb-4"></div>
        <div class="overflow-y-auto h-[300px] hide-scrollbar">
          <table class="min-w-full rounded-[8px]">
            <thead class="sticky top-0">
              <tr class="bg-gray-100 rounded-[8px]">
                <th class="px-4 py-2 font-[600] text-[#333333] text-left rounded-l-[8px]">
                  Sản phẩm({{ OrderDetail.products.length }})
                </th>
                <th class="px-4 py-2 font-400 text-[#333333]text-center">Giá bán</th>
                <th class="px-4 py-2 font-[600] text-[#333333] text-center">Số lượng</th>
                <th class="px-4 py-2 font-[600] text-[#333333] text-center rounded-r-[8px]">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody class="">
              <!-- Thêm các hàng sản phẩm ở đây -->
              <tr
                class="bg-white border-b h-[77px] max-h-[77px]"
                v-for="product in OrderDetail.products"
                :key="product.id"
              >
                <td class="flex px-4 py-2 text-[#333333] text-left">
                  <div class="flex items-center">
                    <div>
                      <img
                        :src="
                          product.thumb_url ||
                          'https://static.salekit.com//public/images/no-image.png'
                        "
                        width="56"
                        height="56"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="font-[500]">{{ product.product_name }}</div>
                      <div class="text-blue-300">{{ product.attribute }}</div>
                      <div class="text-gray-500">{{ product.sku }}</div>
                    </div>
                  </div>
                </td>

                <td class="px-4 py-2 text-[#333333] text-center">
                  {{ Helper.formatCurrency(product.price_sale) }}
                </td>
                <td class="px-4 py-2 text-[#333333] text-center">
                  {{ Helper.formatCurrency(product.quantity) }}
                </td>
                <td class="px-4 py-2 text-[#333333] text-center rounded-r-[8px]">
                  {{ Helper.formatCurrency(product.quantity * product.price_sale) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import IconCash from '@/components/icons/IconCash.vue'
import IconPayOnline from '@/components/icons/IconPayOnline.vue'
import IconDeleteTab from '@/components/icons/IconDeleteTab.vue'
import { Helper } from '@/helper'
interface Order {
  id: string
  customer: number
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
  sale_name: string
  store_id: number
  user_id: number
  utm_source: string
  payment_method: number
  coupon_id: string
}
const props = defineProps(['dataOrderDetail'])
let OrderDetail = ref<Order>(null)
OrderDetail.value = props.dataOrderDetail
const emit = defineEmits(['closePopup'])
const closePopup = () => {
  emit('closePopup')
}
</script>
<script lang="ts">
export default {
  name: 'OrderDetail',
}
</script>
<style scoped>
/* Đảm bảo popup hiển thị phía trên các nội dung khác */
.z-50 {
  z-index: 50;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
