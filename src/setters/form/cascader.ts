import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.clearable': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否显示清除按钮',
    },
    attrs: {},
  },
  'attrs.filterable': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '该选项是否可以被搜索',
    },
    attrs: {},
  },
  'attrs.props.multiple': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '多选',
    },
    attrs: {},
  },
  'attrs.options': {
    id: '',
    componentName: 'OptionsEditor',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '选项',
    },
    attrs: {},
  },
  'attrs.show-all-levels': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '输入框中是否显示选中值的完整路径',
    },
    attrs: {
    },
  },
  'attrs.collapse-tags': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '多选模式下是否折叠Tag',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.collapse-tags-tooltip': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '悬停于折叠标签的文本时显示全部',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.separator': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '用于分隔选项的字符',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.validate-event': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否触发表单验证',
    },
    attrs: {},
  },
  'attrs.autosize': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '高度是否自适应',
    },
    attrs: {},
  },
  'attrs.show-word-limit': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否显示统计字数',
    },
    attrs: {},
  },
}

export default s
