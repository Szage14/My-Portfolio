// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// import './assets/style.css' // optional if you reuse your old CSS
import '@mdi/font/css/materialdesignicons.css'
import './assets/custom.css'
import 'aos/dist/aos.css'
import AOS from 'aos'

AOS.init()


createApp(App).use(vuetify).mount('#app')
