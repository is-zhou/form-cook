<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import { type ComponentConfig } from 'form-cook-render'

type TDragCurrent = { item: { _underlying_vm_: ComponentConfig } }

const configList = defineModel<ComponentConfig[]>('configList', { required: true })
const selectedConfig = defineModel<ComponentConfig | null>('selectedConfig', {
  required: true,
})
const handleSelectChange = (element: ComponentConfig | null) => {
  isDrag.value = false
  selectedConfig.value = element
}

const handleSelected = (res: TDragCurrent) => {
  handleSelectChange(res.item._underlying_vm_)
}

const handleDel = (index: number) => {
  configList.value?.splice(index, 1)
  handleSelectChange(null)
}

const isDrag = ref(false)
</script>

<template>
  <VueDraggable
    v-model="configList"
    :animation="200"
    :disabled="false"
    @add="handleSelected"
    @end="handleSelected"
    @start="isDrag = true"
    group="tree"
    tag="div"
    item-key="id"
    class="tree_drag_container"
  >
    <template #item="{ index, element }">
      <div
        class="component_wrap"
        @click.stop="handleSelectChange(element)"
        :class="{
          selected: selectedConfig?.id === element.id,
        }"
      >
        <div class="layout_warp" v-if="element.children" :key="element.id">
          <div style="margin-bottom: 4px">{{ element.componentName }}/{{ element.id }}</div>
          <TreeDraggableArea
            v-model:configList="element.children"
            v-model:selectedConfig="selectedConfig"
            :class="{ layout: true }"
            style="padding: 2px"
          ></TreeDraggableArea>
          <el-icon class="current_del" @click.stop="handleDel(index)" size="12">
            <i-ep-Delete />
          </el-icon>
        </div>
        <div v-else class="item_wrap">
          <img width="30px" src="../../../../assets/temp.png" alt="" />
          <div class="info">
            <div>{{ element.componentName }}/{{ element.id }}</div>
            <div>{{ element.formItemAttrs.label }}</div>
            <div>{{ element.formItemAttrs.field }}</div>
          </div>

          <el-icon class="current_del" @click.stop="handleDel(index)" size="12">
            <i-ep-Delete />
          </el-icon>
        </div>
      </div>
    </template>
  </VueDraggable>
</template>

<style scoped lang="scss">
.tree_drag_container {
  width: 100%;
  height: 100%;
  min-height: 16px;
  padding-right: 8px;

  .component_wrap {
    padding: 6px;
    border-radius: 8px;
    margin-bottom: 6px;
    font-size: 10px;

    background-color: #e3e3e4;
    color: #333639;
    overflow: hidden;
    border: transparent dashed 1px;

    cursor: move;

    &:hover {
      border: #a9a8a8 dashed 1px;
    }

    &:last-child {
      margin-bottom: 0;
    }
    &.selected {
      position: relative;
      border: var(--el-color-primary) dashed 1px;
    }
    .layout_warp {
      position: relative;
      .layout {
        background-color: #ffffff;
      }
      &:hover {
        .current_del {
          display: block;
        }
      }
      .current_del {
        display: none;
        position: absolute;
        top: 0px;
        right: 0;
        cursor: pointer;
      }
    }

    .item_wrap {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;

      position: relative;
      .info {
        > div {
          margin: 4px 0;
        }
      }
      .current_del {
        display: none;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        cursor: pointer;
      }
      &:hover {
        .current_del {
          display: block;
        }
      }
    }

    .unVisible {
      background-color: rgb(245, 244, 244) !important;
      padding: 2px 0;
    }
  }
  ::v-deep(.sortable-ghost) {
    position: relative;
    width: 100%;
    height: 4px;
    overflow: hidden;
    border: none !important;
    &.sortable-chosen {
      height: 4px;
      overflow: hidden;
      padding: 0;
    }
    &::before {
      content: '';
      display: block;

      position: absolute;

      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--el-color-primary);
      z-index: 10000000;
    }
  }
}
</style>
