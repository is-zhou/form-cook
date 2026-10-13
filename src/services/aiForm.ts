import type { ComponentConfig, FormSchema } from 'form-cook-render'
import { nanoid } from 'nanoid'

type FieldKind =
  | 'input'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'number'
  | 'switch'
  | 'upload'

type FieldTemplate = {
  label: string
  field?: string
  kind: FieldKind
  required?: boolean
  keywords: string[]
  options?: Array<{ label: string; value: string | number }>
}

type SceneTemplate = {
  title: string
  keywords: string[]
  fields: string[]
}

export type AIGenerateResult = {
  summary: string
  warnings: string[]
  schema: FormSchema
}

export type AIProviderPreset = 'custom' | 'openai' | 'deepseek' | 'siliconflow'

export type AIConfig = {
  mode: 'local' | 'openai-compatible'
  provider: AIProviderPreset
  baseUrl: string
  model: string
  apiKey: string
  temperature: number
}

export const AI_CONFIG_STORAGE_KEY = 'form-cook_ai_config'

export const aiProviderPresets: Record<
  Exclude<AIProviderPreset, 'custom'>,
  { label: string; baseUrl: string; model: string }
> = {
  openai: {
    label: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
  },
  deepseek: {
    label: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
  },
  siliconflow: {
    label: '硅基流动',
    baseUrl: 'https://api.siliconflow.cn/v1',
    model: 'deepseek-ai/DeepSeek-V3',
  },
}

export function createDefaultAIConfig(): AIConfig {
  return {
    mode: 'local',
    provider: 'deepseek',
    baseUrl: aiProviderPresets.deepseek.baseUrl,
    model: aiProviderPresets.deepseek.model,
    apiKey: '',
    temperature: 0.2,
  }
}

const fieldCatalog: FieldTemplate[] = [
  { label: '姓名', field: 'name', kind: 'input', required: true, keywords: ['姓名', '名字', '称呼'] },
  { label: '手机号', field: 'mobile', kind: 'input', required: true, keywords: ['手机号', '手机', '联系电话'] },
  { label: '邮箱', field: 'email', kind: 'input', keywords: ['邮箱', '邮件', 'email'] },
  { label: '部门', field: 'department', kind: 'select', required: true, keywords: ['部门', '组织'] , options: [
    { label: '产品部', value: 'product' },
    { label: '技术部', value: 'tech' },
    { label: '运营部', value: 'operation' },
  ] },
  { label: '职位', field: 'position', kind: 'input', keywords: ['职位', '岗位'] },
  { label: '公司', field: 'company', kind: 'input', keywords: ['公司', '单位'] },
  { label: '年龄', field: 'age', kind: 'number', keywords: ['年龄', '岁数'] },
  { label: '性别', field: 'gender', kind: 'radio', keywords: ['性别'], options: [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' },
  ] },
  { label: '入职日期', field: 'entryDate', kind: 'date', required: true, keywords: ['入职日期', '入职时间'] },
  { label: '开始日期', field: 'startDate', kind: 'date', required: true, keywords: ['开始日期', '开始时间'] },
  { label: '结束日期', field: 'endDate', kind: 'date', required: true, keywords: ['结束日期', '结束时间'] },
  { label: '发生日期', field: 'expenseDate', kind: 'date', keywords: ['发生日期'] },
  { label: '参与场次', field: 'session', kind: 'select', keywords: ['参与场次', '场次'], options: [
    { label: '上午场', value: 'morning' },
    { label: '下午场', value: 'afternoon' },
    { label: '全天', value: 'all_day' },
  ] },
  { label: '请假类型', field: 'leaveType', kind: 'select', keywords: ['请假类型'], options: [
    { label: '事假', value: 'personal' },
    { label: '病假', value: 'sick' },
    { label: '年假', value: 'annual' },
  ] },
  { label: '报销类型', field: 'expenseType', kind: 'select', keywords: ['报销类型'], options: [
    { label: '差旅', value: 'travel' },
    { label: '餐饮', value: 'meal' },
    { label: '办公', value: 'office' },
  ] },
  { label: '报销金额', field: 'amount', kind: 'number', keywords: ['报销金额', '金额'] },
  { label: '申请人', field: 'applicant', kind: 'input', required: true, keywords: ['申请人'] },
  { label: '审批人', field: 'approver', kind: 'select', keywords: ['审批人'], options: [
    { label: '直属主管', value: 'leader' },
    { label: '部门负责人', value: 'manager' },
    { label: 'HR', value: 'hr' },
  ] },
  { label: '紧急联系人', field: 'emergencyContact', kind: 'input', keywords: ['紧急联系人'] },
  { label: '紧急联系电话', field: 'emergencyPhone', kind: 'input', keywords: ['紧急联系电话', '紧急联系人电话'] },
  { label: '身份证号', field: 'idCard', kind: 'input', keywords: ['身份证', '身份证号'] },
  { label: '地址', field: 'address', kind: 'textarea', keywords: ['地址', '住址'] },
  { label: '备注', field: 'remark', kind: 'textarea', keywords: ['备注', '说明', '补充说明'] },
  { label: '请假事由', field: 'leaveReason', kind: 'textarea', keywords: ['请假事由', '请假原因'] },
  { label: '发票附件', field: 'invoiceFiles', kind: 'upload', keywords: ['发票附件', '附件', '上传附件'] },
  { label: '启用状态', field: 'enabled', kind: 'switch', keywords: ['启用状态', '是否启用'] },
  { label: '兴趣爱好', field: 'hobbies', kind: 'checkbox', keywords: ['兴趣爱好', '爱好'], options: [
    { label: '阅读', value: 'reading' },
    { label: '运动', value: 'sports' },
    { label: '音乐', value: 'music' },
  ] },
]

