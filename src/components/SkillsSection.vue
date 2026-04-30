<template>
  <section id="skills" class="transition-colors duration-500">
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-10">
            Skills
          </h2>
        </v-col>
      </v-row>

      <v-row justify="center" align="stretch" dense class="g-6">
        <v-col
          v-for="group in skillGroups"
          :key="group.title"
          cols="12"
          sm="6"
          md="4"
          class="d-flex"
        >
          <v-fade-transition appear>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :elevation="isHovering ? 6 : 3"
                rounded="xl"
                class="skills-card pa-6 mx-auto text-center transition-ease"
                role="button"
                tabindex="0"
                :class="{ 'skills-card--hover': isHovering }"
                @mouseenter="logHoverEnter(group.title)"
                @mouseleave="logHoverLeave(group.title)"
                @click="logCardClick(group.title)"
                @keyup.enter.prevent="logCardClick(group.title)"
                @keyup.space.prevent="logCardClick(group.title)"
              >
                <v-card-title class="text-subtitle-1 font-weight-bold text-high-emphasis">
                  {{ group.title }}
                </v-card-title>
                <v-card-text>
                  <div class="d-flex flex-wrap justify-center">
                    <v-chip
                      v-for="skill in group.items"
                      :key="skill.name"
                      color="teal"
                      variant="flat"
                      class="ma-2 text-body-2 text-none"
                      @mouseenter.stop="logSkillHover(skill.name)"
                      @mouseleave.stop="logSkillLeave(skill.name)"
                      @click.stop="logSkillClick(skill.name)"
                    >
                      <v-icon
                        v-if="skill.icon"
                        :icon="skill.icon"
                        size="18"
                        class="me-2"
                      />
                      {{ skill.name }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
const skillGroups = [
  {
    title: 'Frontend',
    items: [
      { name: 'Vue.js', icon: 'mdi-vuejs' },
      { name: 'React', icon: 'mdi-react' },
      { name: 'HTML', icon: 'mdi-language-html5' },
      { name: 'CSS', icon: 'mdi-language-css3' },
      { name: 'JavaScript', icon: 'mdi-language-javascript' }
    ]
  },
  {
    title: 'Backend & Databases',
    items: [
      { name: 'Node.js', icon: 'mdi-nodejs' },
      { name: 'Strapi', icon: 'mdi-api' },
      { name: 'Supabase', icon: 'mdi-database' },
      { name: 'Laravel', icon: 'mdi-laravel' },
      { name: 'PostgreSQL', icon: 'mdi-database-outline' }
    ]
  },
  {
    title: 'Tools & Collaboration',
    items: [
      { name: 'Git', icon: 'mdi-git' },
      { name: 'GitHub', icon: 'mdi-github' },
      { name: 'VS Code', icon: 'mdi-microsoft-visual-studio-code' },
      { name: 'Figma', icon: 'mdi-figma' }
    ]
  }
]

const logHoverEnter = (group) => {
  console.log('[Skills] Card hover enter:', group)
}

const logHoverLeave = (group) => {
  console.log('[Skills] Card hover leave:', group)
}

const logCardClick = (group) => {
  console.log('[Skills] Card activated:', group)
}

const logSkillHover = (skill) => {
  console.log('[Skills] Chip hover enter:', skill)
}

const logSkillLeave = (skill) => {
  console.log('[Skills] Chip hover leave:', skill)
}

const logSkillClick = (skill) => {
  console.log('[Skills] Chip clicked:', skill)
}
</script>

<style scoped>
.transition-ease {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.skills-card {
  cursor: pointer;
  border: 1px solid rgba(125, 125, 125, 0.18);
  width: 100%;
  max-width: 360px;
}

.skills-card--hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.14);
  border-color: var(--v-theme-primary);
}
</style>
