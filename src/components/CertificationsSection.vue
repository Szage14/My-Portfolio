<template>
  <v-container id="certifications" class="py-16">
    <h2 class="text-h4 font-weight-bold mb-8 text-center text-teal-darken-2">Certifications</h2>

    <!-- Complete certifications from legacy with proper image paths -->
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="(cert, i) in certifications" :key="i">
        <v-card 
          variant="outlined" 
          class="cert-card" 
          elevation="2"
          :href="cert.image"
          target="_blank"
        >
          <v-img
            :src="cert.image"
            :alt="cert.title"
            aspect-ratio="1"
            cover
            class="cert-image"
          />
          <v-card-text class="text-center">
            <p class="text-body-2 font-weight-medium">{{ cert.title }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const certifications = [
  { title: 'Introduction to C', image: '/my portfolio/legacy/assets/C INTRO CERT.jpg' },
  { title: 'Introduction to CSS', image: '/my portfolio/legacy/assets/CSS INTRO CERT.png' },
  { title: 'Introduction to HTML', image: '/my portfolio/legacy/assets/HTML INTRO CERT.png' },
  { title: 'Introduction to JavaScript', image: '/my portfolio/legacy/assets/JS INTRO CERT.png' },
  { title: 'JavaScript Intermediate', image: '/my portfolio/legacy/assets/JS INTERMEDIATE CERT.jpg' },
  { title: 'Introduction to SQL', image: '/my portfolio/legacy/assets/SQL INTRO CERT.jpg' },
  { title: 'Networking Basics (Cisco)', image: '/my portfolio/legacy/assets/networking-basics cert.png' },
]
</script>

<style scoped>
.cert-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.cert-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 32px rgba(13, 148, 136, 0.3) !important;
}

.cert-image {
  border-bottom: 2px solid #14b8a6;
}
</style>
