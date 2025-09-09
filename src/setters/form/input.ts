import type { TSettersModuleType } from '@/types/setter.ts'


const s: TSettersModuleType = {
  attrs: {
    isHide: true,
    // id: '',
    // componentName: 'textarea',
    // componentType: 'form',
    // formItemAttrs: { field: '', label: 'attrs全部设置' },
    // attrs: {},
    // defaultValue: '',
    setterChildren: {
      type: {
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
        defaultValue: '',
      },
      autofocus: {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '自动获取焦点' },
        attrs: {},
        defaultValue: '',
      },
      clearable: {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '显示清除按钮' },
        attrs: {},
        defaultValue: '',
      },
      maxlength: {
        id: '',
        componentName: 'input',
        componentType: 'form',
        formItemAttrs: { field: '', label: '最大长度' },
        attrs: {
          clearable: true,
          type: 'number',
        },
        defaultValue: '',
      },
      minlength: {
        id: '',
        componentName: 'input',
        componentType: 'form',
        formItemAttrs: { field: '', label: '最小长度' },
        attrs: {
          clearable: true,
          type: 'number',
        },
        defaultValue: '',
      },
      'show-password': {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '显示切换密码图标' },
        attrs: {},
        defaultValue: '',
      },
    }
  }
}

export default s
