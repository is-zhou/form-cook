import type { Material } from '@/types/material.ts'

const slider: Material = {
  label: '滑块',
  icon: 'IconSlider',
  materialContent: {
    id: '',
    componentName: 'Slider',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '滑块',
    },
    attrs: {
      style: {
        minWidth: '200px'
      },
    },
    defaultValue: 0
  },
}

export default slider
