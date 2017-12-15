import axios from 'axios'
import Interceptor, { BASE_URL } from 'common/config/interceptor'

axios.defaults.timeout = 180000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const resources = {
  SourceUserResource: axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

const InterceptorWithProgress = new Interceptor({ progress: false })

for (const key of Object.keys(resources)) {
  resources[key].interceptors.request.use(
    ...InterceptorWithProgress.beforeRequest
  )
  // resources[key].interceptors.response.use(
  //   ...InterceptorWithProgress.afterResponse
  // )
}

export const { SourceUserResource } = resources
