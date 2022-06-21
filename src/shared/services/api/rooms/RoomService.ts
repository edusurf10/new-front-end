import { Api } from '../axios-config'


interface IRoomList {
  id: number
  name: string
  description: string
  systemType: string
  maxUser: number
  cape: string
  roomState: string
  tableState: string
  userId: number
}

interface IShowRoom {
  id: number
  name: string
  description: string
  systemType: string
  maxUser: number
  cape: string
  roomState: string
  tableState: string
  userId: number
}

type TRoomListWithTotalCount = {
  data: IRoomList[];
  totalCount: number;
}

const getAll = async (): Promise<TRoomListWithTotalCount | Error> => {
  try {
    const url = '/rooms'

    const { data } = await Api.get<IRoomList[]>(url)

    if (data) {
      return {
        data,
        totalCount: data.length
      }
    }

    return new Error('Erro ao listar as salas.')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao listar as salas.')
  }
}

const getById = async (id: number): Promise<IShowRoom | Error> => {
  try {
    const { data } = await Api.get<IShowRoom>(`/rooms/${id}`)

    if (data) {
      return data
    }

    return new Error('Erro ao buscar dados da sala.')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao buscar dados da sala.')
  }
}

const create = async (payload: Omit<IShowRoom, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IShowRoom>('/rooms', payload)

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar sala.')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao criar sala.')
  }
}

const updateById = async (id: number, payload: IShowRoom): Promise<void | Error> => {
  try {
    await Api.put(`/rooms/${id}`, payload)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao atualizar sala.')
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/rooms/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar sala.')
  }
}

export const RoomService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
}