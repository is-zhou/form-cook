<script setup lang="ts">
import { watch } from 'vue'
import { getComponent, type ComponentConfig, type LayoutCompConfig } from 'form-cook-render'
import Sortable from 'sortablejs'
import { nanoid } from 'nanoid'
import { useMaterialsStore } from '@/stores/cook'
import { cloneComponentConfig } from '@/utils'

type TDragCurrent = { item: { _underlying_vm_: ComponentConfig } }

const config = defineModel<LayoutCompConfig>('layoutCompConfig', { required: true })

const selectedConfig = defineModel<ComponentConfig | null>('selectedConfig', {
  required: true,
})

const { formData } = defineProps<{ formData: { [key: string]: any } }>()

const handleSelectChange = (element: ComponentConfig | null) => {
  selectedConfig.value = element
}

const handleSelected = (res: ComponentConfig) => {
  handleSelectChange(res)
}
const emits = defineEmits(['onDel'])
const handleDel = () => {
  emits('onDel')
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
const id = ref(`layout_${nanoid(10)}`)
const materialsStore = useMaterialsStore()
const onCompMounted = () => {
  const target = document.querySelector(`.${id.value}`) as HTMLElement
  new Sortable(target, {
    group: {
      name: 'form',
    },
    animation: 150,
    onAdd: function (/**Event*/ evt) {
      const index = evt.newIndex!
      const cloneType = cloneComponentConfig(materialsStore.materials[evt.oldIndex!])
      config.value.children?.splice(index, 0, cloneType)
      handleSelected(cloneType)
      evt.item.parentNode?.removeChild(evt.item)
    },
  })
}
const drag = ref()
watch(
  () => drag.value,
  () => {
    if (drag.value) {
      onCompMounted()
    }
  },
  { deep: true },
)
</script>

<template>
  <component
    ref="drag"
    :is="getComponent(config.componentName) || config.componentName"
    :key="config.id"
    v-bind="getAttrs(config)"
    :style="config.style"
    :class="{
      selected: selectedConfig?.id === config.id,
      unVisible: !getVisible(config),
      layout: true,
      [id]: true,
    }"
    @click.stop="handleSelectChange(config)"
  >
    <RenderFormItem
      :form-data="formData"
      v-model:configList="config.children"
      v-model:selectedConfig="selectedConfig"
    ></RenderFormItem>
    <el-icon
      v-if="selectedConfig?.id === config.id"
      @click.stop="handleDel()"
      class="current_del"
      size="12"
    >
      <i-ep-Delete />
    </el-icon>
  </component>
</template>

<style scoped lang="scss">
.layout {
  border: #cbcdd3 dashed 1px;
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
