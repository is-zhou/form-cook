import type { TSetters, TSettersModuleType } from '@/types/setter.ts'
import { getSettersListByObj } from '@/utils'
import type { ComponentName } from 'form-cook-render'
import cloneDeep from 'lodash/cloneDeep'

interface ModuleType {
  default: TSettersModuleType
}

const moduleSetters = import.meta.glob('./form/*.ts', { eager: true }) as Record<string, ModuleType>
const moduleLayoutSetters = import.meta.glob('./layout/*.ts', { eager: true }) as Record<string, ModuleType>

const setters: TSetters = {}


setSetters(moduleSetters)
setSetters(moduleLayoutSetters)

function setSetters(target: Record<string, ModuleType>) {
  for (const path in target) {
    const defaultExport = cloneDeep(target[path].default)

    setters[path.replace(/^.*\/(.*)\.ts$/, '$1').toLowerCase() as ComponentName] = getSettersListByObj(defaultExport)
  }
}


export default {
  setters,
}
