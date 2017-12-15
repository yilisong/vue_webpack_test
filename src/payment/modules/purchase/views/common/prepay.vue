<template>
<div>
  <div class="content-title">
    <div class="content-container">
      <div class="title">
        订单支付-未支付
      </div>
    </div>
  </div>
  <!-- confirm -->
  <div class="order-box" v-loading="loading">
    <orderIntro
      :order_code="pro_info.order_code"
      :created_at="pro_info.created_at">
    </orderIntro>
    <orderInfo
      :pro_name="pro_name"
      :status="status"
      :pro_info="pro_info">
    </orderInfo>
    <coupon-box
      :order_code="pro_info.order_code"
      :discount_price="pro_info.discount_price"
      :pay_price="pro_info.pay_price"
      @cancelOrder="cancelOrder"
      @goPurchase="goPurchase">
    </coupon-box>
  </div>
</div>
</template>

<script>
import '../../assets/styles/purchase.css'
import orderInfo from '../../components/orderInfo'
import orderIntro from '../../components/orderIntro'
import couponBox from '../../components/coupon-box'
import { mapActions } from 'vuex'

export default {
  components: {
    orderInfo,
    orderIntro,
    couponBox
  },
  created() {
    this.createOrder()
  },
  computed: {
    pro_info() {
      return this.$store.state.order.order_info
    },
    loading() {
      return this.$store.state.effect.loading
    }
  },
  methods: {
    ...mapActions([
      'createMessageOrder',
      'createDoubleMirrorOrder',
      'createCloudMonitorOrder',
      'createResolvingOrder',
      'createShieldOrder',
      'createSpeedOrder',
      'createTaiChiWebOrder',
      'createTaiChiDnsOrder',
      'createRedGuardOrder',
      'cancelOrderByCode'
    ]),
    createOrder() {
      const { pro_name, buy_type, service_type, domain_id, product_meal_id, frequency, buy_number, buy_time } = this.$route.query
      this.pro_name = pro_name
      let map_domain_id = []
      switch (pro_name) {
        case 'message':
          this.query = { product_meal_id, buy_number }
          this.createMessageOrder(this.query)
          break
        case 'mirror':
          this.query = { product_meal_id, buy_number, buy_time }
          this.createDoubleMirrorOrder(this.query)
          break
        case 'monitor':
          this.query = { product_meal_id, buy_time ,buy_number }
          this.createCloudMonitorOrder(this.query)
          break
        case 'resolving':
          this.query = { buy_type, domain_id, product_meal_id, buy_time }
          this.createResolvingOrder(this.query)
          break
        case 'scan':
        case 'detect':
          this.query = { service_type, product_meal_id, frequency, buy_number, buy_time }
          this.createShieldOrder(this.query)
          break
        case 'speed':
          this.query = { buy_type, product_meal_id, buy_number }
          this.createSpeedOrder(this.query)
          break
        case 'taichi-web':
          if (typeof domain_id === 'string') {
            map_domain_id = domain_id.split(',')
            this.query = {
              buy_type,
              domain_id: map_domain_id,
              product_meal_id,
              buy_time
            }
          } else {
            this.query = { buy_type, domain_id, product_meal_id, buy_time }
          }
          this.createTaiChiWebOrder(this.query)
          break
        case 'taichi-dns':
          this.query = { buy_type, domain_id, product_meal_id, buy_time }
          this.createTaiChiDnsOrder(this.query)
          break
        case 'red-guard':
          if (typeof domain_id === 'string') {
            map_domain_id = domain_id.split(',')
            this.query = {
              domain_id: map_domain_id,
              product_meal_id,
              buy_time
            }
          } else {
            this.query = { domain_id, product_meal_id, buy_time }
          }
          this.createRedGuardOrder(this.query)
          break
        default:
          console.error(`未知的服务: ${pro_name}`)
      }
    },
    cancelOrder() {
      this.cancelOrderByCode({
        pro_name: this.pro_name,
        order_code: this.pro_info.order_code
      })
    },
    goPurchase() {
      this.$router.push({
        path: './purchase',
        query: {
          pro_name: this.pro_name,
          order_code: this.pro_info.order_code,
          coupon_code: this.$store.state.order.coupon_code
        }
      })
    }
  },
  data() {
    return {
      // query
      query: {},
      // setting 0,confirm 1,prepay 2,purchase 3
      status: 2,
      pro_name: ''
    }
  }
}
</script>
