<script setup lang="ts">
import IconAI from '@/components/icon/IconAI.vue'
import {
  AI_CONFIG_STORAGE_KEY,
  aiProviderPresets,
  createDefaultAIConfig,
  generateFormSchema,
  type AIConfig,
  type AIProviderPreset,
} from '@/services/aiForm'
import { useSchemaStore } from '@/stores/schema'
import type { FormSchema } from 'form-cook-render'

const state = useSchemaStore()

const dialogVisible = ref(false)
const prompt = ref('')
const previewCode = ref('')
const summary = ref('')
const warnings = ref<string[]>([])
const generatedSchema = ref<FormSchema | null>(null)
const isGenerating = ref(false)
const rememberApiKey = ref(false)
const aiConfig = ref<AIConfig>(loadAIConfig())
const configExpanded = ref(false)

const examples = [
  '生成一个员工入职表单，包含姓名、手机号、部门、职位、入职日期、紧急联系人',
  '帮我做一个活动报名表，需要姓名、手机号、邮箱、公司、参与场次、备注',
  '生成一个请假申请表，包含申请人、部门、请假类型、开始日期、结束日期、请假事由、审批人',
]

const providerOptions: Array<{ label: string; value: AIProviderPreset }> = [
  { label: '自定义', value: 'custom' },
  { label: 'OpenAI', value: 'openai' },
  { label: 'DeepSeek', value: 'deepseek' },
  { label: '硅基流动', value: 'siliconflow' },
]

watch(
  [aiConfig, rememberApiKey],
  () => {
    const payload = {
      ...aiConfig.value,
      apiKey: rememberApiKey.value ? aiConfig.value.apiKey : '',
      rememberApiKey: rememberApiKey.value,
    }
    localStorage.setItem(AI_CONFIG_STORAGE_KEY, JSON.stringify(payload))
  },
  { deep: true },
)

const providerLabel = computed(() => {
  if (aiConfig.value.provider === 'custom') {
    return '自定义'
  }
  return aiProviderPresets[aiConfig.value.provider].label
})

const configSummary = computed(() => {
  if (aiConfig.value.mode === 'local') {
    return '当前使用本地规则生成，无需配置接口。'
  }

  const parts = [
    `服务商：${providerLabel.value}`,
    `模型：${aiConfig.value.model || '未填写'}`,
    `密钥：${aiConfig.value.apiKey ? '已填写' : '未填写'}`,
  ]

  return parts.join(' | ')
})

const canExpandConfig = computed(() => aiConfig.value.mode === 'openai-compatible')
const showResultPreview = computed(() => !(configExpanded.value && canExpandConfig.value))

const fillExample = (value: string) => {
  prompt.value = value
}

const handleModeChange = (mode: AIConfig['mode']) => {
  aiConfig.value.mode = mode
  if (mode === 'local') {
    configExpanded.value = false
    return
  }

  const needSetup = !aiConfig.value.baseUrl?.trim() || !aiConfig.value.model?.trim() || !aiConfig.value.apiKey?.trim()
  if (needSetup) {
    configExpanded.value = true
  }
}

const toggleConfigExpanded = () => {
  if (!canExpandConfig.value) {
    configExpanded.value = false
    return
  }
  configExpanded.value = !configExpanded.value
}

watch(
  () => aiConfig.value.mode,
  (mode) => {
    if (mode === 'local') {
      configExpanded.value = false
      return
    }
    const needSetup =
      !aiConfig.value.baseUrl?.trim() || !aiConfig.value.model?.trim() || !aiConfig.value.apiKey?.trim()
    if (needSetup) {
      configExpanded.value = true
    }
  },
  { immediate: true },
)

const handleProviderChange = (provider: AIProviderPreset) => {
  if (provider === 'custom') {
    aiConfig.value.provider = provider
    return
  }

  const preset = aiProviderPresets[provider]
  aiConfig.value = {
    ...aiConfig.value,
    provider,
    baseUrl: preset.baseUrl,
    model: preset.model,
  }
}

const resetConfig = () => {
  aiConfig.value = createDefaultAIConfig()
  rememberApiKey.value = false
  configExpanded.value = false
  ElMessage.success('已恢复默认模型配置')
}

const handleGenerate = async () => {
  if (!prompt.value.trim()) {
    ElMessage.warning('请先输入你的表单需求')
    return
  }

  isGenerating.value = true

  try {
    const result = await generateFormSchema(prompt.value, aiConfig.value)
    generatedSchema.value = result.schema
    summary.value = result.summary
    warnings.value = result.warnings
    previewCode.value = JSON.stringify(result.schema, null, 2)
    ElMessage.success('AI 表单草稿已生成')
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '生成失败')
  } finally {
    isGenerating.value = false
  }
}

const applySchema = () => {
  if (!generatedSchema.value) {
    ElMessage.warning('请先生成表单')
    return
  }

  state.replaceSchema(generatedSchema.value)
  dialogVisible.value = false
  ElMessage.success('已应用到画布')
}

function loadAIConfig(): AIConfig {
  const defaults = createDefaultAIConfig()
  const raw = localStorage.getItem(AI_CONFIG_STORAGE_KEY)

  if (!raw) {
    return defaults
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AIConfig> & { rememberApiKey?: boolean }
    rememberApiKey.value = !!parsed.rememberApiKey
    return {
      ...defaults,
      ...parsed,
      apiKey: rememberApiKey.value ? parsed.apiKey || '' : '',
    }
  } catch {
    return defaults
  }
}
</script>

