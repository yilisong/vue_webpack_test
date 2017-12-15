<template lang="html">
<console-page-layout title="订单支付">
  <!-- 订单概要 -->
  <el-row class="order-summary">
    <p class="lead">订单概要</p>
    <el-col :span="8">
      <span class="item">订单编号</span>
      <span class="iteminfo">{{ orderDetails.order_code }}</span>
    </el-col>
    <el-col :span="4">
      <span class="item">支付状态</span>
      <div class="iteminfo">
        <i class="again-dot"></i>
        <span>{{ showPaidStatus() }}</span>
      </div>
    </el-col>
    <el-col :span="6">
      <span class="item">创建时间</span>
      <span class="iteminfo">{{ orderDetails.created_at }}</span>
    </el-col>
    <el-col :span="6">
      <span class="item">支付时间</span>
      <span class="iteminfo">{{ orderDetails.pay_time }}</span>
    </el-col>
  </el-row>
  <div class="module-wrap">
    <!-- 产品名称 -->
    <el-row class="module">
      <el-col :span="4">
        <span class="title">产品名称</span>
      </el-col>
      <el-col :span="20">
        <span>{{ product_list[orderDetails.product_flag] }}</span>
      </el-col>
    </el-row>
    <!-- 产品套餐 -->
    <el-row class="module">
      <el-col :span="4">
        <span class="title">产品套餐</span>
      </el-col>
      <el-col :span="20">
        <span>{{ meal_list[orderDetails.meal_flag] }}</span>
      </el-col>
    </el-row>
    <!-- 类型 -->
    <el-row class="module">
      <el-col :span="4">
        <span class="title">类型</span>
      </el-col>
      <el-col :span="20">
        <span>{{ order_meal_type_list[orderDetails.order_meal_type] }}</span>
      </el-col>
    </el-row>
    <!-- 订单配置 -->
    <el-row class="module config">
      <el-col :span="4">
        <span class="title">订单配置</span>
      </el-col>
      <el-col :span="6">
        <dl>
          <dt>
            选择域名
          </dt>
          <dd v-for="(value,index) in orderDetails.domain_list" :key="index">
            {{ value }}
          </dd>
        </dl>
      </el-col>
      <el-col :span="8">
        <!-- cloud-speed -->
        <dl v-if="orderDetails.product_flag === 'JS' || orderDetails.product_flag === 'TD'">
          <dt>
            具体配置
          </dt>
          <dd v-for="(value,index) in orderDetails.product_setting" :key="index">
            <span class="item es-item">{{ value.title }}</span>
            <!-- <div class="iteminfo es-iteminfo" v-for="value in value">
              <span>{{ value.title }}</span>
              <span v-if="value.value !== 1">{{ value.value }}</span>
              <span v-if="value.unit !== 'num'">{{ value.unit }}</span>
            </div> -->
          </dd>
        </dl>
        <!-- 云监控、盾眼-漏洞扫描、替身镜像 -->
        <dl v-else-if="orderDetails.product_flag === 'JK' || orderDetails.product_flag === 'LS' || orderDetails.product_flag === 'TS' || orderDetails.product_flag === 'HW'">
          <dt>
            具体配置
          </dt>
          <dd v-for="(item,index) in orderDetails.product_setting" :key="index">
            <span class="item">{{ item.title }}</span>
          </dd>
        </dl>
        <!-- 盾眼-风险监控 -->
        <dl v-else-if="orderDetails.product_flag === 'FC' || orderDetails.product_flag === 'HW'">
          <dt>
            具体配置
          </dt>
          <dd v-for="(item,index) in orderDetails.product_setting.base_setting" :key="index">
            <span class="item">{{ item.title }}</span>
          </dd>
        </dl>
        <dl v-else>
          <dt>
            具体配置
          </dt>
          <dd v-for="(item,index) in orderDetails.product_setting" :key="index">
            <span class="item">{{ item.title }}：</span>
            <span class="iteminfo">{{ item.value }} {{ item.unit }}</span>
          </dd>
        </dl>
      </el-col>
      <!-- message、shield-scan 没有购买时长 -->
      <el-col :span="6" v-if="orderDetails.product_flag !== 'DX' && orderDetails.product_flag !== 'LS'">
        <dl>
          <dt>
            购买时长
          </dt>
          <dd>
            {{ loadBuyTime() }}
          </dd>
        </dl>
      </el-col>
    </el-row>
    <!-- 计费方式 -->
    <el-row class="module">
      <el-col :span="4">
        <span class="title">计费方式</span>
      </el-col>
      <el-col :span="20">
        <span>{{ orderDetails.bill_type === '0' ? '余额' : '白条' }}</span>
      </el-col>
    </el-row>
    <!-- 费用 -->
    <el-row class="module">
      <template v-if="isPaid">
        <el-col :span="4">
          <span class="title">费用</span>
        </el-col>
        <el-col :span="4">
          <dl>
            <dt>
              套餐费用
            </dt>
            <dd>
              <span class="figure">{{ formatMoney(orderDetails.total_price) }}</span>元
            </dd>
          </dl>
        </el-col>
        <el-col :span="4">
          <dl>
            <dt>
              账户折扣
            </dt>
            <dd>
              <span class="figure">{{ showMemberDiscount() }}</span>
            </dd>
          </dl>
        </el-col>
        <el-col :span="4">
          <dl v-if="isPaid">
            <dt>
              折后费用
            </dt>
            <dd>
              <span class="figure">{{ formatMoney(orderDetails.discount_price) }}</span>元
            </dd>
          </dl>
        </el-col>
        <el-col :span="4">
          <dl>
            <dt>
              代金券
            </dt>
            <dd>
              <span class="figure">{{ showDiscount() }}</span>
            </dd>
          </dl>
        </el-col>
        <el-col :span="4">
          <dl>
            <dt>
              实付金额
            </dt>
            <dd>
              <span class="figure">{{ formatMoney(orderDetails.pay_price) }}</span>元
            </dd>
          </dl>
        </el-col>
      </template>
      <template v-else>
        <el-col :span="4">
          <span class="title">费用</span>
        </el-col>
        <el-col :span="6">
          <dl>
            <dt>
              套餐费用
            </dt>
            <dd>
              <span class="figure">{{ formatMoney(orderDetails.total_price) }}</span>元
            </dd>
          </dl>
        </el-col>
        <el-col :span="8">
          <dl>
            <dt>
              账户折扣
            </dt>
            <dd>
              <span class="figure">{{ showMemberDiscount() }}</span>
            </dd>
          </dl>
        </el-col>
        <el-col :span="6">
          <dl>
            <dt>
              实付金额
            </dt>
            <dd>
              <span class="figure">{{ formatMoney(orderDetails.pay_price) }}</span>元
            </dd>
          </dl>
        </el-col>
      </template>
    </el-row>
    <!-- 支付 -->
    <el-row class="module" v-if="!isPaid">
      <el-col :span="4">
        <span class="title">支付</span>
      </el-col>
      <el-col :span="20">
        <ul class="coupon-box">
          <li>
            <el-input v-model.trim="coupon_code" :disabled="useCoupon" placeholder="请输入优惠码"></el-input>
            <el-checkbox v-model="useCoupon" @change="ifUseCoupon">确认使用优惠券</el-checkbox>
          </li>
          <li>
            <span class="item">应付金额</span>
            <span class="iteminfo">￥<span>{{ formatMoney(orderDetails.total_price) }}</span></span>
          </li>
          <li>
            <span class="item">优惠</span>
            <span class="iteminfo"><span>{{ showDiscount() }}</span></span>
          </li>
          <li>
            <span class="item">实付金额</span>
            <span class="iteminfo"><span>￥{{ formatMoney(orderDetails.pay_price) }}</span></span>
          </li>
        </ul>
      </el-col>
      <el-col :offset="4" :span="20">
        <el-button @click="handleCancel">取消订单</el-button>
        <el-button type="primary" @click="handlePay">确认支付</el-button>
      </el-col>
    </el-row>
  </div>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import formatText from 'common/utils/formatText'
