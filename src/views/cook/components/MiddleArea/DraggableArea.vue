<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import { watch } from 'vue'
import { cloneDeep } from 'lodash'
import { getComponent, type ComponentConfig, type ComponentName } from 'form-cook-render'

type TDragCurrent = { item: { _underlying_vm_: ComponentConfig } }

const configList = defineModel<ComponentConfig[]>('configList', { required: true })
const selectedConfig = defineModel<ComponentConfig | null>('selectedConfig', {
  required: true,
})

let preSelectedConfig: ComponentConfig | null

const handleSelectChange = (element: ComponentConfig | null) => {
  selectedConfig.value = element
}

const handleSelected = (res: TDragCurrent) => {
  handleSelectChange(res.item._underlying_vm_)
}

const handleDel = (index: number) => {
  configList.value?.splice(index, 1)
  handleSelectChange(null)
}

watch(
  () => configList.value,
  () => {
    const target = configList.value.find((i) => i.id === selectedConfig.value?.id)
    const preTarget = configList.value.find((i) => i.id === preSelectedConfig?.id)

    if (selectedConfig.value && !target) {
      preSelectedConfig = cloneDeep(selectedConfig.value)
    }
    if (!configList.value.length) {
      handleSelectChange(null)
      return
    }

    handleSelectChange(target || preTarget || null)
  },
  { deep: true, immediate: true },
)
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
            :is="getComponent(element.componentName) || element.componentName"
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
            :is="getComponent(element.componentName) || element.componentName"
            :key="element.id"
            v-model="element.defaultValue"
            v-bind="element.attrs"
          >
            <template v-for="(slot, name) in element?.slots" #[name]>
              <component
                v-for="option in slot.options"
                :is="getComponent(slot.componentName)"
                v-bind="option"
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
