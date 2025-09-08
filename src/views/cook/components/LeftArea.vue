<script setup lang="ts">
import { ref } from 'vue'
import VueDraggable from 'vuedraggable'
import input from '@/materials/form/input'
import type { Material } from '@/types/material'

const materials = ref<Material[]>([input])

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
    >
      <template #item="{ element }">
        <div>
          <div>{{ element.label }}</div>
          <div></div>
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
}
</style>
