<script setup lang="ts">
import type { TComponentConfig, TFormSchema } from '@/types/schema'
import { ref, watch } from 'vue'
import VueDraggable from 'vuedraggable'
import { componentsMap } from './componentMap.ts'
import { ElForm, ElFormItem } from 'element-plus'

const formSchema = defineModel<TFormSchema>('formSchema', { required: true })
const _formData = ref<{ [key: string]: any }>()

const currentSelectId = defineModel<string>('currentSelectId')

const handleSelectChange = (element: TComponentConfig | null) => {
  currentSelectId.value = element?.id
}
</script>

<template>
  <div class="middle_area">
    <div class="canvas_area" :class="{ option_hint: !formSchema.formContentConfigList.length }">
      <el-form :model="_formData" style="height: 100%">
        <VueDraggable
          v-model="formSchema.formContentConfigList"
          :animation="200"
          :disabled="false"
          group="form"
          tag="div"
          item-key="id"
          class="drag_container"
        >
          <template #item="{ element }">
            <div class="component_wrap" @click.stop="handleSelectChange(element)">
              <el-form-item
                :prop="element.formItemAttrs.field"
                v-bind="element.formItemAttrs"
                :class="{ selected: currentSelectId === element.id }"
              >
                <component
                  :is="componentsMap[element.componentName]"
                  :key="element.id"
                  v-model="element.defaultValue"
                  v-bind="element.attrs"
                >
                </component>
              </el-form-item>
            </div>
          </template>
        </VueDraggable>
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
  .drag_container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding-bottom: 20px;
    .component_wrap {
      .selected {
        position: relative;
        border: var(--el-color-primary) dashed 1px;
      }
    }
    ::v-deep(.sortable-ghost) {
      position: relative;
      width: 100%;
      height: 6px;
      overflow: hidden;
      border: none !important;
      &::before {
        content: '';
        display: block;

        position: absolute;

        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: var(--el-color-primary);
        z-index: 10000000;
      }
    }
  }
}
</style>
