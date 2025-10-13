import type { TSettersModuleType } from '@/types/setter.ts'
import { getSettersListByObj } from '@/utils'

const s: TSettersModuleType = {
  "events": {
    id: "",
    componentName: "EventEditor",
    componentType: "form",
    attrs: {},
    formItemAttrs: { field: "", label: "事件编辑" },
  },
  'attrs.style': {
    id: '',
    componentName: 'StyleEditor',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '组件样式设置',
    },
    attrs: {
      clearable: true,
    },

  },
}

const list = getSettersListByObj(s)
export default list
