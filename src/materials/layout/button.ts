import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '按钮',
  icon: 'IconButton',
  materialContent: {
    id: '',
    componentName: 'button',
    componentType: 'layout',
    attrs: {
      type: 'primary',
    },
    slots: {
      default: "按钮"
    },
  },
}

export default m
