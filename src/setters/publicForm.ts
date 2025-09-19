import type { Material } from '@/types/material'
import type { TSettersModuleType } from '@/types/setter.ts'
import { getSettersListByObj } from '@/utils'
import material from '@/materials/index'
const materials: Material[] = [...material.materialFormList,]

const componentNameOptions: {
  value: string,
  label: string,
}[] = materials.map(i => ({ value: i.materialContent.componentName, label: i.label }))
const publicFormItem: TSettersModuleType = {
  componentName: {
    id: '',
    sort: 1,
    componentName: 'select',
    componentType: 'form',
    formItemAttrs: { field: '', label: '组件名称' },
    attrs: {
      clearable: true,
      options: componentNameOptions,
    },
    defaultValue: '',
  },
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

  'attrs.placeholder': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '输入提示',
    },
    attrs: {
      clearable: true,
    },
    defaultValue: "",
  },
  visible: {
    id: '',
    componentName: 'BoolOrFnEditor',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '显示',
    },
    attrs: {
      clearable: true,
    },
    defaultValue: true,
  },
  'attrs.disabled': {
    id: '',
    componentName: 'BoolOrFnEditor',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否禁用',
    },
    attrs: {},
  },
  'attrs.readonly': {
    id: '',
    componentName: 'BoolOrFnEditor',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否只读',
    },
    attrs: {},
  },
  'attrs.size': {
    id: '',
    componentName: 'radioGroup',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '组件大小',
    },
    attrs: {},

    slots: {
      default: {
        name: 'default',
        componentName: 'radioButton',
        options: [
          {
            value: 'large',
            label: 'large',
          },
          {
            value: 'default',
            label: 'default',
          },
          {
            value: 'small',
            label: 'small',
          },
          {
            value: '',
            label: '不设置',
          },
        ],
      }
    },
  },
  'formItemAttrs.field': {
    id: '',
    sort: 1,
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: { field: '', label: '字段' },
    attrs: {
      clearable: true,
    },
    defaultValue: '',
  },
  'formItemAttrs.label': {
    id: '',
    sort: 1,
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: { field: '', label: '标签' },
    attrs: {
      clearable: true,
    },
    defaultValue: '',
  },
  'formItemAttrs.rules': {
    id: '',
    sort: 1,
    componentName: 'RuleEditor',
    componentType: 'form',
    formItemAttrs: { field: '', label: '表单验证规则' },
    attrs: {
      serializeType: ['array'],
      placeholder: "请输入验证规则",
    },
    defaultValue: [],
  },
  'formItemAttrs.required': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: { field: '', label: '是否必填' },
    attrs: {
      clearable: true,
    },
  },
}


const list = getSettersListByObj(publicFormItem)

export default list
