import type { ComponentConfig } from "form-cook-render"

export type MaterialGroup = "all" | "form" | "layout" | "action" | "date"

export type Material = {
  label: string
  icon: string
  group?: MaterialGroup
  sort?: number
  materialContent: ComponentConfig
}
