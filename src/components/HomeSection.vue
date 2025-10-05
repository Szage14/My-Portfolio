<template>
  <v-container
    id="home"
    class="fill-height d-flex flex-column align-center justify-center text-center"
  >
    <v-avatar size="160" class="mb-6">
      <v-img src="/assets/profile-light.png" alt="Cristian Jay Buquis" />
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
const scrollTo = (id) => {
  const section = document.getElementById(id)
  if (section) section.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
#home {
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    #004d40 0%,
    #00695c 50%,
    #004d40 100%
  );
  color: white;
}
</style>
