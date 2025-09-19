<script setup lang="ts">
import formAreaSetterList from '@/setters/formArea.ts'
import { cloneDeep, debounce } from 'lodash'

import type { ComponentConfig, FormAreaConfig } from 'form-cook-render'
import { objectAssignByComponentConfig, updateSettersByComponentConfig } from '@/utils'

const componentConfig = defineModel<ComponentConfig | null>('componentConfig')
const formAreaConfig = defineModel<FormAreaConfig>('formAreaConfig', { required: true })

const activeName = ref<'component' | 'formArea'>('formArea')

const componentSetterList = ref<Array<ComponentConfig>>()

const emits = defineEmits<{ (e: 'onChange'): void }>()

const debouncedChange = debounce(handleChange, 200)

watch(
  () => cloneDeep(componentConfig.value),
  (newData, oldData) => {
    if (componentConfig.value) {
      activeName.value = 'component'
      componentSetterList.value = updateSettersByComponentConfig(componentConfig.value)
    } else {
      activeName.value = 'formArea'
    }

    if (
      newData &&
      oldData &&
      newData.id === oldData.id &&
      newData.componentName !== oldData.componentName
    ) {
      objectAssignByComponentConfig(componentConfig, newData.componentName)
    }
    debouncedChange()
  },
  { deep: true, immediate: true },
)

watch(
  () => formAreaConfig.value,
  () => {
    activeName.value = 'formArea'
    debouncedChange()
  },
  { deep: true },
)

function handleChange() {
  emits('onChange')
}
</script>

<template>
  <div class="right_area">
    <el-tabs v-model="activeName" type="border-card" class="custom_tab_pane">
      <el-scrollbar height="100%">
        <el-tab-pane label="组件配置" name="component">
          <ConfigFormRender
            v-if="componentConfig"
            :key="componentConfig?.id"
            :form-data="componentConfig"
            :config-list="componentSetterList || []"
          ></ConfigFormRender>
          <div v-else class="option_hint"></div>
        </el-tab-pane>
        <el-tab-pane label="表单域配置" name="formArea">
          <ConfigFormRender
            v-if="formAreaConfig"
            :form-data="formAreaConfig"
            :config-list="formAreaSetterList || []"
          ></ConfigFormRender>
        </el-tab-pane>
      </el-scrollbar>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.right_area {
  position: relative;
  width: 330px;
  height: 100%;
  background-color: #fff;

  .custom_tab_pane {
    height: 100%;
    ::v-deep(.el-tabs__content) {
      padding-right: 0;
      padding-bottom: 0;
      .el-tab-pane {
        padding-right: 15px;
        padding-bottom: 15px;
      }
    }
  }
  .option_hint {
    position: relative;
    height: 100px;
    &::before {
      content: '请从左侧画布选中组件~';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      text-align: center;
      transform: translate(-50%, -50%);
      font-size: 14px;
      color: #909399;
    }
  }
}
</style>
