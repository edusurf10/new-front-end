import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material'


interface IDetailToolsProps {
  textButtonNew?: string
  textButtonBack?: string
  textButtonSave?: string
  textButtonDelete?: string
  textButtonSaveAndBack?: string
  textButtonSaveAndJoin?: string

  showButtonNew?: boolean
  showButtonBack?: boolean
  showButtonSave?: boolean
  showButtonDelete?: boolean
  showButtonSaveAndBack?: boolean
  showButtonSaveAndJoin?: boolean

  showButtonLoadingNew?: boolean
  showButtonLoadingBack?: boolean
  showButtonLoadingSave?: boolean
  showButtonLoadingDelete?: boolean
  showButtonLoadingSaveAndBack?: boolean
  showButtonLoadingSaveAndJoin?: boolean

  onClickNew?: () => void
  onClickBack?: () => void
  onClickSave?: () => void
  onClickDelete?: () => void
  onClickSaveAndBack?: () => void
  onClickSaveAndJoin?: () => void
}

export const DetailTools: React.FC<IDetailToolsProps> = ({
  textButtonNew = 'Novo',
  textButtonBack = 'Voltar',
  textButtonSave = 'Salvar',
  textButtonDelete = 'Apagar',
  textButtonSaveAndBack = 'Salvar e voltar',
  textButtonSaveAndJoin = 'Salvar e entrar',

  showButtonNew = true,
  showButtonBack = true,
  showButtonSave = true,
  showButtonDelete = true,
  showButtonSaveAndBack = true,
  showButtonSaveAndJoin = true,

  showButtonLoadingNew = false,
  showButtonLoadingBack = false,
  showButtonLoadingSave = false,
  showButtonLoadingDelete = false,
  showButtonLoadingSaveAndBack = false,
  showButtonLoadingSaveAndJoin = false,

  onClickNew,
  onClickBack,
  onClickSave,
  onClickDelete,
  onClickSaveAndBack,
  onClickSaveAndJoin,

}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      component={Paper}
      alignItems='center'
      height={theme.spacing(5)}
      variant='outlined'
    >
      {(showButtonSave && !showButtonLoadingSave) && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={ onClickSave }
          startIcon={ !smDown && (<Icon>save</Icon>) }
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            { textButtonSave}
          </Typography>
        </Button>
      )}

      {showButtonLoadingSave && (
        <Skeleton width={110} height={60} />
      )}

      {(showButtonSaveAndJoin && !showButtonLoadingSaveAndJoin) && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={ onClickSaveAndJoin }
          startIcon={ <Icon>input</Icon> }
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            { textButtonSaveAndJoin }
          </Typography>
        </Button>
      )}

      {(showButtonSaveAndBack && !showButtonLoadingSaveAndBack && !mdDown && !smDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={ onClickSaveAndBack }
          startIcon={ <Icon>keyboard_return</Icon> }
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            { textButtonSaveAndBack }
          </Typography>
        </Button>
      )}

      {(showButtonLoadingSaveAndBack && !mdDown && !smDown) && (
        <Skeleton width={180} height={60} />
      )}

      {(showButtonDelete && !showButtonLoadingDelete) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={ onClickDelete }
          startIcon={ <Icon>delete</Icon> }
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            { textButtonDelete }
          </Typography>
        </Button>
      )}

      {showButtonLoadingDelete && (
        <Skeleton width={110} height={60} />
      )}

      {(showButtonNew && !showButtonLoadingNew && !smDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={ onClickNew }
          startIcon={ <Icon>add</Icon> }
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            { textButtonNew }
          </Typography>
        </Button>
      )}

      {(showButtonLoadingNew && !smDown) && (
        <Skeleton width={110} height={60} />
      )}

      {
        (showButtonBack &&
          (showButtonNew || showButtonDelete || showButtonSave || showButtonSaveAndBack)
        ) && (
          <Divider variant='middle' orientation='vertical' />
        )
      }

      {(showButtonBack && !showButtonLoadingBack) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={ onClickBack }
          startIcon={ <Icon>arrow_back</Icon> }
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            { textButtonBack }
          </Typography>
        </Button>
      )}

      {showButtonLoadingBack && (
        <Skeleton width={110} height={60} />
      )}

    </Box>
  )
}
