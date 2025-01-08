<script lang="ts" setup>
import TabOrder from './TabOrder.vue'
import { ref } from 'vue'
import Posservice from '@/service/Posservice'
import { BrandList, UserInfo } from '@/stores/store.js'

// interface Brand {
//   id: number
//   shop_id: number
//   name: string
//   store_id: number
// }
let user = ref(false)
const token = localStorage.getItem('token')
Posservice.userInfo(token).then((res) => {
  if (res.data.status === 200) {
    UserInfo().set(res.data)
    if (res.data.user_id)
      Posservice.brand(res.data.user_id).then((res) => {
        if (res.data.status === 1) {
          BrandList().set(res.data.data)
          user.value = true
        }
      })
  }
})
</script>

<template>
  <div class="fiex bg-gray-200 h-[100vh] h-screen" style="position: relative">
    <TabOrder :user="user"></TabOrder>
  </div>
</template>
