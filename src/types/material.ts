
type TComponentConfig = {
  id: string
  sort?: number
  componentName: string
  componentType: string
  defaultValue: unknown
  formItemAttrs: {}
  attrs: {}
  style?: {}
  slots?: any[]
}

export type Material = {
  label: string
  icon: string
  sort?: number
  materialContent: TComponentConfig
}
