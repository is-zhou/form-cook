<script setup lang="ts">
import { SerializeInput } from 'vue-serialize-input'
import type { RuleConfig } from './index.vue'

/** 规则类型 */
type RuleEditorType = 'required' | 'length' | 'pattern' | 'custom'

const modelValue = defineModel<RuleConfig>('rule', { required: true })
const ruleEditorType = ref(detectRuleType(modelValue.value))

/** 规则类型下拉 */
const ruleTypeOptions: { label: string; value: RuleEditorType }[] = [
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

function detectRuleType(rule: Partial<RuleConfig>): RuleEditorType {
  if (rule.validator) return 'custom'
  if (rule.pattern) return 'pattern'
  if (rule.min != null || rule.max != null) return 'length'
  if (rule.required) return 'required'
  return 'required'
}

function applyRuleType() {
  Object.keys(modelValue.value).forEach((key) => {
    if (!['type', 'message', 'trigger'].includes(key)) delete (modelValue.value as any)[key]
  })

  switch (ruleEditorType.value) {
    case 'required':
      modelValue.value.required = true
      break
    case 'length':
      modelValue.value.min = 0
      modelValue.value.max = 10
      break
    case 'pattern':
      modelValue.value.pattern = ''
      break
    case 'custom':
      modelValue.value.validator = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input '))
        } else {
          callback()
        }
      }
      break
  }
}
</script>

<template>
  <div class="rule_wrap">
    <el-form-item>
      <el-radio-group v-model="ruleEditorType" size="small" @change="applyRuleType">
        <el-radio-button
          v-for="opt in ruleTypeOptions"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </el-radio-group>
    </el-form-item>
    <div class="rule_options">
      <el-form label-width="auto">
        <!-- 类型相关配置 -->
        <el-form-item label=" 校验类型:">
          <el-input v-model="modelValue.type" clearable placeholder="请输入校验类型(非必填)" />
        </el-form-item>
        <!-- 类型相关配置 -->
        <template v-if="ruleEditorType === 'required'">
          <el-form-item label="是否必填:" required>
            <el-switch v-model="modelValue.required" />
          </el-form-item>
        </template>

        <template v-if="ruleEditorType === 'length'">
          <el-form-item label="最小长度:" required>
            <el-input-number v-model="modelValue.min" :min="0" />
          </el-form-item>
          <el-form-item label="最大长度:" required>
            <el-input-number v-model="modelValue.max" :min="0" />
          </el-form-item>
        </template>

        <template v-if="ruleEditorType === 'pattern'">
          <el-form-item label="校验正则:" required>
            <el-input v-model="modelValue.pattern" type="textarea" placeholder="如：^\\d+$" />
          </el-form-item>
        </template>

        <template v-if="ruleEditorType === 'custom'">
          <el-form-item label="校验函数:" required>
            <SerializeInput
              type="textarea"
              autosize
              v-model="modelValue.validator"
              placeholder="(rule, value, callback) => { ... }"
              serialize-type="function"
            />
          </el-form-item>
        </template>

        <!-- 通用配置 -->
        <el-form-item label="提示信息:" required>
          <el-input v-model="modelValue.message" type="textarea" placeholder="请输入提示信息" />
        </el-form-item>

        <el-form-item label="触发方式:" required>
          <el-select v-model="modelValue.trigger">
            <el-option
              v-for="opt in triggerOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rule_wrap {
  .rule_options {
    padding: 4px;
    border: 1px dashed var(--el-border-color-lighter);
    border-radius: 8px;
  }
  ::v-deep(.el-radio-group) {
    width: 100%;
    .el-radio-button {
      flex: 1;
      .el-radio-button__inner {
        width: 100%;
      }
    }
  }
}
</style>
