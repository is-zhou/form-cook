const typeDefs = `
type TComponentName= 'input'|'textarea'|'inputNumber'|'inputTag'|'rate'|'radioGroup'|'radio'|'radioButton'|'select'|'switch'|'slider'|'colorPicker'|'div'|'editorStringToCode'
type FormRules = Record<string, any>;
type TComponentType = 'form' | 'layout'
type TFormItem = { field: string; label: string; required?: boolean;[key: string]: any }

type TSlot = { name: string, componentName: TComponentName, options?: { label?: string, value?: unknown }[], [key: string]: unknown }

type TConfig<T extends TComponentType> = T extends 'form'
  ? {
    id: string
    sort?: number
    componentName: TComponentName
    componentType: T
    formItemAttrs: TFormItem
    attrs: { [key: string]: unknown }
    defaultValue: unknown
    style?: {}
    slots?: TSlot[]
  }
  : {
    id: string
    sort?: number
    componentName: TComponentName
    componentType: T
    attrs: { [key: string]: unknown }
    style?: {}
    slots?: TSlot[]
    children?: TComponentConfig[]

  }

type TComponentConfig = TConfig<'form'> | TConfig<'layout'>

type TFormAreaConfig = {
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


export interface FormSchema {
  formAreaConfig: TFormAreaConfig;
  formContentConfigList: TComponentConfig[];
}

declare const schema: FormSchema;
`

export default typeDefs
