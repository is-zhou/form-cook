import type { TSettersModuleType } from '@/types/setter.ts'


const s: TSettersModuleType = {
  'slots.default': {
    id: '',
    sort: 1,
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: { field: '', label: '按钮文本' },
    attrs: {
      clearable: true,
    },
  },
  'attrs.type': {
    id: '',
    sort: 1,
    componentName: 'Select',
    componentType: 'form',
    formItemAttrs: { field: '', label: '按钮类型' },
    attrs: {
      clearable: true,
      options: [
        { label: "primary", value: "primary" },
        { label: "success", value: "success" },
        { label: "info", value: "info" },
        { label: "warning", value: "warning" },
        { label: "danger", value: "danger" },
      ]
    },
    defaultValue: "primary"
  },
  'attrs.plain': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否为朴素按钮',
    },
    attrs: {},
  },
  'attrs.text': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '	是否为文字按钮',
    },
    attrs: {},
  },
  'attrs.bg': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '	是否显示文字按钮背景颜色',
    },
    attrs: {},
  },
  'attrs.link': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '	是否为链接按钮',
    },
    attrs: {},
  },
  'attrs.round': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否为圆角按钮',
    },
    attrs: {},
  },
  'attrs.circle': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否为圆形按钮',
    },
    attrs: {},
  },
  'attrs.disabled': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '按钮是否为禁用状态',
    },
    attrs: {},
  },
  'attrs.auto-insert-space': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '两个中文字符之间自动插入空格(仅当文本长度为 2 且所有字符均为中文时才生效)',
    },
    attrs: {},
  },
  'attrs.tag': {
    id: '',
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '自定义元素标签',
    },
    attrs: {
      clearable: true
    },
  },
}

export default s
