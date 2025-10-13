import { debounce } from 'lodash'
import { ref, onUnmounted, type Ref, onMounted } from 'vue'

interface Options {
  localStorageKey?: string  //设置了key每次拖动后就会自动保存，刷新页面是获取
  defaultWidth?: number //默认宽度，如果未设置那就是parent的可显示宽度
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
  const width = ref()
  const isUpdateWidth = ref(false)

  let startOffset = 0           // 鼠标与 target 右边缘的偏移
  let targetEl: HTMLElement | null = null
  let maxWidth = options?.maxWidth ?? Infinity
  let minWidth = options?.minWidth ?? 375

  let resizeObserver: ResizeObserver | null = null

  const applyWidth = () => {

    if (targetEl) {
      targetEl.style.width = width.value + 'px'
      return
    }
    if (target.value) {
      target.value.style.width = width.value + 'px'
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
    options?.localStorageKey && localStorage.setItem(`form-cook_${options?.localStorageKey}`, width.value)
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
      const parentWidth = getParentWidth();
      parentWidth && (maxWidth = parentWidth)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const getParentWidth = () => {
    if (options?.parent?.value) {
      const style = getComputedStyle(options.parent.value)
      const pLeft = parseFloat(style.paddingLeft) || 0
      const mLeft = parseFloat(style.marginLeft) || 0
      const mRight = parseFloat(style.marginRight) || 0
      const pRight = parseFloat(style.paddingRight) || 0
      return options.parent.value.clientWidth - pLeft - pRight - mLeft - mRight
    }
    return 0
  }

  const initResizeObserver = () => {

    const debouncedUpdateWith = debounce(() => {

      const parentWidth = getParentWidth()

      if (width.value > parentWidth) {
        width.value = parentWidth
        applyWidth()
      }
    }, 100)

    resizeObserver = new ResizeObserver(() => {
      debouncedUpdateWith()

    })

    options?.parent?.value && resizeObserver.observe(options?.parent?.value)
  }

  onMounted(() => {
    targetEl = target.value
    const cook_canvas_width = localStorage.getItem(`form-cook_${options?.localStorageKey}`)
    if (cook_canvas_width) {
      width.value = Number(cook_canvas_width)
    } else {
      width.value = options?.defaultWidth ?? getParentWidth()
    }
    applyWidth()

    initResizeObserver()
  })

  watch(() => handle.value, () => {
    if (handle.value) {
      handle.value?.removeEventListener('mousedown', onMouseDown)
      handle.value.addEventListener('mousedown', onMouseDown)
    }
  }, { immediate: true, deep: true })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    handle.value?.removeEventListener('mousedown', onMouseDown)
    resizeObserver?.disconnect()
    resizeObserver = null
  })

  return { width, isUpdateWidth }
}
