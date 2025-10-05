// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#00897B',
          secondary: '#004D40',
          accent: '#26A69A',
        },
      },
      dark: {
        colors: {
          primary: '#80CBC4',
          secondary: '#004D40',
          accent: '#26A69A',
        },
      },
    },
  },
})
