import type { TSettersModuleType } from "@/types/setter"
import { getSettersListByObj } from "@/utils"

const formArea: TSettersModuleType = {
  attrs: {
    isHide: true,
    setterChildren: {
      rules: {
        id: '',
        componentName: 'input',
        componentType: 'form',
        formItemAttrs: { field: '', label: '表单验证规则' },
        attrs: {
          clearable: true,
        },
        defaultValue: "",
      },
      inline: {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '行内表单模式' },
        attrs: {},
        defaultValue: "",
      },
    },
  },
}

const list = getSettersListByObj(formArea)
export default list
