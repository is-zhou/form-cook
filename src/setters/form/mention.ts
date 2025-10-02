import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'attrs.prefix': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '触发字段的前缀。 字符串长度必须且只能为 1',
    },
    attrs: {
      serializeType: ["string", "array"],
      autosize: true,
    },
  },
  'attrs.split': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '用于拆分提及的字符，长度必须且只能为 1',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.filter-option': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '定制筛选器选项逻辑',
    },
    attrs: {
      serializeType: ["function"],
      autosize: true,
      placeholder: `(pattern: string, option: MentionOption) => boolean`
    },
  },
  'attrs.placement': {
    id: '',
    componentName: 'radioGroupButton',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '设置弹出位置',
    },
    attrs: {

    },
    slots: {
      default: {
        componentName: "radioButton",
        options: [
          { label: "bottom", value: 'bottom' },
          { label: "top", value: 'top' },
        ]
      }
    }
  },
  'attrs.show-arrow': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '下拉菜单的内容是否有箭头',
    },
    attrs: {
    },
  },
  'attrs.offset': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '下拉面板偏移量',
    },
    attrs: {},
  },
  'attrs.whole': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '退格键删除时，是否整体删除',
    },
    attrs: {},
  },
}

export default s
