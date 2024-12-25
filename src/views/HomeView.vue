<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import TabOrder from './TabOrderCopy.vue'
// import InvoiceOrder from './InvoiceOrder.vue'
</script>

<template>
  <div class="fiex" style="position: relative">
    <!-- <div class="flex p-4 pb-0 border-b bg-[#0090DA]">
      <a href="/" class="imgLogo mt-"><img src="../assets/salekit.png" width="39" /></a>
      <div class="w-1/3 justify-between items-center ml-[20px]">
        <input type="text" class="w-full p-2 border rounded" placeholder="Tìm mặt hàng (F3)" />
      </div> -->

    <!-- <div
        class="w-auto justify-between flex gap-[8px] pb-0 h-full items-center pt-[10px] ml-[20px]"
      >
        <ul class="flex justify-center items-center bg-white rounded-t-xl w-[100px] h-[35px]">
          <div class="flex">
            <a class="text-blue-500 font-bold">Hóa đơn 1</a>
          </div>
        </ul>
        <ul class="flex justify-center bg-white items-center rounded-t-xl w-[100px] h-[35px]">
          <div class="flex">
            <a class="text-blue-500 font-bold">Hóa đơn 1</a>
          </div>
        </ul>
        <ul class="flex justify-center bg-white items-center rounded-t-xl w-[100px] h-[35px]">
          <div class="flex">
            <a class="text-blue-500 font-bold">Hóa đơn 1</a>
          </div>
        </ul>
      </div> -->
    <!-- <div class="w-1/3 flex justify-end space-x-4 items-center">
        <i class="fa fa-exclamation text-gray-600"></i>
        <i class="fa fa-reply-all text-gray-600"></i>
        <i class="fa fa-sync-alt text-gray-600"></i>
        <i class="fa fa-print text-gray-600"></i>
        <span>Admin</span>
        <i class="fa fa-bars text-gray-600"></i>
      </div>
    </div> -->
    <TabOrder></TabOrder>
    <InvoiceOrder></InvoiceOrder>
  </div>
</template>
