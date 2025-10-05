<template>
  <v-container id="tor" class="py-16">
    <h2 class="text-h4 font-weight-bold mb-8 text-center text-teal-darken-2">Transcript of Records (TOR)</h2>

    <!-- Complete TOR section from legacy -->
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card variant="outlined" class="pa-6 mb-6" elevation="2">
          <v-row align="center">
            <v-col cols="12" md="7">
              <h3 class="text-h6 font-weight-bold mb-2">Official Transcript of Records</h3>
              <p class="text-body-1 text-grey-darken-1 mb-1">Bachelor of Science in Information Systems</p>
              <p class="text-body-2 text-grey-darken-2">Caraga State University-Main Campus</p>
            </v-col>
            <v-col cols="12" md="5" class="d-flex flex-column flex-sm-row gap-3">
              <v-btn
                color="teal"
                variant="flat"
                href="https://drive.google.com/file/d/1FTNoDGi4g3ZCDl31_kQ97D7FXdwG7Uu0/view?usp=sharing"
                target="_blank"
                prepend-icon="mdi-eye"
              >
                View TOR
              </v-btn>
              <v-btn
                color="grey-darken-2"
                variant="flat"
                href="https://drive.google.com/uc?export=download&id=1FTNoDGi4g3ZCDl31_kQ97D7FXdwG7Uu0"
                target="_blank"
                prepend-icon="mdi-download"
              >
                Download
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-card variant="outlined" elevation="2">
          <v-card-title class="bg-grey-lighten-4">
            <h4 class="text-h6 font-weight-semibold">Document Preview</h4>
            <p class="text-caption text-grey-darken-1">Click "View TOR" above to open in full screen or "Download" to save the file.</p>
          </v-card-title>
          <v-card-text class="pa-0">
            <div class="tor-iframe-container">
              <iframe
                src="https://drive.google.com/file/d/1FTNoDGi4g3ZCDl31_kQ97D7FXdwG7Uu0/preview"
                class="tor-iframe"
                title="Transcript of Records - Cristian Jay T. Buquis"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.tor-iframe-container {
  height: 600px;
  width: 100%;
  position: relative;
}

.tor-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
