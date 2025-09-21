<script setup lang="ts">
import { useStatusStore } from '@/stores'
import { useSchemaStore } from '@/stores/schema'
import { storeToRefs } from 'pinia'

const store = useSchemaStore()
const { formSchema, selectedConfig } = storeToRefs(store)

const statusStore = useStatusStore()
</script>

<template>
  <div class="form_tree" :class="{ active: statusStore.isTreeAreaOpen }">
    <div class="content">
      <div class="head">
        <span>
          <IconTree width="14"></IconTree> &nbsp; <span style="line-height: 1">表单树</span>
        </span>
        <el-icon @click="statusStore.updateTreeAreaOpen"><i-ep-DArrowLeft /></el-icon>
      </div>
      <div class="body" :class="{ option_hint: !formSchema.formContentConfigList.length }">
        <el-scrollbar height="100%">
          <TreeDraggableArea
            v-model:configList="formSchema.formContentConfigList"
            v-model:selectedConfig="selectedConfig"
          ></TreeDraggableArea>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form_tree {
  width: 0px;
  height: calc(100% - 4px);
  overflow: hidden;
  transition: width 0.3s ease;
  margin: 2px;
  &.active {
    width: 200px; /* 展开宽度 */
    background-color: #f5f5f5;
    transition: width 0.3s ease;
  }
  .content {
    width: 200px;
    height: 100%;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 0 10px;

      height: 40px;
      font-size: 12px;
      background-color: #dcdfe6;
    }
    .body {
      padding: 8px 0 8px 8px;
      background-color: #f5f7fa;
      height: calc(100% - 50px);

      &.option_hint {
        position: relative;
        &::before {
          content: '暂无树~';
          position: absolute;
          left: 50%;
          top: 6%;
          width: 100%;
          text-align: center;
          transform: translate(-50%, -50%);
          font-size: 14px;
          color: #909399;
        }
      }
    }
  }
}
</style>
