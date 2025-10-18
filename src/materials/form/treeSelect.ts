import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '树形选择',
  icon: 'IconTreeSelect',
  materialContent: {
    id: '',
    componentName: 'TreeSelect',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '树形选择',
    },
    attrs: {
      style: {
        minWidth: '200px'
      },
      data: [
        {
          value: '1',
          label: 'Level one 1',
          children: [
            {
              value: '1-1',
              label: 'Level two 1-1',
              children: [
                {
                  value: '1-1-1',
                  label: 'Level three 1-1-1',
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: 'Level one 2',
          children: [
            {
              value: '2-1',
              label: 'Level two 2-1',
              children: [
                {
                  value: '2-1-1',
                  label: 'Level three 2-1-1',
                },
              ],
            },
            {
              value: '2-2',
              label: 'Level two 2-2',
              children: [
                {
                  value: '2-2-1',
                  label: 'Level three 2-2-1',
                },
              ],
            },
          ],
        },
        {
          value: '3',
          label: 'Level one 3',
          children: [
            {
              value: '3-1',
              label: 'Level two 3-1',
              children: [
                {
                  value: '3-1-1',
                  label: 'Level three 3-1-1',
                },
              ],
            },
            {
              value: '3-2',
              label: 'Level two 3-2',
              children: [
                {
                  value: '3-2-1',
                  label: 'Level three 3-2-1',
                },
              ],
            },
          ],
        },
      ]
    },
    defaultValue: ""
  },
}

export default m
