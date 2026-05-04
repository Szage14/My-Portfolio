<template>
  <section id="resume" class="resume-wrapper surface-gradient-light transition-colors duration-500">
    <v-container class="py-12">
      <v-row justify="center" class="mb-6">
        <v-col cols="12" md="10" lg="9">
          <v-card class="glass-panel pa-6 pa-md-8" rounded="xl" variant="flat">
            <div class="text-center mb-6">
              <p class="text-overline letter-spacing-2 home-about-accent mb-2">Resume</p>
              <h2 class="text-h4 text-md-h3 font-weight-bold mb-2">Cristian Jay T. Buquis</h2>
              <p class="text-h6 font-weight-medium text-medium-emphasis mb-2">BS Information Systems Graduate | Web Developer</p>
              <p class="text-body-2 text-medium-emphasis">Buenavista, Agusan del Norte, Caraga, Philippines</p>
              <p class="text-body-2 text-medium-emphasis">Email: cjbuquis@gmail.com</p>
            </div>

            <v-divider class="mb-6" />

            <div class="mb-6">
              <h3 class="text-h6 font-weight-bold mb-3">Professional Summary</h3>
              <p class="text-body-1 text-medium-emphasis mb-3">
                Results-driven Bachelor of Science in Information Systems graduate with practical experience in web development,
                backend systems, database management, project monitoring solutions, and operational workflows.
              </p>
              <p class="text-body-1 text-medium-emphasis mb-3">
                Skilled in Vue.js, Strapi, PostgreSQL, Node.js, Express.js, PM2, Git, GitHub, and deployment workflows.
                Experienced in building real-world systems such as project monitoring platforms, tourism mapping portals,
                and inventory management interfaces.
              </p>
              <p class="text-body-1 text-medium-emphasis">
                Strong foundation in API integration, JWT authentication, CRUD operations, SDLC, and User Acceptance Testing,
                with a focus on practical systems that solve actual business problems.
              </p>
            </div>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <h3 class="text-h6 font-weight-bold mb-3">Personal Information</h3>
                <ul class="resume-list">
                  <li><strong>Full Name:</strong> Cristian Jay T. Buquis</li>
                  <li><strong>Role:</strong> BS Information Systems Graduate | Web Developer</li>
                  <li><strong>Career Focus:</strong> Web Development, Information Systems, IT Support, Frontend Systems</li>
                </ul>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="text-h6 font-weight-bold mb-3">Education</h3>
                <p class="text-body-1 font-weight-medium mb-1">Caraga State University - Main Campus</p>
                <p class="text-body-2 text-medium-emphasis mb-1">Bachelor of Science in Information Systems</p>
                <p class="text-body-2 text-medium-emphasis">Graduated: June 19, 2025</p>
              </v-col>
            </v-row>

            <div class="mb-6">
              <h3 class="text-h6 font-weight-bold mb-3">Work Experience</h3>

              <p class="text-body-1 font-weight-medium mb-1">Stock Clerk</p>
              <p class="text-body-2 text-medium-emphasis mb-1">Star Appliance Center Inc. (SM Appliance / SACI) - SM City Butuan</p>
              <p class="text-body-2 text-medium-emphasis mb-2">November 28, 2025 - April 28, 2026</p>
              <ul class="resume-list mb-4">
                <li>Managed warehouse inventory monitoring and stock movement operations.</li>
                <li>Maintained accurate stock records and inventory reconciliation.</li>
                <li>Coordinated with warehouse and sales teams for stock transfers and availability.</li>
                <li>Assisted in stock audits and daily inventory reporting processes.</li>
                <li>Improved warehouse organization and operational workflow efficiency.</li>
              </ul>

              <p class="text-body-1 font-weight-medium mb-1">Intern - Project Monitoring System Development</p>
              <p class="text-body-2 text-medium-emphasis mb-2">Internship Experience</p>
              <ul class="resume-list">
                <li>Developed a Project Monitoring System using Vue.js 2, Strapi, PostgreSQL, Node.js, and Express.js.</li>
                <li>Built frontend interfaces using Vuetify and Bootstrap.</li>
                <li>Handled backend API integration and authentication using Strapi JWT.</li>
                <li>Used PM2 for managing Node.js processes and deployment preparation.</li>
                <li>Worked on database handling, troubleshooting, and system improvements for future integration.</li>
              </ul>
            </div>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <h3 class="text-h6 font-weight-bold mb-3">Technical Skills</h3>
                <ul class="resume-list">
                  <li><strong>Frontend:</strong> Vue.js, React, Vuetify, Bootstrap, HTML, CSS, JavaScript</li>
                  <li><strong>Backend:</strong> Node.js, Express.js, Strapi, Laravel</li>
                  <li><strong>Database:</strong> PostgreSQL</li>
                  <li><strong>Tools:</strong> PM2, Git, GitHub, VS Code</li>
                </ul>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="text-h6 font-weight-bold mb-3">Development Focus</h3>
                <ul class="resume-list">
                  <li>API Integration and JWT Authentication</li>
                  <li>CRUD Operations and SDLC</li>
                  <li>User Acceptance Testing and stakeholder feedback</li>
                  <li>Troubleshooting and process improvement</li>
                </ul>
              </v-col>
            </v-row>

            <div class="mb-4">
              <h3 class="text-h6 font-weight-bold mb-3">Projects</h3>
              <ul class="resume-list">
                <li>Project Monitoring System</li>
                <li>Caraga Heritage Sites and Tourist Spots Interactive Map Portal</li>
                <li>Inventory Management Interface</li>
                <li>Portfolio Website</li>
                <li>React and Next.js Practice Projects</li>
                <li>Testimonial Component Integration using Strapi + PostgreSQL</li>
              </ul>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
</script>

<style scoped>
.resume-wrapper {
  position: relative;
}

.resume-list {
  margin: 0;
  padding-left: 1.2rem;
}

.resume-list li {
  margin-bottom: 0.45rem;
  line-height: 1.55;
}
</style>
