<template>
  <section id="tor" class="transition-colors duration-500">
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-10">
            Transcript of Records
          </h2>
        </v-col>
      </v-row>

      <v-row justify="center" align="stretch" dense class="g-6">
        <v-col
          v-for="doc in torDocuments"
          :key="doc.label"
          cols="12"
          sm="6"
          md="4"
          class="d-flex"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :elevation="isHovering ? 10 : 3"
              rounded="xl"
              max-width="400"
              class="tor-card pa-4 mx-auto text-center transition-ease"
              role="button"
              tabindex="0"
              :aria-label="`Open ${doc.label} preview dialog`"
              :class="{ 'tor-card--hover': isHovering }"
              @click="openDialog(doc)"
              @keyup.enter.prevent="openDialog(doc)"
              @keyup.space.prevent="openDialog(doc)"
            >
              <v-card-item class="d-flex flex-column align-center pb-2">
                <v-card-title class="text-subtitle-1 font-weight-semibold text-high-emphasis">
                  {{ doc.label }}
                </v-card-title>
                <v-card-subtitle class="text-body-2 text-medium-emphasis mb-2">
                  {{ doc.school }} • {{ doc.degree }}
                </v-card-subtitle>
              </v-card-item>

              <v-fade-transition>
                <v-img
                  v-if="doc.previewSrc"
                  :src="doc.previewSrc"
                  :alt="`${doc.label} preview`"
                  class="tor-img clickable-image"
                  aspect-ratio="4 / 3"
                  contain
                  rounded="lg"
                  @click.stop="handleImageClick(doc)"
                  @load="logImageLoad(`${doc.label} preview card`)"
                />
              </v-fade-transition>

              <v-card-text class="text-body-2 text-medium-emphasis mt-3">
                {{ doc.note }}
              </v-card-text>

              <v-card-actions class="justify-center gap-2 pt-2">
                <v-btn
                  variant="tonal"
                  color="teal"
                  class="text-none"
                  prepend-icon="mdi-eye"
                  :href="doc.viewUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop="handleExternalLink(doc, 'view')"
                >
                  View TOR
                </v-btn>
                <v-btn
                  variant="text"
                  color="teal"
                  class="text-none"
                  prepend-icon="mdi-file-pdf-box"
                  :href="doc.previewEmbedUrl || doc.viewUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop="handleExternalLink(doc, 'pdf')"
                >
                  Open PDF
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-dialog
        v-model="dialog"
        max-width="960"
        transition="dialog-bottom-transition"
      >
        <v-card rounded="xl" class="text-center">
          <v-card-title class="text-h6 font-weight-semibold">
            {{ selectedDocument?.label }}
          </v-card-title>
          <v-card-subtitle class="px-6 text-body-2 text-medium-emphasis">
            <span v-if="selectedDocument">
              {{ selectedDocument.school }} • {{ selectedDocument.degree }}
            </span>
          </v-card-subtitle>
          <v-card-text>
            <v-fade-transition>
              <v-img
                v-if="selectedDocument"
                :src="selectedDocument.previewSrc"
                :alt="`${selectedDocument.label} dialog preview`"
                class="tor-img-dialog mb-6"
                contain
                rounded="lg"
                @load="logImageLoad(`${selectedDocument.label} dialog image`)"
              />
            </v-fade-transition>
            <v-responsive
              v-if="selectedDocument?.previewEmbedUrl"
              class="rounded-lg overflow-hidden"
              :aspect-ratio="8.5 / 11"
            >
              <iframe
                :src="selectedDocument.previewEmbedUrl"
                title="Transcript of Records Preview"
                class="preview-frame"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </v-responsive>
          </v-card-text>
          <v-card-actions class="flex-wrap gap-2 justify-center">
            <v-btn
              variant="text"
              color="teal"
              class="text-none"
              @click="closeDialog"
            >
              Close
            </v-btn>
            <v-btn
              v-if="selectedDocument?.viewUrl"
              :href="selectedDocument.viewUrl"
              target="_blank"
              rel="noopener noreferrer"
              prepend-icon="mdi-eye"
              variant="text"
              color="teal"
              class="text-none"
              @click.stop="handleExternalLink(selectedDocument, 'view')"
            >
              View TOR
            </v-btn>
            <v-btn
              v-if="selectedDocument?.downloadUrl"
              :href="selectedDocument.downloadUrl"
              target="_blank"
              rel="noopener noreferrer"
              prepend-icon="mdi-download"
              variant="tonal"
              color="teal"
              class="text-none"
              @click.stop="handleExternalLink(selectedDocument, 'download')"
            >
              Download
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const baseUrl = import.meta.env.BASE_URL

const encodeAsset = (filename) => `${baseUrl}assets/${encodeURI(filename)}`

const torDocuments = [
  {
    label: 'Official Transcript of Records',
    degree: 'Bachelor of Science in Information Systems',
    school: 'Caraga State University-Main Campus',
    previewFilename: 'tor-preview.svg',
    pdfFilename: 'Buquis_CristianJ_TOR.pdf',
    viewUrl: 'https://drive.google.com/file/d/1FTNoDGi4g3ZCDl31_kQ97D7FXdwG7Uu0/view?usp=sharing',
    previewEmbedUrl: 'https://drive.google.com/file/d/1FTNoDGi4g3ZCDl31_kQ97D7FXdwG7Uu0/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1FTNoDGi4g3ZCDl31_kQ97D7FXdwG7Uu0',
    note: 'Click "View TOR" above to open in full screen or "Download" to save the file.'
  }
].map((doc) => ({
  ...doc,
  previewSrc: encodeAsset(doc.previewFilename)
}))

const dialog = ref(false)
const selectedDocument = ref(null)

watch(dialog, (value, oldValue) => {
  if (!value && oldValue && selectedDocument.value) {
    console.log('[Transcript] Dialog closed')
    selectedDocument.value = null
  }
})

const logImageLoad = (label) => {
  console.log('[Transcript] Image loaded:', label)
}

const handleImageClick = (doc) => {
  console.log('[Transcript] Image clicked:', doc.label)
  openDialog(doc)
}

const handleExternalLink = (doc, type) => {
  console.log('[Transcript] External link clicked:', doc.label, type)
}

const openDialog = (doc) => {
  selectedDocument.value = doc
  dialog.value = true
  console.log('[Transcript] Dialog opened:', doc.label)
}

const closeDialog = () => {
  dialog.value = false
}
</script>

<style scoped>
.transition-ease {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.tor-card {
  cursor: pointer;
  width: 100%;
}

.tor-card--hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.14);
}

.clickable-image {
  cursor: pointer;
}

.tor-img {
  max-height: 260px;
}

.tor-img-dialog {
  max-height: 420px;
}

.preview-frame {
  border: 0;
  width: 100%;
  height: 100%;
}
</style>
