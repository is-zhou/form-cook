<script setup lang="ts">
import type { ComponentConfig, FormCompConfig } from 'form-cook-render'
import { nanoid } from 'nanoid'
import { SerializeInput } from 'vue-serialize-input'
const data = ref<Record<string, any>>()
const emits = defineEmits<{ (e: 'onTransform', list: ComponentConfig[]): void }>()

const isSaveDefault = ref(true)
const isKeyToLabel = ref(true)
const handleTransform = () => {
  if (data.value) {
    const result = flattenJsonToComponentConfig(data.value, {
      isSaveDefault: isSaveDefault.value,
      isKeyToLabel: isKeyToLabel.value,
    })
    emits('onTransform', result)
  }
}

/**
 * 将普通 JSON 对象拍平为 ComponentConfig 数组
 * @param obj - 后端返回的 JSON 对象
 * @param options - 配置项
 *   - isSaveDefault: 是否保留默认值
 *   - isKeyToLabel: 是否把 key 同时配置成 label
 */
function flattenJsonToComponentConfig(
  obj: Record<string, any>,
  options: { isSaveDefault?: boolean; isKeyToLabel?: boolean } = {},
): FormCompConfig[] {
  const { isSaveDefault = false, isKeyToLabel = false } = options

  const result: FormCompConfig[] = []
  debugger
  const traverse = (prefix: string, value: any) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // 对象类型，递归拍平
      Object.entries(value).forEach(([key, val]) => {
        const path = prefix ? `${prefix}.${key}` : key
        traverse(path, val)
      })
    } else {
      // 基础字段，生成 form/input
      const config: FormCompConfig = {
        id: `id_${nanoid(10)}`,
        componentType: 'form',
        componentName: 'input',
        formItemAttrs: {
          field: prefix,
          label: isKeyToLabel ? prefix : '',
        },
        attrs: {},
      }

      if (isSaveDefault) {
        config.defaultValue = value
      }

      result.push(config)
    }
  }

  traverse('', obj)

  return result
}
</script>

<template>
  <SerializeInput
    v-model="data"
    serialize-type="object"
    :autosize="{ minRows: 20, maxRows: 30 }"
  ></SerializeInput>
  &nbsp;
  <div>
    <el-checkbox label="值配置为默认值" v-model="isSaveDefault" />
    <el-checkbox label="将key同时配置成label" v-model="isKeyToLabel" />
  </div>

  &nbsp;
  <el-button type="primary" style="width: 100%" :disabled="!data" @click="handleTransform"
    >解析生成</el-button
  >
</template>

<style scoped lang="scss"></style>
