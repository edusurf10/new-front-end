import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material'
import { Environment } from '../../environment'

interface IlistToolsProps {
  searchText?: string
  showSearchInput?: boolean
  onChangeSearchText?: (newText: string) => void
  textButton?: string
  showButton?: boolean
  onClickButton?: () => void
}

export const ListTools: React.FC<IlistToolsProps> = ({
  searchText = '',
  onChangeSearchText,
  showSearchInput = false,
  textButton = 'Adicionar',
  showButton = true,
  onClickButton
}) => {
  const theme = useTheme()

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
      {showSearchInput && (
        <TextField
          size='small'
          value={searchText}
          onChange={(e) => onChangeSearchText?.(e.target.value)}
          placeholder={Environment.SEARCH_INPUT}
        />
      )}
      <Box
        flex={1}
        display='flex'
        justifyContent='end'
      >
        {showButton && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={ onClickButton }
            startIcon={ <Icon>add</Icon> }
          >
            { textButton }
          </Button>
        )}
      </Box>
    </Box>
  )
}
