<script setup lang="ts">
import { ref, type Component } from 'vue'
import VueDraggable from 'vuedraggable'
import material from '@/materials/index'
import type { Material } from '@/types/material'

import IconInput from '@/components/icon/IconInput.vue'

const iconMap: { [key: string]: Component } = { IconInput }

const materials = ref<Material[]>([...material.materialFormList, ...material.materialLayoutList])

const pushContentItem = (current: Material) => {
  return current
}
</script>

<template>
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
        <div class="material_item">
          <div>{{ element.label }}</div>
          <component :is="iconMap[element.icon] || IconInput"></component>
        </div>
      </template>
    </VueDraggable>
  </div>
</template>

<style scoped lang="scss">
.left_area {
  width: 330px;
  height: 100%;
  background-color: #fff;
  overflow: auto;
  padding: 6px;
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
