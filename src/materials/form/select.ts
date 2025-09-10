import type { Material } from '@/types/material.ts'

const select: Material = {
  label: '选择器',
  icon: '',
  materialContent: {
    id: '',
    componentName: 'select',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '选择器',
    },
    attrs: {
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
      ],
    },
    defaultValue: ""
  },
}

export default select
