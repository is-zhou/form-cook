<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { ComponentConfig } from 'form-cook-render'
import { nanoid } from 'nanoid'
import type { Material } from '@/types/material'
import material from '@/materials/index'
import cloneDeep from 'lodash/cloneDeep'

const materials: Material[] = [...material.materialFormList, ...material.materialLayoutList]

const componentNameOptions = materials.map((i) => ({
  value: i.materialContent.componentName,
  label: i.label,
  componentConfig: i.materialContent,
}))
const emits = defineEmits<{ (e: 'onSaveCompConfigList', list: ComponentConfig[]): void }>()

const { initConfigList = [] } = defineProps<{ initConfigList?: ComponentConfig[] }>()

const formRef = ref<FormInstance>()

const dynamicValidateForm = reactive<{ domains: ComponentConfig[] }>({
  domains: cloneDeep(initConfigList) || [],
})

// 删除字段
const removeDomain = (item: ComponentConfig) => {
  const deleteRecursive = (list: ComponentConfig[], target: ComponentConfig) => {
    const index = list.indexOf(target)
    if (index !== -1) {
      list.splice(index, 1)
      return true
    }
    for (const i of list) {
      if ('children' in i && i.children) {
        if (deleteRecursive(i.children, target)) return true
      }
    }
    return false
  }
  deleteRecursive(dynamicValidateForm.domains, item)
}

// 添加字段
const addDomain = () => {
  dynamicValidateForm.domains.push({
    id: `id_${nanoid(10)}`,
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: { field: '', label: '' },
    attrs: {},
  })
}

// 添加子字段
const addChildDomain = (parent: ComponentConfig) => {
  if (parent.componentType !== 'layout') return
  if (!('children' in parent) || !parent.children) parent.children = []
  parent.children.push({
    id: `id_${nanoid(10)}`,
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: { field: '', label: '' },
    attrs: {},
  })
}

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (dynamicValidateForm.domains.length <= 0) {
    ElMessage.error('请先添加数据')
    return
  }
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      emits('onSaveCompConfigList', cloneDeep(dynamicValidateForm.domains))
    }
  })
}

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()

  if (initConfigList.length) {
    dynamicValidateForm.domains = cloneDeep(initConfigList)
  } else {
    dynamicValidateForm.domains = []
  }
}
</script>

<template>
  <div class="fieldsEditor">
    <div class="form_wrap">
      <div class="form_scroll">
        <el-form ref="formRef" :model="dynamicValidateForm" label-width="0px">
          <el-row :gutter="20">
            <el-col :span="2"></el-col>
            <el-col :span="5"><strong>字段</strong></el-col>
            <el-col :span="5"><strong>标签</strong></el-col>
            <el-col :span="6"><strong>组件</strong></el-col>
            <el-col :span="6"><strong>操作</strong></el-col>
          </el-row>
          <br />

          <DomainRow
            v-for="(domain, index) in dynamicValidateForm.domains"
            :key="domain.id"
            :domain="domain"
            :index="index"
            :component-name-options="componentNameOptions"
            @remove="removeDomain"
            @addChild="addChildDomain"
            :parent-path="'domains.' + index"
          />
        </el-form>
      </div>
      <div style="text-align: center; width: 100%; margin-top: 20px">
        <el-button @click="addDomain">添加字段</el-button>
        <el-button type="primary" @click="submitForm(formRef)">确认</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </div>
    </div>
    <div class="code_wrap">
      <JsonToCompConfig
        @onTransform="(list: ComponentConfig[]) => dynamicValidateForm.domains.push(...list)"
      ></JsonToCompConfig>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fieldsEditor {
  display: flex;
  align-items: stretch;

  .form_wrap {
    border: 1px solid gainsboro;
    padding: 10px;
    flex: 1;

    .form_scroll {
      height: 56vh;
      overflow-y: auto;
      box-sizing: border-box;

      ::v-deep(.el-form) {
        box-sizing: border-box;
        width: 98%;
      }
    }
  }
  .code_wrap {
    width: 240px;
    border: 1px solid gainsboro;
    padding: 10px;
  }
}
</style>
