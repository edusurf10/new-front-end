import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { ReactNode } from 'react'
import { useDrawerContext } from '../../contexts'

interface IPropsData {
  children?: ReactNode
}
export const LateralMenu: React.FC<IPropsData> = ({ children }) => {

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()

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
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary='Página inicial' />
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