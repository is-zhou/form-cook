import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '时间选择器',
  icon: 'IconTimePicker',
  materialContent: {
    id: '',
    componentName: 'timePicker',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '时间选择器',
    },
    attrs: {
      type: 'textarea',
    },
    defaultValue: ""
  },
}

export default m
