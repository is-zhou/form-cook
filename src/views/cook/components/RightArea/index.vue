<script setup lang="ts">
import type { TComponentConfig, TFormAreaConfig } from '@/types/schema'
import { ref, watch } from 'vue'
import setters from '@/setters'
import formAreaSetterList from '@/setters/formArea.ts'
import publicFormSetterList from '@/setters/publicForm.ts'
import publicSetterList from '@/setters/public.ts'

const componentConfig = defineModel<TComponentConfig | null>('componentConfig')
const formAreaConfig = defineModel<TFormAreaConfig>('formAreaConfig', { required: true })

const activeName = ref<'component' | 'formArea'>('formArea')

const componentSetterList = ref<Array<TComponentConfig>>()

watch(
  () => componentConfig.value,
  () => {
    activeName.value = componentConfig.value ? 'component' : 'formArea'

    if (componentConfig.value) {
      componentSetterList.value = [
        ...publicSetterList,
        ...publicFormSetterList,
        ...(setters.setters[componentConfig.value.componentName] || []),
      ]
    }
  },
  {
    immediate: true,
  },
)
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
