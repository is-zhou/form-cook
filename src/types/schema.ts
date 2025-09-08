import type { FormRules } from "element-plus";

export type TComponentType = 'form' | 'layout'

export type TComponentName = 'input' | 'div'

export type TFormItem = { field: string; label: string; required?: boolean;[key: string]: any }

export type TConfig<T extends TComponentType> = T extends 'form'
  ? {
    id: string
    sort?: number
    componentName: TComponentName
    componentType: T
    formItemAttrs: TFormItem
    attrs: {}
    defaultValue: any
    style?: {}
    slots?: any[]
  }
  : {
    id: string
    sort?: number
    componentName: TComponentName
    componentType: T
    attrs: {}
    style?: {}
    slots?: any[]
    children?: TComponentConfig[]

  }

export type TComponentConfig = TConfig<'form'> | TConfig<'layout'>


export type TFormSchema = {
  formContentConfigList: TComponentConfig[]
}


