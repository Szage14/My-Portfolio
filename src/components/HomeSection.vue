<template>
  <section id="home" class="hero-wrapper">
    <Particles
      v-if="particlesReady"
      id="tsparticles"
      :options="particleOptions"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      class="hero-particles"
    />

    <v-container fluid class="py-24 text-center hero-container">
      <v-fade-transition appear>
        <v-row justify="center" align="center" class="fill-height">
          <v-col cols="12" md="8" lg="6">
            <picture class="mx-auto mb-6 rounded-circle elevation-4 hero-avatar transition-ease d-block" v-if="currentProfilePng">
              <source :srcset="currentProfileWebp" type="image/webp" />
              <img
                :src="currentProfilePng"
                alt="Cristian Jay T. Buquis"
                width="160"
                height="160"
                class="rounded-circle elevation-4 hero-avatar transition-ease d-block"
                @load="onImgLoad"
                @error="onImgError"
              />
            </picture>

            <h1 class="text-h3 text-md-h2 font-weight-bold mb-4">Cristian Jay T. Buquis</h1>
            <p class="text-subtitle-1 text-medium-emphasis mb-3">Information Systems Graduate | Web Developer</p>
            <p class="text-body-1 text-medium-emphasis mb-6 hero-tagline">
             Web Developer with hands-on experience in Vue.js, React, Node.js, Strapi, and Laravel. Passionate about crafting scalable web
              applications and collaborating with cross-functional teams to deliver impactful, user-focused solutions.
            </p>

            <v-row justify="center" class="g-3">
              <v-col cols="auto">
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn
                    v-bind="props"
                    color="teal"
                    variant="flat"
                    class="ma-2 text-none hero-btn"
                    :elevation="isHovering ? 6 : 2"
                    href="#about"
                    @click.prevent="handleCtaClick('Learn More', 'about')"
                  >
                    Learn More
                  </v-btn>
                </v-hover>
              </v-col>
              <v-col cols="auto">
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn
                    v-bind="props"
                    variant="outlined"
                    color="teal"
                    class="ma-2 text-none hero-btn"
                    :elevation="isHovering ? 6 : 2"
                    href="#contact"
                    @click.prevent="handleCtaClick('Contact Me', 'contact')"
                  >
                    Contact Me
                  </v-btn>
                </v-hover>
              </v-col>
              <v-col cols="auto">
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn
                    v-bind="props"
                    variant="tonal"
                    color="teal"
                    class="ma-2 text-none hero-btn"
                    :elevation="isHovering ? 6 : 2"
                    href="https://drive.google.com/file/d/1FTNoDGi4g3ZCDl31_kQ97D7FXdwG7Uu0/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click="handleCtaExternal('View Resume')"
                  >
                    View Resume
                  </v-btn>
                </v-hover>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-container>
  </section>
</template>

<script setup>
import { computed, watch, onMounted, onBeforeUnmount, ref } from 'vue'
import { useTheme } from 'vuetify'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'
import profileDarkPng from '../assets/profile-dark.png'
import profileLightPng from '../assets/profile-light.png'
import profileDarkWebp from '../assets/profile-dark.webp'
import profileLightWebp from '../assets/profile-light.webp'

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
const particlesReady = ref(true)
const currentProfile = computed(() => {
  const isDark = theme.global.name.value === 'darkTheme'
  return {
    webp: isDark ? profileDarkWebp : profileLightWebp,
    png: isDark ? profileDarkPng : profileLightPng
  }
})
const currentProfileWebp = computed(() => currentProfile.value.webp)
const currentProfilePng = computed(() => currentProfile.value.png)

const onImgError = (e) => {
  log.error('Profile image failed to load', {
    srcTried: currentProfilePng.value,
    eventType: e?.type
  })
}

const onImgLoad = () => {
  log.info('Profile image loaded', { src: currentProfilePng.value })
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
    particlesReady.value = false
  }
}
const particlesLoaded = async (container) => {
  // container is the loaded particles Container instance
  log.info('Particles loaded', {
    id: container?.id,
    count: container?.particles?.count
  })
}

const handleCtaClick = (label, targetId) => {
  log.info('CTA clicked', { label, targetId })
  scrollTo(targetId)
}

const handleCtaExternal = (label) => {
  log.info('External CTA clicked', { label })
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
.hero-wrapper {
  position: relative;
  min-height: 100vh;
  color: #ffffff;
  background: linear-gradient(270deg, #004d40, #009688, #00695c);
  background-size: 600% 600%;
  animation: gradientShift 20s ease infinite;
}

.hero-container {
  position: relative;
  z-index: 1;
}

.hero-particles {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-avatar {
  cursor: pointer;
}

.hero-tagline {
  max-width: 720px;
  margin: 0 auto;
}

.hero-btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero-btn:hover,
.hero-btn:focus-visible {
  transform: translateY(-2px);
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
