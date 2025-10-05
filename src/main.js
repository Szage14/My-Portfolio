// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './assets/style.css' // optional if you reuse your old CSS

createApp(App).use(vuetify).mount('#app')
