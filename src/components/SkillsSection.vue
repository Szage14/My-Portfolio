<template>
  <v-container id="skills" class="py-16" data-aos="fade-right">

    <h2 class="text-h5 font-weight-bold mb-8 text-center">Skills</h2>

    <v-row>
      <v-col cols="12" md="4" v-for="(group, i) in skillGroups" :key="i">
        <v-card variant="outlined" class="pa-4">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">{{ group.title }}</h3>
          <v-divider class="mb-3" />
          <v-chip-group column>
            <v-chip v-for="skill in group.items" :key="skill" color="teal" text-color="white" class="ma-1">
              {{ skill }}
            </v-chip>
          </v-chip-group>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const skillGroups = [
  {
    title: 'Frontend',
    items: ['Vue.js', 'React', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Backend & Databases',
    items: ['Node.js', 'Strapi', 'Supabase', 'Laravel', 'PostgreSQL'],
  },
  {
    title: 'Tools & Collaboration',
    items: ['Git', 'GitHub', 'VS Code', 'Figma'],
  },
]
</script>
