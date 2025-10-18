import type { Material } from '@/types/material.ts'

const select: Material = {
  label: '选择器',
  icon: 'IconSelect',
  materialContent: {
    id: '',
    componentName: 'Select',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '选择器',
    },
    attrs: {
      style: {
        minWidth: '200px'
      },
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
