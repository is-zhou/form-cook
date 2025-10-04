import type { TSettersModuleType } from '@/types/setter.ts'
import { getSettersListByObj } from '@/utils'

const formArea: TSettersModuleType = {
  "attrs.rules": {
    id: '',
    componentName: 'RuleEditor',
    componentType: 'form',
    formItemAttrs: { field: '', label: '表单验证规则', },
    attrs: {
      clearable: true,
      availableFields: ["msg"],
      placeholder: "请输入验证规则",
      serializeType: ['object'],
    },
    defaultValue: {},
  },
  "attrs.inline": {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '行内表单模式' },
    attrs: {},
  },
  'attrs.label-position': {
    id: '',
    componentName: 'RadioGroup',
    componentType: 'form',
    formItemAttrs: { field: '', label: '标签的位置' },
    attrs: {
      clearable: true,
    },
    slots: {
      default: {
        name: 'default',
        componentName: 'RadioButton',
        options: [
          { value: 'left', label: 'left' },
          { value: 'right', label: 'right' },
          { value: 'top', label: 'top' },
        ],
      },
    },
  },
  'attrs.label-width': {
    id: '',
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: { field: '', label: '标签的长度' },
    attrs: {
      clearable: true,
      type: 'text',
    },
  },
  'attrs.size': {
    id: '',
    componentName: 'RadioGroup',
    componentType: 'form',
    formItemAttrs: { field: '', label: '组件大小' },
    attrs: {
      clearable: true,
    },
    slots: {
      default: {
        name: 'default',
        componentName: 'RadioButton',
        options: [
          { value: 'large', label: 'large' },
          { value: 'default', label: 'default' },
          { value: 'small', label: 'small' },
        ],
      },
    },
  },
  'attrs.disabled': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '是否禁用该表单内的所有组件' },
    attrs: {},
  },
  'attrs.hide-required-asterisk': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '是否隐藏必填字段标签旁边的红色星号' },
    attrs: {},
  },
  'attrs.require-asterisk-position': {
    id: '',
    componentName: 'RadioGroup',
    componentType: 'form',
    formItemAttrs: { field: '', label: '星号的位置' },
    attrs: {},
    slots: {
      default: {
        name: 'default',
        componentName: 'RadioButton',
        options: [
          { value: 'left', label: 'left' },
          { value: 'right', label: 'right' },
        ],
      },
    },
  },
  'attrs.inline-message': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '是否以行内形式展示校验信息' },
    attrs: {},
  },
  'attrs.status-icon': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '是否在输入框中显示校验结果反馈图标' },
    attrs: {},
  },
  'attrs.scroll-to-error': {
    id: '',
    componentName: 'Switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '当校验失败时，滚动到第一个错误表单项' },
    attrs: {},
  },
  defaultCreateBtn: {
    id: '',
    componentName: 'SerializeInput',
    componentType: 'form',
    formItemAttrs: { field: '', label: '默认提交按钮设置' },
    attrs: {
      type: "text",
      clearable: true,
      serializeType: ["boolean", "string", "undefined"]
    },
  },
  defaultRestBtn: {
    id: '',
    componentName: 'SerializeInput',
    componentType: 'form',
    formItemAttrs: { field: '', label: '默认重置按钮' },
    attrs: {
      type: "text",
      clearable: true,
      serializeType: ["boolean", "string", "undefined"]
    },
  },

}

const list = getSettersListByObj(formArea)


export default list
