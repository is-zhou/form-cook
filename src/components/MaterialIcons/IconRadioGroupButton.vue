<template>
  <svg width="280" height="180" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="180" fill="var(--el-fill-color-light)" />

    <!-- 未选中按钮 -->
    <rect
      x="70"
      y="70"
      width="80"
      height="40"
      rx="6"
      fill="var(--el-fill-color-blank)"
      stroke="var(--el-button-text-color)"
      stroke-width="1"
    />
    <text
      x="110"
      y="92"
      font-size="14"
      text-anchor="middle"
      fill="var(--el-button-text-color)"
      alignment-baseline="middle"
    >
      未选中
    </text>

    <!-- 选中按钮 -->
    <rect x="150" y="70" width="80" height="40" rx="6" fill="var(--el-color-primary)" />
    <text
      x="190"
      y="92"
      font-size="14"
      text-anchor="middle"
      fill="white"
      alignment-baseline="middle"
    >
      已选中
    </text>
  </svg>
</template>
