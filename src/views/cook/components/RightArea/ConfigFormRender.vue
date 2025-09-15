<script setup lang="ts">
import { watch, ref } from 'vue'
import type { ComponentConfig, FormSchema } from 'form-cook-render'

const formData = defineModel<{ [key: string]: any }>('formData', { required: true })

const configList = defineModel<ComponentConfig[]>('configList', { required: true })

const formSchema = ref<FormSchema>({
  formAreaConfig: {
    attrs: {
      'label-position': 'top',
      size: 'small',
    },
  },
  formContentConfigList: [],
})

watch(
  () => configList.value,
  () => {
    formSchema.value.formContentConfigList = configList.value
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>

<template>
  <form-cook-render v-model="formData" v-model:form-schema="formSchema"></form-cook-render>
</template>

<style scoped lang="scss"></style>
