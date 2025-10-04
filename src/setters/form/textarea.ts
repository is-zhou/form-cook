import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.clearable': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否显示清除按钮',
    },
    attrs: {},
  },
  'attrs.maxlength': {
    id: '',
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '最大长度',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.minlength': {
    id: '',
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '最小长度',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.rows': {
    id: '',
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: 'rows输入框行数',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.autosize': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '高度是否自适应',
    },
    attrs: {},
  },
  'attrs.show-word-limit': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否显示统计字数',
    },
    attrs: {},
  },
}

export default s
