<script setup lang="ts">
import type { TComponentConfig, TFormSchema } from '@/types/schema'
import { ref } from 'vue'

const formSchema = defineModel<TFormSchema>('formSchema', { required: true })

const _formData = ref<{ [key: string]: any }>()

const selectedConfig = defineModel<TComponentConfig | null>('selectedConfig')

const dialogFormVisible = ref(false)
const previewFormData = ref<{ [key: string]: any }>()
</script>

<template>
  <div class="middle_area">
    <el-icon class="preview" @click="dialogFormVisible = true"><i-ep-View /></el-icon>

    <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible" title="表单预览" width="500">
      <form-render v-model="previewFormData" v-model:form-schema="formSchema"></form-render>
    </el-dialog>

    <div class="canvas_area" :class="{ option_hint: !formSchema.formContentConfigList.length }">
      <el-form :model="_formData" style="height: 100%" v-bind="formSchema.formAreaConfig.attrs">
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
  position: relative;
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 10px;
  .preview {
    position: absolute;
    right: 10px;
  }
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
