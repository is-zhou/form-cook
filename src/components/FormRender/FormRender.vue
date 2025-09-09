<script setup lang="ts">
import { componentsMap } from '@/components/FormRender/componentMap.ts'
import type { TFormSchema } from '@/types/schema'

const formData = defineModel<{ [key: string]: any }>({ required: true })
const formSchema = defineModel<TFormSchema>('formSchema', { required: true })
</script>
<template>
  <el-form :model="formData" v-bind="formSchema.formAreaConfig.attrs">
    <slot name="form-content" :formData="formData" :formSchema="formSchema">
      <template v-for="config in formSchema.formContentConfigList">
        <template v-if="config.componentType === 'form'">
          <slot :name="config.formItemAttrs.field">
            <el-form-item :prop="config.formItemAttrs.field" v-bind="config.formItemAttrs">
              <slot
                :data="formData[config.formItemAttrs.field]"
                :config="config"
                :props="$props"
                :key="config.id"
                :formData="formData"
                :name="config.formItemAttrs.field"
              >
                <component
                  v-model="formData[config.formItemAttrs.field]"
                  :is="componentsMap[config.componentName]"
                  :ref="config.formItemAttrs.field"
                  v-bind="config.attrs"
                >
                </component>
              </slot>
            </el-form-item>
          </slot>
        </template>
        <template v-else> 非表单组件待处理 </template>
      </template>
    </slot>
  </el-form>
</template>

<style scoped></style>
