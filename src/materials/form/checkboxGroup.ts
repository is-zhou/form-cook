import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '多选框组',
  icon: 'IconCheckbox',
  materialContent: {
    id: '',
    componentName: 'CheckboxGroup',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '多选框组',
    },
    attrs: {
    },
    slots: {
      default: {
        componentName: "Checkbox",
        options: [
          { label: "Option 1", value: "Value 1", name: '1' },
          { label: "Option 2", value: "Value 2", name: '1' },
        ]
      }
    },
    defaultValue: []
  },
}

export default m
