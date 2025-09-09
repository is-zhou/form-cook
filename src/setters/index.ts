import type { TComponentName } from '@/components/FormRender/componentMap'
import type { TSetters, TSettersModuleType } from '@/types/setter.ts'
import { getSettersListByObj } from '@/utils'
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

    setters[path.replace(/^.*\/(.*)\.ts$/, '$1') as TComponentName] = getSettersListByObj(defaultExport)
  }
}


export default {
  setters,
}
