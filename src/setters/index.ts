import type { TSetters, TSettersModuleType } from '@/types/setter.ts'
import type { TComponentName } from '@/types/schema'
import { getSettersListByObj } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'

interface ModuleType {
  default: TSettersModuleType
}

const moduleSetters = import.meta.glob('./form/*.ts', { eager: true }) as Record<string, ModuleType>

const setters: TSetters = {}

for (const path in moduleSetters) {
  const defaultExport = cloneDeep(moduleSetters[path].default)
  // console.log(path.replace(/^.*\/(.*)\.ts$/, '$1'), getSettersListByObj(defaultExport));

  setters[path.replace(/^.*\/(.*)\.ts$/, '$1') as TComponentName] = getSettersListByObj(defaultExport)
}

export default {
  setters,
}
