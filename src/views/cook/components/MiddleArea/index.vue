<script setup lang="ts">
import { ref, watch } from 'vue'
import IconPull from '@/components/icon/IconPull.vue'

import { useResizable } from '@/hooks/useResizable'
import type { ComponentConfig, FormSchema } from 'form-cook-render'

const formSchema = defineModel<FormSchema>('formSchema', { required: true })

const _formData = ref<{ [key: string]: any }>({})

const selectedConfig = defineModel<ComponentConfig | null>('selectedConfig')

const parentRef = ref<HTMLElement | null>(null)
const targetRef = ref<HTMLElement | null>(null)
const handleRef = ref<HTMLElement | null>(null)

const { width, isUpdateWidth } = useResizable(handleRef, targetRef, {
  parent: parentRef,
  defaultWidth: 375,
})
</script>

<template>
  <div class="middle_area" ref="parentRef">
    <div class="canvas_wrap" :style="{ width: `${width + 10}px` }">
      <el-scrollbar height="100%">
        <div
          ref="targetRef"
          class="canvas_area"
          :class="{ option_hint: !formSchema.formContentConfigList.length }"
        >
          <el-form :model="_formData" v-bind="formSchema.formAreaConfig.attrs">
            <DraggableArea
              class="area_hight"
              :form-data="_formData"
              v-model:configList="formSchema.formContentConfigList"
              v-model:selectedConfig="selectedConfig"
            ></DraggableArea>
          </el-form>
        </div>
      </el-scrollbar>

      <div class="handle_pull" :class="{ updateWidth: isUpdateWidth }">
        <span ref="handleRef"><IconPull></IconPull></span>{{ width }}px
      </div>
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
  padding: 10px 10px;
  margin-top: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 10px;

  background: #f0f0f0;
  background-image: radial-gradient(#dcdcdc 1px, transparent 1px);
  background-size: 20px 20px;

  border: #dcdcdc dashed 1px;

  overflow: hidden;

  // background-color: #fafafa; /* 主背景色 */
  // background-image:
  //   linear-gradient(to right, #e5e5e5 1px, transparent 1px),
  //   linear-gradient(to bottom, #e5e5e5 1px, transparent 1px);
  // background-size: 20px 20px; /* 每个小格子大小 */

  // background-color: #1e1e1e;
  // background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  // background-size: 20px 20px;
  .area_options {
    position: absolute;

    display: flex;

    align-items: center;
    justify-content: flex-start;
    right: 10px;
    img {
      width: 20px;
    }
  }
  .canvas_wrap {
    position: relative;

    .handle_pull {
      display: flex;
      align-items: center;
      gap: 6px;

      position: absolute;
      top: 50%;
      right: -2px;

      transform: translate(100%, -50%);

      user-select: none;
      -webkit-user-drag: none;

      width: 100px;
      height: 20px;
      font-size: 12px;
      color: #ced0d5;

      &.updateWidth {
        svg {
          fill: var(--el-color-primary);
        }
      }

      span {
        display: block;
        width: 20px;
        height: 20px;
        padding: 0;
        margin: 0;
      }
      svg {
        width: 100%;
        height: 100%;
        fill: #ced0d5;
        cursor: ew-resize;
      }
      &:hover {
        svg {
          fill: var(--el-color-primary);
        }
      }
    }
  }

  .canvas_area {
    width: 100%;
    background-color: #fff;
    padding: 10px;

    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-shadow:
      0 0 0 1px #ddd,
      0 2px 6px rgba(0, 0, 0, 0.05);

    .area_hight {
      min-height: calc(100vh - 40px - 20px - 40px);
    }

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
