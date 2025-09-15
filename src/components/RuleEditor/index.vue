<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { SerializeInput } from 'vue-serialize-input'
import { cloneDeep, isEqual } from 'lodash'
import type { SerializeType } from 'vue-serialize-input/dist/components/SerializeInput.vue'

/** 规则类型 */
type RuleType = 'required' | 'length' | 'pattern' | 'custom'

/** 单条规则配置 */
interface RuleConfig {
  type: RuleType
  required?: boolean
  min?: number
  max?: number
  pattern?: string
  validatorFn?: string
  message: string
  trigger: 'blur' | 'change'
}

type RuleArray = RuleConfig[]
type RuleObject = Record<string, RuleConfig[]>

/** v-model 支持数组/对象 */
const modelValue = defineModel<RuleArray | RuleObject>({ default: () => [] })

/** 传入所有可选字段（对象模式时用） */
const props = defineProps<{
  availableFields?: string[]
  serializeType?: SerializeType[]
  placeholder?: string
}>()

/** 判断模式 */
const isArrayMode = computed(() => Array.isArray(modelValue.value))

/** 内部状态统一成对象模式 */
const rules = ref<RuleObject>(
  isArrayMode.value
    ? { default: cloneDeep(modelValue.value as RuleArray) }
    : cloneDeep(modelValue.value as RuleObject),
)

const canSave = computed(() => {
  const target = isArrayMode.value ? { default: modelValue.value } : modelValue.value
  return !isEqual(target, rules.value)
})

watch(
  () => modelValue.value,
  () => {
    rules.value = isArrayMode.value
      ? { default: cloneDeep(modelValue.value as RuleArray) }
      : cloneDeep(modelValue.value as RuleObject)
  },
  { immediate: true, deep: true },
)

/** 规则类型下拉 */
const ruleTypeOptions: { label: string; value: RuleType }[] = [
  { label: '必填', value: 'required' },
  { label: '长度', value: 'length' },
  { label: '正则', value: 'pattern' },
  { label: '函数', value: 'custom' },
]

/** 触发方式下拉 */
const triggerOptions = [
  { label: '失焦 (blur)', value: 'blur' },
  { label: '输入 (change)', value: 'change' },
]

/** 添加字段 */
function addField(newField: string) {
  if (!newField) {
    ElMessage.warning('请选择字段名')
    return
  }
  if (rules.value[newField]) {
    ElMessage.warning('字段已存在')
    return
  }
  rules.value[newField] = []
}

/** 删除字段 */
function removeField(field: string) {
  ElMessageBox.confirm(`确定删除字段 ${field} 的所有规则吗？`, '提示', {
    type: 'warning',
  }).then(() => {
    delete rules.value[field]
    saveRule()
  })
}

/** 添加规则 */
function addRule(field = 'default') {
  if (!rules.value[field]) rules.value[field] = []
  rules.value[field].push({
    type: 'required',
    required: true,
    message: '',
    trigger: 'blur',
  })
}

/** 删除规则 */
function removeRule(field: string, index: number) {
  ElMessageBox.confirm('确定要删除这个规则吗？', '提示', {
    type: 'warning',
  }).then(() => {
    rules.value[field].splice(index, 1)
    saveRule()
  })
}

/** 保存 */
function saveRule() {
  modelValue.value = isArrayMode.value
    ? cloneDeep(rules.value.default || [])
    : cloneDeep(rules.value)
}

/** 编辑器模式 */
const currentType = ref<'ui' | 'code'>('ui')

/** 新字段选择器绑定 */
const newField = ref('')
</script>

