<template>
  <section id="home" class="home-about-wrapper surface-gradient-light">
    <Particles
      v-if="particlesReady"
      id="tsparticles"
      :options="particleOptions"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      class="home-about-particles"
    />

    <v-container fluid class="home-about-container">
      <div id="about" class="anchor-spacer" aria-hidden="true"></div>
      <v-fade-transition appear>
        <v-row align="center" justify="center" class="home-about-grid g-8">
          <v-col cols="12" md="5" class="d-flex justify-center">
            <v-scale-transition appear>
              <v-hover v-slot="{ isHovering, props }">
                <div
                  v-bind="props"
                  class="home-about-avatar-wrapper glass-panel elevated-hover"
                  :class="{ 'home-about-avatar-wrapper--hover': isHovering }"
                  role="button"
                  tabindex="0"
                  aria-label="Profile — Cristian Jay T. Buquis"
                  @mouseenter="logAvatarHover('enter')"
                  @mouseleave="logAvatarHover('leave')"
                  @click="logAvatarClick"
                  @keydown.enter.prevent="logAvatarClick"
                  @keydown.space.prevent="logAvatarClick"
                >
                  <img
                    v-if="imageSrcWebp"
                    :src="imageSrcWebp"
                    alt="Cristian Jay T. Buquis"
                    width="220"
                    height="220"
                    class="rounded-circle home-about-avatar"
                    @load="handleImageLoad"
                    @error="onImgError"
                  />

                  <div v-else class="avatar-fallback" aria-hidden="true">CJ</div>
                </div>
              </v-hover>
            </v-scale-transition>
          </v-col>

          <v-col cols="12" md="7" class="d-flex">
            <v-card flat class="home-about-card glass-panel">
              <div class="mx-auto home-about-text">
                <div class="home-about-kicker text-body-2 home-about-accent d-inline-flex align-center mb-3">
                  <v-icon icon="mdi-star-four-points" size="18" class="me-2" />
                  Information Systems Graduate
                </div>

                <h1 class="text-h3 text-md-h2 font-weight-bold mb-3">
                  Cristian Jay T. Buquis
                </h1>

                <p class="text-h6 font-weight-medium home-about-accent mb-4">
                  Web Developer | Vibe Coder
                </p>

                <p class="text-body-1 text-medium-emphasis mb-5">
                  Web developer experienced with Vue.js, React, Node.js, Strapi, and Laravel—focused on building resilient, scalable web
                  applications with thoughtful UI/UX and measurable business impact.
                </p>

                <v-row justify="center" class="g-3 mb-6 home-about-cta">
                  <v-col cols="12" sm="auto">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        variant="flat"
                        class="text-none px-6 py-3 home-about-btn home-about-btn--primary"
                        :elevation="isHovering ? 10 : 4"
                        @click.prevent="handleCtaScroll('View TOR', 'tor')"
                      >
                        View TOR
                      </v-btn>
                    </v-hover>
                  </v-col>
                  <v-col cols="12" sm="auto">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        variant="outlined"
                        class="text-none px-6 py-3 home-about-btn home-about-btn--secondary"
                        :elevation="isHovering ? 10 : 0"
                        href="#contact"
                        @click.prevent="handleCtaScroll('Contact Me', 'contact')"
                      >
                        Contact Me
                      </v-btn>
                    </v-hover>
                  </v-col>
                  <v-col cols="12" sm="auto">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        variant="tonal"
                        class="text-none px-6 py-3 home-about-btn home-about-btn--tertiary"
                        :elevation="isHovering ? 10 : 2"
                        :href="resumeHref"
                        target="_blank"
                        rel="noopener noreferrer"
                        @click="handleActionClick('View Resume')"
                      >
                        View Resume
                      </v-btn>
                    </v-hover>
                  </v-col>
                  <v-col cols="12" sm="auto" class="d-flex align-center justify-center gap-3">
                    <v-divider vertical class="home-about-divider-vertical" />
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        icon
                        size="x-large"
                        variant="text"
                        class="home-about-icon home-about-icon--email transition-ease"
                        :class="{ 'home-about-icon--hover': isHovering }"
                        :href="mailtoHref"
                        aria-label="Send an email"
                        @click="handleActionClick('Email')"
                      >
                        <v-icon icon="mdi-email" size="28" />
                      </v-btn>
                    </v-hover>
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        icon
                        size="x-large"
                        variant="text"
                        class="home-about-icon home-about-icon--messenger transition-ease"
                        :class="{ 'home-about-icon--hover': isHovering }"
                        href="https://m.me/cristianjay.buquis"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open Messenger"
                        @click="handleActionClick('Messenger')"
                      >
                        <v-icon icon="mdi-facebook-messenger" size="28" />
                      </v-btn>
                    </v-hover>
                  </v-col>
                </v-row>

                <v-divider class="my-6 home-about-divider" />

                <p class="text-body-1 text-medium-emphasis mb-4">
                  I love collaborating with cross-functional teams, mentoring peers, and iterating quickly using data-driven insights. Let’s work together to
                  craft experiences that feel effortless and deliver results.
                </p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-container>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { useTheme } from 'vuetify'
