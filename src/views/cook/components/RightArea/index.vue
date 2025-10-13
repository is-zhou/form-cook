<script setup lang="ts">
import formAreaSetterList from '@/setters/formArea.ts'
import { cloneDeep, debounce } from 'lodash'

import type { ComponentConfig } from 'form-cook-render'
import {
  objectAssignByComponentConfig,
  updateSettersByComponentConfig,
  updatePublicSettersByComponentConfig,
} from '@/utils'
import { useSchemaStore } from '@/stores/schema'
import { storeToRefs } from 'pinia'

const store = useSchemaStore()
const { formSchema, selectedConfig, schemaKey, selectedConfigKey } = storeToRefs(store)

const activeName = ref<'component' | 'formArea'>('formArea')

const componentSetterList = ref<Array<ComponentConfig>>()

const emits = defineEmits<{ (e: 'onChange'): void }>()

const debouncedChange = debounce(handleChange, 200)

watch(
  () => cloneDeep(selectedConfig.value),
  (newData, oldData) => {
    if (selectedConfig.value) {
      activeName.value === 'formArea' && (activeName.value = 'component')
      componentSetterList.value = updateSettersByComponentConfig(selectedConfig.value)
    } else {
      activeName.value = 'formArea'
    }

    if (
      newData &&
      oldData &&
      newData.id === oldData.id &&
      newData.componentName !== oldData.componentName
    ) {
      objectAssignByComponentConfig(selectedConfig, newData.componentName)
    }
    debouncedChange()
  },
  { deep: true, immediate: true },
)

watch(
  () => formSchema.value.formAreaConfig,
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
            v-if="selectedConfig"
            :key="selectedConfig?.id + selectedConfigKey"
            :form-data="selectedConfig"
            :config-list="componentSetterList || []"
          ></ConfigFormRender>
          <div v-else class="option_hint"></div>
        </el-tab-pane>
        <el-tab-pane label="基础配置" name="base">
          <ConfigFormRender
            v-if="selectedConfig"
            :key="selectedConfig?.id + selectedConfigKey"
            :form-data="selectedConfig"
            :config-list="updatePublicSettersByComponentConfig(selectedConfig) || []"
          ></ConfigFormRender>
          <div v-else class="option_hint"></div>
        </el-tab-pane>
        <el-tab-pane label="表单域配置" name="formArea">
          <ConfigFormRender
            v-if="formSchema.formAreaConfig"
            :key="schemaKey"
            :form-data="formSchema.formAreaConfig"
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
