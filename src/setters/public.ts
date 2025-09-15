import type { TSettersModuleType } from '@/types/setter.ts'
import { getSettersListByObj } from '@/utils'

const s: TSettersModuleType = {

}

const list = getSettersListByObj(s)
export default list
