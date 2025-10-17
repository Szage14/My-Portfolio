<template>
  <section id="references" class="py-16 md:py-24 transition-colors duration-500">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 text-md-h3 font-weight-bold text-center mb-8">
            References
          </h2>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row class="g-6 mt-2">
        <v-col
          v-for="reference in references"
          :key="reference.name"
          cols="12"
          sm="6"
          md="4"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              elevation="2"
              :class="[
                'transition-ease',
                'references-card',
                isHovering ? 'references-card--hover' : ''
              ]"
              rounded="xl"
              class="pa-4 text-start"
              role="button"
              tabindex="0"
              :aria-label="`View contact details for ${reference.name}`"
              @mouseenter="logHoverEnter(reference.name)"
              @mouseleave="logHoverLeave(reference.name)"
              @click="handleCardActivate(reference, 'click')"
              @keyup.enter="handleCardActivate(reference, 'keyboard-enter')"
              @keyup.space.prevent="handleCardActivate(reference, 'keyboard-space')"
            >
              <v-card-item class="d-flex align-center">
                <v-avatar color="primary" variant="tonal" size="56" class="me-4">
                  <span aria-hidden="true" class="text-h6 font-weight-semibold">
                    {{ reference.initials }}
                  </span>
                </v-avatar>
                <div>
                  <v-card-title class="text-subtitle-1 font-weight-semibold pb-1">
                    {{ reference.name }}
                  </v-card-title>
                  <v-card-subtitle class="text-body-2 text-medium-emphasis">
                    {{ reference.position }}
                  </v-card-subtitle>
                  <v-card-subtitle class="text-body-2 text-medium-emphasis">
                    {{ reference.organization }}
                  </v-card-subtitle>
                </div>
              </v-card-item>

              <v-card-text class="pt-3 text-body-2 text-medium-emphasis">
                <div v-if="reference.email">
                  <strong class="d-block">Email:</strong>
                  <a
                    :href="`mailto:${reference.email}`"
                    class="references-link"
                    @click.stop="handleContactLink(reference, 'email')"
                  >
                    {{ reference.email }}
                  </a>
                </div>
                <div v-if="reference.phone" class="mt-3">
                  <strong class="d-block">Phone:</strong>
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
].map((ref) => ({
  ...ref,
  initials: ref.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}))

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
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.references-card {
  cursor: pointer;
  border: 1px solid transparent;
}

.references-card--hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
  border-color: var(--v-theme-primary);
}

.references-link {
  color: var(--v-theme-primary);
  text-decoration: none;
}

.references-link:hover {
  text-decoration: underline;
}
</style>
