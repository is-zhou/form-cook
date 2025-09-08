<script setup lang="ts">
import type { TFormSchema } from '@/types/schema'
import { ref, watch } from 'vue'
import VueDraggable from 'vuedraggable'

const formSchema = defineModel<TFormSchema>('formSchema', { required: true })
</script>

<template>
  <div class="middle_area">
    <div class="canvas_area" :class="{ option_hint: !formSchema.formContentConfigList.length }">
      <VueDraggable
        v-model="formSchema.formContentConfigList"
        :animation="200"
        :disabled="false"
        group="form"
        tag="div"
        item-key="key"
        class="drag_container"
      >
        <template #item="{ element }">
          <div>
            <div>{{ element }}</div>
            <div></div>
          </div>
        </template>
      </VueDraggable>
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
  }
}
</style>
