import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.data': {
    id: '',
    componentName: 'OptionsEditor',
    componentType: 'form',
    formItemAttrs: {
      field: '',
    },
    attrs: {},
  },
  'attrs.filterable': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否可搜索',
    },
    attrs: {},
  },
  'attrs.filter-placeholder': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '搜索框占位符',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.filter-method': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '自定义搜索方法',
    },
    attrs: {
      serializeType: "function",
      placeholder: `(query: string, item: Record<string, any>) => boolean`
    },
  },
  'attrs.titles': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '自定义列表标题',
    },
    attrs: {
      serializeType: "array",
      placeholder: `[string, string]`
    },
  },
  'attrs.button-texts': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '自定义按钮文案',
    },
    attrs: {
      serializeType: "array",
      placeholder: `[string, string]`
    },
  },
  'attrs.render-content': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '自定义数据项渲染函数',
    },
    attrs: {
      serializeType: "array",
      placeholder: `[string, string]`
    },
  },
  'attrs.props': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '数据源的字段别名',
    },
    attrs: {
      serializeType: "object",
      autosize: true,
      placeholder: `{
  label?: string
  key?: string
  disabled?: string
}`
    },
  },
  'attrs.left-default-checked': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '初始状态下左侧列表的已勾选项的 key 数组',
    },
    attrs: {
      serializeType: "array",
      placeholder: `Array<string | number>`
    },
  },
  'attrs.right-default-checked': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '初始状态下右侧列表的已勾选项的 key 数组',
    },
    attrs: {
      serializeType: "array",
      placeholder: `Array<string | number>`
    },
  },
  'attrs.validate-event': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否触发表单验证',
    },
    attrs: {},
  },
}

export default s
