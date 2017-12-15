import 'core-js'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './app'
import ElementUI from 'element-ui'
import 'common/utils/hmr-events'
import 'common/assets/console-common-style'
import './assets/styles/index.css'
import { Message } from 'element-ui'
import Help from 'common/utils/help'

Vue.use(ElementUI)

// 对IE浏览器下的setInterval方法添加可以传参的兼容代码
Help.intervalAddParam()

Vue.prototype.$message = Message
Vue.prototype.windowMessage = function(res, correctValue, errorValue) {
  let correctMessage
  let errorMessage
  if (correctValue) {
    correctMessage = correctValue
  } else {
    correctMessage = res.status.message
  }
  if (errorValue) {
    errorMessage = errorValue
  } else {
    errorMessage = res.status.message
  }
  if (res && res.status.code === 200) {
    this.$message({
      showClose: true,
      message: correctMessage,
      type: 'success'
    })
  } else {
    this.$message({
      showClose: true,
      message: errorMessage,
      type: 'error'
    })
  }
}

const app = new Vue({
  el: '#root',
  store,
  router,
  components: {
    App
  },
  render: h => h(App)
})
