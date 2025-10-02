import type { Material } from '@/types/material.ts'
import type { OptionsConfig } from 'form-cook-render'
const generateData = () => {
  const data: OptionsConfig = []
  for (let i = 1; i <= 6; i++) {
    data.push({
      key: i,
      value: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}
const data = generateData()
const m: Material = {
  label: '穿梭框',
  icon: 'IconTransfer',
  materialContent: {
    id: '',
    componentName: 'transfer',
    componentType: 'form',
    formItemAttrs: {
      field: '',
      label: '穿梭框',
    },
    attrs: {
      data,
      props: { key: "value" }
    },
    defaultValue: []
  },
}

export default m
