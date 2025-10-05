<template>
  <v-container id="skills" class="py-16">
    <h2 class="text-h4 font-weight-bold mb-8 text-center text-teal-darken-2">Skills</h2>

    <!-- Complete skills data from legacy with expandable definitions -->
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="(group, i) in skillGroups" :key="i">
        <v-card variant="outlined" class="pa-4 skill-card" elevation="2">
          <div class="d-flex align-center mb-3">
            <span class="text-h4 mr-3">{{ group.icon }}</span>
            <h3 class="text-h6 font-weight-bold">{{ group.title }}</h3>
          </div>
          <v-divider class="mb-3" />
          
          <v-list density="compact">
            <v-list-item
              v-for="skill in group.items"
              :key="skill.name"
              class="skill-item px-0"
              @click="toggleSkill(skill.name)"
            >
              <template #prepend>
                <v-icon size="small" color="teal">
                  {{ expandedSkills.includes(skill.name) ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
                </v-icon>
              </template>
              
              <v-list-item-title class="font-weight-medium">
                {{ skill.name }}
              </v-list-item-title>
              
              <v-expand-transition>
                <div v-show="expandedSkills.includes(skill.name)" class="mt-2 ml-8 text-caption text-grey-darken-1">
                  {{ skill.definition }}
                </div>
              </v-expand-transition>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const expandedSkills = ref([])

const toggleSkill = (skillName) => {
  const index = expandedSkills.value.indexOf(skillName)
  if (index > -1) {
    expandedSkills.value.splice(index, 1)
  } else {
    expandedSkills.value.push(skillName)
  }
}

const skillGroups = [
  {
    title: 'Web Development',
    icon: '💻',
    items: [
      { name: 'Vue.js', definition: 'A progressive JavaScript framework for building user interfaces.' },
      { name: 'React', definition: 'A JavaScript library for building user interfaces, maintained by Facebook and a community of individual developers and companies.' },
      { name: 'Node.js', definition: "A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side applications." },
      { name: 'Strapi', definition: 'An open-source headless CMS (Content Management System) that allows developers to build APIs quickly.' },
      { name: 'Supabase', definition: 'An open-source Firebase alternative that provides a backend-as-a-service with real-time database, authentication, and storage.' },
      { name: 'Laravel', definition: 'A free, open-source PHP web framework, intended for the development of web applications following the model–view–controller (MVC) architectural pattern.' },
      { name: 'HTML', definition: 'HyperText Markup Language, the standard markup language for documents designed to be displayed in a web browser.' },
      { name: 'CSS', definition: 'Cascading Style Sheets, used for describing the presentation of a document written in HTML.' },
      { name: 'JavaScript', definition: 'A high-level, often just-in-time compiled language that conforms to the ECMAScript standard.' },
    ]
  },
  {
    title: 'Version Control & Collaboration',
    icon: '🤝',
    items: [
      { name: 'Git', definition: 'A distributed version control system for tracking changes in source code during software development.' },
      { name: 'GitHub', definition: 'A web-based platform for version control and collaboration, built around Git.' },
      { name: 'Document Merging: Autocrat', definition: 'A tool used for merging data into documents, often for generating personalized documents from templates.' },
    ]
  },
  {
    title: 'Data & Database Management',
    icon: '📊',
    items: [
      { name: 'Data Analysis: Jupyter', definition: 'An open-source web application used for creating and sharing documents that contain live code, equations, visualizations, and narrative text.' },
      { name: 'Data entry, analysis, and reporting', definition: 'The process of inputting, examining, and presenting data to derive insights and inform decisions.' },
    ]
  },
  {
    title: 'Core Competencies',
    icon: '⭐',
    items: [
      { name: 'Problem-Solving', definition: 'Ability to identify, analyze, and solve complex problems effectively.' },
      { name: 'Communication Skills', definition: 'Proficiency in conveying information clearly and interacting effectively with others.' },
      { name: 'Quick Learning', definition: 'Capacity to rapidly acquire new knowledge and adjust to changing circumstances.' },
      { name: 'Team Collaboration', definition: 'Ability to work effectively within a team and demonstrate qualities of leadership.' },
      { name: 'Attention to Detail', definition: 'Thoroughness in work and commitment to producing high-quality outcomes.' },
      { name: 'Time Management', definition: 'Efficiency in planning and controlling time to accomplish specific goals.' },
    ]
  },
  {
    title: 'Computer Proficiency',
    icon: '🖥️',
    items: [
      { name: 'Microsoft Office Suite', definition: 'Proficiency in widely used office productivity software (Word, Excel, PowerPoint).' },
      { name: 'OSINT', definition: 'The practice of collecting and analyzing publicly available information from various sources for intelligence purposes.' },
    ]
  },
  {
    title: 'Languages',
    icon: '🗣️',
    items: [
      { name: 'Filipino (Native)', definition: 'Native proficiency in the Filipino language.' },
      { name: 'English (Fluent)', definition: 'Fluent proficiency in the English language.' },
      { name: 'Bisaya (Native)', definition: 'Native proficiency in the Bisaya language.' },
    ]
  },
]
</script>

<style scoped>
.skill-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(13, 148, 136, 0.2) !important;
}

.skill-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 8px;
}

.skill-item:hover {
  background-color: rgba(13, 148, 136, 0.05);
}
</style>
