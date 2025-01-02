import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const ProductList = defineStore('ProductList', {
  state: () => ({
      Product: [],
      total: 0,
  }),
  actions: {
      set(product_list, total) {
          this.Product = product_list;
          this.total = total;
      },
  },
  getters: {
      getProduct: (state) => state.Product,
      getTotal: (state) => state.total
  }
});
export const InvoiceOrder = defineStore('InvoiceOrder', {
  state: () => ({
      Invoice: [],
      total: 0,
  }),
  actions: {
      set(invoice_list, total) {
          this.Invoice = invoice_list;
          this.total = total;
      },
  },
  getters: {
      getInvoice: (state) => state.Invoice,
      getTotal: (state) => state.total
  }
});

