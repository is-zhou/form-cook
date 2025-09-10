<script setup lang="ts">
import { componentsMap } from '@/components/FormRender/componentMap.ts'
import type { TComponentConfig, TFormSchema } from '@/types/schema'
import { useFormData } from './hooks/useFormData'
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

const submitFormData = defineModel<{ [key: string]: any }>({ required: true })
const formSchema = defineModel<TFormSchema>('formSchema', { required: true })

const schemaFormData = useFormData(submitFormData)

const formRef = ref<FormInstance>()

const setDefault = (config: TComponentConfig) => {
  if (config.componentType === 'form' && config.defaultValue !== '') {
    if (typeof schemaFormData.value[config.formItemAttrs.field] === 'undefined') {
      schemaFormData.value[config.formItemAttrs.field] = config.defaultValue
    }
  }
}

async function onSubmit() {
  console.log('点击保存', schemaFormData.value)
  await formRef.value?.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<template>
  <el-form :model="schemaFormData" ref="formRef" v-bind="formSchema.formAreaConfig.attrs">
    <slot
      name="form-content"
      :submitFormData="submitFormData"
      :formData="schemaFormData"
      :formSchema="formSchema"
    >
      <template v-for="config in formSchema.formContentConfigList">
        <template v-if="config.componentType === 'form'">
          <slot :name="config.formItemAttrs.field">
            <el-form-item :prop="config.formItemAttrs.field" v-bind="config.formItemAttrs">
              <slot
                :data="schemaFormData[config.formItemAttrs.field]"
                :config="config"
                :props="$props"
                :key="config.id"
                :formData="schemaFormData"
                :name="config.formItemAttrs.field"
              >
                <component
                  v-model="schemaFormData[config.formItemAttrs.field]"
                  :is="componentsMap[config.componentName]"
                  :ref="config.formItemAttrs.field"
                  v-bind="config.attrs"
                  :default="setDefault(config)"
                >
                </component>
              </slot>
            </el-form-item>
          </slot>
        </template>
        <template v-else> 非表单组件待处理 </template>
      </template>
    </slot>
    <!-- 其他操作 -->
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </el-form>
</template>

<style scoped></style>
