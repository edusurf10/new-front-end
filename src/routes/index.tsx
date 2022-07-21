import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Contact, Dashboard, Home, NewRoom, RoomList } from '../pages'
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
        label: 'Contato',
        icon: 'phone',
        path: '/contact'
      },
      {
        label: 'Painel de controle',
        icon: 'settings',
        path: '/panel'
      }
    ])
  }, [])

  return (
    <Routes>
      <Route path='/home' element={<Home />} />

      <Route path='/rooms' element={<RoomList />} />
      <Route path='/rooms/new' element={<NewRoom />} />
      <Route path='/rooms/:id' element={<h1>Tela do jogo</h1>} />

      <Route path='/contact' element={<Contact />} />

      <Route path='/panel' element={<Dashboard />} />

      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  )
}
