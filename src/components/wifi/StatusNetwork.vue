<template>
  <div class="wifi-status">
    <!-- <span v-if="isOnline" :class="wifiStrengthClass" class="wifi-icon"></span> -->
    <IconWifi v-if="isOnline"></IconWifi>
    <IconOffWifi v-else class="offline-icon"></IconOffWifi>
  </div>
</template>
  
  <script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import IconWifi from '../icons/IconWifi.vue'
import IconOffWifi from '../icons/IconOffWifi.vue'

const components = {
  IconWifi,
  IconOffWifi,
}
// Khai báo các biến trạng thái
const isOnline = ref(navigator.onLine)
const wifiStrength = ref(0)

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

// Class cho vạch WiFi
const wifiStrengthClass = computed(() => {
  if (!isOnline.value) return 'bg-gray-400' // Màu cho offline
  switch (wifiStrength.value) {
    case 0:
      return 'bg-red-500'
    case 1:
      return 'bg-orange-500'
    case 2:
      return 'bg-yellow-500'
    case 3:
      return 'bg-green-500'
    default:
      return 'bg-gray-400'
  }
})

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