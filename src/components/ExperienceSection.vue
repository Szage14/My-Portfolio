<template>
  <v-container id="experience" class="py-16">
    <h2 class="text-h4 font-weight-bold mb-8 text-center text-teal-darken-2">Workshop and Training</h2>

    <!-- Complete experience data from legacy -->
    <v-row>
      <v-col cols="12" md="6" v-for="(exp, i) in experiences" :key="i">
        <v-card variant="outlined" class="pa-6 experience-card" elevation="2" height="100%">
          <h3 class="text-h6 font-weight-bold mb-2">{{ exp.title }}</h3>
          <p class="text-body-1 text-teal-accent-4 mb-2">{{ exp.organization }}</p>
          <p v-if="exp.link" class="text-body-2 text-grey-darken-1 mb-2">
            {{ exp.linkLabel }}: 
            <a :href="exp.link" target="_blank" class="text-teal-darken-2 text-decoration-none">
              {{ exp.linkText }}
            </a>
          </p>
          <p v-if="exp.description" class="text-body-2 text-grey-darken-2">
            {{ exp.description }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const experiences = [
  {
    title: 'Intern - Project Monitoring System (PMS)',
    organization: 'Caraga State University-Main Campus',
    linkLabel: 'Deployed by MIS',
    link: 'http://gso.carsu.edu.ph',
    linkText: 'gso.carsu.edu.ph'
  },
  {
    title: 'Capstone - Caraga Heritage Sites Interactive Map Portal (CTSIMP)',
    organization: 'Caraga State University-Main Campus',
    linkLabel: 'Source Code',
    link: 'https://github.com/Szage14/Caraga-Tourist-Spots-Interactive-Map-Portal-CTSIMP-Docs',
    linkText: 'GitHub Repository'
  },
  {
    title: 'ITE Competency Appraisal - Retail Management System (RMS)',
    organization: 'Caraga State University-Main Campus'
  },
  {
    title: 'Coursework - Quizmo Android Application',
    organization: 'App Development Course',
    description: 'An Android application designed for reviewers taking the civil service exam, featuring practice questions and study materials.'
  }
]
</script>

<style scoped>
.experience-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(13, 148, 136, 0.2) !important;
}
</style>
