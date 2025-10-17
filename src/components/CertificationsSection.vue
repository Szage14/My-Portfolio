<template>
  <section id="certifications" class="py-16 md:py-24 bg-white transition-colors duration-500">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-stone-900 section-title mb-12 transition-colors duration-500">Certifications</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <a
          v-for="cert in certificates"
          :key="cert.filename"
          :href="cert.href"
          target="_blank"
          rel="noopener noreferrer"
          class="block bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <img :src="cert.imgSrc" :alt="cert.alt" class="w-full h-auto rounded-lg mb-2">
          <p class="text-center text-sm font-semibold text-stone-700 group-hover:text-teal-600 transition-colors duration-300">{{ cert.label }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const baseUrl = import.meta.env.BASE_URL

const encodeAsset = (filename) => `${baseUrl}assets/${encodeURI(filename)}`

const certificates = [
  {
    label: 'Introduction to C',
    filename: 'C INTRO CERT.jpg',
    alt: 'Introduction to C Certificate'
  },
  {
    label: 'Introduction to CSS',
    filename: 'CSS INTRO CERT.png',
    alt: 'Introduction to CSS Certificate'
  },
  {
    label: 'Introduction to HTML',
    filename: 'HTML INTRO CERT.png',
    alt: 'Introduction to HTML Certificate'
  },
  {
    label: 'Introduction to JavaScript',
    filename: 'JS INTRO CERT.png',
    alt: 'Introduction to JavaScript Certificate'
  },
  {
    label: 'JavaScript Intermediate',
    filename: 'JS INTERMEDIATE CERT.jpg',
    alt: 'JavaScript Intermediate Certificate'
  },
  {
    label: 'Introduction to SQL',
    filename: 'SQL INTRO CERT.jpg',
    alt: 'Introduction to SQL Certificate'
  },
  {
    label: 'Networking Basics (Cisco)',
    filename: 'networking-basics cert.png',
    alt: 'Networking Basics Certificate'
  }
].map((item) => ({
  ...item,
  href: encodeAsset(item.filename),
  imgSrc: encodeAsset(item.filename)
}))
</script>