import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import CasdoorSDK from 'casdoor-js-sdk'

window.CasdoorSDK = CasdoorSDK

const app = createApp(App)

app.use(router)

app.mount('#app')
