<template>
  <v-container id="about" class="py-16">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" class="text-center">
        <v-avatar size="200" class="profile-avatar">
          <v-img :src="currentProfile" alt="Cristian Jay T. Buquis" />
        </v-avatar>
      </v-col>

      <v-col cols="12" md="7">
        <!-- Updated content to match legacy exactly -->
        <h2 class="text-h4 font-weight-bold mb-4 text-teal-darken-2">
          CRISTIAN JAY T. BUQUIS
        </h2>
        <p class="text-h6 text-teal-accent-4 font-weight-semibold mb-4">
          Fullstack Developer
        </p>
        <p class="text-body-1 mb-4 text-grey-darken-1 leading-relaxed">
          Full-Stack Developer with hands-on experience in Vue.js, React, Node.js, Strapi, and Laravel, seeking to leverage strong
          problem-solving skills and a growth mindset to build scalable web applications. Eager to contribute to cross-functional
          teams, continuously learn new technologies, and drive impactful solutions that align with business goals.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const currentProfile = computed(() =>
  theme.global.name.value === 'darkTheme'
    ? 'https://www.dropbox.com/scl/fi/zfr4kcmpxga2b0dnu63an/dark.png?rlkey=x89co49dnfdzxi2zbepwk6v7z&st=67xvm54h&dl=1'
    : 'https://www.dropbox.com/scl/fi/oy0abnmutgkgqhfkwz5jp/light.png?rlkey=j5x1j8g6awkolnkhdxvvv83nw&st=2c6lbz44&dl=1'
)
</script>

<style scoped>
.profile-avatar {
  border: 4px solid #14b8a6;
  box-shadow: 0 20px 40px rgba(13, 148, 136, 0.3);
  transition: transform 0.3s ease;
}

.profile-avatar:hover {
  transform: scale(1.05);
}

.leading-relaxed {
  line-height: 1.75;
}
</style>
