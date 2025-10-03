import type { TSettersModuleType } from '@/types/setter.ts'
import type { Material } from '@/types/material'

import material from '@/materials/index'
import { getSettersListByObj } from '@/utils'

const materials: Material[] = [...(material['layout'] || [])]

const componentNameOptions: {
  value: string,
  label: string,
}[] = materials.map(i => ({ value: i.materialContent.componentName, label: i.label }))

const s: TSettersModuleType = {
  componentName: {
    id: '',
    componentName: 'select',
    componentType: 'form',
    sort: 1,
    formItemAttrs: { field: '', label: '组件名称' },
    attrs: {
      clearable: true,
      options: componentNameOptions,
    },
    defaultValue: '',
  },
  visible: {
    id: '',
    componentName: 'BoolOrFnEditor',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '显示',
    },
    attrs: {
      clearable: true,
    },
    defaultValue: true,
  },
}

const list = getSettersListByObj(s)
export default list
