<script setup lang="ts">
import { useUndoRedo } from '@/hooks/useUndoRedo'
import { createCode } from '@/utils/createCode'
import IconCreateCode from '@/components/icon/IconCreateCode.vue'
import { useClipboard } from '@vueuse/core'
import { useSchemaStore } from '@/stores/schema'

const { copy, copied } = useClipboard()

const state = useSchemaStore()

const dialogVisible = ref(false)
const code = ref()
const isDownloading = ref(false)

const handleCreate = () => {
  code.value = createCode(state.formSchema)
  dialogVisible.value = true
}

const copyText = () => {
  copy(code.value)
  ElMessage.success('复制成功')
}

const download = () => {
  if (isDownloading.value) {
    return
  }
  isDownloading.value = true

  const blob = new Blob([code.value])

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${Date.now()}.vue`
  link.click()
}
</script>

<template>
  <!-- <el-tooltip effect="light" content="生成代码" placement="bottom"> -->
  <el-button :icon="IconCreateCode" type="primary" @click="handleCreate" plain>
    生成SFC代码
  </el-button>
  <!-- </el-tooltip> -->
  <div style="text-align: left">
    <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="生成代码">
      <CodeEditor v-model="code"></CodeEditor>
      <div class="options">
        <div class="hint">
          如果你项目中还未安装form-cook-render请先安装导入
          <div>pnpm install form-cook-render</div>
          <div>import formRender from 'form-cook-render'</div>
          <div>app.use(formRender)</div>
        </div>

        <div class="btn">
          <el-button type="primary" @click="download">下载文件</el-button>
          <el-button type="primary" @click="copyText">复制代码</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.options {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 10px;
  margin: 6px 0;
  text-align: center;

  .hint {
    flex: 1;
    border: 1px dashed gray;
    padding: 6px;
    text-align: center;
    > div {
      font-size: 12px;
      margin: 6px;
    }
  }
  .btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px dashed gray;
    padding: 6px 20px;
    .el-button + .el-button {
      margin-left: 0;
    }
  }
}
</style>
