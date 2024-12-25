<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import TableProduct from './views/TableProduct.vue'
import InvoiceOrder from './views/InvoiceOrder.vue'
import './assets/main.css'
</script>

<template>
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
  <div class="flex">
    <TheWelcome></TheWelcome>
    <TableProduct></TableProduct>
    <InvoiceOrder></InvoiceOrder>
  </div>
</template>