<template>
  <div class="rule_editor">
    <!-- 切换 UI / CODE -->
    <div class="options">
      <el-button
        :type="currentType === 'ui' ? 'primary' : ''"
        size="small"
        style="width: 50%"
        @click="currentType = 'ui'"
      >
        UI
      </el-button>
      <el-button
        :type="currentType === 'code' ? 'primary' : ''"
        size="small"
        style="width: 50%"
        @click="currentType = 'code'"
      >
        CODE
      </el-button>
    </div>

    <!-- UI 模式 -->
    <div class="editor" v-if="currentType === 'ui'">
      <template v-for="(ruleArr, field) in rules" :key="field">
        <div class="field_block">
          <div class="field_header" v-if="!isArrayMode">
            <span>{{ `字段: ${field}` }}</span>
            <el-button type="danger" size="small" @click="removeField(field)"> 删除字段 </el-button>
          </div>

          <el-collapse v-if="ruleArr.length" style="margin-bottom: 8px">
            <el-collapse-item v-for="(rule, index) in ruleArr" :key="index">
              <template #title>
                <div
                  style="
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 100%;
                  "
                >
                  <el-button
                    type="danger"
                    :icon="Delete"
                    circle
                    @click.stop="removeRule(field, index)"
                  >
                  </el-button>
                  &nbsp; &nbsp;
                  <span>规则 {{ index + 1 }}: {{ rule.message || '未填写提示信息' }}</span>
                </div>
              </template>

              <!-- 规则类型 -->
              <el-form-item label="规则类型:">
                <el-select v-model="rule.type" placeholder="选择规则类型">
                  <el-option
                    v-for="opt in ruleTypeOptions"
                    :key="opt.value"
                    :label="opt.label"
                    :value="opt.value"
                  />
                </el-select>
              </el-form-item>

              <!-- 类型相关配置 -->
              <template v-if="rule.type === 'required'">
                <el-form-item label="是否必填:">
                  <el-switch v-model="rule.required" />
                </el-form-item>
              </template>

              <template v-if="rule.type === 'length'">
                <el-form-item label="最小长度:">
                  <el-input-number v-model="rule.min" :min="0" />
                </el-form-item>
                <el-form-item label="最大长度:">
                  <el-input-number v-model="rule.max" :min="0" />
                </el-form-item>
              </template>

              <template v-if="rule.type === 'pattern'">
                <el-form-item label="正则表达式:">
                  <el-input v-model="rule.pattern" placeholder="如：^\\d+$" />
                </el-form-item>
              </template>

              <template v-if="rule.type === 'custom'">
                <el-form-item label="自定义函数:">
                  <SerializeInput
                    type="textarea"
                    autosize
                    v-model="rule.validatorFn"
                    placeholder="(rule, value, callback) => { ... }"
                    serialize-type="function"
                  />
                </el-form-item>
              </template>

              <!-- 通用配置 -->
              <el-form-item label="提示信息:">
                <el-input v-model="rule.message" placeholder="请输入提示信息" />
              </el-form-item>

              <el-form-item label="触发方式:">
                <el-select v-model="rule.trigger">
                  <el-option
                    v-for="opt in triggerOptions"
                    :key="opt.value"
                    :label="opt.label"
                    :value="opt.value"
                  />
                </el-select>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>

          <div style="text-align: right">
            <el-button size="small" style="width: 100%" @click="addRule(field)">添加规则</el-button>
          </div>
        </div>
      </template>

      <!-- 对象模式下，字段选择器 -->
      <div v-if="!isArrayMode" style="margin-top: 12px; display: flex">
        <el-select
          v-model="newField"
          placeholder="选择字段"
          allow-create
          size="small"
          filterable
          style="width: 200px"
        >
          <el-option v-for="f in props.availableFields || []" :key="f" :label="f" :value="f" />
        </el-select>
        <el-button size="small" type="primary" style="margin-left: 6px" @click="addField(newField)">
          添加字段
        </el-button>
      </div>

      <!-- 保存 -->
      <div style="text-align: right; margin-top: 10px">
        <el-button v-if="canSave" type="primary" size="small" @click="saveRule()">
          保存规则
        </el-button>
      </div>
    </div>

    <!-- CODE 模式 -->
    <div class="editor" v-if="currentType === 'code'">
      <SerializeInput
        v-model="modelValue"
        :serialize-type="serializeType"
        autosize
        :placeholder="placeholder || ''"
      ></SerializeInput>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rule_editor {
  padding: 8px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 6px;
  width: 100%;
  .options {
    display: flex;
    margin-bottom: 8px;
  }
  .editor {
    padding: 8px;
    border: 1px dashed var(--el-border-color-light);
    border-radius: 6px;
    width: 100%;
  }
  .field_block {
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 12px;
    ::v-deep(.el-form-item) {
      margin-bottom: 10px;
      .el-form-item__label {
        margin-bottom: 4px;
      }
    }
  }
  .field_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    font-weight: bold;
  }
}
</style>