import {
  mapActions
} from 'vuex'

export default {
  components: {
    ConsolePageLayout
  },
  created() {
    const paidStatus = Number(this.$route.query.status)
    this.isPaid = paidStatus === 0 ? false : true
    this.getOrderDetailById({
      order_id: this.$route.query.id
    }).then(response => {
      const data = response.data.data
      this.orderDetails = data.data
      this.order_code = this.orderDetails.order_code
      this.coupon_code = this.orderDetails.coupon_code
      this.useCoupon = this.coupon_code ? true : false
      // get type list
      this.order_meal_type_list = data.order_meal_type_list
      this.product_list = data.product_meal_list.product_list
      this.meal_list = data.product_meal_list.meal_list
      this.order_status_list = data.order_status_list
    })
  },
  methods: {
    ...mapActions([
      'getOrderDetailById',
      'getNotPaidOrderInfo',
      'cancelOrderByCode'
    ]),
    handlePay() {
      if (this.useCoupon && !this.coupon_code) {
        this.$message({
          type: 'info',
          message: '请填写优惠券，并勾选确认'
        })
        this.useCoupon = false
      } else {
        this.$store.commit({
          type: 'RECEIVE_COUPON_CODE',
          couponCode: this.coupon_code
        })
        this.$router.push({
          path: '/pay',
          query: {
            order_code: this.order_code,
            coupon_code: this.coupon_code
          }
        })
      }
    },
    handleCancel() {
      this.$confirm('此操作将撤销订单，是否继续？','提示', {
        type: 'warning'
      }).then(() => {
        this.cancelOrderByCode({
          order_code: this.order_code
        }).then(() => {
          this.$router.push({
            path: 'orderList'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消撤销订单操作。'
        })
      })
    },
    showPaidStatus() {
      const status = Number(this.orderDetails.status)
      return this.order_status_list[status]
    },
    ifUseCoupon() {
      if (this.useCoupon && this.coupon_code) {
        this.getNotPaidOrderInfo({
          order_code: this.order_code,
          coupon_code: this.coupon_code
        }).then(response => {
          const data = response.data.data
          this.orderDetails.total_price = data.total_price
          this.orderDetails.discount_coupon_price = data.discount_coupon_price
          this.orderDetails.pay_price = data.pay_price
          this.orderDetails.member_discount = data.member_discount
        }).catch(err => {
          this.useCoupon = false
          this.coupon_code = ''
        })
      } else if (this.useCoupon && !this.coupon_code) {
        this.$message({
          type: 'info',
          message: '请填写优惠券,并勾选确认'
        })
        this.useCoupon = false
      } else if (!this.useCoupon && this.coupon_code) {
        this.$confirm('此操作将放弃使用优惠码，是否继续？','提示',{
          type: 'warning'
        }).then(() => {
          this.getNotPaidOrderInfo({
            order_code: this.order_code,
            coupon_code: ''
          }).then(response => {
            const data = response.data.data
            this.orderDetails.total_price = data.total_price
            this.orderDetails.discount_coupon_price = data.discount_coupon_price
            this.orderDetails.pay_price = data.pay_price
            this.orderDetails.member_discount = data.member_discount
            this.coupon_code = ''
            this.$message({
              type: 'info',
              message: '取消成功'
            })
          })
        }).catch(() => {
          this.useCoupon = true
        })
      } else {
        return
      }
    },
    loadBuyTime() {
      if (this.orderDetails.purchase_time) {
        return this.orderDetails.purchase_time
      } else {
        const buyTime = this.orderDetails.buy_time
        const timeUnit = this.orderDetails.time_unit
        if (timeUnit === 'y') {
          return `${buyTime}年`
        } else {
          // 'm'
          if (!(buyTime % 12)) {
            return `${buyTime / 12}年`
          } else {
            return `${buyTime}个月`
          }
        }
      }
    },
    showMemberDiscount() {
      const memberDiscount = Number(this.orderDetails.member_discount)
      if (memberDiscount === 1) {
        return '无折扣'
      } else {
        return `${memberDiscount * 10}折`
      }
    },
    showDiscount() {
      const discount = Number(this.orderDetails.discount_coupon_price).toFixed(2)
      if (discount > 0 && discount < 1) {
        return `${discount * 10} 折`
      } else if (discount === 1) {
        return '无折扣'
      } else {
        return `￥ ${discount}`
      }
    },
    formatMoney(val) {
      return formatText('money',val)
    }
  },
  data() {
    return {
      // status management
      useCoupon: false,
      isPaid: false,
      // details
      order_code: '',
      coupon_code: '',
      orderDetails: {},
      discount_coupon_price: '',
      pay_price: '',
      // help
      order_meal_type_list: [],
      product_list: {},
      meal_list: {},
      order_status_list: []
    }
  }
}
</script>

<style scoped>
/*variable*/
$borderColor: #e6e6e6;

/*common used*/
.item,
.iteminfo {
  display: inline-block;
  vertical-align: top;
}
.item {
  padding-right: .7em;
}

/*common area*/
.module-wrap {
  margin-top: 1em;
  border: 12px solid #f7f7f7;
}
.module {
  margin-right: 1em;
  margin-left: 1em;
  padding-top: 2em;
  padding-bottom: 2em;
  line-height: 20px;
  border-bottom: 1px solid $borderColor;
}
.module:last-child {
  border-bottom: 0;
}
.title {
  font-size: 14px;
  font-weight: 500;
}

/*modules*/
.order-summary {
  padding: 12px;
  background-color: #fff;
  box-shadow: 0px 4px 20px -2px rgba(0, 0, 0, .12);
  .lead {
    margin-bottom: 1em;
  }
}
.config dt {
  padding-bottom: 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid $borderColor;
}
.config .es-item {
  display: block;
}
.config .es-iteminfo {
  margin-right: 10px;
  border-bottom: 1px solid #e6e6e6;
}
.config .es-iteminfo:nth-child(2) {
  display: none;
}

.figure {
  font-size: 16px;
}
/*coupon-box*/
.coupon-box {
  width: 300px;
  margin-bottom: 15px;
  .el-input {
    margin-bottom: 5px;
  }
  .el-checkbox {
    margin-bottom: 10px;
  }
}
</style>
