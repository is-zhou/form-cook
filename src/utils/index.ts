import type { TComponentConfig } from '@/types/schema'
import type { TSettersItem, TSettersModuleType } from '@/types/setter'
import { nanoid } from 'nanoid'

export function getSettersListByObj(obj: TSettersModuleType, preKey?: string) {
  let list: TComponentConfig[] = []
  if (obj) {
    Object.keys(obj).forEach((key) => {
      const item = obj[key as keyof TComponentConfig]!

      if (item.isHide !== true) {
        const { setterChildren, ...arg } = item as TSettersItem

        if (arg.componentName) {
          arg.id = nanoid(10)
          if (arg.componentType === 'form') {
            arg.formItemAttrs.field = preKey ? `${preKey}.${key}` : key
          }
          list.push(arg)
        }
      }

      if (item.setterChildren) {
        list.push(...getSettersListByObj(item.setterChildren, key))
      }
    })
    list = list.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
  }
  return list
}

