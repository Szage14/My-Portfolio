<template>
  <v-app class="d-flex flex-column min-h-screen">
    <!-- 🧭 Navigation Bar -->
    <NavBar />

    <main id="main-content" class="flex-grow-1 bg-surface" role="main">
      <!-- 🏠 Main Portfolio Sections -->
      <v-container fluid class="pa-0">
          <HomeAboutSection />
        <MyResumeSection />
        <SkillsSection />
        <EducationSection />
        <WorkshopsSection />
        <CertificationsSection />
        <TranscriptSection />
        <ServicesSection />
        <ReferencesSection />
        <ContactSection />
      </v-container>

      <!-- 🔗 Legacy Portfolio Button -->
      <v-container class="text-center my-12">
        <v-card
          elevation="3"
          rounded="lg"
          class="pa-6 d-inline-block"
          :color="$vuetify.theme.current.dark ? 'grey-darken-4' : 'grey-lighten-4'"
        >
          <v-card-text class="text-body-1 mb-4">
            Want to revisit the original version of this portfolio?
          </v-card-text>

          <v-btn
            prepend-icon="mdi-history"
            color="teal"
            size="large"
            variant="elevated"
            :href="baseUrl + 'legacy/index.html'"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Legacy Portfolio
          </v-btn>
        </v-card>
      </v-container>

      <!-- 🔝 Back-to-Top Floating Button -->
      <v-fade-transition>
        <v-btn
          v-if="showScrollTop"
          icon="mdi-arrow-up"
          color="teal"
          elevation="6"
          class="scroll-top-btn"
          aria-label="Scroll to top"
          @click="scrollToTop"
        />
      </v-fade-transition>
    </main>

    <!-- ⚙️ Footer Section (moved outside v-main) -->
    <FooterSection />
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'

import NavBar from './components/NavBar.vue'
import HomeAboutSection from './components/HomeAboutSection.vue'
import MyResumeSection from './components/MyResumeSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import FooterSection from './components/FooterSection.vue'

// Lazy-load non-critical sections
const EducationSection = defineAsyncComponent(() => import('./components/EducationSection.vue'))
const WorkshopsSection = defineAsyncComponent(() => import('./components/WorkshopsSection.vue'))
const CertificationsSection = defineAsyncComponent(() => import('./components/CertificationsSection.vue'))
const TranscriptSection = defineAsyncComponent(() => import('./components/TranscriptSection.vue'))
const ServicesSection = defineAsyncComponent(() => import('./components/ServicesSection.vue'))
const ReferencesSection = defineAsyncComponent(() => import('./components/ReferencesSection.vue'))
const ContactSection = defineAsyncComponent(() => import('./components/ContactSection.vue'))

const baseUrl = import.meta.env.BASE_URL

// 🔝 Back-to-Top button visibility logic
const showScrollTop = ref(false)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Keep page title consistent in the SPA
  document.title = 'Cristian Jay T. Buquis — Portfolio'
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

.v-application {
  font-family: 'Inter', 'Roboto', sans-serif;
  line-height: 1.6;
}

.v-main {
  background-color: var(--v-theme-background);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 🔝 Back-to-Top Floating Button */
.scroll-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1200;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.scroll-top-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* 🧾 General card hover for consistency */
.v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}
</style>
