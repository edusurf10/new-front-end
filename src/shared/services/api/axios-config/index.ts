import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

import { errorInterceptor, responseInterceptor } from './interceptors'
import { Environment } from '../../../environment'

const Api = applyCaseMiddleware(
  axios.create({
    baseURL: Environment.BASE_URL
  })
)

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
)

export { Api }
