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
import 'whatwg-fetch'

Vue.use(ElementUI)

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

// import 'common/assets/console-common-style'
// import './assets/styles/index.css'
//
// import { Vue, VueRouter } from 'common/assets/console-common-script'
// import App from './app'
// import store from './store'
// import config from './config'

Vue.prototype.fetchGet = function(apiName, params = {}) {
  let searchParams = ''
  for (const key in params) {
    const value = params[key]
    searchParams += (searchParams === '' ? '?' : '&') + `${key}=${value}`
  }
  const opt = {
    method: 'GET',
    credentials: 'same-origin'
  }
  return fetch(process.env.API + apiName + searchParams, opt)
}

Vue.prototype.fetchPost = function(apiName, params = {}) {
  const postData = new FormData()
  for (const p in params) {
    postData.append(p, params[p])
  }
  return fetch(process.env.API + apiName, {
    method: 'POST',
    body: postData,
    credentials: 'same-origin'
  })
}

Vue.prototype.fetchPostJSON = function(apiName, params = {}) {
  return fetch(process.env.API + apiName, {
    method: 'POST',
    body: JSON.stringify(params),
    credentials: 'same-origin'
  })
}

// const router = new VueRouter({
//   routes: config.routes
// })
//
// const app = new Vue({
//   el: '#root',
//   store,
//   router,
//   components: {
//     App
//   },
//   render: h => h(App)
// })
