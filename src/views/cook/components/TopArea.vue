<script setup lang="ts">
import IconRedo from '@/components/icon/IconRedo.vue'
import IconUndo from '@/components/icon/IconUndo.vue'
import IconSave from '@/components/icon/IconSave.vue'
import IconClear from '@/components/icon/IconClear.vue'
import IconCode from '@/components/icon/IconCode.vue'
import IconTree from '@/components/icon/IconTree.vue'
import IconImport from '@/components/icon/IconImport.vue'

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

const c = ref({})
const handlePreview = () => {
  c.value = cloneDeep(state.formSchema)
  dialogFormVisible.value = true
}
</script>

<template>
  <header class="top_area">
    <div class="top_area_left" :class="{ w: statusStore.isTreeAreaOpen }">
      <h3 class="logo"><img height="30" src="../../../assets/fc_logo.png" alt="" /></h3>
      <div>
        <DialogImportFields></DialogImportFields>
        <!-- <el-tooltip effect="light" content="表单树" placement="bottom"> -->
        <el-button
          :icon="IconTree"
          :type="'primary'"
          :plain="!statusStore.isTreeAreaOpen"
          @click="statusStore.updateTreeAreaOpen"
          >树</el-button
        >
        <!-- </el-tooltip> -->
      </div>
    </div>
    <div class="top_area_middle">
      <div class="middle_l">
        <el-divider direction="vertical" />
        <!-- <el-tooltip effect="light" content="撤销" placement="bottom"> -->
        <el-button
          :icon="IconUndo"
          :type="history.canUndo ? 'primary' : ''"
          :disabled="!history.canUndo"
          @click="history.undo"
          plain
          >撤销</el-button
        >
        <!-- </el-tooltip> -->
        <!-- <el-tooltip effect="light" content="重做" placement="bottom"> -->
        <el-button
          :icon="IconRedo"
          :type="history.canRedo ? 'primary' : ''"
          :disabled="!history.canRedo"
          @click="history.redo"
          plain
          >重做</el-button
        >
        <!-- </el-tooltip> -->
        <!-- <el-tooltip effect="light" content="保存" placement="bottom"> -->
        <el-button
          :icon="IconSave"
          :type="history.canSave ? 'primary' : ''"
          :disabled="!history.canSave"
          @click="history.saveSchemaToLocal"
          plain
          >保存</el-button
        >
        <!-- </el-tooltip> -->
        <!-- <el-tooltip effect="light" content="清空画布" placement="bottom"> -->
        <el-button
          :icon="IconClear"
          :type="history.canClear ? 'danger' : ''"
          :disabled="!history.canClear"
          @click="history.clearSchema"
          plain
          >清空</el-button
        >
        <!-- </el-tooltip> -->
      </div>
      <div class="middle_m"></div>
      <div class="middle_r">
        <DialogReview></DialogReview>
        <!-- <el-tooltip effect="light" content="Schema" placement="bottom"> -->
        <el-button :icon="IconCode" type="primary" @click="emits('clickHandleSchema')" plain
          >schema</el-button
        >
        <!-- </el-tooltip> -->
        <el-divider direction="vertical" />
        <DialogCreateCode></DialogCreateCode>
      </div>
    </div>
    <div class="top_area_right">
      <el-link href="https://github.com/is-zhou/form-cook" :underline="false" target="_blank">
        <img src="https://api.iconify.design/simple-icons/github.svg" alt="" />
      </el-link>
    </div>
  </header>
</template>

<style scoped lang="scss">
.top_area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 8px 12px 8px 4px;
  border-bottom: 1px solid #efefef;
}
.top_area_left {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 324px;
  transition: all 0.3s ease;
  .logo {
    position: relative;
    > img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &.w {
    width: 524px;
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
    min-width: 206px;
  }
  .middle_m {
    text-align: center;
  }
  .middle_r {
    text-align: right;
    min-width: 206px;
  }
}
.top_area_right {
  width: 324px;
  text-align: right;
}
</style>
