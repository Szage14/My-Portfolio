<template>
  <section id="services" class="surface-gradient-light transition-colors duration-500">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 text-md-h3 font-weight-bold text-center mb-10">
            Services Offered
          </h2>
        </v-col>
      </v-row>

      <v-row class="g-6">
        <v-col
          v-for="service in services"
          :key="service.title"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-scale-transition appear>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :elevation="isHovering ? 14 : 6"
                :class="[
                  'services-card',
                  'glass-panel',
                  'transition-ease',
                  'pa-6',
                  'text-center',
                  isHovering ? 'services-card--hover' : ''
                ]"
                variant="flat"
                rounded="xl"
                role="button"
                tabindex="0"
                :aria-label="`Learn more about ${service.title}`"
                @mouseenter="logHoverEnter(service.title)"
                @mouseleave="logHoverLeave(service.title)"
                @click="handleCardActivate(service, 'click')"
                @keyup.enter="handleCardActivate(service, 'keyboard-enter')"
                @keyup.space.prevent="handleCardActivate(service, 'keyboard-space')"
              >
                <v-card-item>
                  <v-avatar
                    size="64"
                    variant="tonal"
                    color="primary"
                    class="mx-auto mb-4 services-avatar"
                  >
                    <span aria-hidden="true" class="text-h5">{{ service.icon }}</span>
                  </v-avatar>
                  <v-card-title class="text-h6 font-weight-semibold text-high-emphasis">
                    {{ service.title }}
                  </v-card-title>
                </v-card-item>

                <v-card-text class="text-body-2 text-medium-emphasis">
                  <p class="mb-3">
                    {{ service.description }}
                  </p>
                  <div v-if="service.note" class="font-weight-medium">
                    <strong>{{ service.note.label }}</strong>
                    <span> {{ service.note.text }} </span>
                    <a
                      :href="service.note.linkHref"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="services-link"
                    >
                      {{ service.note.linkText }}
                    </a>
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-scale-transition>
        </v-col>
      </v-row>
    </v-container>

    <!-- Enlarged Service Detail Dialog -->
    <v-dialog
      v-model="dialogOpen"
      max-width="800"
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card v-if="selectedService" class="glass-panel">
        <v-card-title class="d-flex align-center pa-6 text-h5 font-weight-bold">
          <v-avatar
            size="48"
            variant="tonal"
            color="primary"
            class="me-4"
          >
            <span class="text-h6">{{ selectedService.icon }}</span>
          </v-avatar>
          <span>{{ selectedService.title }}</span>
          <v-spacer />
          <v-btn
            icon
            variant="text"
            @click="dialogOpen = false"
            aria-label="Close dialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-6">
          <div class="text-body-1 mb-4">
            {{ selectedService.description }}
          </div>

          <div v-if="selectedService.details" class="mb-4">
            <h3 class="text-h6 font-weight-semibold mb-3">Details</h3>
            <div class="text-body-2 service-details">
              {{ selectedService.details }}
            </div>
          </div>

          <div v-if="selectedService.features && selectedService.features.length > 0" class="mb-4">
            <h3 class="text-h6 font-weight-semibold mb-3">Key Features</h3>
            <ul class="service-features">
              <li v-for="(feature, index) in selectedService.features" :key="index" class="mb-2">
                {{ feature }}
              </li>
            </ul>
          </div>

          <div v-if="selectedService.note" class="mb-4">
            <v-alert
              type="info"
              variant="tonal"
              class="text-body-2"
            >
              <strong>{{ selectedService.note.label }}</strong>
              <span> {{ selectedService.note.text }} </span>
              <a
                :href="selectedService.note.linkHref"
                target="_blank"
                rel="noopener noreferrer"
                class="services-link"
              >
                {{ selectedService.note.linkText }}
              </a>
            </v-alert>
          </div>

          <div v-if="selectedService.examples && selectedService.examples.length > 0">
            <h3 class="text-h6 font-weight-semibold mb-3">Examples</h3>
            <div class="d-flex flex-column gap-2">
              <v-btn
                v-for="(example, index) in selectedService.examples"
                :key="index"
                variant="outlined"
                color="primary"
                :href="example.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-none"
              >
                <v-icon start>mdi-open-in-new</v-icon>
                {{ example.label }}
              </v-btn>
            </div>
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            color="primary"
            variant="flat"
            @click="dialogOpen = false"
            class="text-none px-6"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const dialogOpen = ref(false)
