<script setup lang="ts">
import { useUndoRedo } from '@/hooks/useUndoRedo'
import type { TComponentConfig, TFormSchema } from '@/types/schema'
import { cloneDeep, isEqual } from 'lodash'
import { onBeforeUnmount, ref, watch } from 'vue'

const formSchema = ref<TFormSchema>({
  formAreaConfig: {
    attrs: {},
  },
  formContentConfigList: [],
})
const selectedConfig = ref<TComponentConfig>()

const { state, initValue, commit, history, undo, redo, subscribe } = useUndoRedo(formSchema.value)

watch(
  () => formSchema.value,
  () => {
    console.log('formSchema', formSchema.value)
  },
  { deep: true },
)

const unsubscribe = subscribe((val) => {
  if (val) {
    formSchema.value.formAreaConfig = cloneDeep(val).formAreaConfig
    formSchema.value.formContentConfigList = cloneDeep(val).formContentConfigList
  }
})

function handleCommit() {
  if (!isEqual(state.value, formSchema.value) && !isEqual(formSchema.value, initValue.value)) {
    state.value = cloneDeep(formSchema.value)
    commit()
  }
}
onBeforeUnmount(() => {
  unsubscribe()
})
</script>

<template>
  <div class="page">
    <TopArea></TopArea>
    <main class="main">
      <LeftArea />
      <MiddleArea v-model:form-schema="formSchema" v-model:selectedConfig="selectedConfig" />
      <RightArea
        :componentConfig="selectedConfig"
        :formAreaConfig="formSchema.formAreaConfig"
        @onChange="handleCommit"
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
