// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  base: process.env.NODE_ENV === 'production' ? '/My-Portfolio/' : '/',
  publicDir: 'public', // expose static legacy files under /legacy/
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vuetify')) return 'vuetify-vendor'
          if (id.includes('node_modules/@mdi')) return 'mdi-vendor'
          if (id.includes('node_modules/tsparticles') || id.includes('node_modules/@tsparticles')) return 'particles-vendor'
          if (id.includes('node_modules')) return 'vendor'
        }
      }
    }
  }
})
