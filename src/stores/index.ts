import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useStatusStore = defineStore('status', () => {
  const isTreeAreaOpen = ref(true)

  function updateTreeAreaOpen() {

    isTreeAreaOpen.value = !isTreeAreaOpen.value

  }

  return { isTreeAreaOpen, updateTreeAreaOpen }
})
