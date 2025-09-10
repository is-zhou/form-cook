<script setup lang="ts">
import { ref, watch } from 'vue'
import { stringify } from 'javascript-stringify'

const resultValue = defineModel()
const text = ref(resultValue.value)

watch(
  () => resultValue.value,
  () => {
    const serialized = stringify(resultValue.value)
    text.value = serialized
  },
)

const handleSave = () => {
  resultValue.value = new Function(`return (${text.value})`)()
}
</script>
<template>
  <el-input
    v-model="text"
    :autosize="{ minRows: 6 }"
    @blur="handleSave"
    type="textarea"
    placeholder="Please input"
  />
</template>

<style scoped></style>
