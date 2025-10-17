<template>
  <section id="tor" class="py-16 md:py-24 bg-white transition-colors duration-500">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 text-md-h3 font-weight-bold text-center mb-8">
            Transcript of Records
          </h2>
        </v-col>
      </v-row>

      <v-row class="g-6 mb-8">
        <v-col cols="12" v-if="primaryDocument">
          <v-card rounded="xl" variant="tonal" color="teal" class="pa-6">
            <v-card-item>
              <v-card-title class="text-h6 text-md-h5 font-weight-bold">
                {{ primaryDocument.label }}
              </v-card-title>
              <v-card-subtitle class="text-subtitle-2">
                {{ primaryDocument.degree }}
              </v-card-subtitle>
            </v-card-item>
            <v-card-text class="pt-2">
              <div class="text-body-2">
                {{ primaryDocument.school }}
              </div>
              <div class="text-body-2 mt-3">
                Click "View TOR" to open the Google Drive preview or "Download" to save a copy for offline reference.
              </div>
            </v-card-text>
            <v-card-actions class="pt-2 flex-wrap gap-2">
              <v-spacer />
              <v-btn
                v-if="primaryDocument.viewUrl"
                :href="primaryDocument.viewUrl"
                target="_blank"
                rel="noopener noreferrer"
                prepend-icon="mdi-open-in-new"
                variant="flat"
                color="teal"
                class="text-none"
                @click.stop
              >
                View TOR
              </v-btn>
              <v-btn
                v-if="primaryDocument.downloadUrl"
                :href="primaryDocument.downloadUrl"
                target="_blank"
                rel="noopener noreferrer"
                prepend-icon="mdi-download"
                variant="tonal"
                color="teal"
                class="text-none"
                @click.stop
              >
                Download
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="g-6 align-stretch">
        <v-col
          v-for="doc in torDocuments"
          :key="doc.pdfFilename"
          cols="12"
          sm="6"
          md="4"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :elevation="isHovering ? 12 : 4"
              :class="['d-flex', 'flex-column', 'transition-ease', isHovering ? 'scale-102' : 'scale-100']"
              rounded="xl"
              role="button"
              tabindex="0"
              :aria-label="`Open ${doc.label} preview dialog`"
              @click="openDialog(doc)"
              @keyup.enter.space="openDialog(doc)"
            >
              <v-img
                :src="doc.previewSrc"
                :alt="`${doc.label} preview`"
                height="320"
                cover
                rounded="t-xl"
                class="clickable-image"
                @click.stop="openDialog(doc)"
                @load="logImageLoad(`${doc.label} preview card`)"
              />
              <v-card-item>
                <v-card-title class="text-subtitle-1 font-weight-semibold">
                  {{ doc.label }}
                </v-card-title>
                <v-card-subtitle class="text-body-2 text-medium-emphasis">
                  {{ doc.school }} • {{ doc.degree }}
                </v-card-subtitle>
              </v-card-item>
              <v-card-text class="text-body-2 text-medium-emphasis">
                {{ doc.note }}
              </v-card-text>
              <v-spacer />
              <v-card-actions class="pt-0 mt-auto">
                <v-btn
                  variant="text"
                  color="teal"
                  class="text-none"
                  :href="doc.viewUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  prepend-icon="mdi-open-in-new"
                  @click.stop
                >
                  View TOR
                </v-btn>
                <v-btn
                  variant="tonal"
                  color="teal"
                  class="text-none"
                  prepend-icon="mdi-magnify"
                  @click.stop="openDialog(doc)"
                >
                  Preview
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
        <v-card rounded="xl">
          <v-card-title class="text-h6 font-weight-semibold">
            {{ selectedDocument?.label }}
          </v-card-title>
          <v-card-subtitle class="px-6 text-body-2 text-medium-emphasis">
            <span v-if="selectedDocument">
              {{ selectedDocument.school }} • {{ selectedDocument.degree }}
            </span>
          </v-card-subtitle>
          <v-card-text>
            <v-img
              v-if="selectedDocument"
              :src="selectedDocument.previewSrc"
              :alt="`${selectedDocument.label} preview`"
              height="420"
              cover
              rounded="lg"
              class="mb-6"
              @load="logImageLoad(`${selectedDocument.label} dialog image`)"
            />
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
          <v-card-actions class="flex-wrap gap-2">
            <v-spacer />
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
              prepend-icon="mdi-open-in-new"
              variant="text"
              color="teal"
              class="text-none"
              @click.stop
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
              @click.stop
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

const primaryDocument = torDocuments.length > 0 ? torDocuments[0] : null

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

.scale-102 {
  transform: scale(1.02);
}

.scale-100 {
  transform: scale(1);
}

.clickable-image {
  cursor: pointer;
}

.preview-frame {
  border: 0;
  width: 100%;
  height: 100%;
}
</style>
