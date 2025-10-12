<script setup lang="ts">
import { useResizable } from '@/hooks/useResizable'
import { useSchemaStore } from '@/stores/schema'
import { View } from '@element-plus/icons-vue'
import IconPull from '@/components/icon/IconPull.vue'
import { cloneDeep } from 'lodash'

const previewFormData = ref<{ [key: string]: any }>({})

const state = useSchemaStore()

const dialogVisible = ref(false)

const targetRef = ref<HTMLElement | null>(null)
const handleRef = ref<HTMLElement | null>(null)

const { width, isUpdateWidth } = useResizable(handleRef, targetRef, {
  defaultWidth: 375,
})

const review = ref({})
const handlePreview = () => {
  review.value = cloneDeep(state.formSchema)
  dialogVisible.value = true
}
</script>

<template>
  <!-- <el-tooltip effect="light" content="预览" placement="bottom"> -->
  <el-button :icon="View" type="primary" @click="handlePreview" plain style="margin-right: 12px">
    预览
  </el-button>
  <!-- </el-tooltip> -->

  <el-dialog
    v-model="dialogVisible"
    title="表单预览"
    :width="`${width + 32}px`"
    style="text-align: left"
  >
    <div v-if="dialogVisible" ref="targetRef" class="preview_wrap">
      <form-cook-render v-model="previewFormData" v-model:form-schema="review"></form-cook-render>
    </div>
    <div class="handle_pull" :class="{ updateWidth: isUpdateWidth }">
      <span ref="handleRef"><IconPull></IconPull></span>{{ width }}px
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.preview_wrap {
  position: relative;
  text-align: left;
  height: 66vh;
  overflow-y: auto;
  padding: 10px;
}
.handle_pull {
  display: flex;
  align-items: center;
  gap: 6px;

  position: absolute;
  top: 50%;
  right: -2px;

  transform: translate(100%, -50%);

  user-select: none;
  -webkit-user-drag: none;

  width: 100px;
  height: 20px;
  font-size: 12px;
  color: #ced0d5;

  &.updateWidth {
    svg {
      fill: var(--el-color-primary);
    }
  }

  span {
    display: block;
    width: 20px;
    height: 20px;
    padding: 0;
    margin: 0;
  }
  svg {
    width: 100%;
    height: 100%;
    fill: #ced0d5;
    cursor: ew-resize;
  }
  &:hover {
    svg {
      fill: var(--el-color-primary);
    }
  }
}
</style>
