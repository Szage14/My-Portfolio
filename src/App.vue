<template>
  <v-app class="d-flex flex-column min-h-screen">
    <!-- 🧭 Navigation Bar -->
    <NavBar />

    <v-main class="flex-grow-1 bg-surface">
      <!-- 🏠 Main Portfolio Sections -->
      <v-container fluid class="pa-0">
          <HomeAboutSection />
        <SkillsSection />
        <EducationSection />
        <WorkshopsSection />
        <CertificationsSection />
        <TranscriptSection />
        <MyResumeSection />
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
          @click="scrollToTop"
        />
      </v-fade-transition>
    </v-main>

    <!-- ⚙️ Footer Section (moved outside v-main) -->
    <FooterSection />
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import NavBar from './components/NavBar.vue'
import HomeAboutSection from './components/HomeAboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import EducationSection from './components/EducationSection.vue'
import WorkshopsSection from './components/WorkshopsSection.vue'
import CertificationsSection from './components/CertificationsSection.vue'
import TranscriptSection from './components/TranscriptSection.vue'
import MyResumeSection from './components/MyResumeSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ReferencesSection from './components/ReferencesSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

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
