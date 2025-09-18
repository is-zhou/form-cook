import type { TSettersModuleType } from '@/types/setter.ts'


const s: TSettersModuleType = {
  'attrs.type': {
    id: '',
    componentName: 'select',
    componentType: 'form',
    formItemAttrs: { field: '', label: '输入框类型' },
    attrs: {
      clearable: true,
      options: [
        {
          value: 'password',
          label: 'password',
        },
        {
          value: 'text',
          label: 'text',
        },
        {
          value: 'number',
          label: 'number',
        },
      ],
    },
  },
  'attrs.autofocus': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '自动获取焦点' },
    attrs: {},
  },
  'attrs.clearable': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '显示清除按钮' },
    attrs: {},
  },
  'attrs.maxlength': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: { field: '', label: '最大长度' },
    attrs: {
      clearable: true,
      type: 'number',
    },
  },
  'attrs.minlength': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: { field: '', label: '最小长度' },
    attrs: {
      clearable: true,
      type: 'number',
    },
  },
  'attrs.show-password': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '显示切换密码图标' },
    attrs: {},
  },
}

export default s
