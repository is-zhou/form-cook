import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.clearable': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否显示清除按钮',
    },
    attrs: {},
  },
  'attrs.editable': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '文本框可输入',
    },
    attrs: {},
  },
  'attrs.disabled-hours': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '禁止选择部分小时选项',
    },
    attrs: {
      serializeType: "function",
      autosize: true,
      placeholder: `(role: string, comparingDate?: Dayjs) => number[]`
    },
  },
  'attrs.disabled-minutes': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '禁止选择部分分钟选项',
    },
    attrs: {
      serializeType: "function",
      autosize: true,
      placeholder: `(hour: number, role: string, comparingDate?: Dayjs) => number[]`
    },
  },
  'attrs.disabled-seconds': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '禁止选择部分秒选项',
    },
    attrs: {
      serializeType: "function",
      autosize: true,
      placeholder: `(hour: number, minute: number, role: string, comparingDate?: Dayjs) => number[]`
    },
  },
  'attrs.start-placeholder': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '范围选择时开始时间的占位内容',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.end-placeholder': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '范围选择时结束时间的占位内容',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.format': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '显示在输入框中的格式',
    },
    attrs: {
      clearable: true,
      placeholder: "HH:mm:ss "
    },
  },
  'attrs.value-format': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '绑定值的格式',
    },
    attrs: {
      clearable: true,
      placeholder: "HH:mm:ss"
    },
  },
  'attrs.range-separator': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '选择范围时的分隔符',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.default-value': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '选择器打开时默认显示的时间',
    },
    attrs: {
      serializeType: ["object", "array"],
      autosize: true,
      placeholder: `new Date(2025, 10, 1)
或者[new Date(2025, 9, 1), new Date(2025, 10, 1)] 注意:月份是从0开始
      `
    },
  },
  'attrs.default-time': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '选择器打开时默认显示的时间',
    },
    attrs: {
      serializeType: ["object", "array"],
      autosize: true,
      placeholder: `new Date(2000, 1, 1, 0, 0, 0)
或者[new Date(2000, 1, 1, 0, 0, 0),new Date(2000, 2, 1, 23, 59, 59)] 注意:月份是从0开始
      `
    },
  },
  'attrs.is-range': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否为时间范围选择',
    },
    attrs: {},
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
