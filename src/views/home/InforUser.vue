<script lang="ts" setup>
import IconExclamationMark from '@/components/icons/IconExclamationMark.vue'
import IconOff from '@/components/icons/IconOff.vue'
import IconDown from '@/components/icons/IconDown.vue'
import { BrandList, UserInfo, BrandSelect } from '@/stores/store'
import { ref, onMounted, watch } from 'vue'
import StatusNetwork from '@/components/wifi/StatusNetwork.vue'
interface User_data {
  status: number
  shop_id: string
  user_id: number
  avatar: string
  brand_selected: any
  point_shop: {
    point_status: number
    point_rate: number
  }
  data: string
}

let Brand = BrandList().get
Brand = localStorage.getItem('BrandList') ? JSON.parse(localStorage.getItem('BrandList')) : Brand
let User = ref<User_data>({
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
User.value = UserInfo().get as User_data
User.value = localStorage.getItem('UserInfo')
  ? JSON.parse(localStorage.getItem('UserInfo'))
  : User.value
let selectedBrand = ref({
  id: 0,
  shop_id: 0,
  name: 'Cửa hàng 1',
  store_id: 0,
})
// let quantityOffline = defineProps(['quantityOffline'])
const props = defineProps(['user', 'quantityOffline'])
watch(
  () => props.user,
  (val) => {
    if (val) {
      User.value = UserInfo().get as User_data
      User.value = localStorage.getItem('UserInfo')
        ? JSON.parse(localStorage.getItem('UserInfo'))
        : User.value
      Brand = BrandList().get
      Brand = localStorage.getItem('BrandList')
        ? JSON.parse(localStorage.getItem('BrandList'))
        : Brand
      selectedBrand.value = Brand[0]
    }
  },
)
let dynamicNumber = props.quantityOffline

watch(
  () => props.quantityOffline,
  (val: number) => {
    if (val) {
      dynamicNumber = val
    }
  },
)

watch(
  () => selectedBrand.value,
  (val: typeof selectedBrand.value) => {
    if (val) {
      selectedBrand.value = val
      BrandSelect().set(val)
    }
  },
)

// () => quantityOffline.quantityOffline,
// (val) => {
//   dynamicNumber = val
// },

onMounted(() => {
  User.value = UserInfo().get as User_data
  User.value = localStorage.getItem('UserInfo')
    ? JSON.parse(localStorage.getItem('UserInfo'))
    : User.value
  Brand = BrandList().get
  if (Brand.length > 0) {
    selectedBrand.value = Brand[0]
    BrandSelect().set(Brand[0])
  }
})
</script>
<script lang="ts">
export default {
  name: 'InforUser',
}
</script>

<template>
  <div class="ml-auto mr-[20px]">
    <!-- Thanh điều hướng -->
    <nav class="flex items-center h-[52px]">
      <div class="flex items-center space-x-3">
        <div class="relative flex border rounded-full bg-white">
          <select
            v-model="selectedBrand"
            class="border rounded-full p-2 pr-[16px] w-full min-w-[100px] h-[39px] appearance-none focus:outline-none text-center"
          >
            <option v-for="brand in Brand" :key="brand.id" :value="brand" class="text-center">
              {{ brand.name }}
            </option>
          </select>
          <IconDown
            class="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none"
          ></IconDown>
        </div>
        <button class="bg-white px-2 flex items-center rounded-full h-[39px] min-w-[120px] no-wrap">
          <IconOff class="mr-2"></IconOff>
          Đóng ca
        </button>

        <div class="flex items-center pr-0">
          <router-link to="/pos/subindex/listorder">
            <div
              class="bg-[#733D96] rounded-full h-[39px] w-[39px] flex items-center justify-center"
            >
              <StatusNetwork :quantityOrder="quantityOffline"></StatusNetwork>
            </div>
          </router-link>
          <IconExclamationMark class="pl-2 h-[30px] w-[30px]"></IconExclamationMark>
        </div>
        <span class="text-white">{{ User.data }}</span>
        <img :src="User.avatar" alt="User" class="w-8 h-8 rounded-full ml-2" />
      </div>
    </nav>
  </div>
</template>
