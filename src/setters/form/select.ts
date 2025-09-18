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
}

export default s
