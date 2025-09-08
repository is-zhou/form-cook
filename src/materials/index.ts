import type { Material } from "@/types/material"

interface ModuleType {
  default: Material
}

const modulesForm = import.meta.glob('./form/*.ts', { eager: true }) as Record<string, ModuleType>
const modulesLayout = import.meta.glob('./layout/*.ts', { eager: true }) as Record<string, ModuleType>

const materialFormList: Material[] = []
for (const path in modulesForm) {
  const defaultExport = modulesForm[path].default
  defaultExport && materialFormList.push(defaultExport)
}

const materialLayoutList: Material[] = []
for (const path in modulesLayout) {
  const defaultExport = modulesLayout[path].default
  defaultExport && materialLayoutList.push(defaultExport)
}

export default {
  materialFormList,
  materialLayoutList,
}
