import { AxiosRequestConfig } from 'axios'

export const requestInterceptor = (request: AxiosRequestConfig) => {
  if (request.url === '/auth/sign_in') return request

  request.headers = {
    ...request.headers,
    uid: localStorage.getItem('uid') || '',
    client: localStorage.getItem('client') || '',
    accessToken: localStorage.getItem('accessToken') || '',
    expiry: localStorage.getItem('expiry') || ''
  }
  return request
}
