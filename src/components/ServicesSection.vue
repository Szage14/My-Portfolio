<template>
  <v-container id="services" class="py-16">
    <h2 class="text-h4 font-weight-bold mb-8 text-center text-teal-darken-2">Services Offered</h2>

    <!-- Complete services data from legacy -->
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="(service, i) in services" :key="i">
        <v-card variant="outlined" class="pa-6 service-card" elevation="2" height="100%">
          <div class="text-h3 mb-4">{{ service.icon }}</div>
          <h3 class="text-h6 font-weight-bold mb-3">{{ service.title }}</h3>
          <p class="text-body-2 text-grey-darken-2 mb-2">{{ service.description }}</p>
          <p v-if="service.note" class="text-caption text-grey-darken-1">
            <strong>{{ service.noteLabel }}:</strong> {{ service.noteText }}
            <a v-if="service.noteLink" :href="service.noteLink" target="_blank" class="text-teal-darken-2 text-decoration-none">
              {{ service.noteLinkText }}
            </a>
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const services = [
  {
    icon: '🌐',
    title: 'Personal Portfolio Website',
    description: 'Custom portfolio websites like this one, showcasing your skills, experience, and projects professionally.'
  },
  {
    icon: '📄',
    title: 'Resume Creation',
    description: 'Professional resume design and creation tailored to your industry and career goals.',
    note: true,
    noteLabel: 'Free Resource',
    noteText: 'Build your resume for free at ',
    noteLink: 'https://makefreecv.com/',
    noteLinkText: 'makefreecv.com'
  },
  {
    icon: '🔍',
    title: 'Basic OSINT Services',
    description: 'Open Source Intelligence gathering covering personal details and social media analysis for legitimate purposes.'
  },
  {
    icon: '💼',
    title: 'MS Office Solutions',
    description: 'Microsoft Office installation and setup services with proper licensing guidance.'
  },
  {
    icon: '⬇️',
    title: 'Internet Download Manager',
    description: 'IDM installation and setup for enhanced download management and lifetime usage.'
  },
  {
    icon: '🤖',
    title: 'AI Image Editing',
    description: 'AI-powered image editing and enhancement using advanced prompting techniques.'
  },
  {
    icon: '⚙️',
    title: 'Backend Development',
    description: 'Server-side application development using Node.js, Laravel, and database management.'
  },
  {
    icon: '🎨',
    title: 'Frontend Development',
    description: 'User interface development using React, Vue.js, and modern web technologies.'
  },
  {
    icon: '📊',
    title: 'Data Analytics & Visualization',
    description: 'Data analysis and visualization using Jupyter notebooks and various analytical tools.'
  },
  {
    icon: '📋',
    title: 'Document Merging',
    description: 'Automated document merging and generation using Autocrat and other tools.'
  },
  {
    icon: '🎬',
    title: 'Video & Photo Editing',
    description: 'Professional video and photo editing services for personal and business needs.'
  },
  {
    icon: '📝',
    title: 'Documentation Services',
    description: 'Technical writing, documentation creation, and content development services.'
  },
  {
    icon: '🎨',
    title: 'Canva Portfolio Builder',
    description: 'Creative portfolio design and development using Canva for visual impact.'
  },
  {
    icon: '🌐',
    title: 'Google Sites Portfolio',
    description: 'Simple and effective portfolio websites using Google Sites platform.'
  }
]
</script>

<style scoped>
.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(13, 148, 136, 0.2) !important;
}
</style>
