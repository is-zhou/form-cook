<script setup lang="ts">
import { transformComponentConfig } from '@/utils'
import type { ComponentConfig } from 'form-cook-render'

const props = defineProps<{
  domain: ComponentConfig
  index: number
  componentNameOptions: {
    value: string
    label: string
    componentConfig: ComponentConfig
  }[]
  parentPath?: string
}>()

const emit = defineEmits<{
  (e: 'remove', domain: ComponentConfig): void
  (e: 'addChild', domain: ComponentConfig): void
}>()

const handleChangeCompName = (val: string) => {
  const target = props.componentNameOptions.find((i) => i.value === val)
  if (!target) return
  const newRow = transformComponentConfig(props.domain, target)
  Object.assign(props.domain, newRow)
}

const handleAddChild = () => {
  emit('addChild', props.domain)
}

const handleRemove = () => {
  emit('remove', props.domain)
}
</script>

<template>
  <el-row :gutter="20" class="domain-item">
    <el-col :span="2"
      ><div style="padding-top: 4px">{{ index + 1 }}</div></el-col
    >

    <el-col :span="5">
      <el-form-item
        v-if="domain.componentType === 'form' && domain.formItemAttrs"
        :prop="parentPath + '.formItemAttrs.field'"
        :rules="{ required: true, message: '字段不能为空', trigger: 'blur' }"
      >
        <el-input v-model="domain.formItemAttrs.field" placeholder="字段名" />
      </el-form-item>
    </el-col>

    <el-col :span="5">
      <el-form-item
        v-if="domain.componentType === 'form' && domain.formItemAttrs"
        :prop="parentPath + '.formItemAttrs.label'"
        :rules="{ required: true, message: '标签不能为空', trigger: 'blur' }"
      >
        <el-input v-model="domain.formItemAttrs.label" placeholder="字段标签" />
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item :prop="'domains.' + index + '.componentName'">
        <el-select
          v-model="domain.componentName"
          placeholder="组件类型"
          @change="handleChangeCompName"
        >
          <el-option
            v-for="opt in componentNameOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-button type="danger" @click.prevent="handleRemove">删除</el-button>
      <el-button
        v-if="domain.componentType === 'layout'"
        type="primary"
        @click.prevent="handleAddChild"
        >添加字段</el-button
      >
    </el-col>
  </el-row>

  <!-- 递归渲染子字段 -->
  <div
    v-if="domain.componentType === 'layout' && domain.children?.length"
    style="padding-left: 20px; border-left: 1px dashed #ccc; margin-top: 5px"
  >
    <template v-for="(child, cIndex) in domain.children">
      <DomainRow
        v-if="typeof child !== 'string'"
        :key="child.id"
        :domain="child"
        :index="cIndex"
        :parent-path="parentPath + '.children.' + cIndex"
        :component-name-options="componentNameOptions"
        @remove="$emit('remove', $event)"
        @addChild="$emit('addChild', $event)"
      />
      <template>{{ child }}</template>
    </template>
  </div>
</template>

<style scoped>
.domain-item {
  margin-bottom: 10px;
}
</style>
