import type { TSettersModuleType } from '@/types/setter.ts'

import { getSettersListByObj } from '@/utils'
import { defaultComponents } from 'form-cook-render'

const componentNameOptions: {
  value: string,
  label: string,
}[] = []

Object.keys(defaultComponents()).forEach(key => {
  componentNameOptions.push({
    value: key,
    label: key,
  })
})

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
