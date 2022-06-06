
import { BrowserRouter } from 'react-router-dom'

import { AppThemeProvider, DrawerProvider } from './shared/contexts'
import { LateralMenu } from './shared/components'
import { AppRoutes } from './routes'

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>

          <LateralMenu>
            <AppRoutes />
          </LateralMenu>

        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  )
}