<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { stringify } from 'javascript-stringify'
import { useClipboard } from '@vueuse/core'

interface Props {
  language?: 'typescript' | 'javascript'
  readOnly?: boolean
  typeDefs?: string
}

const { copy, copied } = useClipboard()
const modelValue = defineModel<Record<string, any> | string>()

const { language = 'typescript', readOnly = false, typeDefs = '' } = defineProps<Props>()

const massage = ref('')
const editorContainerRef = ref<HTMLDivElement | null>(null)
let editor: monaco.editor.IStandaloneCodeEditor | null = null

const diagnosticsOptions = ref({
  diagnosticCodesToIgnore: [6133, 6192],
})
function toEditorString(value: string | object | undefined): string {
  if (typeof value === 'undefined') return ''

  if (typeof value === 'string') return value

  try {
    massage.value = ''
    return `import { FormSchema } from "file:///custom";\n\nconst obj: FormSchema = ${stringify(value, null, 2)}`
  } catch (err) {
    massage.value = `数据序列化失败:${err}`
    return 'const obj: FormSchema = {}'
  }
}

function fromEditorString(code: string): any {
  try {
    const fn = new Function(
      `${code.replace('import { FormSchema } from "file:///custom";\n\nconst obj: FormSchema', 'const obj')}; return obj;`,
    )
    massage.value = ''
    return fn()
  } catch (err) {
    massage.value = `数据修改异常：${err}`
    throw new Error('数据修改异常')
  }
}

onMounted(() => {
  if (!editorContainerRef.value) return

  // 注入自定义类型声明
  if (typeDefs) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(typeDefs, 'file:///custom.d.ts')
  }

  if (diagnosticsOptions) {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(diagnosticsOptions.value)
  }

  editor = monaco.editor.create(editorContainerRef.value, {
    value: toEditorString(modelValue.value),
    language: language,
    theme: 'vs-dark',
    automaticLayout: true,
    readOnly: readOnly,
  })

  editor.onDidChangeModelContent(() => {
    isValidator.value = true
  })
})

onBeforeUnmount(() => {
  editor?.dispose()
})

// 外部更新时，同步到编辑器
watch(
  () => modelValue.value,
  (newVal) => {
    if (editor) {
      const newString = toEditorString(newVal)
      const currentValue = editor.getValue()
      if (newString !== currentValue) {
        editor.setValue(newString)
      }
    }
  },
)
const markerList = ref<monaco.editor.IMarker[]>([])
const isValidator = ref(false)
const isCanSave = ref(false)

const validator = () => {
  const model = editor!.getModel()
  if (!model) return

  const markers = monaco.editor.getModelMarkers({ resource: model.uri })
  markerList.value = markers
  if (!markers.length) {
    const val = editor!.getValue()
    try {
      fromEditorString(val)
      isValidator.value = false
      isCanSave.value = true
    } catch (err) {
      console.error(err)
    }
  } else {
    codeList.value = [
      ...new Set([
        ...diagnosticsOptions.value.diagnosticCodesToIgnore,
        ...markerList.value.map((i) => i.code),
      ]),
    ] as string[]
  }
}
const save = () => {
  const val = editor!.getValue()
  try {
    const result = fromEditorString(val)
    modelValue.value = result
    isCanSave.value = false
  } catch (err) {
    console.error(err)
  }
}

const updataDiagnosticCodesToIgnore = () => {
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(diagnosticsOptions.value)
  isValidator.value = true
  isCanSave.value = false
}

const codeList = ref<string[]>(['6133', '6192'])

const isDownloading = ref(false)
const copyText = () => {
  copy(stringify(modelValue.value, null, 2) || '')
  ElMessage.success('复制成功')
}

const download = () => {
  if (isDownloading.value) {
    return
  }
  isDownloading.value = true

  const blob = new Blob([stringify(modelValue.value, null, 2) || ''])

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${Date.now()}.ts`
  link.click()
}
</script>

<template>
  <div class="editor_wrap">
    <div ref="editorContainerRef" style="height: 400px; border: 1px solid #ccc" />
    <span v-if="massage" class="massage"> {{ massage }}</span>

    <div style="display: flex; align-items: center; margin: 10px 0">
      请选择过滤的错误代码：
      <el-checkbox-group
        v-model="diagnosticsOptions.diagnosticCodesToIgnore"
        @change="updataDiagnosticCodesToIgnore"
        size="small"
      >
        <el-checkbox-button v-for="code in codeList" :key="code" :value="Number(code)">
          {{ code }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>

    <div class="markers_wrap" v-if="markerList.length > 0">
      <p v-for="item in markerList">
        [{{ item.startLineNumber }}-{{ item.endLineNumber }}] {{ item.code }} : {{ item.message }}
      </p>
    </div>
    <div class="btn">
      <el-button type="primary" :disabled="!isValidator" @click="validator">校验代码</el-button>
      <el-button type="primary" :disabled="!isCanSave" @click="save">保存修改</el-button>
      <el-button type="primary" :disabled="isValidator" @click="download">下载文件</el-button>
      <el-button type="primary" :disabled="isValidator" @click="copyText">复制代码</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.massage {
  font-size: 12px;
  color: red;
}
.btn {
  text-align: center;
  margin: 10px;
}
.markers_wrap {
  font-size: 12px;
  height: 100px;
  overflow-y: auto;
  border: 1px solid red;
  padding: 0 10px;
}
</style>
