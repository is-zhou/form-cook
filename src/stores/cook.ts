import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Material } from '@/types/material'
import material from '@/materials/index'

export const useMaterialsStore = defineStore('materials', () => {

  const menuList: Array<{ label: string; materials: Material[] }> = [
    { label: '所有', materials: [...material.materialLayoutList, ...material.materialFormList] },
    { label: '表单', materials: [...material.materialFormList] },
    { label: '容器', materials: [...material.materialLayoutList] },
  ]
  const materials = ref<Material[]>(menuList[0].materials)


  function changeMaterials(list: Material[]) {

    materials.value = list

  }



  return { menuList, materials, changeMaterials }
})
