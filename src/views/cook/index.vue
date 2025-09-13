<script setup lang="ts">
import { useUndoRedo } from '@/hooks/useUndoRedo'
import type { TComponentConfig, TFormSchema } from '@/types/schema'
import { cloneDeep, isEqual } from 'lodash'
import { onBeforeUnmount, ref, watch } from 'vue'

const { state, initValue, commit, getSchemaByLocal, subscribe } = useUndoRedo()

const formSchema = ref<TFormSchema>(initValue)
const selectedConfig = ref<TComponentConfig>()

formSchema.value = getSchemaByLocal()

watch(
  () => formSchema.value,
  () => {
    console.log('formSchema', formSchema.value)
  },
  { deep: true },
)

const unsubscribe = subscribe((val) => {
  if (val) {
    const result = cloneDeep(val)
    formSchema.value = result
  }
})

function handleCommit() {
  if (!isEqual(state.value, formSchema.value)) {
    state.value = cloneDeep(formSchema.value)
    commit()
  }
}

function clickPushContentItem(componentConfig: TComponentConfig) {
  selectedConfig.value = componentConfig
  formSchema.value.formContentConfigList.push(componentConfig)
}

onBeforeUnmount(() => {
  unsubscribe()
})
</script>

<template>
  <div class="page">
    <TopArea></TopArea>
    <main class="main">
      <LeftArea @clickPushContentItem="clickPushContentItem" />
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