const sceneCatalog: SceneTemplate[] = [
  {
    title: '员工入职表单',
    keywords: ['入职', '员工'],
    fields: ['姓名', '手机号', '邮箱', '部门', '职位', '入职日期', '紧急联系人', '紧急联系电话', '备注'],
  },
  {
    title: '活动报名表',
    keywords: ['报名', '活动'],
    fields: ['姓名', '手机号', '邮箱', '公司', '职位', '参与场次', '备注'],
  },
  {
    title: '报销申请表',
    keywords: ['报销'],
    fields: ['申请人', '部门', '报销类型', '报销金额', '发生日期', '发票附件', '备注'],
  },
  {
    title: '请假申请表',
    keywords: ['请假'],
    fields: ['申请人', '部门', '请假类型', '开始日期', '结束日期', '请假事由', '审批人'],
  },
]

const defaultFieldLabels = ['姓名', '手机号', '邮箱', '备注']

export function generateFormSchemaByPrompt(prompt: string): AIGenerateResult {
  const normalizedPrompt = prompt.trim().toLowerCase()

  if (!normalizedPrompt) {
    throw new Error('请输入表单需求描述')
  }

  const matchedScene = sceneCatalog.find((scene) =>
    scene.keywords.every((keyword) => normalizedPrompt.includes(keyword.toLowerCase())),
  )

  const labelsFromScene = matchedScene?.fields ?? []
  const labelsFromKeywords = fieldCatalog
    .filter((field) => field.keywords.some((keyword) => normalizedPrompt.includes(keyword.toLowerCase())))
    .map((field) => field.label)

  const labels = dedupeLabels([...labelsFromScene, ...labelsFromKeywords])
  const finalLabels = labels.length ? labels : defaultFieldLabels

  const schema: FormSchema = {
    formAreaConfig: {
      defaultCreateBtn: true,
      defaultRestBtn: true,
      attrs: {
        'label-width': '100px',
        rules: {},
      },
    },
    formContentConfigList: finalLabels.map((label, index) => buildFieldComponent(label, index)),
  }

  const summary = matchedScene
    ? `已根据“${matchedScene.title}”场景生成 ${finalLabels.length} 个字段。`
    : `已根据你的描述生成 ${finalLabels.length} 个字段。`

  const warnings = [
    '当前版本使用本地规则生成，用于打通 AI 入口与表单预览流程。',
    '字段校验、远程数据源和复杂联动还需要你在右侧配置面板里继续细化。',
  ]

  return {
    summary,
    warnings,
    schema,
  }
}

export async function generateFormSchema(
  prompt: string,
  config: AIConfig,
): Promise<AIGenerateResult> {
  if (config.mode === 'local') {
    return generateFormSchemaByPrompt(prompt)
  }

  if (!config.baseUrl.trim()) {
    throw new Error('请先配置 Base URL')
  }

  if (!config.model.trim()) {
    throw new Error('请先配置模型名称')
  }

  if (!config.apiKey.trim()) {
    throw new Error('请先配置 API Key')
  }

  return requestOpenAICompatible(prompt, config)
}

function dedupeLabels(labels: string[]) {
  return Array.from(new Set(labels))
}

