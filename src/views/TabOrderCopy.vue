<template>
  <v-card>
    <v-tabs bg-color="red-lighten-2">
      <v-tab v-for="(n, index) in items" :key="n.key" :text="`Item ${n.title}`" :value="n.title">
        <div class="flex">
          {{ n.title }}
          <v-btn
            v-if="(index = items.length - 1)"
            :disabled="!length"
            text="X"
            variant="text"
            @click="deleteTab(items.length - 1)"
          >
          </v-btn>
          <div v-else-if="index != 0"><iconAddTab></iconAddTab></div>
        </div>
      </v-tab>
    </v-tabs>

    <v-card-text class="text-center">
      <v-divider class="mx-4" vertical></v-divider>
      <v-btn
        :disabled="!length"
        text="Remove Tab"
        variant="text"
        @click="deleteTab(items.length - 1)"
      >
      </v-btn>
      <v-btn text="Add Tab" variant="text" @click="addTab()"></v-btn>
    </v-card-text>
    <v-tabs-window v-model="tab" class="ml-[75px]">
      <v-tabs-window-item v-for="(item, index) in items" :key="item + index" :value="item.title">
        <v-card flat>
          <div class="pl-[20px]">
            <div class="w-[70vw] flex flex-nowrap gap-[20px] p-[12px] border-b-[2px]">
              <p class="text-[14px] text-left font-bold text-[#7a7a7a] w-2/5">Tên sản phẩm</p>
              <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5">Đơn giá</p>
              <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-1/5">Số lượng</p>
              <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-2/5">Thành tiền</p>
              <p class="text-[14px] text-center font-bold text-[#7a7a7a] w-1/5">Xóa</p>
            </div>
          </div>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>
<script>
import iconAddTab from '@/components/icons/IconAddTab.vue'
export default {
  data() {
    return {
      length: 4,
      tab: 0,
      items: [
        { title: 'hóa đơn', key: 0 },
        { title: 'hóa đơn 1', key: 1 },
      ],
    }
  },
  watch: {},
  methods: {
    deleteTab(index) {
      if (index <= 0) {
        return
      }
      console.log(index)
      if (index === this.items.length - 1) {
        this.tab = index - 1
      }
      this.items.splice(index, 1)
    },
    addTab() {
      const maxKey = this.items.length ? Math.max(...this.items.map((item) => item.key)) : 0
      this.items.push({ title: 'hóa đơn ' + (maxKey + 1), key: maxKey + 1 })
      this.tab = this.items.length - 1
    },
    changeTab(tab) {
      this.tab = tab
    },
  },
}
</script>