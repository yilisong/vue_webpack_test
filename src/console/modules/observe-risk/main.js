import 'core-js'
import Vue from 'vue'
import Product from './product'
import router from './router'
import ElementUI from 'element-ui'
import 'common/utils/hmr-events'
import 'common/assets/console-common-style'
import { Message } from 'element-ui'

Vue.use(ElementUI)

const BLOATED = Product

const app = new Vue({
  el: '#root',
  router,
  components: {
    BLOATED
  },
  render: h => h(BLOATED)
})
