import type { TComponentConfig } from "./schema"

export type Material = {
  label: string
  icon: string
  sort?: number
  materialContent: TComponentConfig
}
