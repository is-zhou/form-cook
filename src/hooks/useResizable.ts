import { ref, onUnmounted, type Ref, onMounted } from 'vue'

interface Options {
  defaultWidth?: number
  offset?: number
  minWidth?: number
  maxWidth?: number
  parent?: Ref<HTMLElement | null>
}

export function useResizable(
  handle: Ref<HTMLElement | null>,
  target: Ref<HTMLElement | null>,
  options?: Options
) {
  const width = ref(options?.defaultWidth ?? 100)
  const isUpdateWidth = ref(false)

  let startOffset = 0           // 鼠标与 target 右边缘的偏移
  let targetEl: HTMLElement | null = null
  let maxWidth = options?.maxWidth ?? Infinity
  let minWidth = options?.minWidth ?? options?.defaultWidth ?? 50

  const applyWidth = () => {
    if (targetEl) {
      targetEl.style.width = width.value + 'px'
    }
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!targetEl) return
    isUpdateWidth.value = true
    const rect = targetEl.getBoundingClientRect()
    // 基于鼠标 + 初始偏移量计算宽度，保证居中 target 也不会漂移
    const newWidth = e.clientX + startOffset - rect.left
    width.value = Math.round(Math.min(Math.max(newWidth, minWidth), maxWidth))
    applyWidth()
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    targetEl = null
    isUpdateWidth.value = false
  }

  const onMouseDown = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    targetEl = target.value
    if (!targetEl) return

    const rect = targetEl.getBoundingClientRect()
    // 记录鼠标相对于 target 右边缘的偏移量
    startOffset = rect.right - e.clientX

    // 动态计算最大宽度
    if (options?.parent?.value) {
      const style = getComputedStyle(options.parent.value)
      const pLeft = parseFloat(style.paddingLeft) || 0
      const pRight = parseFloat(style.paddingRight) || 0
      maxWidth = options.parent.value.clientWidth - pLeft - pRight
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  onMounted(() => {
    if (handle.value) {
      handle.value.addEventListener('mousedown', onMouseDown)
    }
    targetEl = target.value
    applyWidth()
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    handle.value?.removeEventListener('mousedown', onMouseDown)
  })

  return { width, isUpdateWidth }
}
