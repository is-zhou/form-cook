<script setup lang="ts">
import type { TComponentConfig } from '@/types/schema'

const componentConfig = defineModel<TComponentConfig | null>('componentConfig')
</script>

<template>
  <div class="right_area">
    <el-form v-if="componentConfig" :model="componentConfig">
      <el-form-item label="是否显示清除按钮">
        <el-switch v-model="componentConfig.attrs['clearable']" />
      </el-form-item>
    </el-form>
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
