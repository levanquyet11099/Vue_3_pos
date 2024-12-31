<script  lang="ts" setup>
import IconExclamationMark from '@/components/icons/IconExclamationMark.vue'
import IconWifi from '@/components/icons/IconWifi.vue'
import IconOff from '@/components/icons/IconOff.vue'
import IconDown from '@/components/icons/IconDown.vue'
</script>

<template>
  <div class="ml-auto mr-[20px]">
    <!-- Thanh điều hướng -->
    <nav class="flex items-center h-[52px]">
      <div class="flex items-center space-x-3">
        <div
          class="bg-white px-2 flex items-center justify-center space-x-2 rounded-full h-[39px] no-wrap w-auto min-w-[150px]"
        >
          <span>Cửa hàng 1</span>
          <IconDown></IconDown>
        </div>
        <button class="bg-white px-2 flex items-center rounded-full h-[39px] min-w-[120px] no-wrap">
          <IconOff class="mr-2"></IconOff>
          Đóng ca
        </button>

        <div class="flex items-center pr-0">
          <div class="bg-[#733D96] rounded-full h-[39px] w-[39px] flex items-center justify-center">
            <IconWifi></IconWifi>
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