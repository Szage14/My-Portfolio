<template>
  <section id="education" class="transition-colors duration-500">
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-10">
            Education
          </h2>
        </v-col>
      </v-row>

      <v-fade-transition appear>
        <v-row justify="center" align="stretch" dense class="g-6">
          <v-col
            v-for="item in education"
            :key="item.degree"
            cols="12"
            sm="6"
            md="4"
            class="d-flex"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :elevation="isHovering ? 6 : 3"
                rounded="xl"
                class="education-card pa-6 text-center mx-auto transition-ease"
                role="button"
                tabindex="0"
                :class="{ 'education-card--hover': isHovering }"
                @mouseenter="logHoverEnter(item.degree)"
                @mouseleave="logHoverLeave(item.degree)"
                @click="logCardClick(item.degree)"
                @keyup.enter.prevent="logCardClick(item.degree)"
                @keyup.space.prevent="logCardClick(item.degree)"
              >
                <v-card-item class="d-flex flex-column align-center mb-3">
                  <v-avatar size="64" variant="tonal" color="teal">
                    <v-icon icon="mdi-school" size="32" />
                  </v-avatar>
                </v-card-item>
                <v-card-title class="text-subtitle-1 font-weight-bold text-high-emphasis education-card__title">
                  {{ item.degree }}
                </v-card-title>
                <v-card-subtitle class="text-body-2 text-medium-emphasis">
                  {{ item.school }}
                </v-card-subtitle>
                <v-card-subtitle class="text-body-2 text-medium-emphasis mb-3">
                  {{ item.years }}
                </v-card-subtitle>
                <v-card-text class="text-body-2 text-medium-emphasis">
                  {{ item.summary }}
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-container>
  </section>
</template>

<script setup>
const education = [
  {
    degree: 'Bachelor of Science in Information Systems',
    school: 'Caraga State University-Main Campus',
    years: '2021 – 2025',
    summary:
      'A blend of technical depth, business understanding, and applied practice equips students with the skills for a dynamic career at the intersection of technology and management.'
  }
]

const logHoverEnter = (degree) => {
  console.log('[Education] Hover enter:', degree)
}

const logHoverLeave = (degree) => {
  console.log('[Education] Hover leave:', degree)
}

const logCardClick = (degree) => {
  console.log('[Education] Card activated:', degree)
}
</script>

<style scoped>
.transition-ease {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.education-card {
  cursor: pointer;
  border: 1px solid rgba(125, 125, 125, 0.18);
  width: 100%;
}

.education-card--hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.14);
  border-color: var(--v-theme-primary);
}

.education-card__title {
  white-space: normal;
}
</style>
