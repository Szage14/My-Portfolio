<template>
  <v-container id="contact" class="py-16 text-center">
    <h2 class="text-h4 font-weight-bold mb-8 text-teal-darken-2">Contact Me</h2>

    <!-- Complete contact data from legacy -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card variant="outlined" class="pa-8" elevation="2">
          <v-list density="comfortable" class="bg-transparent">
            <v-list-item>
              <template #prepend>
                <v-icon color="teal">mdi-email</v-icon>
              </template>
              <v-list-item-title class="text-body-1">
                <strong>Email:</strong>
                <a href="mailto:Cjbuquis@gmail.com" class="text-teal-darken-2 text-decoration-none ml-2">
                  Cjbuquis@gmail.com
                </a>
                |
                <a href="mailto:cristianjay.buquis@carsu.edu.ph" class="text-teal-darken-2 text-decoration-none ml-2">
                  cristianjay.buquis@carsu.edu.ph
                </a>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="teal">mdi-phone</v-icon>
              </template>
              <v-list-item-title class="text-body-1">
                <strong>Phone:</strong> 09472756345 / 09084782586
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="teal">mdi-map-marker</v-icon>
              </template>
              <v-list-item-title class="text-body-1">
                <strong>Location:</strong> Buenavista, Agusan del Norte
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="teal">mdi-link-variant</v-icon>
              </template>
              <v-list-item-title class="text-body-1">
                <strong>Portfolio/LinkedIn:</strong>
                <a href="https://tinyurl.com/cjbuquis" target="_blank" class="text-teal-darken-2 text-decoration-none ml-2">
                  https://tinyurl.com/cjbuquis
                </a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
