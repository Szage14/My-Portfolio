
<template>
  <v-app-bar app color="teal-darken-3" dark elevate-on-scroll>
    <v-container class="d-flex align-center justify-space-between">
      <!-- Left: Brand / Logo -->
      <v-btn
        variant="text"
        class="text-h6 font-weight-bold text-white"
        @click="scrollTo('about')"
      >
        CRISTIAN JAY T. BUQUIS
      </v-btn>

      <!-- Right: Navigation links -->
      <v-btn-toggle
        class="d-none d-md-flex"
        variant="text"
        v-model="active"
        mandatory
      >
        <v-btn
          v-for="item in navItems"
          :key="item.id"
          variant="text"
          class="text-white"
          @click="scrollTo(item.id)"
        >
          {{ item.label }}
        </v-btn>

        <!-- Legacy version button -->
        <v-btn
  href="/legacy/index.html"
  target="_blank"
  color="amber-darken-2"
  variant="flat"
  class="ms-3 text-black font-weight-bold"
>
  Legacy
</v-btn>

<v-btn
  icon
  variant="text"
  class="ms-2"
  @click="toggleTheme"
  :title="darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
>
  <v-icon>
    {{ darkMode ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}
  </v-icon>
</v-btn>

      </v-btn-toggle>

      <!-- Mobile menu -->
      <v-menu
        v-model="menu"
        transition="scale-transition"
        location="bottom end"
      >
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="d-md-none">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in navItems"
            :key="item.id"
            @click="scrollTo(item.id)"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>

          <v-divider class="my-2" />
          <v-list-item
            href="/legacy/index.html"
            target="_blank"
            title="Legacy Portfolio"
          >
            <v-icon start color="amber-darken-2">mdi-history</v-icon>
            Legacy Version
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script setup>
// import { ref } from 'vue'
import { useTheme } from 'vuetify'
import { ref } from 'vue'

const theme = useTheme()
const darkMode = ref(false)

const toggleTheme = () => {
  darkMode.value = !darkMode.value
  theme.global.name.value = darkMode.value ? 'darkTheme' : 'lightTheme'
}


const active = ref(null)
const menu = ref(false)

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
]

const scrollTo = (id) => {
  const section = document.getElementById(id)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    menu.value = false
  }
}
</script>

<style scoped>
.v-app-bar {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
