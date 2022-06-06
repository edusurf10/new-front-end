import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface IDrawerContextData {
  isDrawerOpen?: boolean
  toggleDrawerOpen?: () => void
  children?: ReactNode
}

const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
  return useContext(DrawerContext)
}

export const DrawerProvider: React.FC<IDrawerContextData> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldIsDrawerOpen => !oldIsDrawerOpen)
  }, [])


  return (
    <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen}}>
      { children }
    </DrawerContext.Provider>
  )
}