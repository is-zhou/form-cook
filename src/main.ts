import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css/normalize.css';
import 'element-plus/dist/index.css'
import "vue-serialize-input/dist/index.css";
import "@/assets/base.scss"

import App from './App.vue'
import router from './router'
import formRender from 'form-cook-render'
import { SerializeInput } from 'vue-serialize-input'
import RuleEditor from "@/components/RuleEditor/index.vue"
import OptionsEditor from "@/components/OptionsEditor/index.vue"
import BooleanOrFunctionInput from "@/components/BooleanOrFunctionInput.vue"
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(formRender, {
  components: { serializeInput: SerializeInput, div: "div", RuleEditor, OptionsEditor, BooleanOrFunctionInput }
})

app.mount('#app')
