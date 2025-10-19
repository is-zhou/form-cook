<script setup lang="ts">
type DefaultOptions = 'copy' | 'del'
type options = 'defaultAdd' | 'saveMaterial'

const { defaultOptions = ['copy', 'del'], options = [] } = defineProps<{
  defaultOptions?: Array<DefaultOptions>
  options?: Array<options>
}>()

const emits = defineEmits<{
  (e: 'del'): void
  (e: 'copy'): void
  (e: 'defaultAdd'): void
  (e: 'saveMaterial'): void
}>()

const isShow = (option: DefaultOptions | options) =>
  [...defaultOptions, ...options].includes(option)
</script>
<template>
  <div class="option_list">
    <el-icon v-if="isShow('saveMaterial')" @click.stop="emits('saveMaterial')" size="14">
      <i-ep-Collection />
    </el-icon>

    <el-icon
      v-if="isShow('defaultAdd')"
      @click.stop="emits('defaultAdd')"
      class="current_copy"
      size="14"
    >
      <i-ep-CirclePlus />
    </el-icon>
    <el-icon v-if="isShow('copy')" @click.stop="emits('copy')" class="current_copy" size="14">
      <i-ep-CopyDocument />
    </el-icon>
    <el-icon v-if="isShow('del')" @click.stop="emits('del')" class="current_del" size="14">
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
  z-index: 100;
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
