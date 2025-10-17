<template>
  <section
    id="contact"
    class="surface-gradient-light transition-colors duration-500 contact-section"
  >
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      location="top"
      elevation="6"
      class="text-subtitle-2"
    >
      {{ snackbar.message }}
    </v-snackbar>

    <v-container class="py-0 contact-container">
      <v-row justify="center">
        <v-col cols="12">
          <h2 class="text-h4 text-md-h3 font-weight-bold text-center mb-6">
            Contact Me
          </h2>
        </v-col>
      </v-row>

      <v-row class="g-8 align-stretch justify-center">
        <v-col cols="12" md="5" class="d-flex">
          <v-card
            elevation="0"
            rounded="xl"
            class="glass-card pa-6 pa-md-8 w-100 transition-ease contact-card"
          >
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
                    class="contact-icon"
                    @click="logQuickLink('Social', social.label)"
                  >
                    <v-icon :icon="social.icon" size="22" />
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="7" class="d-flex">
          <v-fade-transition appear>
            <v-card
              elevation="0"
              rounded="xl"
              class="glass-card pa-6 pa-md-8 w-100 transition-ease contact-card"
            >
              <v-card-title class="text-h6 font-weight-semibold pb-2">
                Send a Message
              </v-card-title>
              <v-card-text>
                <v-form
                  ref="formRef"
                  v-model="isValid"
                  @submit.prevent="handleSubmit"
                  aria-label="Contact form"
                >
                  <v-row class="g-4">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.name"
                        name="user_name"
                        label="Full Name"
                        density="comfortable"
                        variant="outlined"
                        autocomplete="name"
                        :rules="rules.name"
                        required
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.email"
                        name="user_email"
                        label="Email Address"
                        density="comfortable"
                        variant="outlined"
                        autocomplete="email"
                        :rules="rules.email"
                        required
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="formData.message"
                        name="message"
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
                        color="primary"
                        class="text-none px-6"
                        :loading="isSubmitting"
                        :disabled="!isValid || isSubmitting"
                        aria-label="Send message"
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
import emailjs from '@emailjs/browser'

// Form references and reactive state.
const formRef = ref(null)
const isValid = ref(false)
const isSubmitting = ref(false)

// Two-way bound fields for EmailJS payload.
const formData = reactive({
  name: '',
  email: '',
  message: ''
})

// Validation rules for form inputs.
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
    (value) => !!value || 'Message is required'
  ]
}

// Quick contact links for alternative channels.
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

// Snackbar state for real-time feedback.
const snackbar = reactive({
  visible: false,
  message: '',
  color: 'success',
  timeout: 4000
})

// EmailJS integration settings from environment variables.
const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_p9z13oh',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_zmx0b1n',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'tcDJ9BIP8FI_yWhY9'
}

if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || !import.meta.env.VITE_EMAILJS_TEMPLATE_ID || !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
  console.warn('[Contact] Using fallback EmailJS credentials from code. Consider setting VITE_EMAILJS_* env variables for production.')
}

// Logging helper for quick contact actions.
const logQuickLink = (type, value) => {
  console.log('[Contact] Quick link selected:', type, value)
}

// Utility to display snackbar notifications.
const showSnackbar = (message, color) => {
  snackbar.message = message
  snackbar.color = color
  snackbar.visible = true
}

// Reset the form fields and validation state.
const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.message = ''
  formRef.value?.reset()
  formRef.value?.resetValidation()
  isValid.value = false
}

// Submit handler that validates and sends the EmailJS request.
const handleSubmit = async () => {
  console.log('[Contact] Form submit attempt')

  if (isSubmitting.value) {
    return
  }

  const validation = await formRef.value?.validate()

  if (!validation?.valid) {
    console.log('[Contact] Validation failed', validation?.errors)
    return
  }

  const formElement = formRef.value?.$el

  if (!formElement) {
    console.error('[Contact] Form element not available for EmailJS sendForm')
    showSnackbar('Failed to send message. Try again later.', 'error')
    return
  }

  try {
    isSubmitting.value = true
    console.log('[Contact] Sending message via EmailJS', {
      name: formData.name,
      email: formData.email
    })

    const response = await emailjs.sendForm(
      emailConfig.serviceId,
      emailConfig.templateId,
      formElement,
      emailConfig.publicKey
    )

    console.log('[Contact] EmailJS success', response)
    showSnackbar('Message sent successfully!', 'success')
    resetForm()
  } catch (error) {
    console.error('[Contact] EmailJS error', error)
    showSnackbar('Failed to send message. Try again later.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.contact-container {
  width: 100%;
}

.transition-ease {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.contact-card {
  display: flex;
  flex-direction: column;
}

.contact-card:hover,
.contact-card:focus-within {
  transform: translateY(-4px);
  box-shadow: 0 28px 56px rgba(15, 23, 42, 0.24);
}

.v-theme--dark .contact-card:hover,
.v-theme--dark .contact-card:focus-within {
  box-shadow: 0 28px 56px rgba(3, 7, 18, 0.52);
}

.contact-link {
  color: var(--v-theme-primary);
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}

.contact-icon {
  min-width: 0;
  color: var(--v-theme-primary);
}

.contact-icon:hover {
  opacity: 0.8;
}
</style>
