<script setup lang="ts">
import type { TComponentConfig, TFormSchema } from '@/types/schema'
import { View } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import IconCode from '@/components/icon/IconCode.vue'
import IconPull from '@/components/icon/IconPull.vue'

import typeDefs from '@/types/typeDefs'
import { useResizable } from '@/hooks/useResizable'

const formSchema = defineModel<TFormSchema>('formSchema', { required: true })

const _formData = ref<{ [key: string]: any }>()

const selectedConfig = defineModel<TComponentConfig | null>('selectedConfig')

const dialogFormVisible = ref(false)
const dialogSchemaVisible = ref(false)
const previewFormData = ref<{ [key: string]: any }>()

const parentRef = ref<HTMLElement | null>(null)
const targetRef = ref<HTMLElement | null>(null)
const handleRef = ref<HTMLElement | null>(null)

const { width, isUpdateWidth } = useResizable(handleRef, targetRef, {
  parent: parentRef,
  defaultWidth: 375,
})
</script>

<template>
  <div class="middle_area" ref="parentRef">
    <div class="area_options">
      <el-tooltip effect="light" content="预览" placement="bottom">
        <el-button :icon="View" type="primary" @click="dialogFormVisible = true" plain />
      </el-tooltip>
      <el-tooltip effect="light" content="Schema" placement="bottom">
        <el-button
          :icon="IconCode"
          type="primary"
          @click="dialogSchemaVisible = true"
          plain
        ></el-button>
      </el-tooltip>
    </div>

    <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible" title="表单预览" width="500">
      <form-render v-model="previewFormData" v-model:form-schema="formSchema"></form-render>
    </el-dialog>

    <el-dialog v-if="dialogSchemaVisible" v-model="dialogSchemaVisible" title="Schema">
      <CodeEditorMonaco
        v-if="dialogSchemaVisible"
        v-model="formSchema"
        :typeDefs="typeDefs"
        language="typescript"
      />
    </el-dialog>
    <div class="canvas_wrap" :style="{ width: `${width + 10}px` }">
      <el-scrollbar height="100%">
        <div
          ref="targetRef"
          class="canvas_area"
          :class="{ option_hint: !formSchema.formContentConfigList.length }"
        >
          <el-form :model="_formData" v-bind="formSchema.formAreaConfig.attrs">
            <DraggableArea
              class="area_hight"
              v-model:configList="formSchema.formContentConfigList"
              v-model:selectedConfig="selectedConfig"
            ></DraggableArea>
          </el-form>
        </div>
      </el-scrollbar>

      <div class="handle_pull" :class="{ updateWidth: isUpdateWidth }">
        <span ref="handleRef"><IconPull></IconPull></span>{{ width }}px
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.middle_area {
  position: relative;
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 10px 10px;
  .area_options {
    position: absolute;

    display: flex;

    align-items: center;
    justify-content: flex-start;
    right: 10px;
    img {
      width: 20px;
    }
  }
  .canvas_wrap {
    position: relative;
    margin-left: 10px;
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
  }

  .canvas_area {
    width: 100%;
    background-color: #fff;
    padding: 10px;

    .area_hight {
      min-height: calc(100vh - 40px - 20px - 22px);
    }

    &.option_hint {
      position: relative;
      &::before {
        content: '请从左侧列表拖动表单组件放置于此!';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        text-align: center;
        transform: translate(-50%, -50%);
        font-size: 16px;
        color: #909399;
      }
    }
  }
}
</style>
