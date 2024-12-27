<template>
  <div class="h-[50px] bg-blue w-full">
    <div class="flex gap-4 ml-[20vw] pt-[15px]">
      <div
        v-for="(n, index) in items"
        :key="n.key"
        :text="`Item ${n.title}`"
        :value="n.title"
        class="bg-white rounded-t-[10px] w-[120px] cursor-pointer items-center justify-center h-[35px] text-center flex"
      >
        <div class="flex no-wrap text-center pt-[5px]">
          {{ n.title }}
          <button v-if="index != 0" @click="deleteTab(index)">
            <IconDeleteTab></IconDeleteTab>
          </button>
        </div>
      </div>
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
<script>
import IconAddTab from '@/components/icons/IconAddTab.vue'
import IconDeleteTab from '@/components/icons/IconDeleteTab.vue'
import TheWelcome from '@/components/TheWelcome.vue'
export default {
  components: {
    IconAddTab,
    IconDeleteTab,
    TheWelcome,
  },
  data() {
    return {
      tab: 0,
      items: [
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
          products: [
            { id: 14, product_name: 'name_product', price: 1000, quantity: 1, total: 1000 },
          ],
        },
      ],
      itemSelect: {},
    }
  },
  methods: {
    changeTab(tab) {
      this.tab = tab
    },
    addTab() {
      const maxKey = this.items.length ? Math.max(...this.items.map((item) => item.key)) : 0
      this.items.push({ title: 'Hóa đơn ' + (maxKey + 1), key: maxKey + 1 })
      this.tab = this.items.length - 1
    },
    deleteTab(index) {
      if (index <= 0) {
        return
      }
      this.items.splice(index, 1)

      // Nếu không còn tab nào, đặt tab về 0
      if (this.items.length === 0) {
        this.tab = 0
        return
      }

      // Nếu tab hiện tại là tab cuối cùng, chọn tab trước đó
      if (this.tab >= index) {
        this.tab = Math.max(index - 2, 0) // Đảm bảo không dưới 0
      }
    },
    deleteProduct(index) {
      this.itemSelect.products.splice(index, 1)
    },
  },
}
</script>