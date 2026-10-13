<script setup lang="ts">
defineProps<{ color?: string }>()
</script>

<template>
  <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="256"
    height="256"
  >
    <path
      d="M512 88l59.9 182.4L754 330l-145.9 106 55.8 181.8L512 509.2 358.1 617.8 414 436 268 330l182.1-59.6L512 88z"
      :fill="color || 'currentColor'"
    />
    <path
      d="M214.4 600l31 94.4 94.6 31-94.6 31-31 94.6-31-94.6-94.4-31 94.4-31 31-94.4zM809.6 512l22.4 68 68 22.4-68 22.4-22.4 68-22.4-68-68-22.4 68-22.4 22.4-68z"
      :fill="color || 'currentColor'"
      opacity="0.72"
    />
  </svg>
</template>
