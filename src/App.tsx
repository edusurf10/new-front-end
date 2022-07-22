import { BrowserRouter } from 'react-router-dom'

import './shared/forms/YupTranslation'

import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts'
import { LateralMenu, Login } from './shared/components'
import { AppRoutes } from './routes'

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <LateralMenu>
                <AppRoutes />
              </LateralMenu>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  )
}
