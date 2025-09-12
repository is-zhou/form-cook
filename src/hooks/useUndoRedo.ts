// composables/useUndoRedo.ts
import { computed, ref, type Ref } from 'vue'
import { useManualRefHistory } from '@vueuse/core'
import type { TFormSchema } from '@/types/schema'
import { cloneDeep, isEqual } from 'lodash'
import { useSerialize } from 'vue-serialize-input'
import { ElMessage } from 'element-plus'

const DEFAULT = {
  formAreaConfig: {
    attrs: {},
  },
  formContentConfigList: [],
}

let saveSchemaData = ref<undefined | string>()

const state = ref<TFormSchema>(cloneDeep(DEFAULT))


const { history, commit, undo: _undo, redo: _redo, canUndo, canRedo } = useManualRefHistory(state, {
  capacity: 50,
  clone: cloneDeep,
})

const { serialize, deserialize } = useSerialize()


type Listener = (val: TFormSchema | undefined) => void
const listeners = new Set<Listener>()

function notify() {
  for (const fn of listeners) {
    try {

      fn(state.value || DEFAULT)
    } catch (err) {
      console.warn('[useUndoRedo] listener error:', err)
    }
  }
}

// 包装 undo/redo，增加通知
function undo() {
  _undo()
  notify()
}
function redo() {
  _redo()
  notify()
}

const saveSchemaToLocal = () => {
  try {
    saveSchemaData.value = serialize(state.value)
    localStorage.setItem("formSchema", serialize(state.value) || "")

    ElMessage({
      message: '保存成功',
      type: 'success',
    })
  } catch (error) {
    ElMessage({
      message: `保存失败:${error}`,
      type: 'error',
    })
  }
}

const getSchemaByLocal = () => {
  const value = localStorage.getItem("formSchema")
  if (value) {
    saveSchemaData.value = value
    return deserialize<TFormSchema>(value)
  }
  return cloneDeep(state.value)
}

const clearSchema = () => {
  state.value = cloneDeep(DEFAULT)
  commit()
  notify()
}

const canClear = computed(() => {
  if (isEqual(state.value, DEFAULT)) {
    return false
  }
  return true
})

const canSave = computed(() => {
  if (saveSchemaData.value == serialize(state.value)) {
    return false
  }
  return true
})

/**
 * 公共的撤销重做 composable
 */
export function useUndoRedo() {

  function subscribe(fn: Listener) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  }

  return {
    state,
    history,
    commit,
    undo,
    redo,
    canUndo,
    canRedo,
    subscribe,
    initValue: cloneDeep(DEFAULT),
    saveSchemaToLocal,
    getSchemaByLocal,
    clearSchema,
    canClear,
    canSave
  }
}
