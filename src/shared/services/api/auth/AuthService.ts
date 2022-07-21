import { Api } from '../axios-config'


interface IAuth {
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
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao logar.')
  }
}

export const AuthService = {
  auth
}
