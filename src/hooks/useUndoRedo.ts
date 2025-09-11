// composables/useUndoRedo.ts
import { ref, type Ref } from 'vue'
import { useManualRefHistory } from '@vueuse/core'
import type { TFormSchema } from '@/types/schema'
import { cloneDeep } from 'lodash'

// 1. 创建一个共享的 ref（全局数据）
const state = ref<TFormSchema>()
const _initValue = ref<TFormSchema>()

// 2. 创建手动历史管理
const { history, commit, undo: _undo, redo: _redo, canUndo, canRedo } = useManualRefHistory(state, {
  capacity: 50,   // 最多保存 50 条历史
  clone: cloneDeep,
})

// 3. 订阅器集合
type Listener = (val: TFormSchema | undefined) => void
const listeners = new Set<Listener>()

function notify() {
  for (const fn of listeners) {
    try {

      fn(state.value || _initValue.value)
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

/**
 * 公共的撤销重做 composable
 */
export function useUndoRedo(initValue?: TFormSchema) {
  if (initValue) {
    _initValue.value = cloneDeep(initValue)
  }
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
    initValue: _initValue
  }
}
