import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '分段控制器',
  icon: 'IconSegmented',
  materialContent: {
    id: '',
    componentName: 'Segmented',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '分段控制器',
    },
    attrs: {
      options: [{
        label: 'Mon',
        value: 'Mon',
        disabled: true,
      },
      {
        label: 'Tue',
        value: 'Tue',
      },
      {
        label: 'Wed',
        value: 'Wed',
        disabled: true,
      },
      {
        label: 'Thu',
        value: 'Thu',
      },
      {
        label: 'Fri',
        value: 'Fri',
        disabled: true,
      },
      {
        label: 'Sat',
        value: 'Sat',
      },
      {
        label: 'Sun',
        value: 'Sun',
      },
      ]
    },
  },
}

export default m
