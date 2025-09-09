<script setup lang="ts">
import type { TComponentConfig, TFormSchema } from '@/types/schema'
import { ref } from 'vue'

const formSchema = defineModel<TFormSchema>('formSchema', { required: true })

const _formData = ref<{ [key: string]: any }>()

const selectedConfig = defineModel<TComponentConfig | null>('selectedConfig')
</script>

<template>
  <div class="middle_area">
    <div class="canvas_area" :class="{ option_hint: !formSchema.formContentConfigList.length }">
      <el-form :model="_formData" style="height: 100%" v-bind="formSchema.formConfig.attrs">
        <DraggableArea
          v-model:configList="formSchema.formContentConfigList"
          v-model:selectedConfig="selectedConfig"
        ></DraggableArea>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.middle_area {
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 10px;
  .canvas_area {
    width: 375px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 10px;

    &.option_hint {
      position: relative;
      &::before {
        content: '请从左侧列表拖动表单组件放置于此!';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        text-align: center;
        transform: translate(-50%, -50%);
        font-size: 16px;
        color: #909399;
      }
    }
  }
}
</style>
