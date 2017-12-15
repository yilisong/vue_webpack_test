<template lang="html">
<console-page-layout title="支付页面">
  <el-row class="pay-wrap">
    <el-col :span="5" class="pay-item">
      待付金额<span class="figure figure-bill">{{ formatMoney(payPrice) }}</span> 元
    </el-col>
    <el-col :span="9" class="pay-item">
      账户余额<span class="figure">{{ formatMoney(balance) }}</span> 元
      <span class="added" v-if="insufficient">*你的余额不足，请<span class="text-warning pointer" @click="handleRecharge">充值</span></span>
    </el-col>
    <el-col :span="5" class="pay-item">
      支付方式<span class="pay-method text-info">账户余额</span>
    </el-col>
    <el-col :span="5">
      <el-button class="pull-right pay-now" type="primary" :disabled="insufficient" @click="handleSubmit">立即支付</el-button>
    </el-col>
  </el-row>
  <PayConfig
    :pageName="'payPage'"
    :orderCode="order_code"
    :couponCode="coupon_code">
  </PayConfig>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import PayConfig from '../Dialogs/PayConfig'
import formatText from 'common/utils/formatText'
import { mapActions } from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    PayConfig
  },
  computed: {
    payPrice() {
      return this.$store.state.order.payPrice
    },
    balance() {
      return this.$store.state.order.balance
    },
    insufficient() {
      return this.$store.state.order.insufficient
    }
  },
  created() {
    this.order_code = this.$route.query.order_code,
    this.coupon_code = this.$route.query.coupon_code
    this.prepayOrderByCode({
      order_code: this.order_code,
      coupon_code: this.coupon_code
    })
  },
  methods: {
    ...mapActions([
      'prepayOrderByCode',
      'payForOrderByCode',
      'triggerPayConfigVisible'
    ]),
    handleRecharge() {
      this.triggerPayConfigVisible(true)
    },
    handleSubmit() {
      this.payForOrderByCode({
        order_code: this.order_code,
        vm: this
      })
    },
    formatMoney(val) {
      return formatText('money',val)
    }
  },
  data() {
    return {
      order_code: '',
      coupon_code: ''
    }
  }
}
</script>

<style scoped>
.pay-wrap {
  margin-top: 1em;
  padding: 1em;
  line-height: 20px;
  box-shadow: 0px 4px 20px -2px rgba(0, 0, 0, .12);
}
.figure {
  margin-left: 12px;
  font-size: 24px;
}
.figure-bill {
  color: #2d90ef;
}
.pay-method {
  margin-left: 12px;
  font-size: 14px;
}
.text-info {
  color: #2d90ef;
}
.text-warning {
  color: #ee5722;
}
.added {
  font-size: 12px;
  color: #929292;
}
.el-button {
  margin-top: 1em;
}
.pointer {
  cursor: pointer;
}

.pay-now {
  margin-top: 0;
}
.pay-item {
  margin-top: 5px;
}
</style>
