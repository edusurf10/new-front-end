import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Icon, IconButton, Pagination, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ListTools } from '../../shared/components'
import { Environment } from '../../shared/environment'
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

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1')
  }, [searchParams])

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      RoomService
        .getAll(page, 10, search)
        .then((result) => {
          setIsLoading(false)
          if (result instanceof Error) {
            alert(result.message)
          } else {
            setRows(result.rooms)
            setTotalCount(result.totalCount)
          }
        })
    })
  }, [search, page])

  return (
    <LayoutDefaultOfPage
      title="Salas"
      toolBar={
        <ListTools
          textButton={smDown ? 'Criar' : 'criar sala' }
          onClickButton={() => navigate('/rooms/new')}
          searchText={search}
          showSearchInput
          onChangeSearchText={text => setSearchParams({search: text, page: '1'}, {replace: true})}
        />
      }
    >
      { isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        rows.map(row => (
          <Box
            display='inline-flex'
            flexDirection='row'
            sx={{
              m: 1,
            }}
            key={row.id}
          >
            <Card
              sx={ smDown
                ? { width: 'auto', height: theme.spacing(60) }
                : { width: theme.spacing(39.7), height: theme.spacing(60) }
              }
              variant='outlined'
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
                  ? { height: theme.spacing(20) }
                  : { height: theme.spacing(20) }
                }
              />

              <CardContent
                sx={smDown
                  ? { height: theme.spacing(20) }
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
                {row.roomPassword && (
                  <Tooltip title='Sala com senha'>
                    <Icon>lock</Icon>
                  </Tooltip>
                )}
                {row.roomState === 'aberta' ? (
                  <Tooltip title='Sala aberta'>
                    <Icon>meeting_room</Icon>
                  </Tooltip>
                ) : (
                  <Tooltip title='Sala fechada'>
                    <Icon>no_meeting_room</Icon>
                  </Tooltip>
                )}
                <Box
                  flex={1}
                  display='flex'
                  justifyContent='end'
                >
                  <Tooltip title='Adicionar aos favoritos'>
                    <IconButton>
                      <Icon>star_border</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Entrar na sala'>
                    <IconButton
                      onClick={() => navigate(`/rooms/${row.id}`)}
                    >
                      <Icon>login</Icon>
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))
      )}
      {totalCount === 0 && !isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <caption>{Environment.EMPTY_LIST}</caption>
        </Box>
      )}

      {totalCount > 0 && totalCount > Environment.LINE_LIMIT && !isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Pagination
            page={page}
            count={Math.ceil(totalCount / Environment.LINE_LIMIT)}
            onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
          />
        </Box>
      )}
    </LayoutDefaultOfPage>
  )
}
