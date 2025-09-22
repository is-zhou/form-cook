<script setup lang="ts">
import IconImport from '@/components/icon/IconImport.vue'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { ComponentConfig, FormCompConfig } from 'form-cook-render'
import { nanoid } from 'nanoid'
import type { Material } from '@/types/material'
import material from '@/materials/index'
import { Message } from '@element-plus/icons-vue'
const materials: Material[] = [...material.materialFormList]

const componentNameOptions: {
  value: string
  label: string
}[] = materials.map((i) => ({ value: i.materialContent.componentName, label: i.label }))

const layoutCompNameList = materials
  .filter((i) => {
    if (i.materialContent.componentType === 'layout') {
      return true
    }
  })
  .map(({ materialContent }) => materialContent.componentName)

const emits = defineEmits<{ (e: 'onSaveCompConfigList', list: FormCompConfig[]): void }>()
// 控制弹窗显示
const dialogVisible = ref(false)

// 表单引用
const formRef = ref<FormInstance>()

// 快速导入的表单数据
const dynamicValidateForm = reactive<{
  domains: FormCompConfig[]
}>({
  domains: [],
})

// 删除字段
const removeDomain = (item: FormCompConfig) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) dynamicValidateForm.domains.splice(index, 1)
}

// 添加字段
const addDomain = () => {
  dynamicValidateForm.domains.push({
    id: `id_${nanoid(10)}`,
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '',
    },
    attrs: {},
  })
}

// const addChildrenDomain = (domains: ComponentConfig) => {
//   if (!Array.isArray(domains.children)) {
//     domains.children = [
//       {
//         id: `id_${nanoid(10)}`,
//         componentName: '',
//         componentType: '',
//         formItemAttrs: {
//           field: '',
//           label: '',
//         },
//         attrs: {},
//       },
//     ]
//   }
//   domains.children.push({
//     id: `id_${nanoid(10)}`,
//     componentName: '',
//     componentType: '',
//     formItemAttrs: {
//       field: '',
//       label: '',
//     },
//     attrs: {},
//   })
// }

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (dynamicValidateForm.domains.length <= 0) {
    ElMessage.error('请先添加数据')
    return
  }
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('导入字段:', dynamicValidateForm.domains)

      emits('onSaveCompConfigList', dynamicValidateForm.domains)
      dialogVisible.value = false
    } else {
      console.log('表单验证失败！')
    }
  })
}

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dynamicValidateForm.domains = []
}

// 打开弹窗
const handleCreate = () => {
  dialogVisible.value = true
}
</script>

<template>
  <el-tooltip effect="light" content="快速添加字段" placement="bottom">
    <el-button :icon="IconImport" type="primary" plain @click="handleCreate" />
  </el-tooltip>

  <el-dialog v-model="dialogVisible" title="快速导入字段" width="800px">
    <el-form ref="formRef" :model="dynamicValidateForm" label-width="0px" class="demo-dynamic">
      <el-row :gutter="20">
        <el-col :span="1"></el-col>
        <el-col :span="6"><strong>字段</strong></el-col>
        <el-col :span="6"><strong>标签</strong></el-col>
        <el-col :span="6"><strong>组件</strong></el-col>
        <el-col :span="4"><strong>操作</strong></el-col>
      </el-row>

      <el-row :gutter="20" v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.id">
        <el-col :span="1">
          <div style="padding-top: 4px">{{ index + 1 }}</div>
        </el-col>
        <el-col :span="6">
          <el-form-item
            v-if="!layoutCompNameList.includes(domain.componentName)"
            :prop="'domains.' + index + '.formItemAttrs.field'"
            :rules="{ required: true, message: '字段不能为空', trigger: 'blur' }"
          >
            <el-input v-model="domain.formItemAttrs.field" placeholder="字段名" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            v-if="!layoutCompNameList.includes(domain.componentName)"
            :prop="'domains.' + index + '.formItemAttrs.label'"
            :rules="{ required: true, message: '标签不能为空', trigger: 'blur' }"
          >
            <el-input v-model="domain.formItemAttrs.label" placeholder="字段标签" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            :prop="'domains.' + index + '.componentName'"
            :rules="{ required: true, message: '组件不能为空', trigger: 'blur' }"
          >
            <el-select
              v-model="domain.componentName"
              :options="componentNameOptions"
              placeholder="组件类型"
            ></el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-button type="danger" @click.prevent="removeDomain(domain)"> 删除 </el-button>
        </el-col>
      </el-row>

      <el-form-item>
        <div style="text-align: center; width: 100%">
          <el-button @click="addDomain">添加字段</el-button>
          <el-button type="primary" @click="submitForm(formRef)">确认导入</el-button>
          <el-button @click="resetForm(formRef)">清空</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss">
.demo-dynamic .el-row {
  margin-bottom: 10px;
}
</style>
