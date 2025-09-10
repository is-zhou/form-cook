<script setup lang="ts">
import type { TComponentConfig } from '@/types/schema'
import VueDraggable from 'vuedraggable'
import { componentsMap, type TComponentName } from '@/components/FormRender/componentMap.ts'

type TDragCurrent = { item: { _underlying_vm_: TComponentConfig } }

const configList = defineModel<TComponentConfig[]>('configList', { required: true })
const selectedConfig = defineModel<TComponentConfig | null>('selectedConfig', {
  required: true,
})

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
            :is="componentsMap[element.componentName as TComponentName] || element.componentName"
            :key="element.id"
            v-bind="element.attrs"
            :style="element.style"
            :class="{ selected: selectedConfig?.id === element.id }"
          >
            <DraggableArea
              v-model:configList="element.children"
              v-model:selectedConfig="selectedConfig"
            ></DraggableArea>
            <el-icon
              v-if="selectedConfig?.id === element.id"
              @click.stop="handleDel(index)"
              class="current_del"
              size="12"
            >
              <i-ep-Delete />
            </el-icon>
          </component>
        </template>
        <el-form-item
          v-else
          :prop="element.formItemAttrs.field"
          v-bind="element.formItemAttrs"
          :class="{ selected: selectedConfig?.id === element.id }"
        >
          <component
            :is="componentsMap[element.componentName as TComponentName] || element.componentName"
            :key="element.id"
            v-model="element.defaultValue"
            v-bind="element.attrs"
          >
            <template v-for="slot in element?.slots" #[slot?.name]>
              <component
                v-for="option in slot.options"
                :is="componentsMap[slot.componentName as TComponentName]"
                :value="option.value"
                >{{ option.label }}</component
              >
            </template>
          </component>
          <el-icon
            v-if="selectedConfig?.id === element.id"
            @click.stop="handleDel(index)"
            class="current_del"
            size="12"
          >
            <i-ep-Delete />
          </el-icon>
        </el-form-item>
      </div>
    </template>
  </VueDraggable>
</template>

<style scoped lang="scss">
.drag_container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-bottom: 10px;
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
</style>
