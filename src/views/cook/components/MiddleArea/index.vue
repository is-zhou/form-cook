<script setup lang="ts">
import IconPull from '@/components/icon/IconPull.vue'

import { useResizable } from '@/hooks/useResizable'
import Sortable from 'sortablejs'
import { insertNodeAt, removeNode } from '@/utils'
import { useSchemaStore } from '@/stores/schema'
import { storeToRefs } from 'pinia'
import cloneDeep from 'lodash/cloneDeep'
import type { ComponentConfig } from 'form-cook-render'

const store = useSchemaStore()
const { formSchema, selectedConfig } = storeToRefs(store)

const _formData = ref<{ [key: string]: any }>({})

const parentRef = ref<HTMLElement | null>(null)
const targetRef = ref<HTMLElement | null>(null)
const handleRef = ref<HTMLElement | null>(null)

const { width, isUpdateWidth } = useResizable(handleRef, targetRef, {
  parent: parentRef,
  defaultWidth: 375,
})

let sortable: Sortable | null = null
onMounted(() => {
  const target = document.querySelector('.canvas_area .el-form') as HTMLElement

  sortable = new Sortable(target, {
    group: { name: 'form' },
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    onStart(evt) {
      ;(evt.item as HTMLElement & { _underlying_vm_: ComponentConfig })._underlying_vm_ = cloneDeep(
        formSchema.value.formContentConfigList[evt.oldIndex!],
      )
    },

    onAdd(evt) {
      const element = (evt.item as HTMLElement & { _underlying_vm_: ComponentConfig })
        ._underlying_vm_
      if (!element) return

      removeNode(evt.item)

      const newIndex = getVmIndexFromDomIndex(evt.to, evt.newIndex!)
      formSchema.value.formContentConfigList.splice(newIndex, 0, element)

      store.setSelect(element)
      console.log('form-onAdd', evt)
    },

    onUpdate(evt) {
      removeNode(evt.item)
      insertNodeAt(evt.from, evt.item, evt.oldIndex!)

      const oldIndex = getVmIndexFromDomIndex(evt.from, evt.oldIndex!)
      const newIndex = getVmIndexFromDomIndex(evt.to, evt.newIndex!)

      const moved = formSchema.value.formContentConfigList.splice(oldIndex, 1)[0]
      formSchema.value.formContentConfigList.splice(newIndex, 0, moved)

      console.log('form-onUpdate', evt)
    },

    onRemove(evt) {
      if (evt.pullMode === 'clone' || evt.clone) {
        removeNode(evt.clone)
      }
      formSchema.value.formContentConfigList.splice(evt.oldIndex!, 1)
      console.log('form-onRemove', evt)
    },
  })
})

onBeforeUnmount(() => {
  sortable?.destroy()
})

// 工具函数
function getVmIndexFromDomIndex(container: HTMLElement, domIndex: number) {
  const children = Array.from(container.children).filter(
    (el) =>
      !(el as HTMLElement).classList.contains('sortable-ghost') &&
      !(el as HTMLElement).classList.contains('sortable-chosen') &&
      (el as HTMLElement).style.display !== 'none',
  )
  if (domIndex >= children.length) {
    return formSchema.value.formContentConfigList.length
  }
  const targetNode = children[domIndex]
  const index = children.indexOf(targetNode)
  return index === -1 ? formSchema.value.formContentConfigList.length : index
}
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
          <el-form
            style="padding-bottom: 20px"
            :model="_formData"
            v-bind="formSchema.formAreaConfig.attrs"
          >
            <template
              v-for="(config, index) in formSchema.formContentConfigList"
              :key="`form_${config.id}`"
            >
              <RenderFormItem
                :form-data="_formData"
                v-model:config="formSchema.formContentConfigList[index]"
                @onDel="formSchema.formContentConfigList.splice(index, 1)"
              ></RenderFormItem>
            </template>
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
  margin-top: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
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
    min-height: calc(100vh - 40px - 20px - 40px);
    .el-form {
      min-height: calc(100vh - 40px - 20px - 40px);
    }
    .el-form.el-form--inline.el-form--label-top {
      align-content: flex-start;
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
