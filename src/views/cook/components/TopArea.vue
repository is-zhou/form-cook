<script setup lang="ts"></script>

<template>
  <header class="top_area">
    <div class="top_area_left">
      <h3>FormCook</h3>
    </div>
    <div class="top_area_middle"></div>
    <div class="top_area_right"></div>
  </header>
</template>

<style scoped lang="scss">
.top_area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 8px 12px 8px 16px;
  border-bottom: 1px solid #efefef;
}
.top_area_left {
  display: flex;
  gap: 10px;
  h3 {
    font-weight: bold;
    margin: 0;
  }
}
.top_area_middle {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
