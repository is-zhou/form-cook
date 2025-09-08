<script setup lang="ts">
import { ref } from 'vue'
import VueDraggable from 'vuedraggable'
type DraggableItem = {
  label: string
  key: string
}
const list = ref<DraggableItem[]>([
  { label: '标签1', key: '1' },
  { label: '标签2', key: '2' },
])
const pushContentItem = (current: DraggableItem) => {
  return current
}
</script>

<template>
  <div class="left_area">
    <VueDraggable
      v-model="list"
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
