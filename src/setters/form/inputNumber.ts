import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.step': {
    id: '',
    componentName: 'InputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '步进',
    },
    attrs: {},
  },
  'attrs.step-strictly': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '严格步进',
    },
    attrs: {},
  },
  'attrs.precision': {
    id: '',
    componentName: 'InputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '精度',
    },
    attrs: {},
  },
  'attrs.min': {
    id: '',
    componentName: 'InputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '最小值',
    },
    attrs: {},
  },
  'attrs.max': {
    id: '',
    componentName: 'InputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '最大值',
    },
    attrs: {},
  },
  'attrs.controls': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '使用控制按钮',
    },
    attrs: {},
  },
  'attrs.controls-position': {
    id: '',
    componentName: 'RadioGroup',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '控制按钮位置',
    },
    attrs: {},
    defaultValue: "",
    slots: {
      default: {
        componentName: 'RadioButton',
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
    componentName: 'RadioGroup',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '输入文本对齐',
    },
    attrs: {},
    defaultValue: "",
    slots: {
      default: {
        componentName: 'RadioButton',
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
