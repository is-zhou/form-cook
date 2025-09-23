<script setup lang="ts">
import IconRedo from '@/components/icon/IconRedo.vue'
import IconUndo from '@/components/icon/IconUndo.vue'
import IconSave from '@/components/icon/IconSave.vue'
import IconClear from '@/components/icon/IconClear.vue'
import IconCode from '@/components/icon/IconCode.vue'
import IconTree from '@/components/icon/IconTree.vue'
import IconImport from '@/components/icon/IconImport.vue'
import { View } from '@element-plus/icons-vue'

import { ref } from 'vue'
import { cloneDeep } from 'lodash'
import { useStatusStore } from '@/stores'
import { useSchemaStore } from '@/stores/schema'
import type { FormCompConfig } from 'form-cook-render'

const emits = defineEmits(['clickHandleSchema'])

const state = useSchemaStore()
const { history } = state

const statusStore = useStatusStore()
const dialogFormVisible = ref(false)

const previewFormData = ref<{ [key: string]: any }>({})
const c = ref({})
const handlePreview = () => {
  c.value = cloneDeep(state.formSchema)
  dialogFormVisible.value = true
}
</script>

<template>
  <header class="top_area">
    <div class="top_area_left" :class="{ w: statusStore.isTreeAreaOpen }">
      <h3>FormCook</h3>
      <div>
        <DialogImportFields></DialogImportFields>
        <el-tooltip effect="light" content="表单树" placement="bottom">
          <el-button
            :icon="IconTree"
            :type="'primary'"
            :plain="!statusStore.isTreeAreaOpen"
            @click="statusStore.updateTreeAreaOpen"
        /></el-tooltip>
      </div>
    </div>
    <div class="top_area_middle">
      <div class="middle_l">
        <el-divider direction="vertical" />
        <el-tooltip effect="light" content="撤销" placement="bottom">
          <el-button
            :icon="IconUndo"
            :type="history.canUndo ? 'primary' : ''"
            :disabled="!history.canUndo"
            @click="history.undo"
            plain
          />
        </el-tooltip>
        <el-tooltip effect="light" content="重做" placement="bottom">
          <el-button
            :icon="IconRedo"
            :type="history.canRedo ? 'primary' : ''"
            :disabled="!history.canRedo"
            @click="history.redo"
            plain
          />
        </el-tooltip>
        <el-tooltip effect="light" content="保存" placement="bottom">
          <el-button
            :icon="IconSave"
            :type="history.canSave ? 'primary' : ''"
            :disabled="!history.canSave"
            @click="history.saveSchemaToLocal"
            plain
          ></el-button>
        </el-tooltip>
        <el-tooltip effect="light" content="清空画布" placement="bottom">
          <el-button
            :icon="IconClear"
            :type="history.canClear ? 'primary' : ''"
            :disabled="!history.canClear"
            @click="history.clearSchema"
            plain
          ></el-button>
        </el-tooltip>
      </div>
      <div class="middle_m"></div>
      <div class="middle_r">
        <el-tooltip effect="light" content="预览" placement="bottom">
          <el-button :icon="View" type="primary" @click="handlePreview" plain />
        </el-tooltip>
        <el-tooltip effect="light" content="Schema" placement="bottom">
          <el-button
            :icon="IconCode"
            type="primary"
            @click="emits('clickHandleSchema')"
            plain
          ></el-button>
        </el-tooltip>
        <el-divider direction="vertical" />
        <DialogCreateCode></DialogCreateCode>
      </div>
    </div>
    <div class="top_area_right"></div>
    <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible" title="表单预览" width="500">
      <form-cook-render v-model="previewFormData" v-model:form-schema="c"></form-cook-render>
    </el-dialog>
  </header>
</template>

<style scoped lang="scss">
.top_area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 8px 12px 8px 16px;
  border-bottom: 1px solid #efefef;
}
.top_area_left {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 312px;
  transition: all 0.3s ease;
  &.w {
    width: 512px;
  }
  h3 {
    font-weight: bold;
    margin: 0;
  }
}
.top_area_middle {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .middle_l {
    text-align: left;
  }
  .middle_m {
    text-align: center;
  }
  .middle_r {
    text-align: right;
  }
  > div {
    flex: 1;
  }
}
.top_area_right {
  width: 324px;
}
</style>
