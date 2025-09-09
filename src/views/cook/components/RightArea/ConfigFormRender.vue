<script setup lang="ts">
import FormRender from '@/components/FormRender/FormRender.vue'
import { watch, ref } from 'vue'
import type { TFormSchema, TComponentConfig } from '@/types/schema'

const formData = defineModel<{ [key: string]: any }>('formData', { required: true })

const configList = defineModel<TComponentConfig[]>('configList', { required: true })

const formSchema = ref<TFormSchema>({
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
  <form-render v-model="formData" v-model:form-schema="formSchema"></form-render>
</template>

<style scoped lang="scss"></style>
