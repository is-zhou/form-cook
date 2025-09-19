import type { TSettersModuleType } from '@/types/setter.ts'
import { getSettersListByObj } from '@/utils'

const s: TSettersModuleType = {
  "events": {
    id: "",
    componentName: "EventEditor",
    componentType: "form",
    attrs: {},
    formItemAttrs: { field: "", label: "事件编辑" },
  }
}

const list = getSettersListByObj(s)
export default list
