import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  "attrs.arrayKeyPath": {
    id: "",
    componentName: "Input",
    componentType: 'form',
    formItemAttrs: { field: "", label: "动态数组路径" },
    attrs: {
      type: "textarea",
      placeholder: "请输入动态数组路径"
    }
  },
  "attrs.max": {
    id: "",
    componentName: "InputNumber",
    componentType: 'form',
    formItemAttrs: { field: "", label: "最大表单项数量" },
    attrs: {
      precision: 0,
    }
  },
  "attrs.min": {
    id: "",
    componentName: "InputNumber",
    componentType: 'form',
    formItemAttrs: { field: "", label: "最小表单项数量" },
    attrs: {
      precision: 0,
    }
  },
  "attrs.limitButtonDisplay": {
    id: "",
    componentName: "Switch",
    componentType: 'form',
    formItemAttrs: { field: "", label: "达到最大或最小表单数量时不显示按钮" },
    attrs: {
    }
  },
  "attrs.removeText": {
    id: "",
    componentName: "Input",
    componentType: 'form',
    formItemAttrs: { field: "", label: "自定义删除按钮文本" },
    attrs: {
    }
  },
  "attrs.addText": {
    id: "",
    componentName: "Input",
    componentType: 'form',
    formItemAttrs: { field: "", label: "自定义新增按钮文本" },
    attrs: {
    }
  },
  "attrs.isSetDefaultValue": {
    id: "",
    componentName: "Switch",
    componentType: 'form',
    formItemAttrs: { field: "", label: "新增时是否初始化默认值" },
    attrs: {
    }
  },
  'attrs.style.width': {
    id: '',
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '容器宽度',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.style.height': {
    id: '',
    componentName: 'Input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '容器高度',
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.style_container': {
    id: '',
    componentName: 'SerializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '自定义最外层容器样式container',
    },
    attrs: {
      serializeType: ["string", "object"],
      autosize: true,
    },
  },
  'attrs.style_item_wrap': {
    id: '',
    componentName: 'SerializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '自定义项容器样式item_wrap',
    },
    attrs: {
      serializeType: ["string", "object"],
      autosize: true,
    },
  },
  'attrs.style_item_content': {
    id: '',
    componentName: 'SerializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '自定义动态项容器样式item_content',
    },
    attrs: {
      serializeType: ["string", "object"],
      autosize: true,
    },
  },
  'attrs.style_btnAdd_container': {
    id: '',
    componentName: 'SerializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '自定义新增按钮容器样式btnAdd_container',
    },
    attrs: {
      serializeType: ["string", "object"],
      autosize: true,
    },
  },
  'attrs.style_btnDel_container': {
    id: '',
    componentName: 'SerializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '自定义删除按钮容器样式btnDel_container',
    },
    attrs: {
      serializeType: ["string", "object"],
      autosize: true,
    },
  },
}

export default s
