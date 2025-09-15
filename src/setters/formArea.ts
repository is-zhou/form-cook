import type { TSettersModuleType } from '@/types/setter.ts'
import { getSettersListByObj } from '@/utils'

const formArea: TSettersModuleType = {
  attrs: {
    isHide: true,
    setterChildren: {
      rules: {
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
      inline: {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '行内表单模式' },
        attrs: {},
        defaultValue: "",
      },
      'label-position': {
        id: '',
        componentName: 'radioGroup',
        componentType: 'form',
        formItemAttrs: { field: '', label: '标签的位置' },
        attrs: {
          clearable: true,
        },
        defaultValue: "",
        slots: [
          {
            name: 'default',
            componentName: 'radioButton',
            options: [
              { value: 'left', label: 'left' },
              { value: 'right', label: 'right' },
              { value: 'top', label: 'top' },
            ],
          },
        ],
      },
      'label-width': {
        id: '',
        componentName: 'input',
        componentType: 'form',
        formItemAttrs: { field: '', label: '标签的长度' },
        attrs: {
          clearable: true,
          type: 'text',
        },
        defaultValue: "",
      },
      size: {
        id: '',
        componentName: 'radioGroup',
        componentType: 'form',
        formItemAttrs: { field: '', label: '组件大小' },
        attrs: {
          clearable: true,
        },
        defaultValue: "",
        slots: [
          {
            name: 'default',
            componentName: 'radioButton',
            options: [
              { value: 'large', label: 'large' },
              { value: 'default', label: 'default' },
              { value: 'small', label: 'small' },
            ],
          },
        ],
      },
      disabled: {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '是否禁用该表单内的所有组件' },
        attrs: {},
        defaultValue: "",
      },
      'hide-required-asterisk': {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '是否隐藏必填字段标签旁边的红色星号' },
        attrs: {},
        defaultValue: "",
      },
      'require-asterisk-position': {
        id: '',
        componentName: 'radioGroup',
        componentType: 'form',
        formItemAttrs: { field: '', label: '星号的位置' },
        attrs: {},
        defaultValue: "",
        slots: [
          {
            name: 'default',
            componentName: 'radioButton',
            options: [
              { value: 'left', label: 'left' },
              { value: 'right', label: 'right' },
            ],
          },
        ],
      },
      'inline-message': {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '是否以行内形式展示校验信息' },
        attrs: {},
        defaultValue: "",
      },
      'status-icon': {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '是否在输入框中显示校验结果反馈图标' },
        attrs: {},
        defaultValue: "",
      },
      'scroll-to-error': {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '当校验失败时，滚动到第一个错误表单项' },
        attrs: {},
        defaultValue: "",
      },
    },
  },

}

const list = getSettersListByObj(formArea)
export default list
