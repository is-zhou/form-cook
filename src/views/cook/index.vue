<script setup lang="ts">
import type { TComponentConfig, TFormSchema } from '@/types/schema'
import { ref, watch } from 'vue'

const formSchema = ref<TFormSchema>({
  formConfig: {
    attrs: {},
  },
  formContentConfigList: [],
})

const selectedConfig = ref<TComponentConfig>()

watch(
  () => selectedConfig.value,
  () => {
    console.log('selectedConfig', selectedConfig)
  },
)

watch(
  () => formSchema.value,
  () => {
    console.log('formSchema.value', formSchema.value)
  },
  {
    deep: true,
  },
)
</script>

<template>
  <div class="page">
    <TopArea></TopArea>
    <main class="main">
      <LeftArea />
      <MiddleArea v-model:form-schema="formSchema" v-model:selectedConfig="selectedConfig" />
      <RightArea
        v-model:componentConfig="selectedConfig"
        v-model:formConfig="formSchema.formConfig"
      />
    </main>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main {
  flex: 1;

  display: flex;
  align-items: stretch;
  justify-content: space-between;

  background-color: #edeff3;

  height: calc(100vh - 50px);
}
</style>
