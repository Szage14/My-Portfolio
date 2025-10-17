<template>
  <section id="contact" class="py-16 md:py-24 transition-colors duration-500">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <h2 class="text-h4 text-md-h3 font-weight-bold text-center mb-8">
            Contact Me
          </h2>
        </v-col>
      </v-row>

      <v-divider class="mb-8" />

      <v-row class="g-8" align="stretch">
        <v-col cols="12" md="5">
          <v-card elevation="2" rounded="xl" class="pa-6 h-100 transition-ease contact-card">
            <v-card-title class="text-h6 font-weight-semibold pb-2">
              Let's Connect
            </v-card-title>
            <v-card-text class="text-body-2 text-medium-emphasis">
              <div class="mb-4">
                <strong>Email:</strong>
                <div>
                  <a
                    href="mailto:Cjbuquis@gmail.com"
                    class="contact-link"
                    @click.stop="logQuickLink('Email', 'Cjbuquis@gmail.com')"
                  >
                    Cjbuquis@gmail.com
                  </a>
                </div>
                <div>
                  <a
                    href="mailto:cristianjay.buquis@carsu.edu.ph"
                    class="contact-link"
                    @click.stop="logQuickLink('Email', 'cristianjay.buquis@carsu.edu.ph')"
                  >
                    cristianjay.buquis@carsu.edu.ph
                  </a>
                </div>
              </div>

              <div class="mb-4">
                <strong>Phone:</strong>
                <div>
                  <a
                    href="tel:09472756345"
                    class="contact-link"
                    @click.stop="logQuickLink('Phone', '09472756345')"
                  >
                    09472756345
                  </a>
                  <span class="mx-1">/</span>
                  <a
                    href="tel:09084782586"
                    class="contact-link"
                    @click.stop="logQuickLink('Phone', '09084782586')"
                  >
                    09084782586
                  </a>
                </div>
              </div>

              <div class="mb-4">
                <strong>Location:</strong>
                <div>Buenavista, Agusan del Norte</div>
              </div>

              <div class="mb-6">
                <strong>Portfolio:</strong>
                <div>
                  <a
                    href="https://tinyurl.com/cjbuquis"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="contact-link"
                    @click.stop="logQuickLink('Portfolio', 'https://tinyurl.com/cjbuquis')"
                  >
                    https://tinyurl.com/cjbuquis
                  </a>
                </div>
              </div>

              <div class="d-flex align-center gap-2">
                <span class="text-body-2 font-weight-medium">Follow:</span>
                <div>
                  <v-btn
                    v-for="social in socialLinks"
                    :key="social.label"
                    variant="plain"
                    :href="social.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="social.label"
                    @click="logQuickLink('Social', social.label)"
                  >
                    <v-icon :icon="social.icon" />
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="7">
          <v-fade-transition appear>
            <v-card elevation="2" rounded="xl" class="pa-6 transition-ease contact-card">
              <v-card-title class="text-h6 font-weight-semibold pb-2">
                Send a Message
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="isValid" @submit.prevent="handleSubmit">
                  <v-row class="g-4">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.name"
                        label="Full Name"
                        density="comfortable"
                        variant="outlined"
                        :rules="rules.name"
                        required
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.email"
                        label="Email Address"
                        density="comfortable"
                        variant="outlined"
                        :rules="rules.email"
                        required
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="formData.message"
                        label="Message"
                        density="comfortable"
                        variant="outlined"
                        auto-grow
                        rows="4"
                        :rules="rules.message"
                        required
                      />
                    </v-col>
                    <v-col cols="12" class="text-end">
                      <v-btn
                        type="submit"
                        color="teal"
                        class="text-none"
                        :loading="isSubmitting"
                        :disabled="isSubmitting"
                        @click="logSubmitClick"
                      >
                        Send Message
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = ref(null)
const isValid = ref(false)
const isSubmitting = ref(false)

const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const rules = {
  name: [
    (value) => !!value || 'Name is required'
  ],
  email: [
    (value) => !!value || 'Email is required',
    (value) => emailPattern.test(value) || 'Enter a valid email address'
  ],
  message: [
    (value) => !!value || 'Message is required',
    (value) => value.length >= 10 || 'Message should be at least 10 characters'
  ]
}

const socialLinks = [
  {
    label: 'Messenger',
    icon: 'mdi-facebook-messenger',
    href: 'https://m.me/cristianjay.buquis'
  },
  {
    label: 'Primary Email',
    icon: 'mdi-email-outline',
    href: 'mailto:Cjbuquis@gmail.com'
  },
  {
    label: 'Phone Contact',
    icon: 'mdi-phone-outline',
    href: 'tel:09472756345'
  }
]

const logQuickLink = (type, value) => {
  console.log('[Contact] Quick link selected:', type, value)
}

const logSubmitClick = () => {
  console.log('[Contact] Submit button clicked')
}

const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.message = ''
  form.value?.resetValidation()
}

const handleSubmit = async () => {
  console.log('[Contact] Form submit attempt')

  if (isSubmitting.value) {
    return
  }

  const result = await form.value?.validate()

  if (!result?.valid) {
    console.log('[Contact] Validation failed', result?.errors)
    return
  }

  try {
    isSubmitting.value = true
    console.log('[Contact] Submission success', {
      name: formData.name,
      email: formData.email
    })
    // Placeholder for integration point (e.g., API call)
  } finally {
    isSubmitting.value = false
    resetForm()
  }
}
</script>

<style scoped>
.transition-ease {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
}

.contact-link {
  color: var(--v-theme-primary);
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}
</style>
