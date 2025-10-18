import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useStatusStore = defineStore('status', () => {
  const isTreeAreaOpen = ref(false)
  const isTemplateOpen = ref(false)

  function updateTreeAreaOpen() {

    isTreeAreaOpen.value = !isTreeAreaOpen.value
    isTreeAreaOpen.value && (isTemplateOpen.value = false)
  }
  function updateTemplateOpen() {

    isTemplateOpen.value = !isTemplateOpen.value
    isTemplateOpen.value && (isTreeAreaOpen.value = false)

  }

  return { isTreeAreaOpen, updateTreeAreaOpen, isTemplateOpen, updateTemplateOpen }
},
  {
    persist: true
  }
)
