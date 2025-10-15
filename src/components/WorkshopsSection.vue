<template>
  <section id="experience" class="py-16">
    <v-container>
      <v-row class="justify-center mb-10">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 font-weight-bold mb-6">
            Workshop and Training
          </h2>
        </v-col>
      </v-row>

      <v-row class="max-w-5xl mx-auto" align="stretch" justify="center" dense>
        <v-col
          v-for="(item, index) in experiences"
          :key="index"
          cols="12"
          md="6"
        >
          <v-card
            class="pa-6"
            elevation="3"
            rounded="xl"
            :color="$vuetify.theme.current.dark ? 'grey-darken-4' : 'white'"
          >
            <v-card-title class="text-h6 font-weight-bold">
              {{ item.title }}
            </v-card-title>

            <v-card-subtitle
              class="text-teal-accent-4 font-weight-medium mt-1"
            >
              {{ item.organization }}
            </v-card-subtitle>

            <v-card-text class="text-body-2">
              <p v-if="item.details" class="mt-2">
                <span
                  v-if="item.link"
                  class="text-teal-accent-4 font-weight-medium"
                >
                  {{ item.details }}:
                  <a
                    :href="item.link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-teal-accent-4 text-decoration-none"
                  >
                    {{ item.link.label }}
                  </a>
                </span>
                <span v-else>{{ item.details }}</span>
              </p>

              <p v-if="item.description" class="mt-2">
                {{ item.description }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from "vue";

const experiences = ref([
  {
    title: "Intern - Project Monitoring System (PMS)",
    organization: "Caraga State University-Main Campus",
    details: "Deployed by MIS",
    link: { url: "http://gso.carsu.edu.ph", label: "gso.carsu.edu.ph" },
  },
  {
    title: "Capstone - Caraga Heritage Sites Interactive Map Portal (CTSIMP)",
    organization: "Caraga State University-Main Campus",
    details: "Source Code",
    link: {
      url: "https://github.com/Szage14/Caraga-Tourist-Spots-Interactive-Map-Portal-CTSIMP-Docs",
      label: "GitHub Repository",
    },
  },
  {
    title: "ITE Competency Appraisal - Retail Management System (RMS)",
    organization: "Caraga State University-Main Campus",
  },
  {
    title: "Coursework - Quizmo Android Application",
    organization: "App Development Course",
    description:
      "An Android application designed for reviewers taking the civil service exam, featuring practice questions and study materials.",
  },
]);
</script>

<style scoped>
h2 {
  color: var(--v-theme-primary);
  transition: color 0.3s ease;
}

.v-card {
  border: 1px solid rgba(128, 128, 128, 0.2);
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

a:hover {
  text-decoration: underline;
}
</style>
