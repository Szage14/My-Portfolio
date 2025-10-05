<template>
  <v-container
    id="home"
    class="fill-height d-flex flex-column align-center justify-center text-center"
  >
    <!-- Dynamic profile image based on theme -->
    <v-avatar size="200" class="mb-6 profile-avatar">
      <v-img :src="currentProfile" alt="Cristian Jay T. Buquis" />
    </v-avatar>

    <!-- Updated to match legacy content exactly -->
    <h1 class="text-h3 text-md-h2 font-weight-bold mb-2 text-white">
      CRISTIAN JAY T. BUQUIS
    </h1>

    <p class="text-h5 text-teal-lighten-2 mb-6 font-weight-medium">
      Fullstack Developer
    </p>

    <v-btn
      color="teal-lighten-1"
      size="large"
      variant="flat"
      @click="scrollTo('about')"
      class="text-white"
    >
      Explore My Portfolio
      <v-icon end>mdi-arrow-down</v-icon>
    </v-btn>
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

const scrollTo = (id) => {
  const section = document.getElementById(id)
  if (section) section.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
#home {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
  color: white;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.profile-avatar {
  border: 4px solid #14b8a6;
  box-shadow: 0 20px 40px rgba(13, 148, 136, 0.4);
  transition: transform 0.3s ease;
}

.profile-avatar:hover {
  transform: scale(1.05);
}
</style>
