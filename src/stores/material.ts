import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Material } from '@/types/material'
import material from '@/materials/index'

export const useMaterialsStore = defineStore('materials', () => {

  const menus: { [key: string]: Material[] } = material
  const materials = ref<Material[]>(menus['all'])


  function changeMaterials(list: Material[]) {

    materials.value = list

  }

  return { menus, materials, changeMaterials }
})
