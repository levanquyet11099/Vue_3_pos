<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import TableProduct from './views/TableProduct.vue'

import TabOrder from './views/TabOrder.vue'
import './assets/main.css'
</script>

<template>
  <div class="">
    <header>
      <div>
        <div class="container mx-auto">
          <!-- Header -->

          <!-- Main Content -->
        </div>

        <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
      </div>
    </header>

    <RouterView />
    <div class="fixed flex mt-[-45px]">
      <TheWelcome></TheWelcome>
      <!-- <TabOrder></TabOrder> -->
      <!-- <TableProduct></TableProduct> -->
    </div>
  </div>
</template>

