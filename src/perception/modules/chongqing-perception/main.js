import 'core-js'
import Vue from 'vue'
import App from './app'
import { Tooltip } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'swiper/dist/css/swiper.min.css'
import './assets/style/index.css'
import { JSONP } from 'common/assets/js/normal'
import { PRECEPTION_URL } from 'common/config/interceptor'
import Perception from './resource/perception'
import SourceWebResource from 'src/website/static/js/SourceWebResource'

Vue.use(Tooltip)

JSONP.getJSON(
  PRECEPTION_URL + '/api/sso/V4/attach',
  {
    callback: '?'
  },
  (json, code) => {
    if (code && (code === 200 || code === 204)) {
      SourceWebResource.getUserInfo()
        .then(response => {
          if (!response.data.email) {
            window.location.href = '/login'
          } else {
            Perception.getTackInfo()
              .then(res => {
                const Status = res.data.status.code
                if (Status) {
                  const app = new Vue({
                    el: '#root',
                    components: {
                      App
                    },
                    render: h => h(App),
                    data: {
                      eventHub: new Vue()
                    }
                  })
                }
              })
              .catch(res => {
                window.location.href = '/'
              })
          }
        })
        .catch(res => {
          window.location.href = '/'
        })
    }
  }
)
