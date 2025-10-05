import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '上传',
  icon: 'IconUpload',
  materialContent: {
    id: '',
    componentName: 'Upload',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '上传',
    },
    attrs: {
    },
    slots: {
      default: {
        componentName: "Button",
        text: "Click to upload",
        attrs: {
          type: "primary",
          size: "small"
        },
      },
      tip: {
        componentName: "div",
        text: " jpg/png files with a size less than 500kb",
      }
    },
    defaultValue: []
  },
}

export default m
