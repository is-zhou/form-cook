<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'

interface Props {
  language?: 'typescript' | 'javascript'
  readOnly?: boolean
}

const modelValue = defineModel<string>()

const { language = 'typescript', readOnly = false } = defineProps<Props>()

const editorContainerRef = ref<HTMLDivElement | null>(null)
let editor: EditorView | null = null

const massage = ref('')

onMounted(() => {
  if (!editorContainerRef.value) return

  editor = new EditorView({
    state: EditorState.create({
      doc: modelValue.value,
      extensions: [
        basicSetup,
        javascript({ typescript: language === 'typescript' }),
        EditorView.editable.of(!readOnly),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            const newVal = update.state.doc.toString()
            try {
              modelValue.value = newVal
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
      const newString = newVal
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
  max-height: calc(100vh - 500px);
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
