import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.type': {
    id: '',
    componentName: 'select',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: 'type',
    },
    attrs: {
      options: [
        { label: "date", value: "date" },
        { label: "dates", value: "dates" },
        { label: "week", value: "week" },
        { label: "year", value: "year" },
        { label: "years", value: "years" },
        { label: "month", value: "month" },
        { label: "months", value: "months" },
        { label: "日期范围", value: "daterange" },
        { label: "月份范围", value: "monthrange" },
        { label: "年份范围", value: "yearrange" },
        { label: "日期时间选择器", value: "datetime" },
        { label: "日期时间范围", value: "datetimerange" },
      ]
    },
  },
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
  'attrs.shortcuts': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '设置快捷选项，需要传入数组对象',
    },
    attrs: {
      serializeType: "array",
      autosize: true,
    },
  },
  'attrs.disabled-date': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '禁用日期',
    },
    attrs: {
      serializeType: "function",
      autosize: true,
      placeholder: `(time: Date) => {
  return time.getTime() > Date.now()
}
      `
    },
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
  'attrs.start-placeholder': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '范围选择时开始日期的占位内容',
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
      label: '范围选择时结束日期的占位内容',
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
      placeholder: "YYYY-MM-DD HH:mm:ss "
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
      placeholder: "YYYY-MM-DD HH:mm:ss"
    },
  },
  'attrs.time-format': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '时间格式',
    },
    attrs: {
      clearable: true,
      placeholder: "hh:mm:ss"
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
  'attrs.unlink-panels': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '取消两个日期面板之间的联动',
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
  'attrs.show-footer': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否显示 footer',
    },
    attrs: {},
  },
  'attrs.show-week-number': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '显示周数(除周外)',
    },
    attrs: {},
  },
}

export default s
