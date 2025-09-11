<script setup lang="ts">
import type { TComponentConfig, TFormSchema } from '@/types/schema'
import IconRedo from '@/components/icon/IconRedo.vue'
import IconUndo from '@/components/icon/IconUndo.vue'
import { View } from '@element-plus/icons-vue'

import { ref } from 'vue'
import { useUndoRedo } from '@/hooks/useUndoRedo'

const formSchema = defineModel<TFormSchema>('formSchema', { required: true })

const _formData = ref<{ [key: string]: any }>()

const selectedConfig = defineModel<TComponentConfig | null>('selectedConfig')

const { undo, redo, canUndo, canRedo } = useUndoRedo()

const dialogFormVisible = ref(false)
const previewFormData = ref<{ [key: string]: any }>()
</script>

<template>
  <div class="middle_area">
    <div class="area_options">
      <el-tooltip effect="light" content="撤销" placement="bottom">
        <el-button
          :icon="IconUndo"
          :type="canUndo ? 'primary' : ''"
          :disabled="!canUndo"
          @click="undo"
          plain
        />
      </el-tooltip>
      <el-tooltip effect="light" content="重做" placement="bottom">
        <el-button
          :icon="IconRedo"
          :type="canRedo ? 'primary' : ''"
          :disabled="!canRedo"
          @click="redo"
          plain
        />
      </el-tooltip>
      <el-tooltip effect="light" content="预览" placement="bottom">
        <el-button :icon="View" type="primary" @click="dialogFormVisible = true" plain />
      </el-tooltip>
    </div>

    <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible" title="表单预览" width="500">
      <form-render v-model="previewFormData" v-model:form-schema="formSchema"></form-render>
    </el-dialog>

    <el-scrollbar height="100%">
      <div class="canvas_area" :class="{ option_hint: !formSchema.formContentConfigList.length }">
        <el-form :model="_formData" v-bind="formSchema.formAreaConfig.attrs">
          <DraggableArea
            class="area_hight"
            v-model:configList="formSchema.formContentConfigList"
            v-model:selectedConfig="selectedConfig"
          ></DraggableArea>
        </el-form>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.middle_area {
  position: relative;
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 10px;
  .area_options {
    position: absolute;

    display: flex;

    align-items: center;
    justify-content: flex-start;
    right: 10px;
    img {
      width: 20px;
    }
  }

  .canvas_area {
    width: 375px;
    background-color: #fff;
    padding: 10px;
    margin-right: 10px;
    margin-left: 10px;

    .area_hight {
      min-height: calc(100vh - 40px - 20px - 20px);
    }

    &.option_hint {
      position: relative;
      &::before {
        content: '请从左侧列表拖动表单组件放置于此!';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        text-align: center;
        transform: translate(-50%, -50%);
        font-size: 16px;
        color: #909399;
      }
    }
  }
}
</style>
