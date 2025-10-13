<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { ElSelect, ElOption, ElInput, ElButton, ElColorPicker, ElMessage } from 'element-plus'
import { cloneDeep, isEqual } from 'lodash'

type StylePair = { prop: string; value: string }
const modelValue = defineModel<Record<string, string>>()

// 内部编辑副本
const localList = ref<StylePair[]>([])
const dirty = ref(false) // 是否修改过

// 常用属性和值
const COMMON_STYLE_OPTIONS: Record<string, string[]> = {
  display: ['block', 'inline-block', 'flex', 'none'],
  position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
  width: ['auto', '100%', '50%', '200px'],
  height: ['auto', '100%', '50%', '200px'],
  'justify-content': ['flex-start', 'center', 'space-between', 'space-around'],
  'align-items': ['flex-start', 'center', 'flex-end', 'stretch'],
  'text-align': ['left', 'center', 'right'],
  'font-weight': ['normal', 'bold', '600', '700'],
  'border-style': ['solid', 'dashed', 'dotted', 'none'],
  overflow: ['visible', 'hidden', 'scroll', 'auto'],
}

// 判断属性是否颜色类型
function isColorProp(prop: string) {
  return /color/i.test(prop)
}

// 初始化
watch(
  () => modelValue.value,
  () => {
    if (!modelValue.value) {
      return
    }
    localList.value = Object.entries(modelValue.value || {}).map(([prop, value]) => ({
      prop,
      value,
    }))
  },
  { immediate: true, deep: true },
)

// 监听本地变化，判断是否与原数据不同
watch(
  localList,
  () => {
    const current = Object.fromEntries(localList.value.map((i) => [i.prop, i.value]))
    dirty.value = !isEqual(current, modelValue.value)
  },
  { deep: true },
)

// 添加
function addRow() {
  localList.value.push({ prop: '', value: '' })
}

// 删除
function removeRow(index: number) {
  localList.value.splice(index, 1)
}

// 保存
function saveChanges() {
  const newObj: Record<string, string> = {}
  localList.value.forEach(({ prop, value }) => {
    if (prop) newObj[prop] = value
  })
  modelValue.value = cloneDeep(newObj)
  dirty.value = false
  ElMessage.success('样式已保存')
}
</script>

<template>
  <div class="style_setter">
    <div class="style_row" v-for="(item, index) in localList" :key="index">
      <!-- 属性名 -->
      <el-select v-model="item.prop" filterable allow-create placeholder="属性" style="flex: 1">
        <el-option
          v-for="prop in Object.keys(COMMON_STYLE_OPTIONS)"
          :key="prop"
          :label="prop"
          :value="prop"
        />
      </el-select>
      <div style="flex: 1">
        <!-- 属性值 -->
        <template v-if="isColorProp(item.prop)">
          <el-color-picker v-model="item.value" />
        </template>
        <template v-else>
          <el-select
            v-if="COMMON_STYLE_OPTIONS[item.prop]"
            v-model="item.value"
            filterable
            allow-create
            placeholder="值"
          >
            <el-option
              v-for="opt in COMMON_STYLE_OPTIONS[item.prop]"
              :key="opt"
              :label="opt"
              :value="opt"
            />
          </el-select>
          <el-input v-else v-model="item.value" placeholder="值" />
        </template>
      </div>
      <!-- 删除 -->
      <el-button :icon="Delete" circle size="small" type="danger" @click="removeRow(index)" />
    </div>

    <!-- 底部按钮区 -->
    <div class="style_footer">
      <el-button type="primary" style="flex: 1" @click="addRow" plain> 添加样式属性 </el-button>
      <el-button v-if="dirty" style="flex: 1" type="primary" @click="saveChanges">
        保存修改
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.style_setter {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0;
  width: 100%;
}
.style_row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
}
.style_footer {
  display: flex;
  margin-top: 8px;
  width: 100%;
}
</style>
