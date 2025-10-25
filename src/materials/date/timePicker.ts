import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '时间选择器',
  icon: 'IconTimePicker',
  materialContent: {
    id: '',
    componentName: 'TimePicker',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '时间选择器',
    },
    attrs: {
      'value-format': 'hh:mm:ss'
    },
    defaultValue: ""
  },
}

export default m
