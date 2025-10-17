<template>
  <section id="home" class="home-about-wrapper">
    <Particles
      v-if="particlesReady"
      id="tsparticles"
      :options="particleOptions"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      class="home-about-particles"
    />

    <v-container fluid class="py-24 home-about-container">
      <div id="about" class="anchor-spacer" aria-hidden="true"></div>
      <v-fade-transition appear>
        <v-row align="center" justify="center" class="fill-height g-8">
          <v-col cols="12" md="5" class="d-flex justify-center">
            <v-scale-transition appear>
              <v-hover v-slot="{ isHovering, props }">
                <div
                  v-bind="props"
                  class="home-about-avatar-wrapper transition-ease"
                  :class="{ 'home-about-avatar-wrapper--hover': isHovering }"
                  role="button"
                  tabindex="0"
                  @mouseenter="logAvatarHover('enter')"
                  @mouseleave="logAvatarHover('leave')"
                  @click="logAvatarClick"
                  @keyup.enter.prevent="logAvatarClick"
                  @keyup.space.prevent="logAvatarClick"
                >
                  <v-img
                    :src="currentProfile"
                    :lazy-src="currentProfile"
                    alt="Cristian Jay T. Buquis"
                    width="220"
                    height="220"
                    cover
                    class="rounded-circle elevation-4 home-about-avatar"
                    @load="handleImageLoad"
                    @error="onImgError"
                  />
                </div>
              </v-hover>
            </v-scale-transition>
          </v-col>

          <v-col cols="12" md="7" class="d-flex">
            <v-card flat class="pa-6 pa-md-8 home-about-card">
              <div class="mx-auto home-about-text">
                <h1 class="text-h3 text-md-h2 font-weight-bold mb-2">CRISTIAN JAY T. BUQUIS</h1>
                <p class="text-subtitle-1 text-medium-emphasis mb-4">
                  Fullstack Developer
                </p>
                <p class="text-body-1 text-medium-emphasis mb-6">
                  Full-Stack Developer with hands-on experience in Vue.js, React, Node.js, Strapi, and Laravel, seeking to leverage strong
                  problem-solving skills and a growth mindset to build scalable web applications.
                </p>

                <v-row justify="center" class="g-3 mb-4 mb-md-6">
                  <v-col cols="auto">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        color="teal"
                        variant="flat"
                        class="ma-1 text-none home-about-btn"
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
                  <v-col cols="auto">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        variant="outlined"
                        color="teal"
                        class="ma-1 text-none home-about-btn"
                        :elevation="isHovering ? 6 : 2"
                        href="#contact"
                        @click.prevent="handleCtaScroll('Contact Me', 'contact')"
                      >
                        Contact Me
                      </v-btn>
                    </v-hover>
                  </v-col>
                </v-row>

                <v-divider class="my-6" />

                <p class="text-body-1 text-medium-emphasis text-justify mb-4">
                  Eager to contribute to cross-functional teams, continuously learn new technologies, and drive impactful solutions that align with business goals.
                </p>
                

                <v-row justify="center" class="g-3 mt-6">
                  <v-col cols="auto">
                    <v-btn
                      icon
                      variant="text"
                      color="teal"
                      :href="mailtoHref"
                      aria-label="Send an email"
                      @click="handleActionClick('Email')"
                    >
                      <v-icon icon="mdi-email" />
                    </v-btn>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      icon
                      variant="text"
                      color="teal"
                      href="https://tinyurl.com/cjbuquis"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open portfolio link"
                      @click="handleActionClick('Portfolio')"
                    >
                      <v-icon icon="mdi-link-variant" />
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-container>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import { loadFull } from 'tsparticles'
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
            console.info('[HomeAboutSection] Copied debug logs to clipboard. count=', window.__debug.logs.length)
          } catch (e) {
            console.error('[HomeAboutSection] Failed to copy logs', serializeError(e))
          }
        }
      },
      writable: false
    })
  }
}
function pushLog(level, message, data) {
  ensureDebug()
  const entry = { ts: new Date().toISOString(), level, scope: 'HomeAboutSection', message, data }
  window.__debug.logs.push(entry)
  const tag = `[HomeAboutSection][${entry.ts}][${level.toUpperCase()}] ${message}`
  if (level === 'error') console.error(tag, data ?? '')
  else if (level === 'warn') console.warn(tag, data ?? '')
  else console.info(tag, data ?? '')
  return entry
}
const log = {
  info: (m, d) => pushLog('info', m, d),
  warn: (m, d) => pushLog('warn', m, d),
  error: (m, d) => pushLog('error', m, d)
}
/* --------------------------------------------------- */

