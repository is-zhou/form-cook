import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useStatusStore = defineStore('status', () => {
  const isTreeAreaOpen = ref(true)
  const isTemplateOpen = ref(false)

  function updateTreeAreaOpen() {

    isTreeAreaOpen.value = !isTreeAreaOpen.value

  }
  function updateTemplateOpen() {

    isTemplateOpen.value = !isTemplateOpen.value

  }

  return { isTreeAreaOpen, updateTreeAreaOpen, isTemplateOpen, updateTemplateOpen }
})
