<script setup lang="ts">
import { ref } from 'vue'
import VueDraggable from 'vuedraggable'
import material from '@/materials/index'
import type { Material } from '@/types/material'
import type { TComponentConfig } from '@/types/schema'
import { cloneDeep } from 'lodash'
import IconInput from '@/components/MaterialIcons/IconInput.vue'
import materialIconMap from '@/components/MaterialIcons/index'

const materials = ref<Material[]>([...material.materialFormList, ...material.materialLayoutList])

const emits = defineEmits<{ (e: 'clickPushContentItem', value: TComponentConfig): void }>()

const pushContentItem = (current: Material) => {
  return cloneComponentConfig(current)
}

const handleClick = (current: Material) => {
  emits('clickPushContentItem', cloneComponentConfig(current))
}

function cloneComponentConfig(current: Material) {
  const materialContent: TComponentConfig = cloneDeep(current.materialContent)
  materialContent.id = `id_${Date.now()}`

  if (materialContent.componentType === 'form') {
    materialContent.formItemAttrs.field = `field_${Date.now()}`
  }
  return materialContent
}
</script>

<template>
  <el-scrollbar height="100%">
    <div class="left_area">
      <VueDraggable
        v-model="materials"
        :group="{ name: 'form', pull: 'clone', put: false }"
        :clone="pushContentItem"
        :sort="false"
        tag="div"
        item-key="label"
        class="drag_wrap"
      >
        <template #item="{ element }">
          <div class="material_item" @click.stop="handleClick(element)">
            <div>{{ element.label }}</div>
            <component :is="materialIconMap[element.icon] || IconInput"></component>
          </div>
        </template>
      </VueDraggable>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.left_area {
  width: 330px;
  background-color: #fff;
  padding: 6px;
  min-height: calc(100vh - 42px);
  margin-right: 8px;
  .drag_wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    :hover {
      cursor: move;
    }
    .material_item {
      display: flex;
      flex-direction: column;
      align-items: center;

      border: 1px dashed #dcdfe6;
      padding: 6px;
      border-radius: 10px;
      font-size: 12px;
    }
  }
}
</style>
