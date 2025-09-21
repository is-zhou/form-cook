import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '格栅行',
  icon: '',
  materialContent: {
    id: '',
    componentName: 'row',
    componentType: 'layout',
    attrs: {},
    children: [
      {
        id: Date.now() + '',
        componentName: 'col',
        componentType: 'layout',
        attrs: {
          span: 6
        },
        children: [

        ],
        style: {},
      },
    ],
    style: {},
  },
}

export default m
