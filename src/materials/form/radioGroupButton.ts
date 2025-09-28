import type { Material } from '@/types/material.ts'

const radioGroupButton: Material = {
  label: '单选框按钮',
  icon: 'IconRadio',
  materialContent: {
    id: '',
    componentName: 'radioGroupButton',
    componentType: 'form',
    formItemAttrs: { field: '', label: '单选框按钮' },
    attrs: {},
    slots: {
      default: {
        componentName: 'radioButton',
        options: [
          { value: 'large', label: 'large' },
          { value: 'default', label: 'default' },
          { value: 'small', label: 'small' },
        ],
      },
    },
    defaultValue: ""
  },
}

export default radioGroupButton
