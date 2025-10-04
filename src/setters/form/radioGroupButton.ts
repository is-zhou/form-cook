import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'slots.default.options': {
    id: "",
    componentName: "OptionsEditor",
    componentType: "form",
    formItemAttrs: { field: "", label: "选项设置" },
    attrs: {},
  },
  'attrs.text-color': {
    id: '',
    componentName: 'ColorPicker',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '激活时文本颜色',
    },
    attrs: {},
  },
  'attrs.fill': {
    id: '',
    componentName: 'ColorPicker',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '激活时填充色和边框色',
    },
    attrs: {},
  },
}

export default s
