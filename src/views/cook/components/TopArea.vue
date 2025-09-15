<script setup lang="ts">
import IconRedo from '@/components/icon/IconRedo.vue'
import IconUndo from '@/components/icon/IconUndo.vue'
import IconSave from '@/components/icon/IconSave.vue'
import IconClear from '@/components/icon/IconClear.vue'
import IconCode from '@/components/icon/IconCode.vue'
import { View } from '@element-plus/icons-vue'

import { useUndoRedo } from '@/hooks/useUndoRedo'
import { ref } from 'vue'

const emits = defineEmits(['clickHandleSchema'])

const { state, undo, redo, canUndo, canRedo, saveSchemaToLocal, clearSchema, canClear, canSave } =
  useUndoRedo()

const dialogFormVisible = ref(false)

const previewFormData = ref<{ [key: string]: any }>()
</script>

<template>
  <header class="top_area">
    <div class="top_area_left">
      <h3>FormCook</h3>
    </div>
    <div class="top_area_middle">
      <div class="middle_l"></div>
      <div class="middle_m">
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
        <el-tooltip effect="light" content="保存" placement="bottom">
          <el-button
            :icon="IconSave"
            :type="canSave ? 'primary' : ''"
            :disabled="!canSave"
            @click="saveSchemaToLocal"
            plain
          ></el-button>
        </el-tooltip>
        <el-tooltip effect="light" content="清空" placement="bottom">
          <el-button
            :icon="IconClear"
            :type="canClear ? 'primary' : ''"
            :disabled="!canClear"
            @click="clearSchema"
            plain
          ></el-button>
        </el-tooltip>
      </div>
      <div class="middle_r">
        <el-tooltip effect="light" content="预览" placement="bottom">
          <el-button :icon="View" type="primary" @click="dialogFormVisible = true" plain />
        </el-tooltip>
        <el-tooltip effect="light" content="Schema" placement="bottom">
          <el-button
            :icon="IconCode"
            type="primary"
            @click="emits('clickHandleSchema')"
            plain
          ></el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="top_area_right"></div>
    <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible" title="表单预览" width="500">
      <form-cook-render v-model="previewFormData" v-model:form-schema="state"></form-cook-render>
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
  gap: 10px;
  width: 330px;
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
  width: 330px;
}
</style>
