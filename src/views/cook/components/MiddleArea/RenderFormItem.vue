<script setup lang="ts">
import { useMaterialsStore } from '@/stores/cook'
import { useSchemaStore } from '@/stores/schema'
import { cloneComponentConfig } from '@/utils'
import { getComponent, type ComponentConfig } from 'form-cook-render'
import { nanoid } from 'nanoid'
import { storeToRefs } from 'pinia'
import Sortable from 'sortablejs'

const config = defineModel<ComponentConfig>('config', { required: true })
const { formData } = defineProps<{ formData: { [key: string]: any } }>()

const store = useSchemaStore()
const { selectedConfig } = storeToRefs(store)

const handleSelectChange = (element: ComponentConfig | null) => {
  store.setSelect(element)
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
const drag = ref()
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
      if (config.value.componentType === 'layout') {
        config.value.children?.splice(index, 0, cloneType)
        handleSelected(cloneType)
      }

      evt.item.parentNode?.removeChild(evt.item)
    },
  })
}
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
  <template v-if="config.componentType === 'form'">
    <el-form-item
      :prop="config.formItemAttrs.field"
      v-bind="config.formItemAttrs"
      :class="{ selected: selectedConfig?.id === config.id, unVisible: !getVisible(config) }"
      @click.stop="handleSelectChange(config)"
    >
      <component
        :is="getComponent(config.componentName) || config.componentName"
        :key="config.id"
        v-model="config.defaultValue"
        v-bind="getAttrs(config)"
      >
        <template v-for="(slot, name) in config?.slots" #[name!]>
          <component
            v-for="option in slot.options"
            :is="getComponent(slot.componentName)"
            v-bind="option"
            >{{ option.label }}</component
          >
        </template>
      </component>
      <el-icon
        v-if="selectedConfig?.id === config.id"
        @click.stop="handleDel()"
        class="current_del"
        size="12"
      >
        <i-ep-Delete />
      </el-icon>
    </el-form-item>
  </template>
  <template v-if="config.componentType === 'layout'">
    <template v-if="config.children">
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
          v-for="(child, i) in config.children"
          :key="child.id"
          v-model:config="config.children[i]"
          :form-data="formData"
          @onDel="config.children?.splice(i, 1)"
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
