<script setup lang="ts">
import type { FormCompConfig } from 'form-cook-render'
import { useSchemaStore } from '@/stores/schema'
import { Edit } from '@element-plus/icons-vue'

const state = useSchemaStore()

const handleSaveCompConfigList = (list: FormCompConfig[]) => {
  state.formSchema.formContentConfigList = list
  dialogVisible.value = false
}

const dialogVisible = ref(false)
</script>

<template>
  <el-tooltip effect="light" content="批量编辑" placement="bottom">
    <el-icon class="edit" size="14" @click="dialogVisible = true" style="margin-right: 10px"
      ><Edit
    /></el-icon>
  </el-tooltip>
  <el-dialog v-model="dialogVisible" title="批量编辑" width="900px">
    <FieldsEditor
      v-if="dialogVisible"
      :initConfigList="state.formSchema.formContentConfigList"
      @onSaveCompConfigList="handleSaveCompConfigList"
    ></FieldsEditor>
  </el-dialog>
</template>

<style scoped lang="scss">
.edit {
  :hover {
    cursor: pointer;
    color: var(--el-color-primary);
  }
}
</style>