import { loadFull } from 'tsparticles'
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
const resumeHref = `${import.meta.env.BASE_URL}assets/BUQUIS_RESUME_TEMPLATE.html`
const currentProfile = computed(() => {
  const isDark = theme.global.name.value === 'darkTheme'
  return {
    webp: isDark ? profileDarkWebp : profileLightWebp
  }
})
// Reactive image source (WebP only)
const imageSrcWebp = computed(() => currentProfile.value.webp)
const imageSrcPng = null
const mailtoHref = 'mailto:Cjbuquis@gmail.com'

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
  log.info('Profile image loaded', { src: imageSrcPng.value })
}

const onImgError = (event) => {
  log.error('Profile image failed to load', {
    attemptedSrc: imageSrcPng.value,
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
  overflow: hidden;
  padding-block: clamp(96px, 16vw, 168px);
}

.home-about-container {
  position: relative;
  z-index: 1;
  max-width: 1240px;
}

.home-about-particles {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.anchor-spacer {
  position: absolute;
  top: -120px;
  width: 1px;
  height: 1px;
}

.home-about-grid {
  min-height: 60vh;
}

.home-about-avatar-wrapper {
  padding: clamp(18px, 3vw, 28px);
  border-radius: 999px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: inline-flex;
}

.home-about-avatar-wrapper:focus-visible {
  outline: 3px solid rgba(0, 150, 136, 0.18);
  outline-offset: 4px;
}

.avatar-fallback {
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #009688;
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  border-radius: 999px;
}

.home-about-avatar-wrapper--hover {
  transform: translateY(-6px) scale(1.03);
}

.home-about-avatar {
  display: block;
  border-radius: 999px;
}

.home-about-card {
  width: 100%;
  max-width: 880px;
  margin-inline: auto;
  background: transparent;
  color: inherit;
  padding: clamp(28px, 5vw, 44px);
}

.home-about-text {
  max-width: 720px;
}

.home-about-kicker {
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.home-about-btn {
  border-radius: 999px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.home-about-btn:hover,
.home-about-btn:focus-visible {
  transform: translateY(-3px);
}

.home-about-btn--primary {
  background-color: #0091ea !important;
  color: #ffffff !important;
  border-color: #0091ea !important;
}

.home-about-btn--primary:hover,
.home-about-btn--primary:focus-visible {
  background-color: #0091ea !important;
  box-shadow: 0 12px 24px rgba(0, 145, 234, 0.28);
}

.home-about-btn--secondary {
  border-color: #0091ea !important;
  color: #0091ea !important;
}

.home-about-btn--secondary:hover,
.home-about-btn--secondary:focus-visible {
  background-color: rgba(0, 145, 234, 0.12) !important;
  color: #0091ea !important;
}

.home-about-btn--tertiary {
  background-color: rgba(0, 145, 234, 0.16) !important;
  color: #0091ea !important;
  border: 1px solid rgba(0, 145, 234, 0.3) !important;
}

.home-about-btn--tertiary:hover,
.home-about-btn--tertiary:focus-visible {
  background-color: rgba(0, 145, 234, 0.24) !important;
  color: #0091ea !important;
}

.home-about-divider {
  opacity: 0.32;
}

.home-about-actions .home-about-icon {
  transition: transform 0.25s ease, color 0.25s ease;
}

.home-about-icon--accent {
  color: #0091ea !important;
}

.home-about-actions .home-about-icon:hover,
.home-about-actions .home-about-icon:focus-visible {
  transform: translateY(-3px) scale(1.05);
  color: #40c4ff !important;
}

.home-about-accent {
  color: #00897b;
}

/* Contact icons in CTA section */
.home-about-divider-vertical {
  height: 40px;
  opacity: 0.25;
}

.home-about-icon--email,
.home-about-icon--messenger {
  color: #0091ea !important;
}

.home-about-icon--email:hover,
.home-about-icon--email:focus-visible,
.home-about-icon--email.home-about-icon--hover,
.home-about-icon--messenger:hover,
.home-about-icon--messenger:focus-visible,
.home-about-icon--messenger.home-about-icon--hover {
  transform: translateY(-4px) scale(1.15);
  color: #40c4ff !important;
  background-color: rgba(0, 145, 234, 0.1) !important;
}

@media (max-width: 960px) {
  .home-about-card {
    padding: clamp(24px, 6vw, 36px);
  }
}

@media (max-width: 600px) {
  .home-about-avatar-wrapper {
    margin-bottom: 24px;
  }

  .anchor-spacer {
    top: -72px;
  }

  .home-about-divider-vertical {
    display: none;
  }
}
</style>
