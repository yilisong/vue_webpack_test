<template>
  <div class="coupon-box">
    <div class="useCoupon">
      <el-input class="coupon" v-model="coupon_code" :disabled="useCoupon" placeholder="请输入优惠码"></el-input>
      <el-checkbox v-model="useCoupon" @change="ifUseCoupon">确认使用优惠券</el-checkbox>
    </div>
    <ul class="cost">
      <li>
        <span class="item">折后费用</span>
        <span class="iteminfo">￥{{ orderInfo.discount_price }}</span>
      </li>
      <li>
        <span class="item">优惠码</span>
        <span class="iteminfo">-￥{{ orderInfo.discount_coupon_price }}</span>
      </li>
      <li>
        <span class="item">实付金额</span>
        <span class="iteminfo font-money-unit">￥<span class="font-money">{{ orderInfo.pay_price }}</span></span>
      </li>
    </ul>
    <div class="btn-group text-right">
      <button class="btn btn-muted btn-cancel" @click="handleCancel">取消订单</button>
      <button class="btn btn-warning btn-purchase" @click="handlePurchase">确认支付</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default{
  props: {
    order_code: String
  },
  computed: {
    orderInfo() {
      return this.$store.state.order.order_info
    }
  },
  methods: {
    ...mapActions([
      'getNotPaidOrderInfo'
    ]),
    ifUseCoupon() {
      if (this.useCoupon && this.coupon_code) {
        this.getNotPaidOrderInfo({
          order_code: this.order_code,
          coupon_code: this.coupon_code
        }).catch(() => {
          this.$store.commit({
            type: 'FETCH_COUPON_CODE',
            coupon_code: ''
          })
          this.coupon_code = ''
          this.useCoupon = false
        })
      } else if (this.useCoupon && !this.coupon_code) {
        this.$message({
          type: 'info',
          message: '请填写优惠券，并勾选确认'
        })
        this.useCoupon = false
      } else if (!this.useCoupon && this.coupon_code) {
        this.$confirm('此操作将取消使用优惠券，是否继续？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.commit({
            type: 'FETCH_COUPON_CODE',
            coupon_code: ''
          })
          this.coupon_code = ''
          this.getNotPaidOrderInfo({
            order_code: this.order_code,
            coupon_code: ''
          })
          this.$message({
            type: 'info',
            message: '取消成功'
          })
        }).catch(() => {
          this.useCoupon = true
        })
      } else {
        return
      }
    },
    handleCancel() {
      this.$emit('cancelOrder')
    },
    handlePurchase() {
      if (this.useCoupon && !this.coupon_code) {
        this.$message({
          type: 'info',
          message: '请填写优惠卷，并勾选确认。'
        })
      } else {
        this.$emit('goPurchase')
      }
    }
  },
  data() {
    return {
      useCoupon: false,
      coupon_code: ''
    }
  }
}
</script>

<style scoped>
.coupon-box {
  margin: 0 auto;
  width: 1200px;
  margin-top: 25px;
  text-align: right;
  .useCoupon {
    display: inline-block;
    width: 300px;
    text-align: left;
    vertical-align: top;
  }
  .cost {
    display: inline-block;
    width: 200px;
    margin-right: 30px;
  }
}

.coupon {
  margin-bottom: 10px;
}

.cost {
  .item,
  .iteminfo {
    display: inline-block;
    vertical-align: top;
    text-align: right;
  },
  .item {
    width: 100px;
    line-height: 30px;
  },
  .iteminfo {
    width: 90px;
  }
  li:last-child {
    padding-top: 30px;
    font-size: 20px;
  }
}
</style>
