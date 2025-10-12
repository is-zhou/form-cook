<script setup lang="ts">
import typeDefs from '@/types/typeDefs'
import { useSchemaStore } from '@/stores/schema'
import { storeToRefs } from 'pinia'

const store = useSchemaStore()
const { formSchema } = storeToRefs(store)

const dialogSchemaVisible = ref(false)

watch(
  () => formSchema.value,
  () => {
    console.log('formSchema', formSchema.value)
  },
  { deep: true },
)
</script>

<template>
  <div class="page">
    <TopArea @clickHandleSchema="dialogSchemaVisible = true"></TopArea>
    <main class="main">
      <LeftArea />
      <FormTree></FormTree>
      <MiddleArea />
      <RightArea />
    </main>

    <el-dialog v-if="dialogSchemaVisible" v-model="dialogSchemaVisible" title="Schema">
      <CodeEditorMonaco
        v-if="dialogSchemaVisible"
        v-model="formSchema"
        :typeDefs="typeDefs"
        language="typescript"
      />
    </el-dialog>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 1600px;
}
.main {
  flex: 1;

  display: flex;
  align-items: stretch;
  justify-content: space-between;

  background-color: #ffffff;

  height: calc(100vh - 50px);
}
</style>
