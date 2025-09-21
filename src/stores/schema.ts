import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ComponentConfig, FormSchema } from 'form-cook-render'
import { useSerialize } from 'vue-serialize-input'
import { useManualRefHistory } from '@vueuse/core'
import { cloneDeep, debounce, isEqual } from 'lodash'
import { collectFieldPaths } from '@/utils'
import { updateAvailableFields } from '@/components/RuleEditor/availableFields'

const { serialize, deserialize } = useSerialize()

const DEFAULT = {
  formAreaConfig: {
    attrs: {
      rules: {}
    }
  },
  formContentConfigList: [],
}

const handleAddHistory = (data: FormSchema, selectedConfig: ComponentConfig | null | undefined) => {
  if (!isEqual(historyState.value.schema, data)) {
    const current = cloneDeep(data)
    historyState.value.schema = current
    historyState.value.selectedConfig = cloneDeep(selectedConfig)
    updateAvailableFields(collectFieldPaths(current.formContentConfigList))
    commit()
  }
}

const getSchemaByLocal = () => {
  const value = localStorage.getItem("formSchema")
  if (value) {
    localSchemaData.value = value
    return deserialize<FormSchema>(value)
  }
  localSchemaData.value = serialize(DEFAULT)
  return cloneDeep(DEFAULT)
}

const saveSchemaToLocal = () => {
  try {
    localSchemaData.value = serialize(historyState.value.schema)
    localStorage.setItem("formSchema", localSchemaData.value || "")

    ElMessage({
      message: '保存成功',
      type: 'success',
      placement: "top"
    })
  } catch (error) {
    ElMessage({
      message: `保存失败:${error}`,
      type: 'error',
      placement: "top"
    })
  }
}

let localSchemaData = ref<undefined | string>()

const historyState = ref<{ schema: FormSchema; selectedConfig: ComponentConfig | null | undefined }>({ schema: getSchemaByLocal(), selectedConfig: null })
const { history, commit, undo: _undo, redo: _redo, canUndo, canRedo } = useManualRefHistory(historyState, {
  capacity: 200,
  clone: cloneDeep,
})

const canClear = computed(() => {
  if (isEqual(historyState.value.schema, DEFAULT)) {
    return false
  }
  return true
})

const canSave = computed(() => {

  if (localSchemaData.value === serialize(historyState.value.schema)) {
    return false
  }

  if ((typeof localSchemaData.value === "undefined" && serialize(historyState.value.schema) === serialize(DEFAULT))) {
    return false
  }

  return true
})

export const useSchemaStore = defineStore('schema', () => {

  const formSchema = ref<FormSchema>(cloneDeep(DEFAULT))
  const selectedConfig = ref<ComponentConfig | null | undefined>()

  formSchema.value = getSchemaByLocal()

  const pushItem = (value: ComponentConfig) => {
    formSchema.value.formContentConfigList.push(value)
  }

  const setSelect = (value: ComponentConfig | null | undefined) => {
    selectedConfig.value = value
  }

  const debouncedAddHistory = debounce(handleAddHistory, 200)
  watch(
    () => formSchema.value,
    () => {
      debouncedAddHistory(formSchema.value, selectedConfig.value);
    },
    { deep: true },
  )

  const syncHistory = () => {
    formSchema.value = cloneDeep(historyState.value.schema)
    if (selectedConfig.value?.id) {
      selectedConfig.value = findSelectedOrFallback(formSchema.value.formContentConfigList, historyState.value.selectedConfig?.id)
    }
  }

  function undo() {
    _undo()
    syncHistory()

  }
  function redo() {
    _redo()
    syncHistory()
  }

  function clearSchema() {
    historyState.value.schema = cloneDeep(DEFAULT)
    commit()
    syncHistory()
  }

  return {
    formSchema, selectedConfig, setSelect, pushItem,
    history: { canUndo, canRedo, undo, redo, canSave, saveSchemaToLocal, clearSchema, canClear }
  }
})



export function findSelectedOrFallback(
  list: ComponentConfig[],
  selectedId: string | null | undefined
): ComponentConfig | null {
  if (!list || list.length === 0) return null

  function dfs(list: ComponentConfig[]): ComponentConfig | null {
    for (const node of list) {
      if (node.id === selectedId) {
        return node
      }
      if (node.componentType === 'layout' && node.children) {
        const found = dfs(node.children!)
        if (found) return found
      }
    }
    return null
  }

  const found = selectedId ? dfs(list) : null

  if (found) {
    return found
  } else {
    return list[list.length - 1] ?? null
  }
}
