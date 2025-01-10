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
      this.Product = product_list
      this.total = total
    },
  },
  getters: {
    getProduct: (state) => state.Product,
    getTotal: (state) => state.total,
  },
})
export const InvoiceOrder = defineStore('InvoiceOrder', {
  state: () => ({
    Invoice: [],
    total: 0,
  }),
  actions: {
    set(invoice_list, total) {
      this.Invoice = invoice_list
      this.total = total
    },
  },
  getters: {
    getInvoice: (state) => state.Invoice,
    getTotal: (state) => state.total,
  },
})
export const CategoryList = defineStore('CategoryList', {
  state: () => ({
    Category: [],
  }),
  actions: {
    set(category_list) {
      this.Category = category_list
    },
  },
  getters: {
    get: (state) => state.Category,
  },
})
export const TrademarkList = defineStore('TrademarkList', {
  state: () => ({
    Trademark: [],
  }),
  actions: {
    set(trademark_list) {
      this.Trademark = trademark_list
    },
  },
  getters: {
    get: (state) => state.Trademark,
  },
})
export const BrandList = defineStore('BrandList', {
  state: () => ({
    Brand: [],
  }),
  actions: {
    set(brand_list) {
      this.Brand = brand_list
    },
  },
  getters: {
    get: (state) => state.Brand,
  },
})
export const BrandSelect = defineStore('BrandSelect', {
  state: () => ({
    Brand: {},
  }),
  actions: {
    set(brand) {
      this.Brand = brand
    },
  },
  getters: {
    get: (state) => state.Brand,
  },
})
export const UserInfo = defineStore('UserInfo', {
  state: () => ({
    User: {},
  }),
  actions: {
    set(data) {
      this.User = data
    },
  },
  getters: {
    get: (state) => state.User,
  },
})
export const ListOrder = defineStore('ListOrder', {
  state: () => ({
    List: [],
  }),
  actions: {
    set(list) {
      this.List = list
    },
  },
  getters: {
    get: (state) => state.List,
  },
})
