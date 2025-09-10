<script setup lang="ts">
import { ref, useAttrs, watch } from 'vue'
import { stringify } from 'javascript-stringify'

const $attrs = useAttrs()

const resultValue = defineModel()
const text = ref(resultValue.value)
const errMsg = ref('')

watch(
  () => resultValue.value,
  () => {
    try {
      errMsg.value = ''
      const serialized = stringify(resultValue.value)
      text.value = serialized
    } catch (error) {
      errMsg.value = `序列化失败：${error}`
    }
  },
)

const handleSave = () => {
  try {
    errMsg.value = ''
    resultValue.value = new Function(`return (${text.value})`)()
  } catch (error) {
    errMsg.value = `反序列化失败：${error}`
  }
}
</script>
<template>
  <el-input
    v-model="text"
    :autosize="{ minRows: 6 }"
    @blur="handleSave"
    type="textarea"
    placeholder="Please input"
    v-bind="$attrs"
  />
  <span class="errMsg" v-if="errMsg">{{ errMsg }}</span>
</template>

<style scoped lang="scss">
.errMsg {
  font-size: 12px;
  color: var(--el-color-danger);
}
</style>
