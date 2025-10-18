import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '格栅行',
  icon: '',
  sort: 1,
  materialContent: {
    id: '',
    componentName: 'Row',
    componentType: 'layout',
    attrs: { style: {}, },
    children: [
      {
        id: '',
        componentName: 'Col',
        componentType: 'layout',
        attrs: {
          style: {},
          span: 6
        },
        children: []
      }
    ],

  },
}

export default m
