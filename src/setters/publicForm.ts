import type { TSettersModuleType } from '@/types/setter.ts'
import { getSettersListByObj } from '@/utils'

const publicFormItem: TSettersModuleType = {
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
  attrs: {
    setterChildren: {
      placeholder: {
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
      disabled: {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: {
          field: '',
          label: '是否禁用',
        },
        attrs: {},
        defaultValue: "",
      },
      readonly: {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: {
          field: '',
          label: '是否只读',
        },
        attrs: {},
        defaultValue: "",
      },
      size: {
        id: '',
        componentName: 'radioGroup',
        componentType: 'form',
        formItemAttrs: {
          field: '',
          label: '组件大小',
        },
        attrs: {},
        defaultValue: "",
        slots: [
          {
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
          },
        ],
      },
    },
  },
  formItemAttrs: {
    setterChildren: {
      rules: {
        id: '',
        sort: 1,
        componentName: 'serializeInput',
        componentType: 'form',
        formItemAttrs: { field: '', label: '表单验证规则' },
        attrs: {
          clearable: true,
          autosize: true,
          width: "100%",
          serializeType: ['array', "object"]
        },
        defaultValue: { required: true, message: '不能为空', trigger: 'blur' },
      },
      field: {
        id: '',
        componentName: 'input',
        componentType: 'form',
        formItemAttrs: { field: '', label: '字段' },
        attrs: {
          clearable: true,
        },
        defaultValue: '',
      },
      label: {
        id: '',
        componentName: 'input',
        componentType: 'form',
        formItemAttrs: { field: '', label: '标签' },
        attrs: {
          clearable: true,
        },
        defaultValue: '',
      },
      required: {
        id: '',
        componentName: 'switch',
        componentType: 'form',
        formItemAttrs: { field: '', label: '是否必填' },
        attrs: {
          clearable: true,
        },
        defaultValue: '',
      },
    }
  }

}


const list = getSettersListByObj(publicFormItem)
export default list
