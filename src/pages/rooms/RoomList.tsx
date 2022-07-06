import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ListTools } from '../../shared/components'
import { useDebounce } from '../../shared/hooks'
import { LayoutDefaultOfPage } from '../../shared/layouts'
import { IRoomList, RoomService } from '../../shared/services/api/rooms/RoomService'


export const RoomList: React.FC = () =>  {
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce()

  const [ rows, setRows ] = useState<IRoomList[]>([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ totalCount, setTotalCount ] = useState(0)

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      RoomService.getAll(1, search)
        .then((result) => {
          setIsLoading(false)
          if (result instanceof Error) {
            alert(result.message)
          } else {
            setRows(result.data)
            setTotalCount(result.totalCount)
          }
        })
    })
  }, [search])

  return (
    <LayoutDefaultOfPage
      title="Salas"
      toolBar={
        <ListTools
          textButton='Nova'
          searchText={search}
          showSearchInput
          onChangeSearchText={text => setSearchParams({search: text}, {replace: true})}
        />
      }
    >
      {rows.map(row => (
        <Box
          display='flex'
          flexDirection='row'
          alignContent='flex-start'
          gap={2}
          sx={{
            m: 1,
            // width: '50%',
            // height: '50%'
          }}
          key={row.id}
        >
          <Card
            sx={ smDown
              ? { width: theme.spacing(50), height: theme.spacing(50) }
              : { width: theme.spacing(40), height: theme.spacing(60) }
            }
          >
            <CardHeader
              avatar={
                <Avatar
                  src={row.user.avatar}
                  variant='square'
                  sx={ smDown
                    ? { width: theme.spacing(5), height: theme.spacing(5) }
                    : { width: theme.spacing(5), height: theme.spacing(5) }
                  }
                />
              }
              action={
                <IconButton>
                  <Icon>more_horiz</Icon>
                </IconButton>
              }
              title={row.name}
              subheader={row.systemType}
            />
            <CardMedia
              component='img'
              src={row.cape}
              sx={smDown
                ? { height: theme.spacing(3) }
                : { height: theme.spacing(20) }
              }
            />

            <CardContent
              sx={smDown
                ? { height: theme.spacing(3) }
                : { height: theme.spacing(20) }
              }
            >
              <Typography
                variant='button'
                color='text.primary'
              >
                {row.description}
              </Typography>
            </CardContent>

            <CardActions>
              <IconButton>
                <Icon>star_border</Icon>
              </IconButton>
              {row.roomPassword && (
                <Icon>lock</Icon>
              )}
              <IconButton>
                <Icon>login</Icon>
              </IconButton>
              <IconButton>
                <Icon>meeting_room</Icon>
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      ))}
    </LayoutDefaultOfPage>
  )
}
