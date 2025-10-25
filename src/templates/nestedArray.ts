import type { FormSchema } from "form-cook-render"
import { nanoid } from "nanoid"
import icon from "@/assets/img/template/nestedArray.png"

const getSchema = (): FormSchema => {
  return {
    formAreaConfig: {
      defaultCreateBtn: '提交',
      defaultRestBtn: '重置',
      attrs: {
        labelWidth: 'auto',
        rules: {}
      }
    },
    formContentConfigList: [
      {
        id: nanoid(10),
        componentName: 'FormItem',
        componentType: 'layout',
        attrs: {
          label: '数组',
          style: {}
        },
        children: [
          {
            id: nanoid(10),
            componentName: 'ArrayContainer',
            componentType: 'layout',
            attrs: {
              addText: '新增活动项',
              removeText: '删除',
              min: 1,
              max: 3,
              arrayKeyPath: 'arrayDesc',
              isSetDefaultValue: false,
              limitButtonDisplay: true
            },
            children: [
              {
                id: nanoid(10),
                componentName: 'Input',
                componentType: 'form',
                formItemAttrs: {
                  field: 'content',
                  label: '活动形式'
                },
                attrs: {
                  type: 'textarea',
                  placeholder: '请输入活动形式'
                },
                defaultValue: '活动形式是...'
              },
              {
                id: nanoid(10),
                componentName: 'InputNumber',
                componentType: 'form',
                formItemAttrs: {
                  field: 'num',
                  label: '人数'
                },
                attrs: {
                  type: 'textarea',
                  placeholder: '请输入人数'
                },
                defaultValue: 0
              }
            ],
            visible: true
          }
        ],
        visible: true
      }
    ]
  }
}
export default {
  label: "动态嵌套数组表单",
  icon: icon,
  getSchema
}
