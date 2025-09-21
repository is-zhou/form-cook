<script setup lang="ts">
import { getComponent, type ComponentConfig } from 'form-cook-render'

type TDragCurrent = { item: { _underlying_vm_: ComponentConfig } }

const configList = defineModel<ComponentConfig[]>('configList', { required: true })
const selectedConfig = defineModel<ComponentConfig | null>('selectedConfig', {
  required: true,
})
const { formData } = defineProps<{ formData: { [key: string]: any } }>()

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

function getAttrs(node: ComponentConfig) {
  if (node.componentType === 'form') {
    if (typeof node.attrs.disabled === 'function') {
      const isVisible = node.attrs.disabled({ formData: formData, schemaItem: node })
      node.attrs.disabled = !!isVisible
    }

    if (typeof node.attrs.readonly === 'function') {
      const isVisible = node.attrs.readonly({ formData: formData, schemaItem: node })
      node.attrs.readonly = !!isVisible
    }
  }

  return node.attrs
}

function getVisible(node: ComponentConfig) {
  let isVisible = true
  if (typeof node.visible === 'boolean' && !node.visible) {
    isVisible = false
  }
  if (typeof node.visible === 'function') {
    isVisible = !!node.visible({
      formData: formData,
      schemaItem: node,
    })
  }

  return isVisible
}
</script>

<template>
  <template v-for="(element, index) in configList">
    <template v-if="element.componentType === 'form'">
      <el-form-item
        :prop="element.formItemAttrs.field"
        v-bind="element.formItemAttrs"
        :class="{ selected: selectedConfig?.id === element.id, unVisible: !getVisible(element) }"
        @click.stop="handleSelectChange(element)"
      >
        <component
          :is="getComponent(element.componentName) || element.componentName"
          :key="element.id"
          v-model="element.defaultValue"
          v-bind="getAttrs(element)"
        >
          <template v-for="(slot, name) in element?.slots" #[name!]>
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
    </template>
    <template v-if="element.componentType === 'layout'">
      <template v-if="element.children">
        <RenderLayout
          :form-data="formData"
          v-model:layoutCompConfig="configList[index]"
          v-model:selectedConfig="selectedConfig"
          @onDel="handleDel(index)"
        ></RenderLayout>
      </template>
    </template>
  </template>
</template>

<style scoped lang="scss">
.layout {
  border: #cbcdd3 dashed 1px;
  min-height: 20px;
}
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
.unVisible {
  background-color: rgb(245, 244, 244) !important;
  padding: 2px 0;
}
</style>
