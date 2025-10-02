import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.step': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '步进',
    },
    attrs: {},
  },
  'attrs.step-strictly': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '严格步进',
    },
    attrs: {},
  },
  'attrs.precision': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '精度',
    },
    attrs: {},
  },
  'attrs.min': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '最小值',
    },
    attrs: {},
  },
  'attrs.max': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '最大值',
    },
    attrs: {},
  },
  'attrs.controls': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '使用控制按钮',
    },
    attrs: {},
  },
  'attrs.controls-position': {
    id: '',
    componentName: 'radioGroup',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '控制按钮位置',
    },
    attrs: {},
    defaultValue: "",
    slots: {
      default: {
        componentName: 'radioButton',
        options: [
          {
            value: '',
            label: '默认',
          },
          {
            value: 'right',
            label: 'right',
          },
        ],
      },
    },
  },
  'attrs.align': {
    id: '',
    componentName: 'radioGroup',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '输入文本对齐',
    },
    attrs: {},
    defaultValue: "",
    slots: {
      default: {
        componentName: 'radioButton',
        options: [
          {
            value: 'left',
            label: 'left',
          },
          {
            value: 'center',
            label: 'center',
          },
          {
            value: 'right',
            label: 'right',
          },
        ],
      },
    },
  },

}

export default s
