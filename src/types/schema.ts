import type { TComponentName } from "@/components/FormRender/componentMap";
import type { FormRules } from "element-plus";

export type TComponentType = 'form' | 'layout'

export type TFormItem = { field: string; label: string; required?: boolean;[key: string]: any }

export type TConfig<T extends TComponentType> = T extends 'form'
  ? {
    id: string
    sort?: number
    componentName: TComponentName
    componentType: T
    formItemAttrs: TFormItem
    attrs: { [key: string]: unknown }
    defaultValue: unknown
    style?: {}
    slots?: unknown[]
  }
  : {
    id: string
    sort?: number
    componentName: TComponentName
    componentType: T
    attrs: { [key: string]: unknown }
    style?: {}
    slots?: unknown[]
    children?: TComponentConfig[]

  }

export type TComponentConfig = TConfig<'form'> | TConfig<'layout'>

export type TFormAreaConfig = {
  attrs: {
    rules?: FormRules
    inline?: boolean
    size?: '' | 'large' | 'default' | 'small'
    disabled?: boolean
    'label-position'?: 'left' | 'right' | 'top'
    'label-width'?: number | string
    'label-suffix'?: string
    'hide-required-asterisk'?: boolean
    'require-asterisk-position'?: 'left' | 'right'
    [key: string]: unknown
  }
  [key: string]: unknown
}


export type TFormSchema = {
  formAreaConfig: TFormAreaConfig
  formContentConfigList: TComponentConfig[]
}


