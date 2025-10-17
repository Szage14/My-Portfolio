<template>
  <section id="experience" class="transition-colors duration-500">
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-10">
            Workshop and Training
          </h2>
        </v-col>
      </v-row>

      <v-row justify="center" align="stretch" dense class="g-6">
        <v-col
          v-for="experience in experiences"
          :key="experience.title"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
          class="d-flex"
        >
          <v-scale-transition appear>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :elevation="isHovering ? 5 : 3"
                rounded="xl"
                class="workshop-card pa-6 mx-auto text-center transition-ease"
                role="button"
                tabindex="0"
                :class="{ 'workshop-card--hover': isHovering }"
                @mouseenter="logHoverEnter(experience.title)"
                @mouseleave="logHoverLeave(experience.title)"
                @click="logCardClick(experience.title)"
                @keyup.enter.prevent="logCardClick(experience.title)"
                @keyup.space.prevent="logCardClick(experience.title)"
              >
                <v-card-title class="text-h6 font-weight-bold text-high-emphasis">
                  {{ experience.title }}
                </v-card-title>
                <v-card-subtitle class="text-teal-accent-4 font-weight-medium mb-3">
                  {{ experience.organization }}
                </v-card-subtitle>

                <v-card-text class="text-body-2 text-medium-emphasis">
                  <p v-if="experience.details" class="mb-3">
                    {{ experience.details }}
                  </p>
                  <p v-if="experience.description" class="mb-3">
                    {{ experience.description }}
                  </p>
                  <div v-if="experience.link" class="d-flex justify-center">
                    <v-btn
                      variant="text"
                      color="teal"
                      prepend-icon="mdi-link"
                      :href="experience.link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-none"
                      @click.stop="handleLinkClick(experience.title, experience.link.label)"
                    >
                      {{ experience.link.label }}
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-scale-transition>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
const experiences = [
  {
    title: 'Intern - Project Monitoring System (PMS)',
    organization: 'Caraga State University-Main Campus',
    details: 'Deployed by MIS',
    link: { url: 'http://gso.carsu.edu.ph', label: 'gso.carsu.edu.ph' }
  },
  {
    title: 'Capstone - Caraga Heritage Sites Interactive Map Portal (CTSIMP)',
    organization: 'Caraga State University-Main Campus',
    details: 'Source Code available for review',
    link: {
      url: 'https://github.com/Szage14/Caraga-Tourist-Spots-Interactive-Map-Portal-CTSIMP-Docs',
      label: 'GitHub Repository'
    }
  },
  {
    title: 'ITE Competency Appraisal - Retail Management System (RMS)',
    organization: 'Caraga State University-Main Campus'
  },
  {
    title: 'Coursework - Quizmo Android Application',
    organization: 'App Development Course',
    description:
      'An Android application designed for reviewers taking the civil service exam, featuring practice questions and study materials.'
  }
]

const logHoverEnter = (title) => {
  console.log('[Workshops] Hover enter:', title)
}

const logHoverLeave = (title) => {
  console.log('[Workshops] Hover leave:', title)
}

const logCardClick = (title) => {
  console.log('[Workshops] Card activated:', title)
}

const handleLinkClick = (title, label) => {
  console.log('[Workshops] Link clicked:', title, label)
}
</script>

<style scoped>
.transition-ease {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.workshop-card {
  cursor: pointer;
  border: 1px solid rgba(125, 125, 125, 0.18);
  width: 100%;
}

.workshop-card--hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.14);
  border-color: var(--v-theme-primary);
}
</style>
