<template>
  <section id="certifications" class="py-16 md:py-24 bg-white transition-colors duration-500">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-8 text-center text-md-start">
            Certifications
          </h2>
        </v-col>
      </v-row>

      <v-row class="g-4">
        <v-col
          v-for="cert in certificates"
          :key="cert.filename"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :elevation="isHovering ? 12 : 4"
              :class="['mx-auto', 'd-flex', 'flex-column', 'transition-ease', isHovering ? 'scale-102' : 'scale-100']"
              variant="outlined"
              rounded="xl"
              role="button"
              :aria-label="`Open ${cert.label} certificate preview`"
              tabindex="0"
              @click="openDialog(cert)"
              @keyup.enter.space="openDialog(cert)"
            >
              <v-img
                :src="cert.imgSrc"
                :alt="cert.alt"
                height="200"
                cover
                rounded="t-xl"
                @load="logImageLoad(cert.label)"
              />

              <v-card-item>
                <v-card-title class="text-subtitle-1 font-weight-semibold">{{ cert.label }}</v-card-title>
                <v-card-subtitle class="text-caption text-medium-emphasis">{{ cert.alt }}</v-card-subtitle>
              </v-card-item>

              <v-spacer />

              <v-card-actions class="mt-auto pt-0">
                <v-btn
                  :href="cert.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  prepend-icon="mdi-open-in-new"
                  variant="tonal"
                  color="teal"
                  class="text-none"
                  :aria-label="`Open ${cert.label} certificate in new tab`"
                >
                  View Certificate
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-dialog
        v-model="dialog"
        max-width="720"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card rounded="xl">
          <v-card-title class="text-h6 font-weight-semibold">
            {{ selectedCertificate?.label }}
          </v-card-title>
          <v-card-text>
            <v-img
              v-if="selectedCertificate"
              :src="selectedCertificate.imgSrc"
              :alt="selectedCertificate.alt"
              height="420"
              cover
              rounded="lg"
              @load="logImageLoad(`${selectedCertificate.label} (dialog)`)"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              variant="text"
              color="teal"
              class="text-none"
              @click="closeDialog"
              aria-label="Close certificate preview"
            >
              Close
            </v-btn>
            <v-btn
              v-if="selectedCertificate"
              :href="selectedCertificate.href"
              target="_blank"
              rel="noopener noreferrer"
              prepend-icon="mdi-open-in-new"
              variant="tonal"
              color="teal"
              class="text-none"
              :aria-label="`Open ${selectedCertificate.label} certificate in new tab`"
            >
              Open Original
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const baseUrl = import.meta.env.BASE_URL

const encodeAsset = (filename) => `${baseUrl}assets/${encodeURI(filename)}`

const certificates = [
  {
    label: 'Introduction to C',
    filename: 'C INTRO CERT.jpg',
    alt: 'Introduction to C Certificate'
  },
  {
    label: 'Introduction to CSS',
    filename: 'CSS INTRO CERT.png',
    alt: 'Introduction to CSS Certificate'
  },
  {
    label: 'Introduction to HTML',
    filename: 'HTML INTRO CERT.png',
    alt: 'Introduction to HTML Certificate'
  },
  {
    label: 'Introduction to JavaScript',
    filename: 'JS INTRO CERT.png',
    alt: 'Introduction to JavaScript Certificate'
  },
  {
    label: 'JavaScript Intermediate',
    filename: 'JS INTERMEDIATE CERT.jpg',
    alt: 'JavaScript Intermediate Certificate'
  },
  {
    label: 'Introduction to SQL',
    filename: 'SQL INTRO CERT.jpg',
    alt: 'Introduction to SQL Certificate'
  },
  {
    label: 'Networking Basics (Cisco)',
    filename: 'networking-basics cert.png',
    alt: 'Networking Basics Certificate'
  }
].map((item) => ({
  ...item,
  href: encodeAsset(item.filename),
  imgSrc: encodeAsset(item.filename)
}))

const dialog = ref(false)
const selectedCertificate = ref(null)

const logImageLoad = (label) => {
  console.log('[Certifications] Image loaded:', label)
}

const openDialog = (cert) => {
  selectedCertificate.value = cert
  dialog.value = true
  console.log('[Certifications] Dialog opened:', cert.label)
}

const closeDialog = () => {
  dialog.value = false
  console.log('[Certifications] Dialog closed')
}
</script>

<style scoped>
.transition-ease {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.scale-102 {
  transform: scale(1.02);
}

.scale-100 {
  transform: scale(1);
}
</style>