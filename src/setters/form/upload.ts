import type { TSettersModuleType } from '@/types/setter.ts'

const s: TSettersModuleType = {
  'slots.default.text': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '按钮文本',
    },
    attrs: {
      placeholder: `按钮文本`,
    },
  },
  'slots.tip.text': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '上传提示',
    },
    attrs: {
      placeholder: `请输入上传提示`,
      type: "textarea"
    },
  },
  'attrs.action': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '请求 URL',
    },
    attrs: {
      placeholder: `请求 URL`,
      type: 'textarea',
    },
  },
  'attrs.headers': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '设置上传的请求头部',
    },
    attrs: {
      serializeType: "object",
      placeholder: `Headers | Record<string, any>`
    },
  },
  'attrs.method': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '设置上传请求方法',
    },
    attrs: {
      clearable: true,
      placeholder: "默认post"

    },
  },
  'attrs.multiple': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否支持多选文件',
    },
    attrs: {},
  },
  'attrs.data': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '上传时附带的额外参数',
    },
    attrs: {
      serializeType: ['object', 'function'],
      autosize: true,
      placeholder: `Record<string, any> 或者 (rawFile: UploadRawFile) => Awaitable<Record<string, any>>`
    },
  },
  'attrs.name': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '上传的文件字段名',
      placeholder: "默认file"
    },
    attrs: {
      clearable: true,
    },
  },
  'attrs.with-credentials': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '支持发送 cookie 凭证信息',
    },
    attrs: {},
  },
  'attrs.show-file-list': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否显示已上传文件列表',
    },
    attrs: {},
  },
  'attrs.list-type': {
    id: '',
    componentName: 'radioGroupButton',
    componentType: 'form',
    formItemAttrs: { field: '', label: '文件列表的类型' },
    attrs: {},
    slots: {
      default: {
        componentName: 'radioButton',
        options: [
          { value: 'text', label: 'text' },
          { value: 'picture', label: 'picture' },
          { value: 'picture-card', label: 'picture-card' },
        ],
      },
    },
  },
  'attrs.drag': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否启用拖拽上传',
    },
    attrs: {},
  },
  'attrs.accept': {
    id: '',
    componentName: 'input',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '接受上传的文件类型',
    },
    attrs: {
      clearable: true,
      placeholder: ".pdf,.png"
    },
  },
  'attrs.auto-upload': {
    id: '',
    componentName: 'switch',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '是否自动上传文件',
    },
    attrs: {},
  },
  'attrs.limit': {
    id: '',
    componentName: 'inputNumber',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '允许上传文件的最大数量',
    },
    attrs: {
      precision: 0
    },
  },
  'attrs.on-preview': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '点击文件列表中已上传的文件时的钩子',
    },
    attrs: {
      serializeType: ['function'],
      autosize: true,
      placeholder: `(uploadFile: UploadFile) => void`
    },
  },
  'attrs.on-remove': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '文件列表移除文件时的钩子',
    },
    attrs: {
      serializeType: ['function'],
      autosize: true,
      placeholder: `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`
    },
  },
  'attrs.on-success': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '文件上传成功时的钩子',
    },
    attrs: {
      serializeType: ['function'],
      autosize: true,
      placeholder: `(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`
    },
  },
  'attrs.on-error': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '文件上传失败时的钩子',
    },
    attrs: {
      serializeType: ['function'],
      autosize: true,
      placeholder: `(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`
    },
  },
  'attrs.on-change': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用',
    },
    attrs: {
      serializeType: ['function'],
      autosize: true,
      placeholder: `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`
    },
  },
  'attrs.on-exceed': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '当超出限制时，执行的钩子函数',
    },
    attrs: {
      serializeType: ['function'],
      autosize: true,
      placeholder: `(files: File[], uploadFiles: UploadUserFile[]) => void`
    },
  },
  'attrs.before-upload': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。',
    },
    attrs: {
      serializeType: ['function'],
      autosize: true,
      placeholder: `(rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>`
    },
  },
  'attrs.before-remove': {
    id: '',
    componentName: 'serializeInput',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。',
    },
    attrs: {
      serializeType: ['function'],
      autosize: true,
      placeholder: `(uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>`
    },
  },

}

export default s
