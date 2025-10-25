import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '日期选择器',
  icon: 'IconDatePicker',
  materialContent: {
    id: '',
    componentName: 'DatePicker',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '日期选择器',
    },
    attrs: {
      type: 'date',
      'value-format': 'YYYY-MM-DD',
      shortcuts: [
        {
          text: 'Today',
          value: new Date(),
        },
        {
          text: 'Yesterday',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          },
        },
        {
          text: 'A week ago',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          },
        },
      ]
    },
    defaultValue: ""
  },
}

export default m
