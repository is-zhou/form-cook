import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.label': {
    id: '',
    sort: 1,
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: { field: '', label: '标签' },
    attrs: {
      clearable: true,
    },
    defaultValue: '',
  },
  'attrs.required': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '是否必填' },
    attrs: {
      clearable: true,
    },
  },
}

export default s
