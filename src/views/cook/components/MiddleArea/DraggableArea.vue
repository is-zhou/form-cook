<script setup lang="ts">
import type { TComponentConfig } from '@/types/schema'
import VueDraggable from 'vuedraggable'
import { componentsMap, type TComponentName } from '@/components/FormRender/componentMap.ts'
import type { Component } from 'vue'

type TDragCurrent = { item: { _underlying_vm_: TComponentConfig } }

const configList = defineModel<TComponentConfig[]>('configList', { required: true })
const selectedConfig = defineModel<TComponentConfig | null>('selectedConfig', {
  required: true,
})

const cMap: {
  [key in TComponentName]: Component | string
} = componentsMap

const handleSelectChange = (element: TComponentConfig | null) => {
  selectedConfig.value = element
}

const handleSelected = (res: TDragCurrent) => {
  handleSelectChange(res.item._underlying_vm_)
}

const handleDel = (index: number) => {
  configList.value?.splice(index, 1)
  handleSelectChange(null)
}
</script>

<template>
  <VueDraggable
    v-model="configList"
    :animation="200"
    :disabled="false"
    @add="handleSelected"
    @end="handleSelected"
    group="form"
    tag="div"
    item-key="id"
    class="drag_container"
  >
    <template #item="{ index, element }">
      <div class="component_wrap" @click.stop="handleSelectChange(element)">
        <template v-if="element.children">
          <component
            :is="cMap[element.componentName as TComponentName] || element.componentName"
            :key="element.id"
            v-bind="element.attrs"
            :style="element.style"
            :class="{ selected: selectedConfig?.id === element.id }"
          >
            <DraggableArea
              v-model:configList="element.children"
              v-model:selectedConfig="selectedConfig"
            ></DraggableArea>
          </component>
        </template>
        <el-form-item
          v-else
          :prop="element.formItemAttrs.field"
          v-bind="element.formItemAttrs"
          :class="{ selected: selectedConfig?.id === element.id }"
        >
          <component
            :is="cMap[element.componentName as TComponentName] || element.componentName"
            :key="element.id"
            v-model="element.defaultValue"
            v-bind="element.attrs"
          >
          </component>
          <el-icon
            v-if="selectedConfig?.id === element.id"
            class="current_del"
            @click.stop="handleDel(index)"
          >
            <i-ep-Delete />
          </el-icon>
        </el-form-item>
      </div>
    </template>
  </VueDraggable>
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
        .current_del {
          position: absolute;
          bottom: 0;
          right: 0;
          cursor: pointer;
        }
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
