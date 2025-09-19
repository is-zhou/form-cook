import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '开关',
  icon: 'IconSwitch',
  materialContent: {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '开关',
    },
    attrs: {
      'active-value': 'true',
      'inactive-value': 'false',
    },
    defaultValue: 'false',
  },
}

export default m
