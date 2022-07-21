import { useEffect, useState } from 'react'
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'

import { ListTools } from '../../shared/components'
import { LayoutDefaultOfPage } from '../../shared/layouts'
import { RoomService } from '../../shared/services/api/rooms/RoomService'


export const Home = () => {

  const [ isLoadingRooms, setIsLoadingRooms ] = useState(true)
  const [ totalCountRoom, setTotalCountRoom ] = useState(0)


  useEffect(() => {
    setIsLoadingRooms(true)
    RoomService
      .getAll(1, 10, '')
      .then((result) => {
        setIsLoadingRooms(false)
        if (result instanceof Error) {
          alert(result.message)
        } else {
          setTotalCountRoom(result.totalCount)
        }
      })
  }, [])



  return (
    <LayoutDefaultOfPage
      title='Página inicial'
      toolBar={
        <ListTools
          showButton={false}
        />
      }
    >
      <Box width='100%' display='flex'>
        <Grid container margin={1}>
          <Grid item container spacing={2}>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de contas
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h3'>
                      5000
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de salas
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h3'>
                      { isLoadingRooms ? <CircularProgress /> : totalCountRoom }
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </LayoutDefaultOfPage>
  )
}
