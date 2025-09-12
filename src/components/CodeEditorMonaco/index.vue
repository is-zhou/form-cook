<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { stringify } from 'javascript-stringify'

interface Props {
  language?: 'typescript' | 'javascript'
  readOnly?: boolean
  typeDefs?: string
}

const modelValue = defineModel<Record<string, any> | string>()

const { language = 'typescript', readOnly = false, typeDefs = '' } = defineProps<Props>()

const massage = ref('')
const editorContainerRef = ref<HTMLDivElement | null>(null)
let editor: monaco.editor.IStandaloneCodeEditor | null = null

const diagnosticsOptions = {
  diagnosticCodesToIgnore: [6133, 6192],
}

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
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(diagnosticsOptions)
  }

  editor = monaco.editor.create(editorContainerRef.value, {
    value: toEditorString(modelValue.value),
    language: language,
    theme: 'vs-dark',
    automaticLayout: true,
    readOnly: readOnly,
  })

  editor.onDidChangeModelContent(() => {
    console.log(1)

    const model = editor!.getModel()
    if (!model) return
    console.log(2)

    const markers = monaco.editor.getModelMarkers({ resource: model.uri })
    console.log('markers', markers)

    if (!markers.length) {
      console.log(3)

      const val = editor!.getValue()
      try {
        const result = fromEditorString(val)
        console.log('发送')
        modelValue.value = result
      } catch (err) {
        console.error(err)
      }
    }
  })

  editor.onDidChangeModelContent(() => {})
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
</script>

<template>
  <div class="editor_wrap">
    <div ref="editorContainerRef" style="height: 400px; border: 1px solid #ccc" />
    <span v-if="massage" class="massage"> {{ massage }}</span>
  </div>
</template>

<style scoped lang="scss">
.editor_wrap{
  
}
.massage {
  font-size: 12px;
  color: red;
}
</style>
