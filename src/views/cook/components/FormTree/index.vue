<script setup lang="ts">
import type { ComponentConfig, FormSchema } from 'form-cook-render'
import { useStatusStore } from '@/stores'
import VueDraggable from 'vuedraggable'
import IconSelect from '@/components/MaterialIcons/IconSelect.vue'
const formSchema = defineModel<FormSchema>('formSchema', { required: true })
const statusStore = useStatusStore()
const selectedConfig = defineModel<ComponentConfig | null>('selectedConfig', {
  required: true,
})
const handleClick = (current: any) => {}
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
      <div class="body">
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
  height: 99%;
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
      background-color: #e5e6eb;
    }
    .body {
      padding: 8px 0 8px 8px;
      background-color: #f2f3f5;
      height: calc(100% - 50px);
    }
  }
}
</style>
