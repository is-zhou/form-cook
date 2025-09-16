import type { Material } from '@/types/material'
import type { TSettersItem, TSettersModuleType } from '@/types/setter'
import type { ComponentConfig, ComponentName } from 'form-cook-render'
import { cloneDeep, omit } from 'lodash'
import { nanoid } from 'nanoid'

import setters from '@/setters'
import publicFormSetterList from '@/setters/publicForm.ts'
import publicSetterList from '@/setters/public.ts'
import publicLayoutSetterList from '@/setters/publicLayout.ts'

import material from '@/materials/index'
const materials: Material[] = [...material.materialFormList, ...material.materialLayoutList]

export function getSettersListByObj(obj: TSettersModuleType, preKey?: string) {
  let list: ComponentConfig[] = []
  if (obj) {
    Object.keys(obj).forEach((key) => {
      const item = obj[key as keyof ComponentConfig]!

      if (item.isHide !== true) {
        const { setterChildren, ...arg } = item as TSettersItem

        if (arg.componentName) {
          arg.id = nanoid(10)
          if (arg.componentType === 'form') {
            arg.formItemAttrs.field = preKey ? `${preKey}.${key}` : key
            arg.formItemAttrs.style = " border: 1px solid var(--el-border-color-light); padding:10px"
          }
          list.push(arg)
        }
      }

      if (item.setterChildren) {
        list.push(...getSettersListByObj(item.setterChildren, preKey ? `${preKey}.${key}` : key))
      }
    })

  }
  return sortByProperty(list, 'sort')
}



export function cloneComponentConfig(current: Material): ComponentConfig {
  const materialContent: ComponentConfig = cloneDeep(current.materialContent)
  materialContent.id = `id_${Date.now()}`

  if (materialContent.componentType === 'form') {
    materialContent.formItemAttrs.field = `field_${Date.now()}`
  }
  return { ...materialContent }
}



export function updateSettersByComponentConfig(componentConfig: ComponentConfig) {
  let list = [...publicSetterList]

  if (componentConfig.componentType === 'form') {
    list = list.concat(publicFormSetterList)
  }
  if (componentConfig.componentType === 'layout') {
    list = list.concat(publicLayoutSetterList)
  }
  const targetList = setters.setters[componentConfig.componentName] || []

  list = list.concat(targetList)
  return sortByProperty(list, 'sort')
}

export function objectAssignByComponentConfig(currentConfig: Ref<ComponentConfig | null | undefined>, newName: string) {
  const target = materials.find((i) => i.materialContent.componentName === newName)

  if (target && currentConfig.value) {
    const cloneConfig = cloneComponentConfig(target)

    if (
      currentConfig.value.componentType === 'form' &&
      cloneConfig.componentType === 'form' && (currentConfig.value.defaultValue || cloneConfig.defaultValue)
    ) {
      currentConfig.value.defaultValue = cloneConfig.defaultValue
    }

    if (
      currentConfig.value.componentType === 'layout' &&
      cloneConfig.componentType === 'layout' && (currentConfig.value.children || cloneConfig.children)
    ) {
      currentConfig.value.children = cloneConfig.children
    }

    if (currentConfig.value.sort || cloneConfig.sort) {
      currentConfig.value.sort = cloneConfig.sort
    }

    if (currentConfig.value.attrs || cloneConfig.attrs) {
      currentConfig.value.attrs = cloneConfig.attrs
    }

    if (currentConfig.value.style || cloneConfig.style) {
      currentConfig.value.style = cloneConfig.style
    }

    if (currentConfig.value.slots || cloneConfig.slots) {
      currentConfig.value.slots = cloneConfig.slots
    }

  }
}


function sortByProperty<T>(arr: Array<T>, property: keyof T) {
  return arr.sort((a, b) => {
    // 获取 'property' 属性的值，如果没有，则视为 Infinity，排到后面
    const valueA = a[property] ?? Infinity;
    const valueB = b[property] ?? Infinity;

    return Number(valueA) - Number(valueB);
  });
}
