<template>
  <div>
    <select ref="select" class="form-select" style="width: 100%">
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

  <script lang="ts" setup>
import $ from 'jquery'
import 'select2/dist/css/select2.min.css'
import 'select2'

export default {
  name: 'SelectTwo',
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number, Array],
      default: null,
    },
  },
  mounted() {
    // $(this.$refs.select).select2().val(this.value).trigger('change')

    $(this.$refs.select).on('change', () => {
      this.$emit('input', $(this.$refs.select).val())
    })
  },
  watch: {
    value(value) {
      $(this.$refs.select).val(value).trigger('change')
    },
    options(options) {
      $(this.$refs.select).select2({ data: options })
    },
  },
  beforeUnmount() {
    $(this.$refs.select).select2('destroy')
  },
}
</script>

  <style scoped>
/* CSS của bạn */
</style>
