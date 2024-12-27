<template>
  <v-card class="border-none">
    <v-toolbar color="primary" class="pl-[15vw] h-[60px]" style="display: flex">
      <v-tabs v-model="tab" class="max-w-[50vw]">
        <v-tab
          v-for="(item, index) in items"
          :key="index"
          :text="item.title"
          :value="item.key"
          :class="[tab === index ? '' : 'opacity-50']"
          class="realvite bg-white rounded-t-lg ml-2 border-b-none my-auto pt-[10px] hover:opacity-200 hover:bg-white hover:text-gray-900 flex justify-between items-center"
          style="height: 35px; margin-bottom: 0 !important"
          @click="changeTab(index)"
          >{{ item.title }}
          <svg
            v-if="index != 0"
            @click="deleteTab(index)"
            class="ml-2 px-auto"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5.5L5 15.5"
              stroke="#7A7A7A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 5.5L15 15.5"
              stroke="#7A7A7A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </v-tab>
        <div
          class="mt-7 ml-2 rounded-t-lg w-[35px] h-[35px] flex justify-center items-center"
          @click="addTab()"
        >
          <svg
            class="hover:fill-gray-500"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 8.5V16.5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 12.5H16"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
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
import IconAddTab from '@/components/icons/IconAddTab.vue'
export default {
  data() {
    return {
      tab: 1,
      items: [
        { title: 'hóa đơn', key: 0 },
        { title: 'hóa đơn 1', key: 1 },
      ],
    }
  },
  methods: {
    changeTab(tab) {
      this.tab = tab
    },
    addTab() {
      const maxKey = this.items.length ? Math.max(...this.items.map((item) => item.key)) : 0
      this.items.push({ title: 'hóa đơn ' + (maxKey + 1), key: maxKey + 1 })
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
  },
}
</script>