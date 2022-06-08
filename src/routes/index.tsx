import { Button } from '@mui/material'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages'
import { useDrawerContext } from '../shared/contexts'

export const AppRoutes = () => {

  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      { 
        label: 'Página inicial',
        icon: 'home',
        path: '/home'
      },
      { 
        label: 'Sobre',
        icon: 'info',
        path: '/about'
      },
      { 
        label: 'Contato',
        icon: 'phone',
        path: '/contact'
      }
    ])
  }, [])

  return (
    <Routes>
      <Route path='/home' element={<Dashboard />} />
      <Route path='/about' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}> Toggle Drawer Sobre</Button>} />
      <Route path='/contact' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}> Toggle Drawer Contato</Button>} />
      
      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  )
}
