import { AxiosResponse } from 'axios'

export const responseInterceptor = (response: AxiosResponse) => {
  if (response.config.url === '/auth/sign_in') {
    localStorage.setItem('uid',          response.headers['uid'])
    localStorage.setItem('client',       response.headers['client'])
    localStorage.setItem('expiry',       response.headers['expiry'])
    localStorage.setItem('accessToken',  response.headers['accessToken'])
  }

  if (response.config.url === '/auth/sign_out') {
    localStorage.removeItem('uid')
    localStorage.removeItem('client')
    localStorage.removeItem('expiry')
    localStorage.removeItem('accessToken')
  }

  return response
}
