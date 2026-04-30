// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const lightTheme = {
  dark: false,
  colors: {
    background: '#eef5ff',
    surface: 'rgba(255, 255, 255, 0.86)',
    'surface-variant': 'rgba(255, 255, 255, 0.72)',
    primary: '#18FFFF',
    secondary: '#008E9B',
    accent: '#40C4FF',
    info: '#4FC3F7',
    success: '#43A047',
    warning: '#FB8C00',
    error: '#E53935',
    'on-surface': '#102A43',
    outline: 'rgba(16, 42, 67, 0.22)',
  },
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#050914',
    surface: 'rgba(9, 17, 34, 0.72)',
    'surface-variant': 'rgba(13, 25, 48, 0.78)',
    primary: '#1A237E',
    secondary: '#18FFFF',
    accent: '#82B1FF',
    info: '#64B5F6',
    success: '#81C784',
    warning: '#FFD54F',
    error: '#EF5350',
    'on-surface': '#E8F1FF',
    outline: 'rgba(232, 241, 255, 0.18)',
  },
}


export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: { lightTheme, darkTheme },
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 2,
      darken: 2,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})
