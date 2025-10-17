<template>
  <v-footer
    :color="$vuetify.theme.current.dark ? 'grey-darken-4' : 'grey-lighten-4'"
    class="footer-10vh text-center transition-colors duration-500"
  >
    <v-container class="d-flex align-center justify-center h-100 pa-4">
      <div
        ref="footerEl"
        class="footer-content mx-auto max-w-3xl"
        :class="{ 'is-visible': visible }"
      >
        <div class="d-flex flex-column align-center">
          <h2 class="text-h6 font-weight-bold mb-1">Let’s Connect</h2>
          <p class="mb-3 text-body-2 text-medium-emphasis d-none d-sm-block">
            Feel free to reach out for collaboration, project inquiries, or just to say hi!
          </p>

          <div class="d-flex justify-center gap-3 mb-1">
            <v-btn
              icon="mdi-github"
              variant="flat"
              size="default"
              :href="'https://github.com/Szage14'"
              target="_blank"
              rel="noopener noreferrer"
              :color="$vuetify.theme.current.dark ? 'teal-lighten-2' : 'teal-darken-2'"
            />
            <v-btn
              icon="mdi-facebook-messenger"
              variant="flat"
              size="default"
              :href="messengerUrl"
              target="_blank"
              rel="noopener noreferrer"
              :color="$vuetify.theme.current.dark ? 'teal-lighten-2' : 'teal-darken-2'"
            />
            <v-btn
              icon="mdi-email"
              variant="flat"
              size="default"
              :href="'mailto:cjbuquis@gmail.com'"
              rel="noopener noreferrer"
              :color="$vuetify.theme.current.dark ? 'teal-lighten-2' : 'teal-darken-2'"
            />
          </div>

          <div class="d-flex justify-center mb-1">
            <v-btn
              variant="text"
              size="small"
              prepend-icon="mdi-phone"
              :href="'tel:09472756345'"
              class="text-none"
            >
              09472756345
            </v-btn>
          </div>

          <p class="text-caption text-medium-emphasis mb-0">
            © {{ currentYear }} <strong>Cristian Jay T. Buquis</strong>.
          </p>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentYear = new Date().getFullYear()
const messengerUrl = 'https://m.me/YOUR_USERNAME' // replace with your Messenger username

const visible = ref(false)
const footerEl = ref(null)
let observer

onMounted(() => {
  if (!footerEl.value) return
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.05 }
  )
  observer.observe(footerEl.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.footer-10vh {
  height: 10vh;
  min-height: 10vh;
  max-height: 10vh;
}

.footer-content {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.footer-content.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
