<script setup lang="ts">
import type { TFormSchema } from '@/types/schema'
import { ref } from 'vue'

const formSchema = ref<TFormSchema>({
  formContentConfigList: [],
})
</script>

<template>
  <div class="page">
    <TopArea></TopArea>
    <main class="main">
      <LeftArea />
      <MiddleArea v-model:form-schema="formSchema" />
      <RightArea />
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
