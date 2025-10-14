import type { FormSchema } from "form-cook-render"
import { nanoid } from "nanoid"
import icon from "@/assets/img/template/rules.png"

const getSchema = (): FormSchema => {
  return {
    formAreaConfig: {
      defaultCreateBtn: true,
      defaultRestBtn: true,
      attrs: {
        'label-width': 'auto',
        rules: {
          name: [
            {
              required: true,
              message: "Please input Activity name",
              trigger: "blur",
            },
            {
              min: 3,
              max: 5,
              message: "Length should be 3 to 5",
              trigger: "blur",
            },
          ],
          region: [
            {
              required: true,
              message: "Please select Activity zone",
              trigger: "change",
            },
          ],
          count: [
            {
              required: true,
              message: "Please select Activity count",
              trigger: "change",
            },
          ],
          date1: [
            {
              type: "date",
              required: true,
              message: "Please pick a date",
              trigger: "change",
            },
          ],
          date2: [
            {
              type: "date",
              required: true,
              message: "Please pick a time",
              trigger: "change",
            },
          ],
          location: [
            {
              required: true,
              message: "Please select a location",
              trigger: "change",
            },
          ],
          type: [
            {
              type: "array",
              required: true,
              message: "Please select at least one activity type",
              trigger: "change",
            },
          ],
          resource: [
            {
              required: true,
              message: "Please select activity resource",
              trigger: "change",
            },
          ],
          desc: [
            {
              required: true,
              message: "Please input activity form",
              trigger: "blur",
            },
          ],
        },
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
        attrs: { label: "Activity time", required: true, },
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
        defaultValue: []
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
  label: "校验表单",
  icon,
  getSchema
}
