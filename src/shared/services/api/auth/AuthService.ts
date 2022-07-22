import { Api } from '../axios-config'


export interface IAuth {
  data: {
    id: number
    provider: string
    uid: string
    allowPasswordChange: boolean
    name: string
    nickname: string
    image: string
    email: string
    vipType: string
    status: string
    observation: string
    avatar: string
    cellphone: string
    atlaaCoins: number
    favoriteRooms: [
      {
        id: number
        userId: number
        roomId: number
      }
    ]
  }
}

export interface ILogout {
  success: boolean
  errors: string[]
}

interface IPayloadLogin {
  email: string
  password: string
}

const auth = async (payload: IPayloadLogin): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post<IAuth>('/auth/sign_in', payload)

    if (data) {
      return data
    }

    return new Error('Erro ao logar.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao logar.')
  }
}

const logout = async (): Promise<ILogout | Error> => {
  try {
    const { data } = await Api.delete<ILogout>('/auth/sign_out')

    if (data.success) {
      return data
    }

    return new Error(data.errors[0])
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao sair.')
  }
}

export const AuthService = {
  auth,
  logout
}
