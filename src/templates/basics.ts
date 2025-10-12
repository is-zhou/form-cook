import type { FormSchema } from "form-cook-render"
import { nanoid } from "nanoid"
import basics from "@/assets/img/template/basics.png"

const getSchema = (): FormSchema => {
  return {
    formAreaConfig: {
      defaultCreateBtn: true,
      defaultRestBtn: true,
      attrs: {
        'label-width': 'auto'
      }
    },
    formContentConfigList: [
      {
        id: nanoid(10),
        componentName: "Input",
        componentType: "form",
        formItemAttrs: {
          field: 'name',
          label: "Activity name"
        },
        attrs: {}
      },
      {
        id: nanoid(10),
        componentName: "Select",
        componentType: "form",
        formItemAttrs: {
          field: 'region',
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
        componentName: "FormItem",
        componentType: "layout",
        attrs: { label: "Activity time" },
        children: [
          {
            id: nanoid(10),
            componentName: "DatePicker",
            componentType: "form",
            formItemAttrs: { field: "date1" },
            attrs: {
              placeholder: "Pick a date",
              'value-format': 'YYYY-MM-DD',
            },
          },
          {
            id: nanoid(10),
            componentName: "TimePicker",
            componentType: "form",
            formItemAttrs: { field: "date2" },
            attrs: {
              placeholder: "Pick a time",
              'value-format': 'hh:mm:ss',
            },
          },
        ]
      },
      {
        id: nanoid(10),
        componentName: "Switch",
        componentType: "form",
        formItemAttrs: {
          field: 'delivery',
          label: "Instant delivery"
        },
        attrs: {}
      },
      {
        id: nanoid(10),
        componentName: "CheckboxGroup",
        componentType: "form",
        formItemAttrs: {
          field: 'type',
          label: "Activity type"
        },
        attrs: {},
        slots: {
          default: {
            componentName: "Checkbox",
            options: [
              {
                value: "Promotion activities",
                name: "type",
                label: "Promotion activities",
              },
              {
                value: "Offline activities",
                name: "type",
                label: "Offline activities",
              },
            ]
          },
        },
      },
      {
        id: nanoid(10),
        componentName: "RadioGroup",
        componentType: "form",
        formItemAttrs: {
          field: 'resource',
          label: "Resources"
        },
        attrs: {},
        slots: {
          default: {
            componentName: "Radio",
            options: [
              {
                value: "Sponsorship",
                label: "Sponsorship",
              },
              {
                value: "Venue",
                label: "Venue",
              },
            ],
          },
        },
      },
      {
        id: nanoid(10),
        componentName: "Input",
        componentType: "form",
        formItemAttrs: { field: "desc", label: "Activity form" },
        attrs: {
          type: "textarea",
          placeholder: "Activity form",
        },
      },
    ]
  }
}
export default {
  label: "基础表单",
  icon: basics,
  getSchema
}
