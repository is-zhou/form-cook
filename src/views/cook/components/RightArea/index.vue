<script setup lang="ts">
import type { TComponentConfig, TFormAreaConfig } from '@/types/schema'
import { ref, watch } from 'vue'
import ConfigFormRender from './ConfigFormRender.vue'

const componentConfig = defineModel<TComponentConfig | null>('componentConfig')
const formAreaConfig = defineModel<TFormAreaConfig>('formAreaConfig', { required: true })

const activeName = ref<'component' | 'formArea'>('formArea')
const componentSetters: TComponentConfig[] = [
  {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: { field: 'clearable', label: '显示清除按钮' },
    attrs: {},
    defaultValue: '',
  },
]
const formAreaSetters: TComponentConfig[] = [
  {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: { field: 'inline', label: '行内表单模式' },
    attrs: {},
    defaultValue: '',
  },
]
watch(
  () => componentConfig.value,
  () => {
    activeName.value = componentConfig.value?.componentType === 'form' ? 'component' : 'formArea'
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="right_area">
    <el-tabs v-model="activeName" type="border-card" style="min-height: 100%">
      <el-tab-pane label="组件配置" name="component">
        <ConfigFormRender
          v-if="componentConfig"
          :form-data="componentConfig"
          :config-list="componentSetters || []"
        ></ConfigFormRender>
      </el-tab-pane>
      <el-tab-pane label="表单域配置" name="formArea">
        <ConfigFormRender
          v-if="formAreaConfig"
          :form-data="formAreaConfig.attrs"
          :config-list="formAreaSetters || []"
        ></ConfigFormRender>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.right_area {
  width: 330px;
  height: 100%;
  overflow: auto;
  background-color: #fff;
}
</style>
