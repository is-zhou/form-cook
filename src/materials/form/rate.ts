import type { Material } from '@/types/material.ts'

const rate: Material = {
  label: '评分',
  icon: 'IconRate',
  materialContent: {
    id: '',
    componentName: 'Rate',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '评分',
    },
    attrs: {},

  },

}

export default rate
