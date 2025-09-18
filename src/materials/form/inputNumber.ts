import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '数字输入框',
  icon: 'IconInputNumber',
  materialContent: {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '数字输入框',
    },
    attrs: {},
    defaultValue: 0
  },
}
export default m
