import type { TSettersModuleType } from '@/types/setter.ts'
import { getSettersListByObj } from '@/utils'

const publicFormItem: TSettersModuleType = {
  defaultValue: {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: { field: '', label: '默认值' },
    attrs: {
      clearable: true,
    },
    defaultValue: '',
  },
}


const list = getSettersListByObj(publicFormItem)
export default list
