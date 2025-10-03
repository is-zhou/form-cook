import type { TSettersModuleType } from '@/types/setter.ts'


const s: TSettersModuleType = {
  'attrs.clearable': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '显示清除按钮' },
    attrs: {},
  },
  'attrs.options': {
    id: '',
    sort: 1,
    componentName: 'OptionsEditor',
    componentType: 'form',
    formItemAttrs: { field: '', label: '下拉选项' },
    attrs: {
      clearable: true,
      type: 'number',
    },
  },
  'attrs.multiple': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否多选',
    },
    attrs: {},
  },
  'attrs.collapse-tags': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '多选时将选中值按文字展示',
    },
    attrs: {},
  },
  'attrs.collapse-tags-tooltip': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '悬停是否显示所有选中的标签',
    },
    attrs: {},
  },
  'attrs.multiple-limit': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '最多可以选择的项目数',
    },
    attrs: {},
  },
  'attrs.filterable': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '否可筛选',
    },
    attrs: {},
  },
  'attrs.allow-create': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否允许用户创建新条目',
    },
    attrs: {},
  },
  'attrs.fit-input-width': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '下拉框的宽度是否与输入框相同',
    },
    attrs: {},
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
      },
    },
  },
  'attrs.offset': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '下拉面板偏移量',
    },
    attrs: {},
  },
}

export default s
