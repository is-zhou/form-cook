import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Material, MaterialGroup } from '@/types/material'
import material from '@/materials/index'
import type { ComponentConfig } from 'form-cook-render'
import { cloneDeep, isEqual } from 'lodash'

export const useMaterialsStore = defineStore('materials', () => {
  const menuList: { key: MaterialGroup; label: string }[] = [
    { key: 'all', label: '所有', },
    { key: 'form', label: '表单', },
    { key: 'layout', label: '布局', },
    { key: 'action', label: '动作', },
    { key: 'date', label: '日期', },
    { key: 'custom', label: '收藏', },
  ]
  const menus: { [key: string]: Material[] } = material

  const currentMenu = ref()
  const materials = ref<Material[]>([])
  const customMaterials = ref<Material[]>([])

  watch(() => customMaterials.value, () => {
    menus.all = [...menus.all, ...customMaterials.value]
    menus.custom = customMaterials.value

    if (currentMenu.value === "custom") {
      materials.value = customMaterials.value
    }
  }, { immediate: true, deep: true })

  function changeMaterials(key: string) {
    materials.value = menus[key] || []
  }

  function addCustomMaterial(label: string, data: ComponentConfig) {
    const newMaterial = {
      label,
      materialContent: cloneDeep(data),
    }

    const target = customMaterials.value.find(i => isEqual(i, newMaterial))

    if (target) {
      ElMessage.warning("请勿重复收藏")
      return
    }

    customMaterials.value.push(newMaterial)
    ElMessage.success('收藏成功')

  }

  function delCustomMaterial(index: number) {
    customMaterials.value.splice(index, 1)
    ElMessage.success('删除成功')
  }

  return { currentMenu, menuList, materials, customMaterials, changeMaterials, addCustomMaterial, delCustomMaterial }
}, {
  persist: true
})
