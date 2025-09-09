import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  attrs: {
    isHide: true,
    setterChildren: {
      width: {
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
      'inline-prompt': {
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
      'active-text': {
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
      'inactive-text': {
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
      'active-value': {
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
      'inactive-value': {
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
      'active-color': {
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
      'inactive-color': {
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
      'border-color': {
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
    },
  },

}

export default s
