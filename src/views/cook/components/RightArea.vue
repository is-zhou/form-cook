<script setup lang="ts">
import type { TComponentConfig } from '@/types/schema'
import { ref } from 'vue'

const componentConfig = defineModel<TComponentConfig | null>('componentConfig')
const formConfig = defineModel<{ attrs: { [key: string]: any } }>('formConfig', { required: true })

const activeName = ref('formItem')
</script>

<template>
  <div class="right_area">
    <el-tabs v-model="activeName" type="border-card" style="min-height: 100%">
      <el-tab-pane label="组件配置" name="form">
        <el-form v-if="componentConfig" :model="componentConfig">
          <el-form-item label="是否显示清除按钮">
            <el-switch v-model="componentConfig.attrs['clearable']" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="表单域配置" name="formArea">
        <el-form v-if="formConfig" :model="formConfig">
          <el-form-item label="行内表单模式">
            <el-switch v-model="formConfig.attrs['inline']" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.right_area {
  width: 330px;
  height: 100%;
  overflow: auto;
  background-color: #fff;
}
</style>
