<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import material from '@/materials/index'
import type { Material } from '@/types/material'
import type { ComponentConfig } from 'form-cook-render'
import IconInput from '@/components/MaterialIcons/IconInput.vue'
import materialIconMap from '@/components/MaterialIcons/index'
import { cloneComponentConfig } from '@/utils'

const materials = ref<Material[]>([...material.materialFormList, ...material.materialLayoutList])

const emits = defineEmits<{ (e: 'clickPushContentItem', value: ComponentConfig): void }>()

const pushContentItem = (current: Material) => {
  return cloneComponentConfig(current)
}

const handleClick = (current: Material) => {
  emits('clickPushContentItem', cloneComponentConfig(current))
}
</script>

<template>
  <div class="left_area_wrap">
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
  </div>
</template>

<style scoped lang="scss">
.left_area_wrap {
  flex-shrink: 0;
  height: 100%;
  width: 338px;
}
.left_area {
  width: 330px;
  background-color: #fff;
  padding: 6px;
  min-height: calc(100vh - 42px);
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
