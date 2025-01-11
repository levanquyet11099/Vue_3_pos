<template>
  <div class="wifi-status">
    <IconWifi v-if="isOnline"></IconWifi>
    <IconOffWifi v-else class="offline-icon" :quantity="dynamicNumber"> </IconOffWifi>
    <!-- <IconOffWifi v-else class="offline-icon"> </IconOffWifi> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import IconWifi from '../icons/IconWifi.vue'
import IconOffWifi from '../icons/IconOffWifi.vue'

// const components = {
//   IconWifi,
//   IconOffWifi,
// }
// Khai báo các biến trạng thái
const quantityOrder = defineProps(['quantityOrder'])
let dynamicNumber = quantityOrder.quantityOrder
const isOnline = ref(navigator.onLine)
const wifiStrength = ref(0)

watch(quantityOrder, (newVal) => {
  dynamicNumber = newVal.quantityOrder
})
// Hàm cập nhật trạng thái
const updateStatus = () => {
  isOnline.value = navigator.onLine
  wifiStrength.value = getWifiStrength() // Tính toán độ mạnh của WiFi
}

// Hàm giả lập độ mạnh WiFi
const getWifiStrength = () => {
  if (isOnline.value) {
    return Math.floor(Math.random() * 4) // Giả sử độ mạnh từ 0-3
  }
  return -1 // -1 cho trạng thái offline
}

// Cài đặt sự kiện khi component được mount
onMounted(() => {
  window.addEventListener('online', updateStatus)
  window.addEventListener('offline', updateStatus)
  updateStatus()
})

// Hủy các sự kiện khi component bị unmount
onBeforeUnmount(() => {
  window.removeEventListener('online', updateStatus)
  window.removeEventListener('offline', updateStatus)
})
</script>

<script lang="ts">
export default {
  name: 'StatusNetwork',
}
</script>
<style scoped>
.wifi-status {
  display: flex;
  align-items: center;
}

.wifi-icon {
  width: 20px;
  height: 20px;
}

.offline-icon {
  font-size: 20px;
  color: red;
}
</style>
