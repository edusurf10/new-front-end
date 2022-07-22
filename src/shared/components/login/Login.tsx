import * as yup from 'yup'
import { useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material'

import { useAuthContext } from '../../contexts'

const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
})

interface ILoginProps {
  children: React.ReactNode
}

export const Login: React.FC<ILoginProps> = ({children}) => {
  const { isAuthenticated, login } = useAuthContext()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = () => {
    setIsLoading(true)

    LoginSchema
      .validate({email, password}, {abortEarly: false})
      .then((payloadValidated) => {
        login(payloadValidated.email, payloadValidated.password)
          .then(() => {
            setIsLoading(false)
          })
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false)
        errors.inner.forEach((error) => {
          if (error.path === 'email') {
            setEmailError(error.message)
          } else if (error.path === 'password') {
            setPasswordError(error.message)
          }
        })
      })
  }

  if (isAuthenticated) return (
    <>{children}</>
  )

  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      {isLoading && (
        <CircularProgress />
      )}
      {!isLoading && (
        <Card>
          <CardContent>
            <Box
              display='flex'
              flexDirection='column'
              gap={2}
              width={300}
            >
              <Typography
                variant='h6'
                align='center'
              >
              Entre na aventura!
              </Typography>

              <TextField
                fullWidth
                label='Email'
                type='email'
                value={email}
                disabled={isLoading}
                error={!!emailError}
                helperText={emailError}
                onKeyDown={() => setEmailError('')}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                fullWidth
                label='Senha'
                type='password'
                value={password}
                disabled={isLoading}
                error={!!passwordError}
                helperText={passwordError}
                onKeyDown={() => setPasswordError('')}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box width='100%' display='flex' justifyContent='center'>
              <Button
                variant='contained'
                onClick={handleSubmit}
              >
              Entrar
              </Button>
            </Box>
          </CardActions>
        </Card>
      )}
    </Box>
  )
}
