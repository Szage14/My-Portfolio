<template>
  <v-app>
    <v-main>
      <NavBar />
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <!-- Added all missing sections from legacy -->
      <ExperienceSection />
      <CertificationsSection />
      <TORSection />
      <ServicesSection />
      <ReferencesSection />
      <ContactSection />
      <FooterSection />
    </v-main>
  </v-app>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HomeSection from './components/HomeSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import EducationSection from './components/EducationSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import CertificationsSection from './components/CertificationsSection.vue'
import TORSection from './components/TORSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ReferencesSection from './components/ReferencesSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>
