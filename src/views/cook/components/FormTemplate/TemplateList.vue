<script setup lang="ts">
import type { FormSchema } from 'form-cook-render'
import { useSchemaStore } from '@/stores/schema'
import basics from '@/templates/basics'
import rules from '@/templates/rules'
import col from '@/templates/col'

const store = useSchemaStore()
const tList = [basics, rules, col]

const loadSchema = (item: { label: string; icon: string; getSchema: () => FormSchema }) => {
  const templateSchema = item.getSchema()
  store.replaceSchema(templateSchema)
}
</script>

<template>
  <div class="t_wrap">
    <div class="t_item" v-for="i in tList">
      <img :src="i.icon" alt="" />
      <div class="options">
        {{ i.label }}
        <el-button type="primary" @click="loadSchema(i)" plain style="margin-right: 12px"
          >使用</el-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.t_wrap {
  padding-right: 8px;
}
.t_item {
  border: 1px dashed gainsboro;
  font-size: 12px;
  padding: 6px;
  margin-bottom: 6px;
  img {
    width: 100%;
  }
  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
