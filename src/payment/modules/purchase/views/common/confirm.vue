<template>
<div>
  <div class="content-title">
    <div class="content-container">
      <div class="title">
        确认订单
      </div>
    </div>
  </div>
  <!-- confirm -->
  <div class="order-box" v-loading="loading">
    <orderInfo
      :pro_name="pro_name"
      :status="status"
      :pro_info="pro_info">
    </orderInfo>
    <div v-if="this.pro_name === 'taichi-web'" class="agree-box">
      <el-checkbox v-model="agreed">同意《<a class="agreement" href="/payment#/agreement/taichi-web">太极抗D Web版服务条款</a>》</el-checkbox>
    </div>
    <div v-if="this.pro_name === 'red-guard'" class="agree-box">
      <el-checkbox v-model="agreed">同意《<a class="agreement" href="/payment#/agreement/red-guard">红网卫士服务条款</a>》</el-checkbox>
    </div>
    <div class="btn-group text-right">
      <button class="btn btn-warning btn-purchase" :disabled="!agreed" @click="goPrepay">去支付</button>
    </div>
  </div>
</div>
</template>

<script>
import '../../assets/styles/purchase.css'
import orderInfo from '../../components/orderInfo'
import { mapActions } from 'vuex'

export default {
  components: {
    orderInfo
  },
  created() {
    this.confirmTheOrder()
  },
  computed: {
    loading() {
      return this.$store.state.effect.loading
    },
    pro_info() {
      if (this.pro_name === 'message') {
        return this.$store.state.message.order_info
      } else if (this.pro_name === 'mirror') {
        return this.$store.state.mirror.order_info
      } else if (this.pro_name === 'monitor') {
        return this.$store.state.monitor.order_info
      } else if (this.pro_name === 'resolving') {
        return this.$store.state.resolving.order_info
      } else if (this.pro_name === 'scan' || this.pro_name === 'detect') {
        return this.$store.state.shield.order_info
      } else if (this.pro_name === 'speed') {
        return this.$store.state.speed.order_info
      } else if (this.pro_name === 'taichi-web') {
        return this.$store.state.taichiWeb.order_info
      } else if (this.pro_name === 'taichi-dns') {
        return this.$store.state.taichiDns.order_info
      } else if (this.pro_name === 'red-guard') {
        return this.$store.state.redGuard.order_info
      } else {
        console.error(this.pro_name)
      }
    }
  },
  methods: {
    ...mapActions([
      'confirmMessageSetting',
      'confirmDoubleMirrorSetting',
      'confirmCloudMonitorSetting',
      'confirmResolvingSetting',
      'confirmShieldSetting',
      'confirmSpeedSetting',
      'confirmTaichiSetting',
      'confirmTaichiDnsSetting',
      'confirmRedGuardSetting'
    ]),
    confirmTheOrder() {
      const { pro_name, buy_type, service_type, domain_id, product_meal_id, frequency, buy_number, buy_time } = this.$route.query
      console.log(this.pro_name)
      this.pro_name = pro_name
      let map_domain_id = []
      switch (pro_name) {
        case 'message':
          this.query = { product_meal_id, buy_number }
          this.confirmMessageSetting(this.query)
          break
        case 'mirror':
          this.query = { product_meal_id, buy_number, buy_time }
          this.confirmDoubleMirrorSetting(this.query)
          break
        case 'monitor':
          this.query = { product_meal_id, buy_time, buy_number }
          this.confirmCloudMonitorSetting(this.query)
          break
        case 'resolving':
          this.query = { buy_type, domain_id, product_meal_id, buy_time }
          this.confirmResolvingSetting(this.query)
          break
        case 'scan':
        case 'detect':
          this.query = { service_type, product_meal_id, frequency, buy_number, buy_time }
          this.confirmShieldSetting(this.query)
          break
        case 'speed':
          this.query = { buy_type, product_meal_id, buy_number }
          this.confirmSpeedSetting(this.query)
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
          this.confirmTaichiSetting(this.query)
          break
        case 'taichi-dns':
          this.query = { buy_type, domain_id, product_meal_id, buy_time }
          this.confirmTaichiDnsSetting(this.query)
          break
        case 'red-guard':
          if (typeof domain_id === 'string') {
            map_domain_id = domain_id.split(',')
            this.query = {
              domain_id: map_domain_id,
              buy_time,
              product_meal_id
            }
          } else {
            this.query = { domain_id, product_meal_id, buy_time }
          }
          this.confirmRedGuardSetting(this.query)
          break
        default:
          console.error(`未知的服务: ${pro_name}`)
      }
    },
    goPrepay() {
      this.$router.push({
        path: '/prepay',
        query: this.$route.query
      })
    }
  },
  data() {
    return {
      agreed: true,
      // query
      query: {},
      pro_name: '',
      // setting 0,confirm 1,prepay 2,purchase 3
      status: 1
    }
  }
}
</script>

<style scoped>
.agreement {
  color: var(--primary-blue);
}
</style>

<style>
.agree-box {
  .el-checkbox__inner {
    width: 14px;
    height: 14px;
    &:after {
      top: 0;
      left: 3px;
      transform: rotate(45deg) scaleY(0.8) !important;
    }
  }
}
</style>
