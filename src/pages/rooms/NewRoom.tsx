import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, CircularProgress, Grid, Icon, IconButton, MenuItem, Paper, Typography } from '@mui/material'
import * as yup from 'yup'

import { DetailTools } from '../../shared/components'
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms'
import { LayoutDefaultOfPage } from '../../shared/layouts'
import { IRoomCreate, RoomService } from '../../shared/services/api/rooms/RoomService'

const formValidationSchema: yup.SchemaOf<IRoomCreate> = yup.object().shape({
  name: yup.string().required().max(30),
  description: yup.string().required().max(150),
  longDescription: yup.string().max(20000),
  systemType: yup.string().required().max(30),
  maxUser: yup.string().required(),
  cape: yup.string().url().matches(/(.png|.jpeg|.jpg)$/, { message: 'A URL deve terminar com .png ou .jpg ou .jpeg', excludeEmptyString: true }),
  roomPassword: yup.string().max(12)
})

export const NewRoom: React.FC = () =>  {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ showPassword, setShowPassword ] = useState(false)
  const { formRef, saveAndJoin, saveAndBack, isSaveAndJoin, isSaveAndBack } = useVForm()
  const navigate = useNavigate()

  const selectUsers = [
    {
      value: '2',
      label: '2'
    },
    {
      value: '5',
      label: '5',
    },
    {
      value: '10',
      label: '10',
    },
    {
      value: '15',
      label: '15',
    },
    {
      value: '20',
      label: '20',
    },
    {
      value: '25',
      label: '25',
    }
  ]

  const handleSave = (payload: IRoomCreate) => {
    formValidationSchema
      .validate(payload, { abortEarly: false })
      .then((payloadValidated) => {
        setIsLoading(true)
        RoomService
          .create(payloadValidated)
          .then((result) => {
            setIsLoading(false)
            if (result instanceof Error) {
              alert(result.message)
            } else {
              if (isSaveAndJoin()) {
                navigate(`/rooms/${result}`)
              }
              if (isSaveAndBack()) {
                navigate('/rooms')
              }
            }
          })
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {}

        errors.inner.forEach((error) => {
          if (!error.path) return

          validationErrors[error.path] = error.message
        })

        formRef.current?.setErrors(validationErrors)
      })
  }

  return (
    <LayoutDefaultOfPage
      title="Criação de Sala"
      toolBar={
        <DetailTools
          showButtonNew={false}
          showButtonSave={false}
          showButtonDelete={false}

          onClickBack={() => navigate('/rooms')}
          onClickSaveAndJoin={saveAndJoin}
          onClickSaveAndBack={saveAndBack}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display='flex'
          flexDirection='column'
          component={Paper}
          variant='outlined'
        >
          <Grid container direction='column' padding={2} spacing={2}>
            {isLoading ? (
              <Grid item xl={12} textAlign='center'>
                <CircularProgress />
              </Grid>
            ) : (
              <>
                <Grid item>
                  <Typography variant='h6'>Dados da nova sala</Typography>
                </Grid><Grid container item direction='row' spacing={2}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <VTextField
                      fullWidth
                      label='Nome da sala'
                      name="name"
                      tips='O nome da sua sala.'
                      placement='top'
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <VTextField
                      fullWidth
                      label='Tipo de sistema'
                      name="systemType"
                      tips='O sistema que você irá usar.'
                      placement='top'
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <VTextField
                      fullWidth
                      select
                      label='Numero máximo de usuarios'
                      name="maxUser"
                      tips='Quantos jogadores são permitidos na sala. Incluindo expectadores.'
                      placement='top'
                      value={selectUsers}
                      defaultValue={selectUsers}
                    >
                      {selectUsers.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </VTextField>
                  </Grid>
                </Grid><Grid container item direction='row' spacing={2}>
                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <VTextField
                      fullWidth
                      multiline
                      maxRows={6}
                      minRows={6}
                      label='Descrição curta'
                      name="description"
                      tips='Uma introdução breve sobre o mundo do seu RPG.'
                      placement='bottom'
                    />
                  </Grid>
                  <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                    <VTextField
                      fullWidth
                      multiline
                      maxRows={6}
                      minRows={6}
                      label='Descrição completa'
                      name="longDescription"
                      tips='Descreva o seu mundo de RPG em até 20.000 caracteres'
                      placement='bottom'
                    />
                  </Grid>
                </Grid><Grid container item direction='row'>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <VTextField
                      fullWidth
                      label='URL da imagem de capa'
                      name="cape"
                      tips='A imagem que será a capa da sua sala.'
                      placement='bottom'
                    />
                  </Grid>
                </Grid><Grid container item direction='row'>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <VTextField
                      fullWidth
                      label='Senha da sala'
                      name="roomPassword"
                      tips='Escolha uma senha para permitir a entrada somente dos seus amigos.'
                      placement='bottom'
                      type={showPassword ? 'text' : 'password'}
                      onKeyDown={() => {
                        setShowPassword(true)
                      }}
                      onKeyUp={() => {
                        setShowPassword(false)
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4} alignContent='center' alignItems='center' display='flex'>
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Icon>visibility_off</Icon> : <Icon>visibility</Icon>}
                    </IconButton>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </VForm>
    </LayoutDefaultOfPage>
  )
}
