import Vue from 'vue'
import Root from './Root'
import { Button, Input, Carousel, CarouselItem, Message } from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'common/assets/website-common-style'
import removeUrlHash from 'common/utils/removeUrlHash'

removeUrlHash()

Vue.use(Input)
Vue.use(Button)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.prototype.$message = Message
const app = new Vue({
  el: '#root',
  components: {
    Root
  },
  render: h => h(Root)
})
