<script setup lang="ts">
import type { Material } from '@/types/material'
import IconInput from '@/components/MaterialIcons/IconInput.vue'
import materialIconMap from '@/components/MaterialIcons/index'
import { cloneComponentConfig } from '@/utils'
import Sortable from 'sortablejs'
import { useMaterialsStore } from '@/stores/cook'
import { useSchemaStore } from '@/stores/schema'

const store = useSchemaStore()
const materialsStore = useMaterialsStore()

const handleClick = (current: Material) => {
  const result = cloneComponentConfig(current)
  store.pushItem(result)
  store.setSelect(result)
}

const currentMenu = ref('所有')

const changeMenu = (item: { label: string; materials: Material[] }) => {
  currentMenu.value = item.label
  materialsStore.changeMaterials(item.materials)
}
const drag = ref()
onMounted(() => {
  new Sortable(drag.value, {
    group: {
      name: 'form',
      pull: 'clone',
      put: false, // 不允许拖拽进这个列表
    },
    animation: 150,
    sort: false, // 设为false，禁止sort
  })
})
</script>

<template>
  <div class="left_area_wrap">
    <div class="head">
      <span>
        <span style="line-height: 1">组件</span>
      </span>
    </div>
    <div class="body">
      <ul class="menu">
        <li v-for="item in materialsStore.menuList" @click="changeMenu(item)">
          <el-button :type="currentMenu === item.label ? 'primary' : ''">{{
            item.label
          }}</el-button>
        </li>
      </ul>
      <div class="menu_content">
        <el-scrollbar height="100%">
          <div class="left_area">
            <Transition name="fade-slide" mode="out-in">
              <div ref="drag" class="drag_wrap">
                <template v-for="element in materialsStore.materials">
                  <div class="material_item" @click.stop="handleClick(element)">
                    <div>{{ element.label }}</div>
                    <component :is="materialIconMap[element.icon] || IconInput"></component>
                  </div>
                </template>
              </div>
            </Transition>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.left_area_wrap {
  flex-shrink: 0;
  height: calc(100% - 4px);
  width: 330px;
  margin: 2px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 10px;

    height: 40px;
    font-size: 12px;
    background-color: #f5f7fa;
    color: #000000;
  }
  .body {
    display: flex;
    height: calc(100vh - 42px - 42px);
    width: 100%;
    .menu {
      width: 60px;
      list-style: none;
      margin: 2px 2px 0 0;
      padding: 6px;
      font-size: 14px;
      background-color: #f5f7fa;
      li {
        padding: 4px 2px;
        ::v-deep(.el-button) {
          border: none;
        }
      }
    }
    .menu_content {
      flex: 1;
      margin-top: 2px;
      background-color: #fafafa;
      .left_area {
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
            background-color: #fff;
            svg {
              width: 108px;
              height: 80px;
            }
          }
        }
      }
    }
  }

  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.3s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
