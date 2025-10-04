import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.step': {
    id: '',
    componentName: 'InputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '	步长',
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
  'attrs.show-input': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '显示输入框，仅在非范围选择时有效',
    },
    attrs: {},
  },
  'attrs.show-input-controls': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '显示输入框时，是否显示控制按钮',
    },
    attrs: {},
  },
  'attrs.show-stops': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否显示间断点',
    },
    attrs: {},
  },
  'attrs.show-tooltip': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否显示提示信息',
    },
    attrs: {},
    defaultValue: "",
  },
  'attrs.range': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否开启选择范围',
    },
    attrs: {},
  },
  'attrs.vertical': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '垂直模式',
    },
    attrs: {},
  },
  'attrs.height': {
    id: '',
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '滑块高度，垂直模式必填',
    },
    attrs: {
      type: 'number',
    },
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
      }
    },
  },
  'attrs.align': {
    id: '',
    componentName: 'RadioGroup',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '内部输入文本对齐',
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
      }
    }
  },
}

export default s
