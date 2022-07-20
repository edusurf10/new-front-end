import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard, NewRoom, RoomList } from '../pages'
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
      <Route path='/home' element={<h1>Novidades em breve!</h1>} />

      <Route path='/rooms' element={<RoomList />} />
      <Route path='/rooms/new' element={<NewRoom />} />
      <Route path='/rooms/:id' element={<h1>Tela do jogo</h1>} />

      <Route path='/contact' element={<Dashboard />} />

      <Route path='/panel' element={<Dashboard />} />

      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  )
}
