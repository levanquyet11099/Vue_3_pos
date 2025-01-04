<script  lang="ts" setup>
import IconExclamationMark from '@/components/icons/IconExclamationMark.vue'
import IconWifi from '@/components/icons/IconWifi.vue'
import IconOff from '@/components/icons/IconOff.vue'
import IconDown from '@/components/icons/IconDown.vue'
import { BrandList } from '@/stores/store'
import { ref, onMounted, watch } from 'vue'
import StatusNetwork from '@/components/wifi/StatusNetwork.vue'

let Brand = BrandList().get
let selectedBrand = ref({
  id: 0,
  shop_id: 0,
  name: 'Cửa hàng 1',
  store_id: 0,
})
const components = {
  IconExclamationMark,
  IconWifi,
  IconOff,
  IconDown,
  StatusNetwork,
}
const props = defineProps(['user'])
watch(
  () => props.user,
  (val) => {
    if (val) {
      Brand = BrandList().get
      selectedBrand.value = Brand[0]
    }
  }
)

onMounted(() => {
  Brand = BrandList().get
  if (Brand.length > 0) {
    selectedBrand.value = Brand[0]
  }
})
</script>
<script  lang="ts" >
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
            class="border rounded-full p-2 w-full min-w-[100px] h-full appearance-none focus:outline-none"
          >
            <option v-for="brand in Brand" :key="brand.id" :value="brand">
              {{ brand.name }}
            </option>
          </select>
          <IconDown
            class="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none"
          ></IconDown>
        </div>
        <button class="bg-white px-2 flex items-center rounded-full h-[39px] min-w-[120px] no-wrap">
          <IconOff class="mr-2"></IconOff>
          Đóng ca
        </button>

        <div class="flex items-center pr-0">
          <div class="bg-[#733D96] rounded-full h-[39px] w-[39px] flex items-center justify-center">
            <StatusNetwork></StatusNetwork>
          </div>
          <IconExclamationMark class="pl-2 h-[30px] w-[30px]"></IconExclamationMark>
        </div>
        <span class="text-white">Nguyễn Thanh</span>
        <img
          src="https://salekit.com/assets/pos1/img/icon-salekit-06.2ad457de.png"
          alt="User"
          class="w-8 h-8 rounded-full ml-2"
        />
      </div>
    </nav>
  </div>
</template>
