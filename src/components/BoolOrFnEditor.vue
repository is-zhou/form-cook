<script setup lang="ts">
import { ElSwitch, ElRadioGroup, ElRadioButton } from 'element-plus'
import { SerializeInput } from 'vue-serialize-input'

const modelValue = defineModel<boolean | Function | undefined>()

const booleanValue = ref()

const functionValue = ref()

// 内部模式：boolean | function
const mode = ref<'boolean' | 'function'>(
  typeof modelValue.value === 'function' ? 'function' : 'boolean',
)

watch(
  () => modelValue.value,
  (val) => {
    if (typeof val === 'function') {
      mode.value = 'function'
      functionValue.value = val
    } else {
      mode.value = 'boolean'
      booleanValue.value = val
    }
  },
  { immediate: true },
)

watch(
  () => [mode, functionValue.value, booleanValue.value],
  () => {
    if (mode.value === 'boolean') {
      modelValue.value = booleanValue.value
    } else if (mode.value === 'function') {
      modelValue.value = functionValue.value || (() => true)
    }
  },
  {
    deep: true,
  },
)
</script>

<template>
  <div style="width: 100%">
    <!-- 模式切换 -->
    <ElRadioGroup v-model="mode" size="small" class="custom_radiogroup">
      <ElRadioButton label="boolean" style="width: 50%">布尔值</ElRadioButton>
      <ElRadioButton label="function" style="width: 50%">函数</ElRadioButton>
    </ElRadioGroup>

    <!-- 布尔模式 -->
    <div class="mode_bool" v-if="mode === 'boolean'">
      <el-radio-group v-model="booleanValue" class="ml-2">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
        <el-radio :label="undefined">不设置</el-radio>
      </el-radio-group>
    </div>

    <!-- 函数模式 -->
    <div v-if="mode === 'function'">
      <SerializeInput
        type="textarea"
        autosize
        v-model="functionValue"
        placeholder="(prams) => { ... }"
        serialize-type="function"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.custom_radiogroup {
  width: 100%;
  ::v-deep(.el-radio-button__inner) {
    width: 100%;
  }
}
.mode_bool {
  width: 100%;
  text-align: center;
  margin-top: 8px;
}
</style>
