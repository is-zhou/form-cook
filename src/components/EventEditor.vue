<script setup lang="ts">
import { SerializeInput } from 'vue-serialize-input'
import { ElMessage } from 'element-plus'
import { cloneDeep, isEqual } from 'lodash'
import { Delete } from '@element-plus/icons-vue'
import type { EventConfig } from 'form-cook-render'

type Props = {
  availableEvents?: Array<'click' | 'change' | 'input' | 'focus' | 'blur'>
  globalFunctions?: string[]
}

const modelValue = defineModel<EventConfig[]>({ default: [] })

const {
  availableEvents = ['click', 'change', 'input', 'focus', 'blur'],
  globalFunctions = ['validate', 'resetFields', 'submitForm'],
} = defineProps<Props>()

const formRef = ref<any>(null)

const formModel = reactive<{ events: EventConfig[] }>({ events: [] })

watch(
  () => modelValue.value,
  (val) => {
    formModel.events = cloneDeep(val || [])
  },
  { immediate: true, deep: true },
)

const addEvent = () => {
  formModel.events.push({
    eventName: '',
    handlerType: 'fn',
    fn: (formData) => console.log(formData),
  })
}
const removeEvent = (index: number) => {
  formModel.events.splice(index, 1)
  // 删除后清理校验（可选）
  formRef.value?.clearValidate()
}

const onHandlerTypeChange = (index: number) => {
  const evt = formModel.events[index]
  if (!evt) return
  if (evt.handlerType === 'fn') {
    evt.fnName = undefined
    if (evt.fn == null) evt.fn = () => {}
    formRef.value?.clearValidate([`events[${index}].fnName`])
  } else {
    evt.fn = undefined
    if (!evt.fnName) evt.fnName = ''
    formRef.value?.clearValidate([`events[${index}].fn`])
  }
}

const dynamicRules = computed(() => {
  const rules: Record<string, any[]> = {}
  formModel.events.forEach((evt, i) => {
    // 必填事件名
    rules[`events[${i}].eventName`] = [
      { required: true, message: '请选择事件名', trigger: 'change' },
    ]
    // 必填处理方式
    rules[`events[${i}].handlerType`] = [
      { required: true, message: '请选择处理方式', trigger: 'change' },
    ]
    // fn 模式下 fn 必填（使用自定义 validator 来依据 handlerType 判断）
    rules[`events[${i}].fn`] = [
      {
        validator: (_rule: any, value: any, callback: any) => {
          if (formModel.events[i].handlerType === 'fn') {
            const empty = value == null || (typeof value === 'string' && value.trim() === '')
            if (empty) return callback(new Error('请输入函数代码'))
          }
          callback()
        },
        trigger: 'blur',
      },
    ]
    // function 模式下 fnName 必填
    rules[`events[${i}].fnName`] = [
      {
        validator: (_rule: any, value: any, callback: any) => {
          if (formModel.events[i].handlerType === 'globalFn') {
            if (!value) return callback(new Error('请选择函数'))
          }
          callback()
        },
        trigger: 'change',
      },
    ]
  })
  return rules
})

const canSave = computed(() => !isEqual(modelValue.value, formModel.events))

const saveEvents = async () => {
  try {
    await formRef.value.validate()
    modelValue.value = cloneDeep(formModel.events)
    ElMessage.success('保存成功')
  } catch (err) {
    // 找出第一个未通过校验的事件
    const firstInvalidIndex = formModel.events.findIndex(
      (evt) =>
        !evt.eventName ||
        !evt.handlerType ||
        (evt.handlerType === 'fn' && !evt.fn) ||
        (evt.handlerType === 'globalFn' && !evt.fnName),
    )

    const msg =
      firstInvalidIndex >= 0
        ? `第 ${firstInvalidIndex + 1} 条事件未填写完整，请检查`
        : '请完善必填项后再保存'

    ElMessage({
      type: 'error',
      message: msg,
      showClose: true,
    })
  }
}

// 重置（放弃修改）
const resetEvents = () => {
  formModel.events = cloneDeep(modelValue.value || [])
  formRef.value?.clearValidate()
}
</script>

<template>
  <div class="event_item_wrap">
    <el-form ref="formRef" :model="formModel" :rules="dynamicRules">
      <el-collapse v-if="formModel.events.length" style="margin-bottom: 8px">
        <el-collapse-item v-for="(evt, index) in formModel.events" :key="index">
          <template #title>
            <div
              style="display: flex; justify-content: flex-start; align-items: center; width: 100%"
            >
              <el-button type="danger" :icon="Delete" circle @click.stop="removeEvent(index)">
              </el-button>
              &nbsp; &nbsp;
              <span>事件 {{ index + 1 }}: {{ evt.eventName || '未选事件类型' }}</span>
            </div>
          </template>
          <div class="event_item">
            <el-form-item :prop="`events[${index}].eventName`">
              <el-select v-model="evt.eventName" placeholder="选择事件">
                <el-option v-for="e in availableEvents" :key="e" :label="e" :value="e" />
              </el-select>
            </el-form-item>

            <el-form-item :prop="`events[${index}].handlerType`">
              <el-radio-group
                v-model="evt.handlerType"
                class="ml-2"
                @change="() => onHandlerTypeChange(index)"
              >
                <el-radio label="fn">内联代码</el-radio>
                <el-radio label="globalFn">内置函数</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-if="evt.handlerType === 'fn'" :prop="`events[${index}].fn`">
              <SerializeInput
                v-model="evt.fn"
                type="textarea"
                :rows="6"
                serialize-type="function"
                placeholder="请输入函数，如：(formData) => console.log(formData)"
              />
            </el-form-item>

            <el-form-item v-else :prop="`events[${index}].fnName`">
              <el-select v-model="evt.fnName" placeholder="选择函数">
                <el-option v-for="fn in globalFunctions" :key="fn" :label="fn" :value="fn" />
              </el-select>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div style="display: flex; gap: 8px; margin-top: 8px">
        <el-button style="flex: 1" @click="addEvent"> 添加事件 </el-button>
        <el-button v-if="canSave" style="flex: 1" @click="resetEvents"> 重置 </el-button>
        <el-button
          v-if="canSave"
          style="flex: 1"
          type="primary"
          :disabled="!canSave"
          @click="saveEvents"
        >
          保存
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.event_item_wrap {
  width: 100%;
  border: 1px solid var(--el-border-color-light);
  padding: 8px;
  border-radius: 6px;
  .event_item {
    position: relative;
    padding: 8px;
    border: 1px dashed var(--el-border-color-light);
    border-radius: 6px;
    margin-bottom: 8px;
    .el-form-item {
      margin-bottom: 16px;
    }
    &:hover {
      border: 1px dashed #909399;
    }

    .custom_del {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 12px;
      width: 12px;
      height: 12px;
      color: #f56c6c;
      &:hover {
        cursor: pointer;
        color: #f56c6c;
        background-color: rgb(252, 211, 211);
        border-radius: 8px;
        padding: 2px;
        transform: scale(2);
      }
    }
  }
}
</style>
