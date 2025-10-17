<template>
  <section id="services" class="surface-gradient-light transition-colors duration-500">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 text-md-h3 font-weight-bold text-center mb-10">
            Services Offered
          </h2>
        </v-col>
      </v-row>

      <v-row class="g-6">
        <v-col
          v-for="service in services"
          :key="service.title"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-scale-transition appear>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :elevation="isHovering ? 14 : 6"
                :class="[
                  'services-card',
                  'glass-panel',
                  'transition-ease',
                  'pa-6',
                  'text-center',
                  isHovering ? 'services-card--hover' : ''
                ]"
                variant="flat"
                rounded="xl"
                role="button"
                tabindex="0"
                :aria-label="`Learn more about ${service.title}`"
                @mouseenter="logHoverEnter(service.title)"
                @mouseleave="logHoverLeave(service.title)"
                @click="handleCardActivate(service, 'click')"
                @keyup.enter="handleCardActivate(service, 'keyboard-enter')"
                @keyup.space.prevent="handleCardActivate(service, 'keyboard-space')"
              >
                <v-card-item>
                  <v-avatar
                    size="64"
                    variant="tonal"
                    color="primary"
                    class="mx-auto mb-4 services-avatar"
                  >
                    <span aria-hidden="true" class="text-h5">{{ service.icon }}</span>
                  </v-avatar>
                  <v-card-title class="text-h6 font-weight-semibold text-high-emphasis">
                    {{ service.title }}
                  </v-card-title>
                </v-card-item>

                <v-card-text class="text-body-2 text-medium-emphasis">
                  <p class="mb-3">
                    {{ service.description }}
                  </p>
                  <div v-if="service.note" class="font-weight-medium">
                    <strong>{{ service.note.label }}</strong>
                    <span> {{ service.note.text }} </span>
                    <a
                      :href="service.note.linkHref"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="services-link"
                    >
                      {{ service.note.linkText }}
                    </a>
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
const services = [
  {
    icon: '🌐',
    title: 'Personal Portfolio Website',
    description:
      'Custom portfolio websites like this one, showcasing your skills, experience, and projects professionally.'
  },
  {
    icon: '📄',
    title: 'Resume Creation',
    description:
      'Professional resume design and creation tailored to your industry and career goals.',
    note: {
      label: 'Free Resource:',
      text: 'Build your resume for free at',
      linkText: 'makefreecv.com',
      linkHref: 'https://makefreecv.com/'
    }
  },
  {
    icon: '🔍',
    title: 'Basic OSINT Services',
    description:
      'Open Source Intelligence gathering covering personal details and social media analysis for legitimate purposes.'
  },
  {
    icon: '💼',
    title: 'MS Office Solutions',
    description:
      'Microsoft Office installation and setup services with proper licensing guidance.'
  },
  {
    icon: '⬇️',
    title: 'Internet Download Manager',
    description:
      'IDM installation and setup for enhanced download management and lifetime usage.'
  },
  {
    icon: '🤖',
    title: 'AI Image Editing',
    description:
      'AI-powered image editing and enhancement using advanced prompting techniques.'
  },
  {
    icon: '⚙️',
    title: 'Backend Development',
    description:
      'Server-side application development using Node.js, Laravel, and database management.'
  },
  {
    icon: '🎨',
    title: 'Frontend Development',
    description:
      'User interface development using React, Vue.js, and modern web technologies.'
  },
  {
    icon: '📊',
    title: 'Data Analytics & Visualization',
    description:
      'Data analysis and visualization using Jupyter notebooks and various analytical tools.'
  },
  {
    icon: '📋',
    title: 'Document Merging',
    description:
      'Automated document merging and generation using Autocrat and other tools.'
  },
  {
    icon: '🎬',
    title: 'Video & Photo Editing',
    description:
      'Professional video and photo editing services for personal and business needs.'
  },
  {
    icon: '📝',
    title: 'Documentation Services',
    description:
      'Technical writing, documentation creation, and content development services.'
  },
  {
    icon: '🎨',
    title: 'Canva Portfolio Builder',
    description:
      'Creative portfolio design and development using Canva for visual impact.'
  },
  {
    icon: '🌐',
    title: 'Google Sites Portfolio',
    description:
      'Simple and effective portfolio websites using Google Sites platform.'
  }
]

const logHoverEnter = (title) => {
  console.log('[Services] Hover enter:', title)
}

const logHoverLeave = (title) => {
  console.log('[Services] Hover leave:', title)
}

const handleCardActivate = (service, source) => {
  console.log('[Services] Card activated:', service.title, `via ${source}`)
}
</script>

<style scoped>
.transition-ease {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.services-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.services-card--hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 28px 56px rgba(15, 23, 42, 0.25);
}

.v-theme--dark .services-card--hover {
  box-shadow: 0 28px 56px rgba(5, 9, 20, 0.5);
}

.services-avatar {
  font-size: 1.75rem;
}

.services-link {
  color: var(--v-theme-primary);
  text-decoration: none;
}

.services-link:hover {
  text-decoration: underline;
}
</style>
