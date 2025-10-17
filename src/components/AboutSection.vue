<template>
  <section id="about" class="transition-colors duration-500">
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 font-weight-bold mb-10">About Me</h2>
        </v-col>
      </v-row>

      <v-fade-transition appear>
        <v-row align="center" justify="center" dense class="g-8">
          <v-col cols="12" md="4" class="d-flex justify-center">
            <v-hover v-slot="{ isHovering, props }">
              <div
                v-bind="props"
                class="about-avatar-wrapper transition-ease"
                :class="{ 'about-avatar-wrapper--hover': isHovering }"
                role="button"
                tabindex="0"
                @mouseenter="logAvatarHover('enter')"
                @mouseleave="logAvatarHover('leave')"
                @click="logAvatarClick"
                @keyup.enter.prevent="logAvatarClick"
                @keyup.space.prevent="logAvatarClick"
              >
                <v-avatar size="200" class="elevation-3">
                  <v-img
                    :src="profileImage"
                    alt="Cristian Jay T. Buquis"
                    cover
                    @load="handleImageLoad"
                    @error="handleImageError"
                  />
                </v-avatar>
              </div>
            </v-hover>
          </v-col>

          <v-col cols="12" md="7" lg="6" class="d-flex">
            <v-card flat class="pa-6 pa-md-8 text-body-1 about-card">
              <div class="about-text mx-auto">
                <h3 class="text-h5 text-md-h4 font-weight-bold text-center text-md-start mb-2">
                  CRISTIAN JAY T. BUQUIS
                </h3>
                <p class="text-subtitle-1 text-md-h6 text-teal-accent-4 font-weight-medium text-center text-md-start mb-4">
                  Fullstack Developer
                </p>
                <p class="text-body-1 text-medium-emphasis mb-3">
                  Full-Stack Developer with hands-on experience in Vue.js, React, Node.js, Strapi, and Laravel, seeking to leverage strong
                  problem-solving skills and a growth mindset to build scalable web applications.
                </p>
                <p class="text-body-1 text-medium-emphasis">
                  Eager to contribute to cross-functional teams, continuously learn new technologies, and drive impactful solutions that align with business goals.
                </p>
              </div>

              <v-divider class="my-6" />

              <v-row justify="center" class="g-3">
                <v-col cols="auto">
                  <v-btn
                    icon
                    variant="text"
                    color="teal"
                    :href="mailtoHref"
                    aria-label="Send email"
                    @click="handleActionClick('Email')"
                  >
                    <v-icon>mdi-email</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    icon
                    variant="text"
                    color="teal"
                    href="https://tinyurl.com/cjbuquis"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open portfolio link"
                    @click="handleActionClick('Portfolio')"
                  >
                    <v-icon>mdi-link-variant</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-container>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import profileDark from '../assets/profile-dark.png'
import profileLight from '../assets/profile-light.png'

const theme = useTheme()

const profileImage = computed(() =>
  theme.global.name.value === 'darkTheme' ? profileDark : profileLight
)

const mailtoHref = 'mailto:Cjbuquis@gmail.com'

const logAvatarHover = (state) => {
  console.log('[About] Avatar hover:', state)
}

const logAvatarClick = () => {
  console.log('[About] Avatar activated')
}

const handleImageLoad = () => {
  console.log('[About] Profile image loaded:', profileImage.value)
}

const handleImageError = (event) => {
  console.error('[About] Profile image failed to load', {
    attemptedSrc: profileImage.value,
    eventType: event?.type
  })
}

const handleActionClick = (label) => {
  console.log('[About] Action clicked:', label)
}
</script>

<style scoped>
.transition-ease {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.about-avatar-wrapper {
  border-radius: 50%;
  padding: 12px;
  display: inline-flex;
}

.about-avatar-wrapper--hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.14);
}

.about-card {
  width: 100%;
  max-width: 800px;
  margin-inline: auto;
}

.about-text {
  max-width: 720px;
}
</style>
