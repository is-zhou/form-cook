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
      clearable: {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '显示清除按钮' },
        attrs: {},
        defaultValue: '',
      },
      options: {
        id: '',
        sort: 1,
        componentName: 'OptionsEditor',
        componentType: 'form',
        formItemAttrs: { field: '', label: '下拉选项' },
        attrs: {
          clearable: true,
          type: 'number',
        },
        defaultValue: '',
      },
    }
  }
}

export default s
