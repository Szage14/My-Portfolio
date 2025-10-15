<template>
  <div id="home" class="fill-height d-flex flex-column align-center justify-center text-center">
    <Particles
      v-if="particlesReady"
      id="tsparticles"
      :options="particleOptions"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      class="absolute inset-0 -z-10"
    />

    <v-avatar size="160" class="mb-6">
      <v-img
        :src="currentProfile"
        alt="Cristian Jay Buquis"
        @error="onImgError"
      />
    </v-avatar>

    <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">Cristian Jay T. Buquis</h1>
    <p class="text-subtitle-1 text-grey-lighten-2 mb-6">
      BS Information Systems Graduate | Full-Stack Developer | Tech Enthusiast
    </p>

    <v-btn color="teal" size="large" variant="flat" @click="scrollTo('about')" class="text-white">
      Explore My Portfolio
      <v-icon end>mdi-arrow-down</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { computed, watch, onMounted, onBeforeUnmount, ref } from 'vue'
import { useTheme } from 'vuetify'
// Use the named export Particles (the default export is a plugin)
import Particles from "@tsparticles/vue3"; // ✅ default export now
import { loadFull } from 'tsparticles'
// Use Vite asset imports so paths work in dev and build
import profileDark from '../assets/profile-dark.png'
import profileLight from '../assets/profile-light.png'

/* ---------- lightweight logger (copyable) ---------- */
function serializeError(err) {
  if (!err) return null
  return { name: err.name, message: err.message, stack: err.stack }
}
function ensureDebug() {
  if (!window.__debug) {
    Object.defineProperty(window, '__debug', {
      value: {
        logs: [],
        copy: async () => {
          try {
            const text = JSON.stringify(window.__debug.logs, null, 2)
            await navigator.clipboard.writeText(text)
            console.info('[HomeSection] Copied debug logs to clipboard. count=', window.__debug.logs.length)
          } catch (e) {
            console.error('[HomeSection] Failed to copy logs', serializeError(e))
          }
        }
      },
      writable: false
    })
  }
}
function pushLog(level, message, data) {
  ensureDebug()
  const entry = { ts: new Date().toISOString(), level, scope: 'HomeSection', message, data }
  window.__debug.logs.push(entry)
  const tag = `[HomeSection][${entry.ts}][${level.toUpperCase()}] ${message}`
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
/* --------------------------------------------------- */

const theme = useTheme()
const particlesReady = ref(false)
const currentProfile = computed(() =>
  theme.global.name.value === 'darkTheme' ? profileDark : profileLight
)

const onImgError = (e) => {
  log.error('Profile image failed to load', {
    srcTried: currentProfile.value,
    eventType: e?.type
  })
}

const scrollTo = (id) => {
  try {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      log.info('Scrolled to section', { id })
    } else {
      const available = Array.from(document.querySelectorAll('section[id]')).map(s => s.id)
      log.warn('Section not found', { requested: id, available })
    }
  } catch (e) {
    log.error('scrollTo failed', { id, error: serializeError(e) })
  }
}

const particlesInit = async (engine) => {
  try {
    await loadFull(engine)
    log.info('Particles init', { loaded: true })
    particlesReady.value = true
  } catch (e) {
    log.error('Particles init failed', { error: serializeError(e) })
  }
}
const particlesLoaded = async (container) => {
  // container is the loaded particles Container instance
  log.info('Particles loaded', {
    id: container?.id,
    count: container?.particles?.count
  })
}

const particleOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
  },
  particles: {
    color: { value: '#80cbc4' },
    links: { color: '#80cbc4', distance: 120, enable: true, opacity: 0.5, width: 1 },
    move: { enable: true, speed: 1 },
    number: { value: 40 },
    opacity: { value: 0.5 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } },
  },
}

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

onMounted(() => {
  try {
    log.info('HomeSection mounted', {
      theme: theme.global.name.value,
      profileSrc: currentProfile.value
    })
  } catch (e) {
    log.error('Mount logging failed', { error: serializeError(e) })
  }
  window.addEventListener('error', onWindowError)
  window.addEventListener('unhandledrejection', onUnhandledRejection)

  // Log theme changes for debugging
  try {
    watch(() => theme.global.name.value, (val) => {
      // Log only; do not mutate theme here to avoid recursive updates
      log.info('Theme changed', { theme: val, profileSrc: currentProfile.value })
    })
  } catch (e) {
    log.error('Theme watch failed', { error: serializeError(e) })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('error', onWindowError)
  window.removeEventListener('unhandledrejection', onUnhandledRejection)
})
</script>

<style scoped>
#home {
  position: relative;
  min-height: 100vh;
  color: white;
  background: linear-gradient(270deg, #004d40, #009688, #00695c);
  background-size: 600% 600%;
  animation: gradientShift 20s ease infinite;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
