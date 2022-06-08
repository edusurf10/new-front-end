import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3fbf04',
      dark: '#009600',
      light: '#00c800',
      contrastText: '#ffffff',
    },
    secondary: {
      main: grey[500],
      dark: grey[400],
      light: grey[300],
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f7f6f3'
    }
  }
})