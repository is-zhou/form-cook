import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.span': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '栅格占据的列数',
    },
    attrs: {
      precision: 0,
      max: 24
    },
  },
  'attrs.offset': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '栅格左侧的间隔格数',
    },
    attrs: {
      precision: 0,
    },
  },
  'attrs.push': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '栅格向右移动格数',
    },
    attrs: {
      precision: 0,
    },
  },
  'attrs.pull': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '栅格向左移动格数',
    },
    attrs: {
      precision: 0,
    },
  },
  'attrs.xs': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '<768px 栅格占据的列数',
    },
    attrs: {
      precision: 0,
      max: 24
    },
  },
  'attrs.sm': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '≥768px 栅格占据的列数',
    },
    attrs: {
      precision: 0,
      max: 24
    },
  },
  'attrs.md': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '≥992px 栅格占据的列数',
    },
    attrs: {
      precision: 0,
      max: 24
    },
  },
  'attrs.lg': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '≥1200px 栅格占据的列数',
    },
    attrs: {
      precision: 0,
      max: 24
    },
  },
  'attrs.xl': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '≥1920px 栅格占据的列数',
    },
    attrs: {
      precision: 0,
      max: 24
    },
  },
  "attrs.tag": {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '自定义元素标签',
    },
    attrs: {
      type: "text"
    },
  }
}

export default s
