<template>
  <v-app>
    <v-main>
      <NavBar />
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <WorkshopsSection />

      <v-container class="text-center py-10">
        <v-btn color="teal" :href="baseUrl + 'legacy/index.html'" target="_blank">
          View Legacy Version
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HomeSection from './components/HomeSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import EducationSection from './components/EducationSection.vue'
import WorkshopsSection from './components/WorkshopsSection.vue'
const baseUrl = import.meta.env.BASE_URL
</script>
