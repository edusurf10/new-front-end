import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
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
      default: '#303134',
      paper: '#202124'
    }
  },
  typography: {
    allVariants: {
      color: 'white'
    }
  }
})