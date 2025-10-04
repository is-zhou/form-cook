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
  'attrs.show-checkbox': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '显示勾选框',
    },
    attrs: {},
  },
  'attrs.multiple': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否多选',
    },
    attrs: {},
  },
  'attrs.filterable': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '可筛选',
    },
    attrs: {},
  },
  'attrs.check-strictly': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '选择任意级别',
    },
    attrs: {},
  },
  'attrs.node-key': {
    id: '',
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '整个树中唯一字段',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.filter-method': {
    id: '',
    componentName: 'SerializeInput',
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
    componentName: 'SerializeInput',
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
    componentName: 'SerializeInput',
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
    componentName: 'SerializeInput',
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
    componentName: 'SerializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '数据源的字段别名',
    },
    attrs: {
      serializeType: "object",
      placeholder: `{
  label?: string
  key?: string
  disabled?: string
}`
    },
  },
  'attrs.left-default-checked': {
    id: '',
    componentName: 'SerializeInput',
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
    componentName: 'SerializeInput',
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
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否触发表单验证',
    },
    attrs: {},
  },
}

export default s
