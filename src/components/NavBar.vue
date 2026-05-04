<template>
  <v-slide-y-transition>
    <v-app-bar
      app
      color="surface"
      elevate-on-scroll
      scroll-behavior="hide"
      :elevation="isScrolled ? 2 : 0"
      height="72"
      class="nav-bar"
    >
      <v-container class="d-flex align-center flex-nowrap py-0 nav-bar__content">
        <v-app-bar-title class="brand-title me-4 flex-shrink-1">
          <v-btn
            variant="text"
            color="teal"
            class="brand-button text-none px-0"
            aria-label="Go to Home"
            @click.prevent="navigateTo(homeItem)"
          >
           My Portfolio
          </v-btn>
          <!-- <span class="brand-subtitle text-body-2 text-medium-emphasis">Web Developer</span> -->
        </v-app-bar-title>

        <v-spacer />

        <div class="nav-buttons d-none d-md-flex align-center flex-nowrap">
          <v-btn
            v-for="item in navItems"
            :key="item.id"
            variant="text"
            :color="isSectionActive(item.id) ? 'teal' : inactiveNavColor"
            class="text-none nav-link mx-1"
            :class="{ 'nav-link--active': isSectionActive(item.id) }"
            :aria-label="`Go to ${item.label}`"
            :aria-current="isSectionActive(item.id) ? 'page' : undefined"
            @click.prevent="navigateTo(item)"
          >
            {{ item.label }}
          </v-btn>
        </div>

        <v-btn
          icon
          variant="text"
          color="teal"
          class="ms-2 theme-toggle flex-shrink-0"
          :aria-label="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <v-icon :icon="darkMode ? mdiWeatherNight : mdiWeatherSunny" size="24" class="theme-toggle__icon" />
        </v-btn>

        <v-app-bar-nav-icon
          class="d-md-none ms-1"
          :aria-label="drawer ? 'Close navigation menu' : 'Open navigation menu'"
          @click="drawer = !drawer"
        />
      </v-container>
    </v-app-bar>
  </v-slide-y-transition>

  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    color="surface-variant"
    width="320"
    elevation="6"
    class="nav-drawer"
  >
    <v-list nav density="compact">
      <v-list-item class="py-4 px-3">
        <template #prepend>
          <v-avatar color="teal" size="44" class="me-3" variant="tonal">
            <v-icon icon="mdi-account" />
          </v-avatar>
        </template>
        <v-list-item-title
          class="text-body-1 font-weight-semibold drawer-title"
          :style="drawerAccentStyle"
        >
          Cristian Jay T. Buquis
        </v-list-item-title>
        <v-list-item-subtitle class="text-body-2 text-medium-emphasis">BSIS-Web Developer</v-list-item-subtitle>
      </v-list-item>

      <v-divider class="my-3" />

      <v-list-item
        v-for="item in navItems"
        :key="`drawer-${item.id}`"
        :value="item.id"
        class="text-body-2"
        :aria-label="`Navigate to ${item.label}`"
        @click="navigateTo(item)"
      >
        <template #prepend>
          <v-icon :icon="item.icon" :color="isSectionActive(item.id) ? accentNavColor : inactiveNavColor" />
        </template>
        <v-list-item-title
          :class="{ 'drawer-link--active': isSectionActive(item.id) }"
          :style="isSectionActive(item.id) ? { color: accentNavColor } : { color: inactiveNavColor }"
        >
          {{ item.label }}
        </v-list-item-title>
      </v-list-item>

      <v-divider class="my-3" />

      <v-list-item
        @click="toggleTheme"
        class="text-body-2"
        :aria-label="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <template #prepend>
          <v-icon :icon="darkMode ? mdiWeatherNight : mdiWeatherSunny" class="theme-toggle__icon" />
        </template>
  <v-list-item-title class="drawer-link" :style="drawerAccentStyle">Toggle Theme</v-list-item-title>
      </v-list-item>

      <v-list-item
        :href="legacyHref"
        target="_blank"
        rel="noopener noreferrer"
        class="text-body-2"
        aria-label="Open legacy portfolio"
        @click="log.info('Legacy portfolio opened')"
      >
        <template #prepend>
          <v-icon color="amber-darken-2" icon="mdi-history" />
        </template>
  <v-list-item-title class="drawer-link" :style="drawerAccentStyle">Legacy</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useTheme } from 'vuetify'
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'

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
          const text = JSON.stringify(window.__debug.logs, null, 2)
          await navigator.clipboard.writeText(text)
          console.info('[NavBar] Copied debug logs to clipboard. count=', window.__debug.logs.length)
        }
      },
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
  error: (m, d) => pushLog('error', m, d)
}
/* --------------------------------------------------- */

