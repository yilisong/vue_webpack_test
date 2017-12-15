<template lang="html">
  <div>
    <div class="content-title">
      <div class="content-container">
        <div class="title">
          订单支付-支付
        </div>
      </div>
    </div>
    <!-- purchase ensure -->
    <div class="purchase-box" v-loading="loading">
      <div class="purchase-info">
        <div class="title">
          支付
        </div>
        <ul class="purchase-content">
          <li>
            <span class="item-name">待付金额：</span>
            <span class="item-info">{{ pay_price }}元</span>
          </li>
          <li>
            <span class="item-name">账户余额：</span>
            <span class="item-info">{{ balance }}元</span>
            <span class="added" v-if="insufficient">*你的余额不足，请<span class="text-warning pointer" @click="handleRecharge">充值</span></span>
          </li>
          <li class="bill-type">
            <span class="item-name">支付方式：</span>
            <span class="item-info active">账户余额</span>
          </li>
        </ul>
        <div class="btn-group">
          <button class="btn btn-muted btn-cancel" @click="cancelPurchase">取消支付</button>
          <button class="btn btn-warning btn-purchase" @click="handleSubmit">确认支付</button>
        </div>
      </div>
    </div>
    <recharge></recharge>
  </div>
</template>

<script>
import '../../assets/styles/purchase.css'
import { fromUrls } from 'common/config/fromUrls'
import recharge from '../dialog/recharge'
import { mapActions } from 'vuex'

export default {
  components: {
    recharge
  },
  created() {
    this.query = this.$route.query
    this.pro_name = this.$route.query.pro_name
    this.getPrePayInfo()
  },
  computed: {
    pay_price() {
      return this.$store.state.order.pay_price
    },
    balance() {
      return this.$store.state.order.balance
    },
    insufficient() {
      return this.$store.state.order.insufficient
    },
    loading() {
      return this.$store.state.effect.loading
    }
  },
  methods: {
    ...mapActions([
      'orderPrepayByCode',
      'orderPayByCode',
      'triggerRechargeVisible'
    ]),
    getPrePayInfo() {
      this.orderPrepayByCode(this.query)
    },
    handleRecharge() {
      this.$store.commit({
        type: 'FETCH_ORDER_CODE',
        order_code: this.query.order_code
      })
      this.triggerRechargeVisible(true)
    },
    cancelPurchase() {
      this.$confirm('此操作将取消支付,是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.pro_name === 'scan' || this.pro_name === 'detect') {
          window.location = fromUrls.shield
        } else {
          window.location = fromUrls[this.pro_name]
        }
      })
    },
    handleSubmit() {
      this.$store.commit({
        type: 'FETCH_ORDER_CODE',
        order_code: this.query.order_code
      })
      this.$store.commit({
        type: 'FETCH_COUPON_CODE',
        coupon_code: this.query.coupon_code
      })
      this.orderPayByCode(this.query)
    }
  },
  data() {
    return {
      query: {}
    }
  }
}
</script>

<style scoped>
.purchase-info .title {
  font-size: 18px;
  line-height: 30px;
  border-bottom: 1px solid #cdcdcd;
}
.purchase-content {
  margin-top: 20px;
  font-size: 14px;
  line-height: 30px;
}
.purchase-content .item-name,
.purchase-content .item-info {
  display: inline-block;
  vertical-align: middle;
}
.purchase-content .item-name {
  margin-right: 20px;
}
.bill-type {
  margin-top: 20px;
}
.bill-type .active {
  display: inline-block;
  width: 90px;
  line-height: 36px;
  text-align: center;
  border: 1px solid #2d90e6;
  background-color: #eaf4fc;
}
.added {
  font-size: 12px;
  color: #929292;
}
.text-warning {
  color: #ee5722;
}
.pointer {
  cursor: pointer;
}
</style>
