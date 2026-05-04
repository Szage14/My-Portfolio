// src/main.js
import { createApp } from 'vue'
import Particles from '@tsparticles/vue3'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// Critical CSS loaded first for FCP optimization
import './assets/critical.css'
import './assets/custom.css'
import 'aos/dist/aos.css'
import AOS from 'aos'

AOS.init()

// Simple global error surface for easier debugging
if (!window.__debug) {
	Object.defineProperty(window, '__debug', { value: { logs: [] }, writable: false })
}
const pushGlobal = (level, message, data) => {
	const entry = { ts: new Date().toISOString(), level, scope: 'main', message, data }
	try { window.__debug.logs.push(entry) } catch {}
	const tag = `[main][${entry.ts}][${level.toUpperCase()}] ${message}`
	if (level === 'error') console.error(tag, data ?? '')
	else console.info(tag, data ?? '')
}
window.addEventListener('error', (e) => {
	pushGlobal('error', 'WindowError', {
		message: e.message, filename: e.filename, lineno: e.lineno, colno: e.colno,
		error: e.error?.stack || e.error?.message || String(e.error)
	})
})
window.addEventListener('unhandledrejection', (e) => {
	pushGlobal('error', 'UnhandledRejection', { reason: e.reason?.stack || e.reason?.message || String(e.reason) })
})


const app = createApp(App)

app.use(vuetify)

// Particles engine is initialized in section components to keep one import strategy.
app.use(Particles)

try {
	app.mount('#app')
	pushGlobal('info', 'App mounted', null)
} catch (e) {
	pushGlobal('error', 'Mount failed', { error: e?.stack || e?.message || String(e) })
}
