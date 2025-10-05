<template>
  <v-app>
    <v-main>
      <NavBar />
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <EducationSection />

      <v-container class="text-center py-10">
        <v-btn color="teal" href="/legacy/index.html" target="_blank">
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
</script>
