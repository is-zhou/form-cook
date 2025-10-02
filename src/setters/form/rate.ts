import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.max': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '最大分值',
    },
    attrs: {},
  },
  'attrs.allow-half': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '允许半选',
    },
    attrs: {},
  },
  'attrs.low-threshold': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '低分和中等分数界限值',
    },
    attrs: {},
  },
  'attrs.high-threshold': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '高分和中等分数界限值',
    },
    attrs: {},
  },
  'attrs.void-color': {
    id: '',
    componentName: 'colorPicker',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '未选中 icon 的颜色',
    },
    attrs: {},
  },
  'attrs.disabled-void-color': {
    id: '',
    componentName: 'colorPicker',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '只读时未选中 icon 的颜色',
    },
    attrs: {},
  },
}

export default s
