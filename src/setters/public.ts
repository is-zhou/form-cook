import type { TSettersModuleType } from '@/types/setter.ts'

import { componentsMap } from "@/components/FormRender/componentMap"
import { getSettersListByObj } from '@/utils'

const componentNameOptions: {
  value: string,
  label: string,
}[] = []

Object.keys(componentsMap).forEach(key => {
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
