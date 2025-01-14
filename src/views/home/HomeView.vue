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
if (ref(navigator.onLine) && ref(navigator.onLine).value) {
  Posservice.userInfo(token).then((res) => {
    if (res.data.status === 200) {
      UserInfo().set(res.data)
      localStorage.setItem('UserInfo', JSON.stringify(res.data))
      if (res.data.user_id)
        Posservice.brand(res.data.user_id).then((res) => {
          if (res.data.status === 1) {
            BrandList().set(res.data.data)
            localStorage.setItem('BrandList', JSON.stringify(res.data.data))
            user.value = true
          }
        })
    }
  })
} else {
  setTimeout(() => {
    user.value = true
  }, 200)
}

const userChange = () => {
  user.value = !user.value
}
</script>

<template>
  <div class="fiex bg-gray-200 h-[100vh] h-screen" style="position: relative">
    <TabOrder :user="user"></TabOrder>
    <router-view :user="user" @userChange="userChange"></router-view>
  </div>
</template>
