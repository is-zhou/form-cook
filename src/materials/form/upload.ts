import type { Material } from '@/types/material.ts'

const m: Material = {
  label: '上传',
  icon: 'IconUpload',
  materialContent: {
    id: '',
    componentName: 'upload',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '上传',
    },
    attrs: {
    },
    slots: {
      default: {
        componentName: "button",
        text: "Click to upload",
        attrs: {
          type: "primary",
          size: "small"
        },
      }
    }
  },
}

export default m
