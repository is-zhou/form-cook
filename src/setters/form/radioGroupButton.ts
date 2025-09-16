import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  attrs: {
    isHide: true,
    setterChildren: {
      'text-color': {
        id: '',
        componentName: 'colorPicker',
        componentType: 'form',
        formItemAttrs: {
          field: '',
          label: '激活时文本颜色',
        },
        attrs: {},
        defaultValue: "",
      },
      fill: {
        id: '',
        componentName: 'colorPicker',
        componentType: 'form',
        formItemAttrs: {
          field: '',
          label: '激活时填充色和边框色',
        },
        attrs: {},
        defaultValue: "",
      },
    },
  }
}

export default s
