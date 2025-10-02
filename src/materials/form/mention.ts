import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '提及',
  icon: 'IconMention',
  materialContent: {
    id: '',
    componentName: 'mention',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '提及',
    },
    attrs: {
      options: [
        {
          label: 'Fuphoenixes',
          value: 'Fuphoenixes',
        },
        {
          label: 'kooriookami',
          value: 'kooriookami',
        },
        {
          label: 'Jeremy',
          value: 'Jeremy',
        },
        {
          label: 'btea',
          value: 'btea',
        },
      ]
    },
  },
}

export default m
