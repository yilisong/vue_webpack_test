import axios from 'axios'
import nprogress from 'nprogress'
import { BASE_URL } from 'common/config/interceptor'

const specialFinanceResource = axios.create({
  baseURL: BASE_URL
})

specialFinanceResource.interceptors.request.use(
  config => {
    nprogress.start()
    return config
  },
  error => Promise.reject(error)
)

specialFinanceResource.interceptors.response.use(
  response => {
    nprogress.done()
    return response
  },
  error => Promise.reject(error)
)

export default {
  getApplyInfo: params =>
    specialFinanceResource.get('/V4/finance.invoice.applyInfo', {
      params: {
        ...params
      }
    })
}
