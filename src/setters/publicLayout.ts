import type { TSettersModuleType } from '@/types/setter.ts'
import type { Material } from '@/types/material'

import material from '@/materials/index'
import { getSettersListByObj } from '@/utils'

const materials: Material[] = [...material.materialLayoutList]

const componentNameOptions: {
  value: string,
  label: string,
}[] = materials.map(i => ({ value: i.materialContent.componentName, label: i.label }))

const s: TSettersModuleType = {
  componentName: {
    id: '',
    componentName: 'select',
    componentType: 'form',
    formItemAttrs: { field: '', label: '组件名称' },
    attrs: {
      clearable: true,
      options: componentNameOptions,
    },
    defaultValue: '',
  },
}

const list = getSettersListByObj(s)
export default list
