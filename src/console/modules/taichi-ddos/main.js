import 'core-js'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './app'
import Product from './product'
import ElementUI from 'element-ui'
import 'common/utils/hmr-events'
import 'common/assets/console-common-style'
import './assets/styles/index.css'
import TaichiResource from './resource/TaichiResource'
import CommonResource from 'common/resource/CommonResource'
import Help from 'src/common/utils/help'

Vue.use(ElementUI)

const drawing = () =>
  CommonResource.judgeServe().then(res => {
    const status = res.data.data.items.taijikangd_web.status
    const isServe = status
    const BLOATED = isServe ? App : Product
    const app = new Vue({
      el: '#root',
      store,
      router,
      components: {
        BLOATED
      },
      render: h => h(BLOATED)
    })
  })

const initInstance = async () => {
  await Help.verdictLogin()
  await TaichiResource.getDomainList().then(res => {})
  await drawing()
}

initInstance()
