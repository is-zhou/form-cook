import type { Material } from '@/types/material'
import type { TSettersModuleType } from '@/types/setter'
import type { ComponentConfig, ComponentName, FormCompConfig, LayoutCompConfig } from 'form-cook-render'
import { cloneDeep } from 'lodash'
import { nanoid } from 'nanoid'

import setters from '@/setters'
import publicFormSetterList from '@/setters/publicForm.ts'
import publicSetterList from '@/setters/public.ts'
import publicLayoutSetterList from '@/setters/publicLayout.ts'

import material from '@/materials/index'
const materials: Material[] = [...material['all']]

export function getSettersListByObj(obj: TSettersModuleType, preKey?: string) {
  let list: ComponentConfig[] = []
  if (obj) {
    Object.keys(obj).forEach((key) => {
      const item = obj[key as keyof ComponentConfig]!
      if (item.componentName) {
        item.id = nanoid(10)
        if (item.componentType === 'form') {
          item.formItemAttrs.field = preKey ? `${preKey}.${key}` : key
          item.formItemAttrs.style = " border: 1px solid var(--el-border-color-light); padding:10px"
        }
        list.push(item)
      }
    })

  }
  return sortByProperty(list, 'sort')
}



export function cloneComponentConfig(current: Material): ComponentConfig {
  const materialContent: ComponentConfig = cloneDeep(current.materialContent)
  materialContent.id = `id_${nanoid(10)}`

  if (materialContent.componentType === 'form') {
    materialContent.formItemAttrs.field = `field_${nanoid(10)}`
  }
  return { ...materialContent }
}



export function updateSettersByComponentConfig(componentConfig: ComponentConfig) {

  const targetList = setters.setters[componentConfig.componentName.toLowerCase()] || []

  return sortByProperty(targetList, 'sort')
}

export function updatePublicSettersByComponentConfig(componentConfig: ComponentConfig) {
  let list = [...publicSetterList]

  if (componentConfig.componentType === 'form') {
    list = list.concat(publicFormSetterList)
  }
  if (componentConfig.componentType === 'layout') {
    list = list.concat(publicLayoutSetterList)
  }

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

    if (currentConfig.value.slots || cloneConfig.slots) {
      currentConfig.value.slots = cloneConfig.slots
    }

  }
}


export function sortByProperty<T>(arr: Array<T>, property: keyof T) {
  return arr.sort((a, b) => {
    // 获取 'property' 属性的值，如果没有，则视为 Infinity，排到后面
    const valueA = a[property] ?? Infinity;
    const valueB = b[property] ?? Infinity;

    return Number(valueA) - Number(valueB);
  });
}


/**
 * 遍历 schema，收集所有字段路径
 * @param schema schema 列表（数组）
 * @param parentPath 父级路径，用于递归拼接
 */
export function collectFieldPaths(
  schema: Array<ComponentConfig | string>,
  parentPath = "",
  seen: Set<string> = new Set()
): string[] {
  const paths: string[] = [];

  for (const node of schema) {
    if (typeof node === "string") {
      continue
    }
    if (node.componentType === 'form' && node.formItemAttrs?.field) {
      const fullPath = parentPath
        ? `${parentPath}.${node.formItemAttrs.field}`
        : node.formItemAttrs.field;

      if (seen.has(fullPath)) {

        ElMessage.error(`字段重复${fullPath}`)

      } else {
        seen.add(fullPath);
        paths.push(fullPath);
      }
    }

    // 递归 children
    if (node.componentType === 'layout' && Array.isArray(node.children) && node.children.length > 0) {
      const childPaths = collectFieldPaths(
        node.children,
        parentPath
      );
      paths.push(...childPaths);
    }
  }
  return paths;
}

export function removeNode(node: any) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}

export function insertNodeAt(fatherNode: HTMLElement, node: HTMLElement, position: number) {
  const refNode =
    position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling
  fatherNode.insertBefore(node, refNode)
}



interface ComponentNameOption {
  value: string
  label: string
  componentConfig: ComponentConfig
}

export function transformComponentConfig(
  row: ComponentConfig,
  target: ComponentNameOption
): ComponentConfig {
  const targetComp = target.componentConfig

  const baseKeys = ['id', 'componentName', 'componentType', 'sort', 'style', 'slots', '_slots', 'visible', 'events']
  const formKeys = ['formItemAttrs', 'defaultValue', 'attrs']
  const layoutKeys = ['attrs', 'children']

  const allowedKeys = [...baseKeys, ...(targetComp.componentType === 'form' ? formKeys : layoutKeys)]

  for (const key of Object.keys(row)) {
    if (!allowedKeys.includes(key)) {
      delete (row as any)[key]
    }
  }

  const sameType = row.componentType === targetComp.componentType

  row.componentType = targetComp.componentType
  row.componentName = target.value as ComponentName
  row.id = row.id || `id_${nanoid(10)}`

  if (sameType) {
    if (targetComp.componentType === 'form') {
      const r = row as FormCompConfig
      r.formItemAttrs = cloneDeep((r as FormCompConfig).formItemAttrs)
      r.attrs = cloneDeep((r as FormCompConfig).attrs)
      if ((r as FormCompConfig).defaultValue !== undefined) {
        r.defaultValue = cloneDeep((r as FormCompConfig).defaultValue)
      }
    } else {
      const r = row as LayoutCompConfig
      r.attrs = cloneDeep((r as LayoutCompConfig).attrs)
      r.children = r.children ? cloneDeep(r.children) : []
    }
  } else {
    if (targetComp.componentType === 'form') {
      const t = targetComp as FormCompConfig

        ; (row as FormCompConfig).formItemAttrs = cloneDeep(t.formItemAttrs)
        ; (row as FormCompConfig).attrs = cloneDeep(t.attrs)
      if (t.defaultValue !== undefined) {
        (row as FormCompConfig).defaultValue = cloneDeep(t.defaultValue)
      }
      // 删除 layout 字段
      delete (row as any).children
    } else {
      const t = targetComp as LayoutCompConfig
        ; (row as LayoutCompConfig).attrs = cloneDeep(t.attrs)
        ; (row as LayoutCompConfig).children = t.children ? cloneDeep(t.children) : []
      // 删除 form 字段
      delete (row as any).formItemAttrs
      delete (row as any).defaultValue
    }
  }

  return row
}
