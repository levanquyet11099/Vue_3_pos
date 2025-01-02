<script setup>
import TabOrder from './TabOrder.vue'
import { ref } from 'vue'
import Posservice from '@/service/Posservice'
import { BrandList } from '@/stores/store.js'

// interface Brand {
//   id: number
//   shop_id: number
//   name: string
//   store_id: number
// }
let user = ref(false)
Posservice.brand().then((res) => {
  if (res.data.status === 1) {
    BrandList().set(res.data.data)
    user.value = true
  }
})
</script>

<template>
  <div class="fiex bg-gray-200 h-[100vh] h-screen" style="position: relative">
    <TabOrder :user="user"></TabOrder>
  </div>
</template>
