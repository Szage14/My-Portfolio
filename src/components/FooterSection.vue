<template>
  <div>
    <v-divider class="footer-divider" />
    <v-footer
      :color="$vuetify.theme.current.dark ? 'grey-darken-4' : 'grey-lighten-4'"
      class="footer-shell text-center text-body-2 d-flex flex-column transition-colors duration-500"
      :elevation="0"
      padless
    >
      <v-container class="h-100 d-flex flex-column align-center justify-center py-4">
        <v-row class="w-100 ma-0" justify="center">
          <v-col cols="12" class="py-1">
            <p class="mb-3 text-center text-body-2 text-medium-emphasis">
              © 2025 Cristian Buquis. All Rights Reserved.
            </p>
          </v-col>
          <v-col cols="12" class="py-0">
            <div class="d-flex justify-center align-center gap-2">
              <v-btn
                v-for="link in socialLinks"
                :key="link.label"
                variant="text"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn"
                :aria-label="link.label"
                @click="logSocialClick(link.label)"
              >
                <v-icon :icon="link.icon" size="26" />
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script setup>
const socialLinks = [
  {
    label: 'GitHub',
    icon: 'mdi-github',
    href: 'https://github.com/Szage14'
  },
  {
    label: 'LinkedIn',
    icon: 'mdi-linkedin',
    href: 'https://www.linkedin.com/in/cjbuquis'
  },
  {
    label: 'Facebook',
    icon: 'mdi-facebook',
    href: 'https://www.facebook.com/cjbuquis'
  }
]

const logSocialClick = (label) => {
  console.log('[Footer] Social icon clicked:', label)
}
</script>

<style scoped>
.footer-divider {
  opacity: 0.25;
}

.footer-shell {
  min-height: 8vh;
  max-height: 10vh;
}

.social-btn {
  transition: transform 0.2s ease, color 0.2s ease;
  color: var(--v-theme-primary);
}

.social-btn:hover {
  transform: scale(1.1);
}
</style>