const selectedService = ref(null)

const services = [
  {
    icon: '🌐',
    title: 'Personal Portfolio Website',
    description:
      'Custom portfolio websites like this one, showcasing your skills, experience, and projects professionally.',
    details:
      'I create fully responsive, modern portfolio websites tailored to your personal brand and career goals. Each portfolio is designed with clean UI/UX principles, optimized performance, and mobile-first approach to ensure your work stands out.',
    features: [
      'Responsive design that works on all devices',
      'Modern glassmorphism UI with smooth animations',
      'SEO optimized for better discoverability',
      'Contact form integration',
      'Fast loading times with optimized assets',
      'Easy to maintain and update'
    ],
    examples: [
      {
        label: 'View Sample Portfolio Template',
        url: 'https://hidden-sect.github.io/basic-personal-portfolio/'
      }
    ]
  },
  {
    icon: '📄',
    title: 'Resume Creation',
    description:
      'Professional resume design and creation tailored to your industry and career goals.',
    details:
      'Get a professionally designed resume that highlights your skills, experience, and achievements in a clear and compelling way. I work with you to craft content that resonates with recruiters and passes through ATS systems.',
    features: [
      'ATS-friendly formatting',
      'Industry-specific templates',
      'Professional layout and typography',
      'Keyword optimization',
      'Multiple format options (PDF, DOCX)',
      'Revision rounds included'
    ],
    note: {
      label: 'Free Resource:',
      text: 'Build your resume for free at',
      linkText: 'makefreecv.com',
      linkHref: 'https://makefreecv.com/'
    }
  },
  {
    icon: '🔍',
    title: 'Basic OSINT Services',
    description:
      'Open Source Intelligence gathering covering personal details and social media analysis for legitimate purposes.',
    details:
      'Ethical OSINT services for background research, digital footprint analysis, and social media intelligence gathering. All services are conducted within legal boundaries and for legitimate purposes only.',
    features: [
      'Social media profile analysis',
      'Digital footprint assessment',
      'Public records research',
      'Email and username tracking',
      'Data breach checking',
      'Privacy recommendations'
    ]
  },
  {
    icon: '💼',
    title: 'MS Office Solutions',
    description:
      'Microsoft Office installation and setup services with proper licensing guidance.',
    details:
      'Complete Microsoft Office suite installation, configuration, and training. I help you get set up with the right Office tools for your needs and ensure everything runs smoothly.',
    features: [
      'Full Office suite installation',
      'License activation support',
      'Configuration and customization',
      'Template setup',
      'Basic training included',
      'Troubleshooting support'
    ]
  },
  {
    icon: '⬇️',
    title: 'Internet Download Manager',
    description:
      'IDM installation and setup for enhanced download management and lifetime usage.',
    details:
      'Maximize your download speeds with properly configured Internet Download Manager. Includes installation, activation, and optimization for seamless downloading experience.',
    features: [
      'Full IDM installation',
      'Browser integration',
      'Download speed optimization',
      'Scheduler configuration',
      'Category management setup',
      'Lifetime activation'
    ]
  },
  {
    icon: '🤖',
    title: 'AI Image Editing',
    description:
      'AI-powered image editing and enhancement using advanced prompting techniques.',
    details:
      'Leverage cutting-edge AI tools to enhance, restore, or completely transform your images. From background removal to creative edits, I use advanced AI techniques to achieve professional results.',
    features: [
      'Background removal and replacement',
      'Image upscaling and enhancement',
      'Object removal and addition',
      'Style transfer and artistic effects',
      'Photo restoration',
      'AI-generated variations'
    ]
  },
  {
    icon: '⚙️',
    title: 'Backend Development',
    description:
      'Server-side application development using Node.js, Laravel, and database management.',
    details:
      'Build robust, scalable backend systems with modern frameworks and best practices. From REST APIs to complex database architectures, I deliver reliable server-side solutions.',
    features: [
      'RESTful API development',
      'Database design and optimization',
      'Authentication and authorization',
      'Third-party integrations',
      'Performance optimization',
      'Security best practices'
    ]
  },
  {
    icon: '🎨',
    title: 'Frontend Development',
    description:
      'User interface development using React, Vue.js, and modern web technologies.',
    details:
      'Create beautiful, interactive user interfaces that provide excellent user experiences. I specialize in modern JavaScript frameworks and responsive design principles.',
    features: [
      'Component-based architecture',
      'State management solutions',
      'Responsive layouts',
      'Animation and transitions',
      'Performance optimization',
      'Cross-browser compatibility'
    ]
  },
  {
    icon: '📊',
    title: 'Data Analytics & Visualization',
    description:
      'Data analysis and visualization using Jupyter notebooks and various analytical tools.',
    details:
      'Transform raw data into actionable insights with comprehensive analysis and stunning visualizations. I use Python, Jupyter, and modern BI tools to help you understand your data.',
    features: [
      'Exploratory data analysis',
      'Statistical modeling',
      'Interactive dashboards',
      'Custom visualizations',
      'Report generation',
      'Data cleaning and preprocessing'
    ]
  },
  {
    icon: '📋',
    title: 'Document Merging',
    description:
      'Automated document merging and generation using Autocrat and other tools.',
    details:
      'Automate repetitive document creation tasks with mail merge and template-based generation. Perfect for certificates, letters, reports, and bulk document production.',
    features: [
      'Google Sheets integration',
      'Template customization',
      'Bulk document generation',
      'PDF export automation',
      'Email distribution',
      'Custom field mapping'
    ]
  },
  {
    icon: '🎬',
    title: 'Video & Photo Editing',
    description:
      'Professional video and photo editing services for personal and business needs.',
    details:
      'Professional editing services for videos and photos that capture attention and tell your story. From social media content to corporate videos, I deliver polished results.',
    features: [
      'Color grading and correction',
      'Audio enhancement',
      'Motion graphics and effects',
      'Multi-format export',
      'Social media optimization',
      'Professional retouching'
    ]
  },
  {
    icon: '📝',
    title: 'Documentation Services',
    description:
      'Technical writing, documentation creation, and content development services.',
    details:
      'Clear, comprehensive documentation that helps users understand and use your products effectively. I create user guides, API docs, and technical specifications.',
    features: [
      'User manuals and guides',
      'API documentation',
      'Process documentation',
      'Knowledge base creation',
      'Style guide development',
      'Content organization'
    ]
  },
  {
    icon: '🎨',
    title: 'Canva Portfolio Builder',
    description:
      'Creative portfolio design and development using Canva for visual impact.',
    details:
      'Design stunning visual portfolios using Canva\'s powerful tools. Perfect for creatives who want a beautiful, shareable portfolio without coding.',
    features: [
      'Custom template design',
      'Brand identity integration',
      'Multiple page layouts',
      'Export in various formats',
      'Mobile-friendly designs',
      'Easy updating and maintenance'
    ]
  },
  {
    icon: '🌐',
    title: 'Google Sites Portfolio',
    description:
      'Simple and effective portfolio websites using Google Sites platform.',
    details:
      'Create professional portfolio websites using Google Sites - perfect for quick deployment with Google Workspace integration. No coding required.',
    features: [
      'Drag-and-drop editing',
      'Google Workspace integration',
      'Custom domain support',
      'Mobile responsive',
      'Free hosting',
      'Collaboration features'
    ]
  }
]

const logHoverEnter = (title) => {
  console.log('[Services] Hover enter:', title)
}

const logHoverLeave = (title) => {
  console.log('[Services] Hover leave:', title)
}

const handleCardActivate = (service, source) => {
  console.log('[Services] Card activated:', service.title, `via ${source}`)
  selectedService.value = service
  dialogOpen.value = true
}
</script>

<style scoped>
.transition-ease {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.services-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.services-card--hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 28px 56px rgba(15, 23, 42, 0.25);
}

.v-theme--dark .services-card--hover {
  box-shadow: 0 28px 56px rgba(5, 9, 20, 0.5);
}

.services-avatar {
  font-size: 1.75rem;
}

.services-link {
  color: #0091ea;
  text-decoration: none;
  font-weight: 600;
}

.services-link:hover {
  text-decoration: underline;
}

.service-details {
  line-height: 1.7;
}

.service-features {
  list-style: none;
  padding-left: 0;
}

.service-features li {
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
}

.service-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #0091ea;
  font-weight: bold;
}

.gap-2 {
  gap: 0.5rem;
}
</style>
