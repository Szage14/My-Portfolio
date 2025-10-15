<template>
  <v-app-bar app color="teal-darken-3" dark elevate-on-scroll>
    <v-container class="d-flex align-center justify-space-between">
      <!-- Brand -->
      <v-btn variant="text" class="text-h6 font-weight-bold text-white" @click="scrollTo('home')">
        CJ Buquis
      </v-btn>

      <!-- Desktop Menu -->
      <v-row class="d-none d-md-flex align-center">
        <v-btn
          v-for="item in navItems"
          :key="item.id"
          variant="text"
          class="text-white"
          @click="scrollTo(item.id)"
        >
          {{ item.label }}
        </v-btn>

        <v-btn
          :href="baseUrl + 'legacy/index.html'"
          target="_blank"
          color="amber-darken-2"
          variant="flat"
          class="ms-3 text-black font-weight-bold"
        >
          Legacy
        </v-btn>

        <v-btn
          icon
          variant="text"
          class="ms-2"
          @click="toggleTheme"
          :title="darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          :aria-label="darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <v-icon>
            {{ darkMode ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}
          </v-icon>
        </v-btn>
      </v-row>

      <!-- Mobile Hamburger -->
      <v-menu v-model="menu" transition="scale-transition" location="bottom end">
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="d-md-none" :aria-label="'Open menu'">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="item in navItems" :key="item.id" @click="scrollTo(item.id)">
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>

          <v-divider />
          <v-list-item :href="baseUrl + 'legacy/index.html'" target="_blank" title="Legacy Portfolio">
            <v-icon start color="amber-darken-2">mdi-history</v-icon>
            Legacy
          </v-list-item>

          <v-list-item @click="toggleTheme" :title="darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
            <v-icon start>{{ darkMode ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
            Toggle Theme
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

/* ---------- lightweight logger you can copy from console ---------- */
function serializeError(err) {
  if (!err) return null
  return { name: err.name, message: err.message, stack: err.stack }
}
function ensureDebug() {
  if (!window.__debug) {
    Object.defineProperty(window, '__debug', {
      value: { logs: [], copy: async () => {
        const text = JSON.stringify(window.__debug.logs, null, 2)
        await navigator.clipboard.writeText(text)
        console.info('[NavBar] Copied debug logs to clipboard. count=', window.__debug.logs.length)
      }},
      writable: false
    })
  }
}
function pushLog(level, message, data) {
  ensureDebug()
  const entry = { ts: new Date().toISOString(), level, scope: 'NavBar', message, data }
  window.__debug.logs.push(entry)
  const tag = `[NavBar][${entry.ts}][${level.toUpperCase()}] ${message}`
  if (level === 'error') console.error(tag, data ?? '')
  else if (level === 'warn') console.warn(tag, data ?? '')
  else console.info(tag, data ?? '')
  return entry
}
const log = {
  info: (m, d) => pushLog('info', m, d),
  warn: (m, d) => pushLog('warn', m, d),
  error: (m, d) => pushLog('error', m, d),
}
/* ------------------------------------------------------------------ */

const theme = useTheme()
const darkMode = ref(false)

// Load saved theme from localStorage
onMounted(() => {
  try {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      darkMode.value = savedTheme === 'dark'
      const next = darkMode.value ? 'darkTheme' : 'lightTheme'
      // Prefer Vuetify API
      if (typeof theme.change === 'function') {
        theme.change(next)
      } else {
        theme.global.name.value = next
      }
    }
    log.info('Mounted NavBar', {
      savedTheme,
      appliedTheme: theme.global?.name?.value
    })
  } catch (e) {
    log.error('Theme init failed', { error: serializeError(e) })
  }

  // Global error hooks
  window.addEventListener('error', onWindowError)
  window.addEventListener('unhandledrejection', onUnhandledRejection)
})

onBeforeUnmount(() => {
  window.removeEventListener('error', onWindowError)
  window.removeEventListener('unhandledrejection', onUnhandledRejection)
})

function onWindowError(event) {
  log.error('WindowError', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: serializeError(event.error)
  })
}

function onUnhandledRejection(event) {
  const reason = event?.reason
  log.error('UnhandledRejection', typeof reason === 'object'
    ? { reason: serializeError(reason) }
    : { reason })
}

// Watch for changes and save preference
watch(darkMode, (val) => {
  try {
    const next = val ? 'darkTheme' : 'lightTheme'
    if (typeof theme.change === 'function') {
      theme.change(next)
    } else {
      theme.global.name.value = next
    }
    localStorage.setItem('theme', val ? 'dark' : 'light')
    log.info('Theme toggled', { darkMode: val, appliedTheme: next })
  } catch (e) {
    log.error('Theme toggle failed', { error: serializeError(e), requestedDark: val })
  }
})

const toggleTheme = () => {
  try {
    darkMode.value = !darkMode.value
  } catch (e) {
    log.error('toggleTheme handler failed', { error: serializeError(e) })
  }
}

const active = ref(null)
const menu = ref(false)
const baseUrl = import.meta.env.BASE_URL

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
]

const scrollTo = (id) => {
  try {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      menu.value = false
      log.info('Scrolled to section', { id })
    } else {
      const available = Array.from(document.querySelectorAll('section[id]')).map(s => s.id)
      log.warn('Section not found', { requested: id, available })
    }
  } catch (e) {
    log.error('scrollTo failed', { id, error: serializeError(e) })
  }
}
</script>

<style scoped>
/* Do not follow on scroll */
.v-app-bar {
  position: static !important;
  top: auto !important;
  z-index: auto !important;
}
</style>
