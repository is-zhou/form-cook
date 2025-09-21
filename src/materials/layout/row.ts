import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '格栅',
  icon: '',
  materialContent: {
    id: '',
    componentName: 'row',
    componentType: 'layout',
    attrs: {},
    children: [
      {
        id: '1',
        componentName: 'col',
        componentType: 'layout',
        attrs: {
          span: 6
        },
        children: [

        ],
        style: {},
      },
      {
        id: '2',
        componentName: 'col',
        componentType: 'layout',
        attrs: {
          span: 6
        },
        children: [

        ],
        style: {},
      }
    ],
    style: {},
  },
}

export default m
