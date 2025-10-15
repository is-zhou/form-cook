<script setup lang="ts">
import { useSchemaStore } from '@/stores/schema'
import { deepCloneAndModify, insertNodeAt, removeNode } from '@/utils'
import { getComponent, type ComponentConfig, type LayoutCompConfig } from 'form-cook-render'
import cloneDeep from 'lodash/cloneDeep'
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

const emits = defineEmits(['onDel', 'onCopy'])
const handleDel = () => {
  emits('onDel')
  handleSelectChange(null)
}

const handleCopy = (index: number) => {
  if (config.value.componentType === 'form' || !config.value.children?.length) {
    return
  }
  const target = deepCloneAndModify(config.value.children[index] as ComponentConfig)

  config.value.children.splice(config.value.children.length, 0, target)
}

function getAttrs(node: ComponentConfig) {
  const attrs = cloneDeep(node.attrs)

  if (node.componentName === 'ArrayContainer') {
    attrs.formData = formData
  }

  if (node.componentType === 'form') {
    if (typeof node.attrs.disabled === 'function') {
      const isVisible = node.attrs.disabled({ formData: formData, schemaItem: node })
      attrs.disabled = !!isVisible
    }

    if (typeof node.attrs.readonly === 'function') {
      const isVisible = node.attrs.readonly({ formData: formData, schemaItem: node })
      attrs.readonly = !!isVisible
    }
    if (typeof node.attrs.options !== 'undefined') {
      if (!Array.isArray(node.attrs.options)) {
        attrs.options = [{ label: '动态选项', value: '动态选项' }]
      } else {
        attrs.options = node.attrs.options
      }
    }
    if (typeof node.attrs.data !== 'undefined') {
      if (!Array.isArray(node.attrs.data)) {
        attrs.data = [{ label: '动态选项', value: '动态选项' }]
      } else {
        attrs.data = node.attrs.data
      }
    }
  }

  return attrs
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
let sortable: Sortable | null = null

const onCompMounted = () => {
  let target = document.querySelector(`.${id.value}`) as HTMLElement
  if (config.value.componentName === 'FormItem') {
    target = document.querySelector(`.${id.value} .el-form-item__content`) as HTMLElement
  }
  if (config.value.componentName === 'ArrayContainer') {
    target = document.querySelector(`.${id.value} .array_container`) as HTMLElement
  }
  sortable = new Sortable(target, {
    group: { name: 'form' },
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    onStart(evt) {
      if (config.value.componentType !== 'layout') {
        return
      }

      ;(evt.item as HTMLElement & { _underlying_vm_: ComponentConfig | string })._underlying_vm_ =
        cloneDeep(config.value.children?.[evt.oldIndex!]!)
    },

    onAdd(evt) {
      const element = (evt.item as HTMLElement & { _underlying_vm_: ComponentConfig })
        ._underlying_vm_
      if (!element) return

      if (config.value.componentType !== 'layout') {
        return
      }

      removeNode(evt.item)

      const newIndex = getVmIndexFromDomIndex(evt.to, evt.newIndex!)
      if (typeof newIndex === 'undefined') {
        return
      }

      config.value.children?.splice(newIndex, 0, element)

      store.setSelect(element)
      console.log('layout-onAdd', evt)
    },

    onUpdate(evt) {
      if (config.value.componentType !== 'layout') {
        return
      }
      removeNode(evt.item)
      insertNodeAt(evt.from, evt.item, evt.oldIndex!)

      const oldIndex = getVmIndexFromDomIndex(evt.from, evt.oldIndex!)
      const newIndex = getVmIndexFromDomIndex(evt.to, evt.newIndex!)

      if (typeof newIndex === 'undefined' || typeof oldIndex === 'undefined') {
        return
      }

      const moved = config.value.children!.splice(oldIndex, 1)[0]
      config.value.children!.splice(newIndex, 0, moved)

      console.log('layout-onUpdate', evt)
    },

    onRemove(evt) {
      if (config.value.componentType !== 'layout') {
        return
      }
      if (evt.pullMode === 'clone' || evt.clone) {
        removeNode(evt.clone)
      }
      config.value.children?.splice(evt.oldIndex!, 1)
      console.log('layout-onRemove', evt)
    },
  })
}

watch(
  () => drag.value,
  () => {
    if (drag.value) {
      sortable?.destroy()
      onCompMounted()
    }
  },
  { deep: true },
)

onBeforeUnmount(() => {
  sortable?.destroy()
})

function getVmIndexFromDomIndex(container: HTMLElement, domIndex: number) {
  const children = Array.from(container.children).filter(
    (el) =>
      !(el as HTMLElement).classList.contains('sortable-ghost') &&
      !(el as HTMLElement).classList.contains('sortable-chosen') &&
      (el as HTMLElement).style.display !== 'none',
  )
  if (domIndex >= (children.length ?? 0)) {
    return (config.value as LayoutCompConfig).children?.length
  }
  const targetNode = children[domIndex]
  const index = children.indexOf(targetNode)
  return index === -1 ? (config.value as LayoutCompConfig).children?.length : index
}
</script>

<template>
  <template v-if="typeof config === 'string'">
    {{ config }}
  </template>
  <template v-else-if="config.componentType === 'form'">
    <el-form-item
      :prop="config.formItemAttrs.field"
      v-bind="config.formItemAttrs"
      :class="{ selected: selectedConfig?.id === config.id, unVisible: !getVisible(config) }"
      @click.stop="handleSelectChange(config)"
      :key="`item_${config.id}`"
    >
      <component
        :is="getComponent(config.componentName) || config.componentName"
        v-model="config.defaultValue"
        v-bind="getAttrs(config)"
      >
        <template v-for="(slot, name) in config?.slots" #[name!]>
          <template v-if="typeof slot === 'object'">
            <template v-if="Array.isArray(slot.options)">
              <component
                v-for="option in slot.options"
                :is="getComponent(slot.componentName)"
                v-bind="{ ...(option as object) }"
                >{{ (option as { label: string }).label }}</component
              >
            </template>
            <component v-else :is="getComponent(slot.componentName)" v-bind="slot.attrs">{{
              slot.text || '动态选项'
            }}</component>
          </template>
          <template v-else>{{ slot }}</template>
        </template>
      </component>
      <OptionList
        v-if="selectedConfig?.id === config.id"
        @del="handleDel()"
        @copy="emits('onCopy')"
      ></OptionList>
    </el-form-item>
  </template>
  <template v-else-if="config.componentType === 'layout'">
    <template v-if="config.children">
      <component
        ref="drag"
        :is="getComponent(config.componentName) || config.componentName"
        :key="`layout_${config.id}`"
        v-bind="getAttrs(config)"
        :class="{
          selected: selectedConfig?.id === config.id,
          unVisible: !getVisible(config),
          layout: true,
          [id]: true,
        }"
        @click.stop="handleSelectChange(config)"
      >
        <template v-for="(child, i) in config.children">
          <template v-if="typeof config.children[i] !== 'string'">
            <RenderFormItem
              v-model:config="config.children[i]"
              :form-data="formData"
              @onDel="config.children?.splice(i, 1)"
              @onCopy="handleCopy(i)"
            ></RenderFormItem>
          </template>
        </template>
        <OptionList
          v-if="selectedConfig?.id === config.id"
          @del="handleDel()"
          @copy="emits('onCopy')"
        ></OptionList>
      </component>
    </template>
    <template v-if="config.slots">
      <component
        :is="getComponent(config.componentName) || config.componentName"
        v-bind="getAttrs(config)"
        :class="{
          selected: selectedConfig?.id === config.id,
          unVisible: !getVisible(config),
          [id]: true,
        }"
        @click.stop="handleSelectChange(config)"
      >
        <template v-for="(slot, name) in config?.slots" #[name!]>
          <template v-if="typeof slot === 'object'">
            <component :is="getComponent(slot.componentName)" v-bind="slot.attrs">
              {{ slot.text }}
            </component>
          </template>
          <template v-else>
            {{ slot }}
            <OptionList
              v-if="selectedConfig?.id === config.id"
              @del="handleDel()"
              @copy="emits('onCopy')"
            ></OptionList>
          </template>
        </template>
      </component>
    </template>
  </template>
</template>

<style scoped lang="scss">
.layout {
  border: #cbcdd3 dashed 1px;
  min-height: 30px;
  padding: 6px;
}
.selected {
  position: relative;
  border: var(--el-color-primary) solid 1px;
}
.unVisible {
  background-color: rgb(245, 244, 244) !important;
  padding: 2px 0;
}
</style>
