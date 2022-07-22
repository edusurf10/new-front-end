import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { ReactNode, useState } from 'react'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'
import { useAppThemeContext, useAuthContext, useDrawerContext } from '../../contexts'

interface ILateralMenuProps {
  children?: ReactNode
}

interface IListItemLinkProps {
  children?: ReactNode,
  label: string,
  icon: string,
  to: string,
  onClick?: () => void
}

export const ListItemLink: React.FC<IListItemLinkProps> = ({icon, label, onClick, to}) => {
  const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)
  const match = useMatch({path: resolvedPath.pathname, end: false})

  const handleClick = () => {
    navigate(to)
    onClick?.()
  }

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

export const LateralMenu: React.FC<ILateralMenuProps> = ({ children }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()
  const { toggleTheme, themeName } = useAppThemeContext()
  const { logout } = useAuthContext()

  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  const handleLogout = () => {
    setIsLoading(true)
    logout().then(() => {
      setIsLoading(false)
    })
  }

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
          <Box
            width='100%'
            height={theme.spacing(20)}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Avatar
              src='https://avatars.cloudflare.steamstatic.com/0d49b0f8d2e9db17d1de7d0588a610db393cbe6b_full.jpg'
              sx={{
                height: theme.spacing(12),
                width: theme.spacing(12)
              }}
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map(drawerOption => (
                <ListItemLink
                  key={drawerOption.path}
                  label={drawerOption.label}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component='nav'>

              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>{themeName === 'dark' ? 'light_mode' : 'dark_mode'}</Icon>
                </ListItemIcon>
                <ListItemText primary={themeName === 'dark' ? 'Claro' : 'Escuro'} />
              </ListItemButton>

              <ListItemButton onClick={handleLogout} disabled={isLoading}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                {isLoading ? (
                  <>
                    <ListItemText primary='Saindo...' />
                    <ListItemIcon>
                      <CircularProgress
                        size={28}
                      />
                    </ListItemIcon>
                  </>
                ) : (
                  <ListItemText primary='Sair' />
                )}
              </ListItemButton>

            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        { children }
      </Box>
    </>
  )
}
