import type { FormSchema } from "form-cook-render"
import { nanoid } from "nanoid"
import icon from "@/assets/img/template/nested.png"

const getSchema = (): FormSchema => {
  return {
    formAreaConfig: {
      defaultCreateBtn: true,
      defaultRestBtn: true,
      attrs: {
        'label-width': 'auto',
      }
    },
    formContentConfigList: [
      {
        id: nanoid(10),
        componentName: "Input",
        componentType: "form",
        formItemAttrs: {
          field: 'activity.name',
          label: "Activity name"
        },
        attrs: {}
      },
      {
        id: nanoid(10),
        componentName: "Select",
        componentType: "form",
        formItemAttrs: {
          field: 'activity.region',
          label: "Activity zone"
        },
        attrs: {
          placeholder: "please select your zone",
          options: [
            {
              label: "Zone one",
              value: 'shanghai'
            },
            {
              label: "Zone two",
              value: 'beijing'
            }
          ]
        }
      },
      {
        id: nanoid(10),
        componentName: "Input",
        componentType: "form",
        formItemAttrs: { field: "list[0].desc", label: "Activity form" },
        attrs: {
          type: "textarea",
          placeholder: "Activity form",
        },
      },
      {
        id: nanoid(10),
        componentName: "Input",
        componentType: "form",
        formItemAttrs: { field: "list[1].desc", label: "Activity form" },
        attrs: {
          type: "textarea",
          placeholder: "Activity form",
        },
      },
    ]
  }
}
export default {
  label: "嵌套字段表单",
  icon: icon,
  getSchema
}
