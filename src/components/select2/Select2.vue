<template>
  <div class="flex">
    <multiselect
      v-model="selectedProduct"
      :options="products"
      :searchable="true"
      :close-on-select="true"
      :clear-on-select="true"
      :preserve-search="true"
      placeholder="Nhập mã, tên sản phẩm (F3)"
      label="product_name"
      track-by="id"
      :custom-label="customLabel"
      @search-change="onSearchChange"
      class="min-w-[20vw] rounded-full h-[39px] max-w-[25vw]"
    >
      <template #option="props">
        <div class="option">
          <img
            :src="
              props.option.thumb_url || 'https://static.salekit.com//public/images/no-image.png'
            "
            class="option-image"
          />
          <span>{{ props.option.product_name }}</span>
        </div>
      </template>
    </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'ProductSelect',
  components: { Multiselect },
  props: {
    products: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      selectedProduct: this.modelValue,
    }
  },
  watch: {
    modelValue(val) {
      this.selectedProduct = val
    },
    selectedProduct(val) {
      this.$emit('update:modelValue', val)
    },
  },
  methods: {
    customLabel(option) {
      return `${option.product_name} - ${option.sku}`
    },
    onSearchChange(searchQuery) {
      this.$emit('search-change', searchQuery)
    },
  },
}
</script>

<style scoped>
.option {
  display: flex;
  align-items: center;
}
.option-image {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.multiselect__tags {
  border: none !important;
  height: 35px !important;
  min-height: 35px !important;
}
.multiselect__tags:hover {
  border: none !important;
  height: 35px !important;
  min-height: 35px !important;
}
.multiselect,
.multiselect__input,
.multiselect__single {
  height: 20px !important;
}
.multiselect__tags-wrap {
  height: 35px !important;
}
</style>
