// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const lightTheme = {
  dark: false,
  colors: {
    background: '#f9fafb',
    surface: '#ffffff',
    primary: '#009688',
    secondary: '#004d40',
    accent: '#80cbc4',
    error: '#e53935',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ffb300',
  },
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#1e1e1e',
    primary: '#80cbc4',
    secondary: '#004d40',
    accent: '#009688',
    error: '#ef5350',
    info: '#64b5f6',
    success: '#81c784',
    warning: '#ffca28',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: { lightTheme, darkTheme },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})