const theme = useTheme()
const particlesReady = ref(true)
const currentProfile = computed(() => (theme.global.name.value === 'darkTheme' ? profileDark : profileLight))
const mailtoHref = 'mailto:Cjbuquis@gmail.com'

const handleCtaExternal = (label) => {
  log.info('CTA external clicked', { label })
}

const handleCtaScroll = (label, targetId) => {
  log.info('CTA scroll clicked', { label, targetId })
  scrollTo(targetId)
}

const handleActionClick = (label) => {
  log.info('Action icon clicked', { label })
}

const logAvatarHover = (state) => {
  log.info('Avatar hover', { state })
}

const logAvatarClick = () => {
  log.info('Avatar activated')
}

const handleImageLoad = () => {
  log.info('Profile image loaded', { src: currentProfile.value })
}

const onImgError = (event) => {
  log.error('Profile image failed to load', {
    attemptedSrc: currentProfile.value,
    eventType: event?.type
  })
}

const particleOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: { onHover: { enable: true, mode: 'repulse' }, resize: true }
  },
  particles: {
    color: { value: '#80cbc4' },
    links: { color: '#80cbc4', distance: 120, enable: true, opacity: 0.5, width: 1 },
    move: { enable: true, speed: 1 },
    number: { value: 40 },
    opacity: { value: 0.5 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } }
  }
}

const scrollTo = (id) => {
  try {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      log.info('Scrolled to section', { id })
    } else {
      const available = Array.from(document.querySelectorAll('section[id]')).map((s) => s.id)
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
  log.info('Particles loaded', {
    id: container?.id,
    count: container?.particles?.count
  })
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
  log.error('UnhandledRejection', typeof reason === 'object' ? { reason: serializeError(reason) } : { reason })
}

onMounted(() => {
  try {
    log.info('HomeAboutSection mounted', {
      theme: theme.global.name.value,
      profileSrc: currentProfile.value
    })
  } catch (e) {
    log.error('Mount logging failed', { error: serializeError(e) })
  }
  window.addEventListener('error', onWindowError)
  window.addEventListener('unhandledrejection', onUnhandledRejection)

  try {
    watch(
      () => theme.global.name.value,
      (val) => {
        log.info('Theme changed', { theme: val, profileSrc: currentProfile.value })
      },
      { immediate: false }
    )
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
.home-about-wrapper {
  position: relative;
  min-height: 100vh;
  color: #ffffff;
  background: linear-gradient(270deg, #004d40, #009688, #00695c);
  background-size: 600% 600%;
  animation: gradientShift 20s ease infinite;
}

.home-about-container {
  position: relative;
  z-index: 1;
}

.home-about-particles {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.anchor-spacer {
  position: absolute;
  top: -80px;
}

.home-about-avatar-wrapper {
  border-radius: 50%;
  padding: 16px;
  display: inline-flex;
}

.home-about-avatar-wrapper--hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.14);
}

.home-about-avatar {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.home-about-card {
  width: 100%;
  max-width: 840px;
  margin-inline: auto;
  background: transparent;
  color: inherit;
}

.home-about-text {
  max-width: 720px;
}

.home-about-btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.home-about-btn:hover,
.home-about-btn:focus-visible {
  transform: translateY(-2px);
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media (max-width: 600px) {
  .anchor-spacer {
    top: -60px;
  }
}
</style>