const navItems = [
  { id: 'home', label: 'Home/About', icon: 'mdi-home-variant' },
  { id: 'resume', label: 'Resume', icon: 'mdi-file-account-outline' },
  { id: 'skills', label: 'Skills', icon: 'mdi-lightning-bolt-outline' },
  { id: 'education', label: 'Education', icon: 'mdi-school-outline' },
  { id: 'experience', label: 'Experience', icon: 'mdi-briefcase-account-outline' },
  { id: 'certifications', label: 'Certifications', icon: 'mdi-certificate-outline' },
  { id: 'tor', label: 'TOR', icon: 'mdi-file-certificate-outline' },
  { id: 'references', label: 'References', icon: 'mdi-account-group-outline' },
  { id: 'contact', label: 'Contact', icon: 'mdi-email-outline' }
]
const homeItem = navItems[0]
const inactiveNavColor = '#039BE5'
const drawerAccentColor = '#00897B'
const accentNavColor = '#69F0AE'
const drawerAccentStyle = { color: drawerAccentColor }

const drawer = ref(false)
const darkMode = ref(false)
const activeSection = ref('home')
const isScrolled = ref(false)
const baseUrl = import.meta.env.BASE_URL
const legacyHref = computed(() => `${baseUrl}legacy/index.html`)

const theme = useTheme()
let sectionObserver

const handleScroll = () => {
  isScrolled.value = window.scrollY > 120
}

const initSectionObserver = async () => {
  try {
    await nextTick()
    const options = { root: null, rootMargin: '-35% 0px -55% 0px', threshold: 0.2 }
    sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (visible) {
        const id = visible.target.id
        if (navItems.some((item) => item.id === id) && activeSection.value !== id) {
          activeSection.value = id
          log.info('Active section changed', { id })
        }
      }
    }, options)

    navItems.forEach((item) => {
      const section = document.getElementById(item.id)
      if (section) {
        sectionObserver.observe(section)
      }
    })
  } catch (e) {
    log.error('Observer init failed', { error: serializeError(e) })
  }
}

const destroySectionObserver = () => {
  if (sectionObserver) {
    sectionObserver.disconnect()
    sectionObserver = undefined
  }
}

const navigateTo = async (item) => {
  try {
    drawer.value = false
    log.info('Navigation clicked', { target: item.id })
    await nextTick()
    const section = document.getElementById(item.id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      activeSection.value = item.id
    } else {
      const available = Array.from(document.querySelectorAll('section[id]')).map((s) => s.id)
      log.warn('Section not found', { requested: item.id, available })
    }
  } catch (e) {
    log.error('navigateTo failed', { target: item.id, error: serializeError(e) })
  }
}

const isSectionActive = (id) => activeSection.value === id

const applyTheme = (val) => {
  const next = val ? 'darkTheme' : 'lightTheme'
  if (typeof theme.change === 'function') {
    theme.change(next)
  } else {
    theme.global.name.value = next
  }
  localStorage.setItem('theme', val ? 'dark' : 'light')
  log.info('Theme applied', { darkMode: val, appliedTheme: next })
}

const toggleTheme = () => {
  try {
    darkMode.value = !darkMode.value
    applyTheme(darkMode.value)
  } catch (e) {
    log.error('toggleTheme failed', { error: serializeError(e) })
  }
}

const onWindowError = (event) => {
  log.error('WindowError', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: serializeError(event.error)
  })
}

const onUnhandledRejection = (event) => {
  const reason = event?.reason
  log.error('UnhandledRejection', typeof reason === 'object' ? { reason: serializeError(reason) } : { reason })
}

onMounted(async () => {
  try {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      darkMode.value = savedTheme === 'dark'
      applyTheme(darkMode.value)
    } else {
      applyTheme(theme.global.name.value === 'darkTheme')
    }
    log.info('NavBar mounted', { savedTheme, appliedTheme: theme.global?.name?.value })
  } catch (e) {
    log.error('Theme init failed', { error: serializeError(e) })
  }

  await initSectionObserver()
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('error', onWindowError)
  window.addEventListener('unhandledrejection', onUnhandledRejection)
})

onBeforeUnmount(() => {
  destroySectionObserver()
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('error', onWindowError)
  window.removeEventListener('unhandledrejection', onUnhandledRejection)
})

watch(
  () => theme.global.name.value,
  (val) => {
    const isDark = val === 'darkTheme'
    if (darkMode.value !== isDark) {
      darkMode.value = isDark
      log.info('Theme changed externally', { theme: val })
    }
  }
)
</script>

<style scoped>
.nav-bar {
  backdrop-filter: blur(12px);
  transition: box-shadow 0.2s ease;
}

.nav-bar__content {
  min-width: 0;
}

.nav-buttons {
  gap: 4px;
}

.nav-link {
  letter-spacing: 0.03em;
  transition: color 0.2s ease, transform 0.2s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  transform: translateY(-1px);
}

.nav-link--active {
  color: var(--v-theme-teal);
  text-decoration: underline;
  text-underline-offset: 6px;
}

.brand-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
  gap: 2px;
  min-width: 0;
}

.brand-button {
  font-size: inherit;
  font-weight: inherit;
}

.brand-subtitle {
  letter-spacing: 0.04em;
}

.theme-toggle__icon {
  transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-toggle__icon,
.theme-toggle:focus-visible .theme-toggle__icon {
  transform: rotate(20deg) scale(1.05);
}

.nav-drawer {
  backdrop-filter: blur(8px);
}

.drawer-title,
.drawer-link {
  color: var(--v-theme-teal);
}

.drawer-link--active {
  color: #69F0AE !important;
  font-weight: 600;
}
</style>
