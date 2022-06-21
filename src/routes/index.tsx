import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard, RoomList } from '../pages'
import { useDrawerContext } from '../shared/contexts'

export const AppRoutes = () => {

  const { setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      { 
        label: 'Página inicial',
        icon: 'home',
        path: '/home'
      },
      { 
        label: 'Salas',
        icon: 'room',
        path: '/rooms'
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
      <Route path='/rooms' element={<RoomList />} />
      <Route path='/about' element={<Dashboard />} />
      <Route path='/contact' element={<Dashboard />} />
      
      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  )
}
