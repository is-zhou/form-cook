<template>
  <el-table class="drag_sort_table" :data="tableData">
    <slot></slot>
  </el-table>
</template>
<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'
import Sortable from 'sortablejs'

const tableData = defineModel<Array<unknown>>()

// 在组件挂载后初始化排序
onMounted(() => {
  // 获取表格的tbody元素
  const tableBody = document.querySelector('.el-table__body tbody') as HTMLElement
  if (tableBody) {
    // 使用 Sortable.js 初始化排序功能
    new Sortable(tableBody, {
      handle: '.el-table__row', // 可选：设置可拖拽的区域
      onEnd(evt) {
        if (typeof evt.oldIndex !== 'undefined' && typeof evt.newIndex !== 'undefined') {
          const list = cloneDeep(tableData.value) || []
          // 在拖拽结束后更新排序数据
          const movedItem = list.splice(evt.oldIndex, 1)[0]
          list.splice(evt.newIndex, 0, movedItem)

          tableData.value = list
        }
      },
    })
  }
})
</script>
<style lang="scss" scoped>
.drag_sort_table {
  ::v-deep(.el-table__row) {
    cursor: move;
  }
}
</style>
