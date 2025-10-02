import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '分段控制器',
  icon: 'IconSegmented',
  materialContent: {
    id: '',
    componentName: 'segmented',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '分段控制器',
    },
    attrs: {
      options: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
  },
}

export default m
