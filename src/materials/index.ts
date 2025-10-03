import type { Material, MaterialGroup } from "@/types/material"
import { sortByProperty } from "@/utils"

interface ModuleType {
  default: Material
}

const modules = import.meta.glob('./*/*.ts', { eager: true }) as Record<string, ModuleType>

const materialList: Material[] = []
for (const path in modules) {
  const defaultExport = modules[path].default
  const group = path.match(/^\.\/([^/]+)\//)?.[1]!;
  if (!defaultExport.group) {
    defaultExport.group = group as MaterialGroup
  }
  defaultExport && materialList.push(defaultExport)
}

const result: { [key: string]: Material[] } = { all: sortByProperty(materialList, 'sort') }

sortByProperty(materialList, 'sort').forEach(i => {
  if (Array.isArray(result[i.group!])) {
    result[i.group!].push(i)
  } else {
    result[i.group!] = [i]
  }
})


export default {
  ...result
}