<template>
  <el-tooltip effect="light" content="AI 生成表单" placement="bottom">
    <el-button type="primary" plain @click="dialogVisible = true"
      >AI<el-icon class="el-icon--right"><IconAI /></el-icon></el-button
    >
  </el-tooltip>

  <el-dialog v-model="dialogVisible" title="AI 生成表单" width="960px" :close-on-click-modal="false">
    <div class="dialog_ai">
      <div class="dialog_ai__input">
        <div class="dialog_ai__panel">
          <div class="dialog_ai__title">描述你想生成的表单</div>
          <el-input
            v-model="prompt"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 18 }"
            placeholder="例如：生成一个员工入职表单，包含姓名、手机号、部门、职位、入职日期、紧急联系人"
          />

          <div class="dialog_ai__actions">
            <el-button type="primary" :loading="isGenerating" @click="handleGenerate">
              生成表单
            </el-button>
            <el-button :disabled="!generatedSchema" @click="applySchema">应用到画布</el-button>
          </div>

          <div class="dialog_ai__examples">
            <span class="dialog_ai__label">示例提示词 ( 快点击填充试试吧~ )：</span>
            <el-tag
              v-for="item in examples"
              :key="item"
              class="dialog_ai__tag"
              effect="plain"
              @click="fillExample(item)"
            >
              {{ item }}
            </el-tag>
          </div>

        </div>
      </div>

      <div class="dialog_ai__right">
        <div class="dialog_ai__panel dialog_ai__panel--config">
          <div class="dialog_ai__panel_header">
            <div>
              <div class="dialog_ai__title"> <span>模型配置：</span>
                <el-radio-group
                  :model-value="aiConfig.mode"
                  class="dialog_ai__mode"
                  @change="handleModeChange"
                >
                  <el-radio-button label="local" value="local">本地规则</el-radio-button>
                  <el-radio-button label="openai-compatible" value="openai-compatible">
                    OpenAI 兼容接口
                  </el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="dialog_ai__config_actions">
              <el-button v-if="canExpandConfig" text @click="toggleConfigExpanded">
                {{ configExpanded ? '收起配置' : '展开配置' }}
              </el-button>
              <el-button @click="resetConfig">恢复默认</el-button>
            </div>
          </div>
          <div class="dialog_ai__config_summary">当前模型配置 [ {{ configSummary }} ]</div>

          <el-collapse-transition>
            <div v-show="configExpanded && canExpandConfig" class="dialog_ai__config_body">
              <el-form label-width="90px">
                <el-form-item label="服务商预设">
                  <el-select
                    v-model="aiConfig.provider"
                    placeholder="选择服务商"
                    @change="handleProviderChange"
                  >
                    <el-option
                      v-for="item in providerOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="Base URL">
                  <el-input
                    v-model="aiConfig.baseUrl"
                    placeholder="例如 https://api.deepseek.com/v1"
                  />
                </el-form-item>

                <el-form-item label="模型名称">
                  <el-input v-model="aiConfig.model" placeholder="例如 deepseek-chat" />
                </el-form-item>

                <el-form-item label="API Key">
                  <el-input
                    v-model="aiConfig.apiKey"
                    type="password"
                    show-password
                    placeholder="输入你自己的 API Key"
                  />
                </el-form-item>

                <el-form-item label="Temperature">
                  <el-slider v-model="aiConfig.temperature" :min="0" :max="1" :step="0.1" />
                </el-form-item>
              </el-form>

              <div class="dialog_ai__remember">
                <el-switch v-model="rememberApiKey" />
                <span>记住 API Key 到本地浏览器</span>
              </div>

              <el-alert
                title="默认只保存服务商、Base URL 和模型名。勾选后才会一起保存 API Key。"
                type="info"
                :closable="false"
                show-icon
              />
            </div>
          </el-collapse-transition>
        </div>

        <div v-show="showResultPreview" class="dialog_ai__result">
          <div class="dialog_ai__title">生成结果预览</div>
          <el-empty
            v-if="!previewCode"
            description="生成后会在这里展示 schema 预览，你可以确认后再应用到画布。"
          />

          <template v-else>
            <div class="dialog_ai__summary">{{ summary }}</div>
            <div v-if="warnings.length" class="dialog_ai__warnings">
              <el-alert
                v-for="item in warnings"
                :key="item"
                :title="item"
                type="warning"
                :closable="false"
                show-icon
              />
            </div>

            <CodeEditor v-if="dialogVisible" v-model="previewCode" language="typescript" read-only />
          </template>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.dialog_ai {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
  align-items: start;
  min-height: 380px;

  &__input,
  &__right,
  &__result {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    flex-shrink: 0;
    >span{
      flex-shrink: 0;
    }
  }

  &__panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    background: #fafafa;
  }

  &__right {
    min-width: 0;
  }

  &__panel_header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  &__mode {
    width: 100%;
  }

  &__config_summary {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #606266;
    line-height: 1.8;
    text-align: center;
    color: #409eff;
  }

  &__label {
    font-size: 13px;
    color: #606266;
    margin-top: 8px;
  }

  &__examples {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__tag {
    cursor: pointer;
    white-space: normal;
    height: auto;
    padding: 6px 10px;
    line-height: 1.5;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;

    .el-button {
      flex: 1;
      margin-left: 0 !important;
    }
  }

  &__config_actions {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: flex-end;
  }

  &__config_body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__remember {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #606266;
  }

  &__summary {
    font-size: 13px;
    color: #409eff;
  }

  &__warnings {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
