import type { TSettersModuleType } from '@/types/setter.ts'


const s: TSettersModuleType = {
  'attrs.clearable': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '显示清除按钮',
    },
    attrs: {},
  },
  'attrs.max': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '标签最大数量',
    },
    attrs: {
      precision: 0,
    },
  },
  'attrs.tag-type': {
    id: '',
    componentName: 'select',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '标签类型',
    },
    attrs: {
      options: [
        {
          value: '',
          label: '默认',
        },
        {
          value: 'light',
          label: 'light',
        },
        {
          value: 'success',
          label: 'success',
        },
        {
          value: 'info',
          label: 'info',
        },
        {
          value: 'warning',
          label: 'warning',
        },
        {
          value: 'danger',
          label: 'danger',
        },
      ],
    },
  },
  'attrs.tag-effect': {
    id: '',
    componentName: 'radioGroup',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '标签效果',
    },
    attrs: {},
    slots: {
      default: {
        componentName: 'radioButton',
        options: [
          {
            value: 'light',
            label: 'light',
          },
          {
            value: 'dark',
            label: 'dark',
          },
          {
            value: 'plain',
            label: 'plain',
          },
          {
            value: '',
            label: '不设置',
          },
        ],
      }
    },
  },
  'attrs.draggable': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否可以拖动标签',
    },
    attrs: {},
  },
  'attrs.delimiter': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '在匹配分隔符时添加标签',
    },
    attrs: {},
  },
  'attrs.collapse-tags': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '多选时将选中值按文字形式展示',
    },
    attrs: {},
  },
  'attrs.collapse-tags-tooltip': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '鼠标悬停显示所有选中的标签',
    },
    attrs: {},
  },
  'attrs.save-on-blur': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '失去焦点时保存输入值',
    },
    attrs: {},
  },
}

export default s
