<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { stringify } from 'javascript-stringify'

interface Props {
  language?: 'typescript' | 'javascript'
  readOnly?: boolean
}

const modelValue = defineModel<Record<string, any> | string>()

const { language = 'typescript', readOnly = false } = defineProps<Props>()

const editorContainerRef = ref<HTMLDivElement | null>(null)
let editor: EditorView | null = null

const massage = ref('')

function toEditorString(value: string | object | undefined): string {
  if (typeof value === 'undefined') return ''

  if (typeof value === 'string') return value

  try {
    massage.value = ''
    return `const obj = ${stringify(value, null, 2)}`
  } catch (err) {
    massage.value = `数据序列化失败:${err}`
    return 'const obj = {}'
  }
}

function fromEditorString(code: string): any {
  try {
    const fn = new Function(`${code}; return obj;`)
    massage.value = ''
    return fn()
  } catch (err) {
    massage.value = `数据修改异常：${err}`
    throw new Error('数据修改异常')
  }
}

onMounted(() => {
  if (!editorContainerRef.value) return

  editor = new EditorView({
    state: EditorState.create({
      doc: toEditorString(modelValue.value),
      extensions: [
        basicSetup,
        javascript({ typescript: language === 'typescript' }),
        EditorView.editable.of(!readOnly),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            const newVal = update.state.doc.toString()
            try {
              const result = fromEditorString(newVal)
              modelValue.value = result
            } catch {}
          }
        }),
      ],
    }),
    parent: editorContainerRef.value,
  })
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor = null
  }
})

watch(
  () => modelValue.value,
  (newVal) => {
    if (editor) {
      const newString = toEditorString(newVal)
      const currentValue = editor.state.doc.toString()
      if (newString !== currentValue) {
        editor.dispatch({
          changes: {
            from: 0,
            to: currentValue.length,
            insert: newString,
          },
        })
      }
    }
  },
)
</script>

<template>
  <div>
    <div ref="editorContainerRef" class="code_editor"></div>
    <span v-if="massage" class="massage"> {{ massage }}</span>
  </div>
</template>

<style scoped lang="scss">
.code_editor {
  max-height: calc(100vh - 290px);
  min-height: 300px;
  border: 1px solid #ccc;
  font-size: 14px;
  overflow: auto;
}
.massage {
  font-size: 12px;
  color: red;
}
</style>
