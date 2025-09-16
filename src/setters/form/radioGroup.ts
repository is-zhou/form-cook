import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  slots: {
    setterChildren: {
      default: {
        setterChildren: {
          options: {
            id: "",
            componentName: "OptionsEditor",
            componentType: "form",
            formItemAttrs: { field: "", label: "选项设置" },
            attrs: {},
            defaultValue: ""
          }
        }
      }
    }
  }
}

export default s
