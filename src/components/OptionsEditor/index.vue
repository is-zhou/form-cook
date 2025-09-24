<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { SerializeInput, useSerialize } from 'vue-serialize-input'
const { serialize, deserialize } = useSerialize()
type Option = {
  label: string
  value: string | number
  disabled?: boolean
}

type remoteType = {
  url: string
  method?: 'GET' | 'POST'
  map?: (res: { data: any }) => Array<{ label: string; value: unknown }>
}
type staticType = Option[]
type functionType = () => Option[] | Promise<Option[]>

const modelValue = defineModel<staticType | functionType | remoteType>()

// 当前模式：static / function / remote
const mode = ref<'static' | 'function' | 'remote'>('static')

// 数据容器
const staticOptions = ref<staticType>([])
const functionCode = ref<functionType>()
const remoteConfig = ref<remoteType>({
  url: '',
  method: 'GET',
  map: (res) => (res.data ? [res.data, null] : [[], null]),
})

// 初始化
watch(
  () => modelValue.value,
  (val) => {
    if (Array.isArray(val)) {
      mode.value = 'static'
      staticOptions.value = val
    } else if (typeof val === 'function') {
      mode.value = 'function'
      functionCode.value = val
    } else if (typeof val === 'object' && val.url) {
      mode.value = 'remote'
      remoteConfig.value = val
    }
  },
  { immediate: true },
)

// 同步回父组件
watch(
  () => [mode, staticOptions.value, functionCode.value, remoteConfig.value],
  () => {
    if (mode.value === 'static') {
      modelValue.value = staticOptions.value
    } else if (mode.value === 'function') {
      if (!functionCode.value) {
        modelValue.value = deserialize(`()=> new Promise((res,rej)=>{
  res([
  ${serialize(staticOptions.value) || ''},
  null
  ])
        })`)
        return
      }
      modelValue.value = functionCode.value
    } else if (mode.value === 'remote') {
      modelValue.value = remoteConfig.value
    }
  },
  {
    deep: true,
  },
)
</script>

<template>
  <div class="options_editor">
    <!-- 模式选择 -->
    <el-select v-model="mode" style="margin-bottom: 12px">
      <el-option label="固定选项" value="static" />
      <el-option label="函数获取" value="function" />
      <el-option label="接口获取" value="remote" />
    </el-select>

    <!-- 固定数组模式 -->
    <div v-if="mode === 'static'">
      <DragSortTable v-model="staticOptions" style="width: 100%; margin-bottom: 8px">
        <el-table-column label="Label" width="90">
          <template #default="{ row }">
            <el-input v-model="row.label" placeholder="Label" />
          </template>
        </el-table-column>
        <el-table-column label="Value" width="90">
          <template #default="{ row }">
            <el-input v-model="row.value" placeholder="Value" />
          </template>
        </el-table-column>
        <el-table-column label="禁用" width="50">
          <template #default="{ row }">
            <el-switch v-model="row.disabled" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="40">
          <template #default="{ $index }">
            <el-button
              :icon="Delete"
              circle
              type="danger"
              size="small"
              @click="staticOptions.splice($index, 1)"
            >
            </el-button>
          </template>
        </el-table-column>
      </DragSortTable>
      <el-button
        type="primary"
        style="width: 100%"
        @click="staticOptions.push({ label: '', value: '' })"
      >
        新增选项
      </el-button>
    </div>

    <!-- 函数模式 -->
    <div v-else-if="mode === 'function'" style="width: 100%">
      <SerializeInput
        v-model="functionCode"
        type="textarea"
        :rows="8"
        serialize-type="function"
        placeholder="请输入函数，如：async () =>  Promise [{ label: 'A', value: 1 }]"
      />
    </div>

    <!-- 接口模式 -->
    <div v-else-if="mode === 'remote'">
      <el-input
        v-model="remoteConfig.url"
        type="textarea"
        placeholder="接口地址"
        style="margin-bottom: 8px"
      />
      <el-select v-model="remoteConfig.method" style="width: 120px; margin-bottom: 8px">
        <el-option label="GET" value="GET" />
        <el-option label="POST" value="POST" />
      </el-select>
      <SerializeInput
        v-model="remoteConfig.map"
        type="textarea"
        :rows="4"
        serialize-type="function"
        placeholder="结果映射函数，如：res => res.data.map(i => ({ label: i.name, value: i.id }))"
      />
    </div>
  </div>
</template>

<style scoped>
.options_editor {
  width: 100%;
}
</style>
