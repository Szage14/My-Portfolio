<template>
  <v-app>
    <v-main>
      <v-container class="py-10 text-center">
        <h1 class="text-h4 font-weight-bold mb-4">Cristian Jay T. Buquis Portfolio (Vue + Vuetify)</h1>
        <p class="mb-6">
          Welcome to my new portfolio powered by Vue 3 and Vuetify.
        </p>

        <v-btn color="teal" class="ma-2" href="/legacy/index.html" target="_blank">
          View Legacy Version
        </v-btn>

        <v-btn color="primary" class="ma-2" @click="showAbout = !showAbout">
          {{ showAbout ? 'Hide' : 'Show' }} About Section
        </v-btn>

        <v-expand-transition>
          <v-card v-if="showAbout" class="mx-auto mt-6 pa-4" max-width="800">
            <h2 class="text-h5 font-weight-bold mb-2">About Me</h2>
            <p>
              I am a Bachelor of Science in Information Systems graduate passionate about web development,
              backend integration, and modern tech stacks like Vue, Strapi, and Laravel.
            </p>
          </v-card>
        </v-expand-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
const showAbout = ref(false)
</script>
