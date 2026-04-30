<template>
  <section id="references" class="transition-colors duration-500">
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12">
          <h2 class="text-h4 text-md-h3 font-weight-bold text-center mb-10">
            References
          </h2>
        </v-col>
      </v-row>

      <v-row justify="center" align="stretch" dense class="g-6">
        <v-col
          v-for="reference in references"
          :key="reference.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="d-flex"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              elevation="3"
              rounded="xl"
              class="reference-card pa-6 mx-auto text-center transition-ease"
              max-width="320"
              role="button"
              tabindex="0"
              :aria-label="`Reference details for ${reference.name}`"
              :class="{ 'reference-card--hover': isHovering }"
              @mouseenter="logHoverEnter(reference.name)"
              @mouseleave="logHoverLeave(reference.name)"
              @click="handleCardActivate(reference, 'click')"
              @keyup.enter="handleCardActivate(reference, 'keyboard-enter')"
              @keyup.space.prevent="handleCardActivate(reference, 'keyboard-space')"
            >
              <v-card-item class="d-flex flex-column align-center">
                <v-avatar size="72" variant="tonal" color="primary" class="mb-4">
                  <template v-if="reference.avatar">
                    <v-img :src="reference.avatar" :alt="`${reference.name} portrait`" cover />
                  </template>
                  <template v-else>
                    <v-icon icon="mdi-account-tie" size="36" />
                  </template>
                </v-avatar>
                <v-card-title class="text-subtitle-1 font-weight-semibold text-high-emphasis">
                  {{ reference.name }}
                </v-card-title>
                <v-card-subtitle class="text-body-2 text-medium-emphasis">
                  {{ reference.position }}
                </v-card-subtitle>
                <v-card-subtitle class="text-body-2 text-medium-emphasis mb-2">
                  {{ reference.organization }}
                </v-card-subtitle>
              </v-card-item>

              <v-card-text class="pt-0 text-body-2 text-medium-emphasis">
                <div v-if="reference.email" class="mb-3">
                  <span class="d-block font-weight-medium text-high-emphasis">Email</span>
                  <a
                    :href="`mailto:${reference.email}`"
                    class="references-link"
                    @click.stop="handleContactLink(reference, 'email')"
                  >
                    {{ reference.email }}
                  </a>
                </div>
                <div v-if="reference.phone">
                  <span class="d-block font-weight-medium text-high-emphasis">Phone</span>
                  <a
                    :href="`tel:${reference.phone}`"
                    class="references-link"
                    @click.stop="handleContactLink(reference, 'phone')"
                  >
                    {{ reference.phone }}
                  </a>
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
const references = [
  {
    name: 'AR. Christian Dwight C. Dolotina',
    position: 'Director of General Services Office',
    organization: 'Caraga State University-Main Campus',
    email: 'cdwightdol27@gmail.com'
  }
]

const logHoverEnter = (name) => {
  console.log('[References] Hover enter:', name)
}

const logHoverLeave = (name) => {
  console.log('[References] Hover leave:', name)
}

const handleCardActivate = (reference, source) => {
  console.log('[References] Card activated:', reference.name, `via ${source}`)
}

const handleContactLink = (reference, type) => {
  console.log('[References] Contact link clicked:', reference.name, type)
}
</script>

<style scoped>
.transition-ease {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.reference-card {
  cursor: pointer;
  width: 100%;
}

.reference-card--hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.14);
}

.references-link {
  color: var(--v-theme-primary);
  text-decoration: none;
}

.references-link:hover {
  text-decoration: underline;
}
</style>
