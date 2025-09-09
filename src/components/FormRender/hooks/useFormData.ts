import { ref, watch, type Ref } from "vue"

export function useFormData(formData: Ref) {
  const _formData = ref<{ [key: string]: any }>(flattenObject(formData.value))

  function flattenObject(obj: any, prefix: string = ''): { [key: string]: any } {
    let result: { [key: string]: any } = {}

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          result = { ...result, ...flattenObject(obj[key], newKey) }
        } else {
          result[newKey] = obj[key]
        }
      }
    }

    return result
  }

  watch(
    () => _formData.value,
    () => {
      Object.keys(_formData.value).forEach((key) => {
        if (!key.includes('.')) {
          formData.value[key] = _formData.value[key]
        } else {
          const pathList = key.split('.')
          pathList.reduce((pre, path, index) => {
            if (typeof pre[path] === 'undefined') {
              pre[path] = {}
            }
            if (pathList.length - 1 === index) {
              pre[path] = _formData.value[key]
            }
            return pre[path]
          }, formData.value)
        }
      })
    },
    { immediate: true, deep: true },
  )

  return _formData
}
