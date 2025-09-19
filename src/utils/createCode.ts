import type { FormSchema } from "form-cook-render";
import { useSerialize } from "vue-serialize-input";

const { serialize } = useSerialize()
export function createCode(formeSchema: FormSchema) {
  return `
<script setup lang="ts">
import { ref } from "vue";
import type { FormSchema } from 'form-cook-render';

const formeSchema = ref<FormSchema>(${serialize(formeSchema, { space: 2 })});
const formData = ref({});

const reset = () => {};
const submit = () => {};
const renderRef = ref();

function submitForm() {
  renderRef.value?.submit();
}

function restForm() {
  renderRef.value?.resetFields();
}

function validateForm() {
  renderRef.value?.validate();
}
</script>

<template>
  <form-cook-render
    v-model="formData"
    @reset="reset"
    @submit="submit"
    ref="renderRef"
    v-model:formSchema="formeSchema"
  />

  <el-button :type="'primary'" @click="submitForm()"> 创建 </el-button>
  <el-button :type="'primary'" @click="restForm()"> 重置 </el-button>
  <el-button :type="'primary'" @click="validateForm()"> 校验 </el-button>
</template>
`
}
