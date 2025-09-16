import type { Material } from '@/types/material.ts'

const radioGroup: Material = {
  label: '单选框',
  icon: 'IconRadio',
  materialContent: {
    id: '',
    componentName: 'radioGroup',
    componentType: 'form',
    formItemAttrs: { field: '', label: '单选框' },
    slots: {
      default: {
        componentName: 'radio',
        options: [
          { value: 'large', label: 'large' },
          { value: 'default', label: 'default' },
          { value: 'small', label: 'small' },
        ],
      }
    },
    attrs: {},
    defaultValue: ""
  },
}

export default radioGroup
