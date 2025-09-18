import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.width': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: 'switch 的宽度',
    },
    attrs: {
      type: 'number',
    },
    defaultValue: "",
  },
  'attrs.inline-prompt': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '只会呈现文本的第一个字符',
    },
    attrs: {},
    defaultValue: "",
  },
  'attrs.active-text': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: 'switch 的状态为 on 时的文字描述',
    },
    attrs: {
      clearable: true,
    },
    defaultValue: "",
  },
  'attrs.inactive-text': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: 'switch 的状态为 off 时的文字描述',
    },
    attrs: {
      clearable: true,
    },
    defaultValue: "",
  },
  'attrs.active-value': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: 'switch 状态为 on 时的值',
    },
    attrs: {
      clearable: true,
    },
    defaultValue: "",
  },
  'attrs.inactive-value': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: 'switch的状态为 off 时的值',
    },
    attrs: {
      clearable: true,
    },
    defaultValue: "",
  },
  'attrs.active-color': {
    id: '',
    componentName: 'colorPicker',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '当在 on 状态时的背景颜色',
    },
    attrs: {
      clearable: true,
    },
    defaultValue: "",
  },
  'attrs.inactive-color': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '当在 off 状态时的背景颜色',
    },
    attrs: {
      clearable: true,
    },
    defaultValue: "",
  },
  'attrs.border-color': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '开关的边框颜色 ',
    },
    attrs: {
      clearable: true,
    },
    defaultValue: "",
  },
}

export default s
