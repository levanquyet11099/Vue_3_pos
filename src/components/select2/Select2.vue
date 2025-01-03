<template>
  <select ref="select" class="w-full">
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, toRefs } from 'vue'
import $ from 'jquery'
import 'select2/dist/css/select2.min.css'
import 'select2'

// Định nghĩa props
const props = defineProps({
  options: {
    type: Array as PropType<Array<{ id: string | number; text: string }>>,
    required: true,
  },
  modelValue: {
    type: [String, Number, Array],
    default: null,
  },
})
const emit = defineEmits(['update:modelValue'])

// refs
const select = ref<HTMLSelectElement | null>(null)

// Hàm xử lý khi lựa chọn thay đổi
const updateValue = () => {
  if (select.value) {
    emit('update:modelValue', $(select.value).val())
  }
}

// Khởi tạo Select2
onMounted(() => {
  $(select.value).select2()

  // Gán giá trị ban đầu
  $(select.value).val(props.modelValue).trigger('change')

  // Thêm sự kiện change
  $(select.value).on('change', updateValue)
})

// Cập nhật giá trị khi props.modelValue thay đổi
watch(
  () => props.modelValue,
  (newValue) => {
    if (select.value) {
      $(select.value).val(newValue).trigger('change')
    }
  }
)

// Cập nhật lại danh sách options
watch(
  () => props.options,
  (newOptions) => {
    if (select.value) {
      $(select.value).empty()
      newOptions.forEach((option) => {
        $(select.value).append(new Option(option.text, option.id))
      })
      $(select.value).select2() // Cập nhật select2
    }
  }
)

// Hủy Select2 khi component bị unmount
onBeforeUnmount(() => {
  if (select.value) {
    $(select.value).select2('destroy')
  }
})
</script>

<style scoped>
/* CSS nếu cần */
</style>
