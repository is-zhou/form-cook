<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
const zIndex = 3000
const size = 'small'
</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
