<script setup lang="ts">
import { useStatusStore } from '@/stores'
import { useSchemaStore } from '@/stores/schema'
import { storeToRefs } from 'pinia'
import IconTemplate from '@/components/icon/IconTemplate.vue'

const store = useSchemaStore()
const { formSchema, selectedConfig } = storeToRefs(store)

const statusStore = useStatusStore()
</script>

<template>
  <div class="form_tree" :class="{ active: statusStore.isTemplateOpen }">
    <div class="content">
      <div class="head">
        <div>
          <IconTemplate width="14"></IconTemplate> &nbsp; <span style="line-height: 1">模板</span>
        </div>
        <div>
          <el-icon @click="statusStore.updateTemplateOpen"><i-ep-DArrowLeft /></el-icon>
        </div>
      </div>
      <div class="body" :class="{ option_hint: !formSchema.formContentConfigList.length }">
        <el-scrollbar height="100%">
          <TemplateList></TemplateList>
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
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .body {
      padding: 8px 0 8px 8px;
      background-color: #f5f7fa;
      height: calc(100% - 50px);

      &.option_hint {
        position: relative;
        &::before {
          content: '暂无模板~';
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
