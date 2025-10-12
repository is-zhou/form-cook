<script setup lang="ts">
import IconImport from '@/components/icon/IconImport.vue'
import type { FormCompConfig } from 'form-cook-render'
import { useSchemaStore } from '@/stores/schema'

const state = useSchemaStore()

const handleSaveCompConfigList = (list: FormCompConfig[]) => {
  state.formSchema.formContentConfigList.push(...list)
  dialogVisible.value = false
}

const dialogVisible = ref(false)
</script>

<template>
  <el-tooltip effect="light" content="快速添加字段" placement="bottom">
    <el-button
      :icon="IconImport"
      type="primary"
      plain
      @click="dialogVisible = true"
      style="margin-right: 12px"
    ></el-button>
  </el-tooltip>
  <el-dialog v-model="dialogVisible" title="快速添加字段" width="900px">
    <FieldsEditor
      v-if="dialogVisible"
      @onSaveCompConfigList="handleSaveCompConfigList"
    ></FieldsEditor>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
