import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.gutter': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '栅格间隔',
    },
    attrs: {
      precision: 0,
    },
  },
  "attrs.justify": {
    id: '',
    componentName: 'selectV2',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: 'flex 布局下的水平排列方式',
    },
    attrs: {
      options: [
        { label: 'start', value: 'start' },
        { label: 'end', value: 'end' },
        { label: 'center', value: 'center' },
        { label: 'space-around', value: 'space-around' },
        { label: 'space-between', value: 'space-between' },
        { label: 'space-evenly', value: 'space-evenly' }
      ]
    },
  },
  "attrs.align": {
    id: '',
    componentName: 'radioGroup',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: 'flex 布局下的垂直排列方式',
    },
    slots: {
      "default": {
        componentName: "radioButton",
        options: [
          { label: 'top', value: 'top' },
          { label: 'middle', value: 'middle' },
          { label: 'bottom', value: 'bottom' },
        ]
      }
    },
    attrs: {

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
