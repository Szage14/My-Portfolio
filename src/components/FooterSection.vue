<template>
  <div>
    <v-divider class="footer-divider" />
    <v-footer
      :color="$vuetify.theme.current.dark ? 'grey-darken-4' : 'grey-lighten-4'"
      class="footer-shell text-center text-body-2 transition-colors duration-500"
      :elevation="0"
      padless
    >
      <div class="footer-content w-100 d-flex flex-column align-center justify-center py-6">
        <p class="mb-4 text-body-2 text-medium-emphasis">
          © {{ currentYear }} Cristian Jay T. Buquis. All Rights Reserved.
        </p>
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
      </div>
    </v-footer>
  </div>
</template>

<script setup>
const currentYear = new Date().getFullYear()

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
  width: 100%;
  min-height: 12vh;
}

.footer-content {
  width: 100%;
}

.social-btn {
  transition: transform 0.2s ease, color 0.2s ease;
  color: var(--v-theme-primary);
}

.social-btn:hover {
  transform: scale(1.1);
}
</style>
