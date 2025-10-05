<template>
  <v-container
    id="home"
    class="fill-height d-flex flex-column align-center justify-center text-center"
  >
    <v-avatar size="160" class="mb-6">
  <v-img :src="currentProfile" alt="Cristian Jay Buquis" />
</v-avatar>

    <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">
      Cristian Jay T. Buquis
    </h1>

    <p class="text-subtitle-1 text-grey-lighten-2 mb-6">
      BS Information Systems Graduate | Full-Stack Developer | Tech Enthusiast
    </p>

    <v-btn
      color="teal"
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
    ? '/assets/profile-dark.png'
    : '/assets/profile-light.png'
)

const scrollTo = (id) => {
  const section = document.getElementById(id)
  if (section) section.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
#home {
  min-height: 100vh;
  background: linear-gradient(270deg, #004d40, #009688, #00695c);
  background-size: 600% 600%;
  animation: gradientShift 20s ease infinite;
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

</style>
