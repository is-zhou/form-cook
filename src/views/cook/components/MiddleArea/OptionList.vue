<script setup lang="ts">
const emits = defineEmits<{
  (e: 'del'): void
  (e: 'copy'): void
}>()
</script>
<template>
  <div class="option_list">
    <el-icon @click.stop="emits('copy')" class="current_copy" size="14">
      <i-ep-CopyDocument />
    </el-icon>
    <el-icon @click.stop="emits('del')" class="current_del" size="14">
      <i-ep-Delete />
    </el-icon>
  </div>
</template>
<style lang="scss" scoped>
.option_list {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  position: absolute;
  bottom: 0;
  right: 0;
  line-height: 1;
  i {
    cursor: pointer;
    padding: 1px;
  }
  .current_copy {
    background-color: var(--el-color-primary);
    color: var(--el-color-white);
  }
  .current_del {
    background-color: var(--el-color-danger);
    color: var(--el-color-white);
  }
}
</style>
