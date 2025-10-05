import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.options': {
    id: '',
    sort: 1,
    componentName: 'OptionsEditor',
    componentType: 'form',
    formItemAttrs: { field: '', label: '选项' },
    attrs: {
      clearable: true,
    },
  },
  'attrs.direction': {
    id: '',
    componentName: 'RadioGroupButton',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '展示的方向',
    },
    attrs: {
    },
    slots: {
      default: {
        componentName: "RadioButton",
        options: [
          { label: "horizontal", value: "horizontal" },
          { label: "vertical", value: "vertical" },
        ]
      }
    }
  },
  'attrs.block': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '撑满父元素宽度',
    },
    attrs: {},
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
