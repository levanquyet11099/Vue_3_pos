<template>
  <v-card class="border-none">
    <v-toolbar color="primary" class="pl-[15vw] h-[60px]" style="display: flex">
      <v-tabs v-model="tab">
        <v-tab
          v-for="(item, index) in items"
          :key="index"
          :text="item"
          :value="item"
          :class="[tab === index ? 'bg-white' : 'bg-gray-300']"
          class="realvite rounded-t-lg ml-2 border-b-none my-auto pt-[10px]"
          style="height: 35px; margin-bottom: 0 !important"
          @click="changeTab(index)"
        ></v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-window v-model="tab" class="ml-[75px]">
      <v-tabs-window-item v-for="(item, index) in items" :key="item + index" :value="item">
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
export default {
  data() {
    return {
      tab: 0,
      items: ['hóa đơn 1', 'hóa đơn 2', 'hóa đơn 3', 'hóa đơn 4', 'hóa đơn 5'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  methods: {
    changeTab(tab) {
      this.tab = tab
    },
  },
}
</script>