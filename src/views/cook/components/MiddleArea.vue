<script setup lang="ts">
import { ref, watch } from 'vue'
import VueDraggable from 'vuedraggable'
type DraggableItem = {
  label: string
  key: string
}
const list = ref<DraggableItem[]>([])

watch(
  () => list.value,
  () => {
    console.log(list.value)
  },
)
</script>

<template>
  <div class="middle_area">
    <VueDraggable
      v-model="list"
      :animation="200"
      :disabled="false"
      group="form"
      tag="div"
      item-key="key"
      class="drag_container"
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
.middle_area {
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 10px;
  .drag_container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding-bottom: 20px;
  }
}
</style>
