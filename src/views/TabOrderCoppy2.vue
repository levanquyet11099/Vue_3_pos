<script lang="ts" setup>
import IconAddTab from '@/components/icons/IconAddTab.vue'
import IconDeleteTab from '@/components/icons/IconDeleteTab.vue'
import TheWelcome from '@/components/TheWelcome.vue'
import { ref, reactive, onMounted, watchEffect, nextTick } from 'vue'

interface Product {
  id: number
  product_name: string
  price: number
  quantity: number
  total: number
}
interface Item {
  title: string
  key: number
  products: Product[]
}
// Import các thành phần cần dùng
const components = {
  IconAddTab,
  IconDeleteTab,
  TheWelcome,
}

// Reactive dữ liệu của component
const tab = ref(0)
const items = reactive<Item[]>([
  {
    title: 'Hóa đơn',
    key: 0,
    products: [
      { id: 12, product_name: 'name_product', price: 1000, quantity: 1, total: 1000 },
      { id: 13, product_name: 'name_product1', price: 1001, quantity: 1, total: 1001 },
    ],
  },
  {
    title: 'Hóa đơn 1',
    key: 1,
    products: [{ id: 14, product_name: 'name_product11', price: 1000, quantity: 1, total: 1000 }],
  },
  {
    title: 'Hóa đơn 2',
    key: 2,
    products: [{ id: 16, product_name: 'name_product2', price: 1000, quantity: 1, total: 1000 }],
  },
  {
    title: 'Hóa đơn 3',
    key: 3,
    products: [{ id: 15, product_name: 'name_product3', price: 1000, quantity: 1, total: 1000 }],
  },
  {
    title: 'Hóa đơn 4',
    key: 4,
    products: [{ id: 17, product_name: 'name_product4', price: 1000, quantity: 1, total: 1000 }],
  },
])
const itemSelect = ref<Item | null>(null)

// Khi component được mount, chọn tab đầu tiên
onMounted(() => {
  itemSelect.value = items[tab.value] || null
})
// Các phương thức
const changeTab = (newTab: number) => {
  tab.value = newTab
  itemSelect.value = items[newTab] || null
}

const addTab = () => {
  const maxKey = items.length ? Math.max(...items.map((item) => item.key)) : 0
  items.push({ title: `Hóa đơn ${maxKey + 1}`, key: maxKey + 1, products: [] })
  tab.value = items.length - 1
  itemSelect.value = items[tab.value]
}

const deleteTab = async (index: number) => {
  if (index <= 0) return // Không cho phép xóa tab đầu tiên

  // Nếu xóa phần tử cuối cùng và đang được chọnchọn, chuyển tab về phần tử trước đó
  if (index === items.length - 1 && tab.value === items.length - 1) {
    tab.value = items.length - 2 // Chuyển về phần tử kế cuối
  } else if (tab.value >= index) {
    // Nếu xóa phần tử trước tab hiện tại, điều chỉnh tab
    tab.value = tab.value - 1
  } else if (tab.value < index) {
    // Nếu xóa phần tử sau tab hiện tại, không cần điều chỉnh tab
  }
  items.splice(index, 1)
  itemSelect.value = items[tab.value]
}

const deleteProduct = (index: number) => {
  itemSelect.value?.products.splice(index, 1)
}
</script>
<template>
  <div class="h-[50px] bg-blue w-full">
    <div class="flex gap-4 ml-[20vw] pt-[15px]">
      <div
        v-for="(n, index) in items"
        :key="n.key"
        :text="`Item ${n.title}`"
        :value="n.title"
        class="bg-white rounded-t-[10px] w-[120px] cursor-pointer items-center justify-center h-[35px] text-center flex"
        :class="{ 'opacity-50': tab !== index }"
      >
        <div class="flex no-wrap text-center pt-[5px]">
          <div @click="changeTab(index)">{{ n.title }}</div>

          <button
            v-if="index != 0"
            @click="deleteTab(index)"
            class="hover:bg-gray-200 hover:rounded-lg ml-2"
          >
            <IconDeleteTab></IconDeleteTab>
          </button>
        </div>
      </div>
      <IconAddTab @click="addTab()" class="hover:cursor-pointer mt-[5px]" />
    </div>
  </div>
  <div>
    <TheWelcome></TheWelcome>
    <div>
      <div class="pl-[20px] ml-[70px]">
        <div class="w-[70vw] flex flex-nowrap gap-[20px] p-[12px] border-b-[2px]">
          <p class="text-[14px] text-left font-bold text-[#7a7a7a] w-2/5">Tên sản phẩm</p>
          <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5">Đơn giá</p>
          <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-1/5">Số lượng</p>
          <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5">Thành tiền</p>
          <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-1/5">Xóa</p>
        </div>
      </div>
      <div v-if="itemSelect && itemSelect.products">
        <div
          v-for="(p, index) in itemSelect.products"
          :key="p.id"
          :value="p.id"
          class="pl-[20px] ml-[70px]"
        >
          <div class="w-[70vw] flex flex-nowrap gap-[20px] p-[12px] border-b-[2px]">
            <p class="text-[14px] text-left font-bold text-[#7a7a7a] w-2/5">{{ p.product_name }}</p>
            <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5">{{ p.price }}</p>
            <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-1/5">{{ p.quantity }}</p>
            <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5">{{ p.total }}</p>
            <p
              class="text-[14px] text-center font-bold text-[#7a7a7a] w-1/5 cursor-pointer"
              @click="deleteProduct(index)"
            >
              Xóa
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