async function requestOpenAICompatible(
  prompt: string,
  config: AIConfig,
): Promise<AIGenerateResult> {
  const endpoint = normalizeChatCompletionsEndpoint(config.baseUrl)
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey.trim()}`,
    },
    body: JSON.stringify({
      model: config.model.trim(),
      temperature: config.temperature,
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt(),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`模型请求失败：${response.status} ${errorText || response.statusText}`)
  }

  const data = await response.json()
  const content = data?.choices?.[0]?.message?.content

  if (!content || typeof content !== 'string') {
    throw new Error('模型没有返回可解析内容')
  }

  const parsed = parseModelResult(content)
  validateGeneratedSchema(parsed)

  parsed.warnings = [
    ...(parsed.warnings || []),
    '当前结果来自你配置的大模型接口，返回质量取决于模型能力和提示词描述。',
  ]

  return parsed
}

function normalizeChatCompletionsEndpoint(baseUrl: string) {
  const normalized = baseUrl.trim().replace(/\/+$/, '')
  if (normalized.endsWith('/chat/completions')) {
    return normalized
  }
  return `${normalized}/chat/completions`
}

function buildSystemPrompt() {
  return [
    '你是一个表单 schema 生成助手，需要为 form-cook 生成 JSON 结果。',
    '只返回 JSON 对象，不要返回 markdown，不要使用代码块。',
    '顶层结构必须是：{"summary": string, "warnings": string[], "schema": FormSchema}。',
    'schema 结构要求：',
    '1. schema.formAreaConfig.defaultCreateBtn = true',
    '2. schema.formAreaConfig.defaultRestBtn = true',
    '3. schema.formAreaConfig.attrs 至少包含 {"label-width":"100px","rules":{}}',
    '4. schema.formContentConfigList 是数组',
    '5. 每个字段都需要 id、componentName、componentType="form"、formItemAttrs、attrs',
    '6. formItemAttrs 至少包含 field、label，可选 required',
    '7. 仅使用这些 componentName：Input, Textarea, InputNumber, Select, RadioGroup, CheckboxGroup, DatePicker, Switch, Upload',
    '8. Select 使用 attrs.options，格式为 [{label,value}]',
    '9. RadioGroup 使用 slots.default = { componentName: "Radio", options: [{label,value}] }',
    '10. CheckboxGroup 使用 slots.default = { componentName: "Checkbox", options: [{label,value,name}] }',
    '11. DatePicker 默认 attrs = { type: "date", placeholder: "请选择xxx", "value-format": "YYYY-MM-DD" }',
    '12. Input 默认 attrs = { clearable: true, placeholder: "请输入xxx" }',
    '13. Textarea 默认 attrs = { type: "textarea", placeholder: "请输入xxx", autosize: { minRows: 3, maxRows: 5 } }',
    '14. Upload 默认 slots.default 使用 Button，text 为“点击上传”',
    '15. 结果必须是合法 JSON，不能包含注释、函数、undefined、NaN',
    '16. field 使用英文驼峰或下划线命名，例如 name、mobile、entryDate',
  ].join('\n')
}

function parseModelResult(content: string): AIGenerateResult {
  const normalized = content
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/, '')

  let parsed: unknown

  try {
    parsed = JSON.parse(normalized)
  } catch {
    throw new Error('模型返回的内容不是有效 JSON')
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('模型返回结果格式不正确')
  }

  const result = parsed as Partial<AIGenerateResult>

  return {
    summary: typeof result.summary === 'string' ? result.summary : '已生成表单草稿',
    warnings: Array.isArray(result.warnings)
      ? result.warnings.filter((item): item is string => typeof item === 'string')
      : [],
    schema: result.schema as FormSchema,
  }
}

function validateGeneratedSchema(result: AIGenerateResult) {
  if (!result.schema || typeof result.schema !== 'object') {
    throw new Error('模型没有返回 schema')
  }

  if (!result.schema.formAreaConfig || !Array.isArray(result.schema.formContentConfigList)) {
    throw new Error('schema 结构不完整')
  }
}

function buildFieldComponent(label: string, index: number): ComponentConfig {
  const template = fieldCatalog.find((item) => item.label === label)

  if (!template) {
    return createInputField({
      label,
      field: `field_${index + 1}`,
      required: false,
    })
  }

  const field = template.field || `field_${index + 1}`

  switch (template.kind) {
    case 'textarea':
      return createTextareaField({ label: template.label, field, required: !!template.required })
    case 'select':
      return createSelectField({
        label: template.label,
        field,
        required: !!template.required,
        options: template.options || [],
      })
    case 'radio':
      return createRadioField({
        label: template.label,
        field,
        required: !!template.required,
        options: template.options || [],
      })
    case 'checkbox':
      return createCheckboxField({
        label: template.label,
        field,
        required: !!template.required,
        options: template.options || [],
      })
    case 'date':
      return createDateField({ label: template.label, field, required: !!template.required })
    case 'number':
      return createNumberField({ label: template.label, field, required: !!template.required })
    case 'switch':
      return createSwitchField({ label: template.label, field })
    case 'upload':
      return createUploadField({ label: template.label, field, required: !!template.required })
    case 'input':
    default:
      return createInputField({ label: template.label, field, required: !!template.required })
  }
}

function createBaseFormItem(label: string, field: string, required = false) {
  return {
    id: nanoid(10),
    componentType: 'form' as const,
    formItemAttrs: {
      field,
      label,
      required,
    },
  }
}

function createInputField({
  label,
  field,
  required,
}: {
  label: string
  field: string
  required: boolean
}): ComponentConfig {
  return {
    ...createBaseFormItem(label, field, required),
    componentName: 'Input',
    attrs: {
      clearable: true,
      placeholder: `请输入${label}`,
    },
    defaultValue: '',
  }
}

function createTextareaField({
  label,
  field,
  required,
}: {
  label: string
  field: string
  required: boolean
}): ComponentConfig {
  return {
    ...createBaseFormItem(label, field, required),
    componentName: 'Textarea',
    attrs: {
      type: 'textarea',
      placeholder: `请输入${label}`,
      autosize: {
        minRows: 3,
        maxRows: 5,
      },
    },
    defaultValue: '',
  }
}

function createSelectField({
  label,
  field,
  required,
  options,
}: {
  label: string
  field: string
  required: boolean
  options: Array<{ label: string; value: string | number }>
}): ComponentConfig {
  return {
    ...createBaseFormItem(label, field, required),
    componentName: 'Select',
    attrs: {
      clearable: true,
      placeholder: `请选择${label}`,
      style: {
        minWidth: '220px',
      },
      options,
    },
    defaultValue: '',
  }
}

function createRadioField({
  label,
  field,
  required,
  options,
}: {
  label: string
  field: string
  required: boolean
  options: Array<{ label: string; value: string | number }>
}): ComponentConfig {
  return {
    ...createBaseFormItem(label, field, required),
    componentName: 'RadioGroup',
    attrs: {},
    slots: {
      default: {
        componentName: 'Radio',
        options,
      },
    },
    defaultValue: '',
  }
}

function createCheckboxField({
  label,
  field,
  required,
  options,
}: {
  label: string
  field: string
  required: boolean
  options: Array<{ label: string; value: string | number }>
}): ComponentConfig {
  return {
    ...createBaseFormItem(label, field, required),
    componentName: 'CheckboxGroup',
    attrs: {},
    slots: {
      default: {
        componentName: 'Checkbox',
        options: options.map((item) => ({
          ...item,
          name: field,
        })),
      },
    },
    defaultValue: [],
  }
}

function createDateField({
  label,
  field,
  required,
}: {
  label: string
  field: string
  required: boolean
}): ComponentConfig {
  return {
    ...createBaseFormItem(label, field, required),
    componentName: 'DatePicker',
    attrs: {
      type: 'date',
      placeholder: `请选择${label}`,
      'value-format': 'YYYY-MM-DD',
    },
    defaultValue: '',
  }
}

function createNumberField({
  label,
  field,
  required,
}: {
  label: string
  field: string
  required: boolean
}): ComponentConfig {
  return {
    ...createBaseFormItem(label, field, required),
    componentName: 'InputNumber',
    attrs: {},
    defaultValue: 0,
  }
}

function createSwitchField({
  label,
  field,
}: {
  label: string
  field: string
}): ComponentConfig {
  return {
    ...createBaseFormItem(label, field, false),
    componentName: 'Switch',
    attrs: {
      'active-value': 'true',
      'inactive-value': 'false',
    },
    defaultValue: 'false',
  }
}

function createUploadField({
  label,
  field,
  required,
}: {
  label: string
  field: string
  required: boolean
}): ComponentConfig {
  return {
    ...createBaseFormItem(label, field, required),
    componentName: 'Upload',
    attrs: {},
    slots: {
      default: {
        componentName: 'Button',
        text: '点击上传',
        attrs: {
          type: 'primary',
          size: 'small',
        },
      },
      tip: {
        componentName: 'div',
        text: '请上传相关附件',
      },
    },
    defaultValue: [],
  }
}
