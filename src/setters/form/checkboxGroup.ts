import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.min': {
    id: '',
    componentName: 'InputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '可被勾选的最小数量',
    },
    attrs: {
      precision: 0
    },
  },
  'attrs.max': {
    id: '',
    componentName: 'InputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '可被勾选的最大数量',
    },
    attrs: {
      precision: 0
    },
  },
  'attrs.text-color': {
    id: '',
    componentName: 'ColorPicker',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '当按钮为活跃状态时的字体颜色',
    },
    attrs: {

    },
  },
  'attrs.fill': {
    id: '',
    componentName: 'ColorPicker',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '当按钮为活跃状态时的边框和背景颜色',
    },
    attrs: {

    },
  },
  'attrs.tag': {
    id: '',
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '复选框组元素标签',
    },
    attrs: {
      clearable: true,
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
  'slots.default.options': {
    id: '',
    componentName: 'OptionsEditor',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '选项',
    },
    attrs: {},
  },
}

export default s
