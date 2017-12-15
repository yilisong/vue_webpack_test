<template>
  <div class="order-info">
    <ul class="pro-desc">
      <li class="pro-item">
        <div class="item">
          产品名称
        </div>
        <div class="iteminfo">
          {{ pro_info.product_name }}
        </div>
      </li>
      <li class="pro-item">
        <div class="item">
          产品套餐
        </div>
        <div class="iteminfo">
          {{ pro_info.meal_name }}
        </div>
      </li>
      <li class="pro-item">
        <div class="item">
          类型
        </div>
        <div class="iteminfo">
          {{ buyType() }}
        </div>
      </li>
      <li class="pro-item">
        <div class="item">
          订单配置
        </div>
        <div class="iteminfo">
          <template v-if="pro_info.domain_info || pro_info.domain_list">
            <span class="item-name">选择域名</span>
            <ul class="item-area">
              <li v-for="value in (pro_info.domain_info || pro_info.domain_list)">
                {{ value }}
              </li>
            </ul>
            <br>
          </template>
          <span class="item-name">具体配置</span>
          <ul class="item-area" v-if="pro_name === 'speed' || pro_name === 'taichi-dns'">
            <li v-for="item in pro_info.product_setting">
              <span class="config-title">{{ item.title }}</span>
              <div v-for="value in item">
                <span v-if="">{{ value.title }}</span>
                <span v-if="value.value !== 1">{{ value.value }}</span>
                <span v-if="value.unit !== 'num'">{{ value.unit }}</span>
              </div>
            </li>
          </ul>
          <ul class="item-area" v-else-if="pro_name === 'detect'">
            <li v-for="item in base_setting">
              {{ item.title }}
            </li>
          </ul>
          <ul class="item-area" v-else-if="pro_name === 'monitor' || pro_name === 'mirror' || pro_name === 'scan' || pro_name === 'red-guard'">
            <li v-for="item in pro_info.product_setting">
              <span>{{ item.title }}</span>
            </li>
          </ul>
          <ul class="item-area" v-else>
            <li v-for="item in pro_info.product_setting">
              <span>{{ item.title }}</span>
              <span>{{ item.value }}</span>
              <span v-if="item.unit !== 'num'">{{ item.unit }}</span>
            </li>
          </ul>
          <br>
          <template v-if="pro_name !== 'message' && pro_name !== 'scan'">
            <span class="item-name">购买时长</span>
            <span class="item-area">
              {{ buyTime() }}
            </span>
          </template>
        </div>
      </li>
      <li class="pro-item">
        <div class="item">
          计费方式
        </div>
        <div class="iteminfo">
          {{ billType() }}
        </div>
      </li>
      <li class="pro-item">
        <div class="item">
          费用
        </div>
        <div class="iteminfo last">
          <span class="item-name">套餐费用</span>
          <span class="item-area">{{ pro_info.total_price }}</span>
          <br>
          <span class="item-name">账户折扣</span>
          <span class="item-area">{{ showMemberDiscount() }}</span>
          <br>
          <span class="item-name">折后费用</span>
          <span class="item-area">{{ pro_info.discount_price }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    pro_name: String,
    pro_info: Object,
    status: {
      type: Number,
      default: 1
    }
  },
  computed: {
    base_setting() {
      if (!this.pro_info.product_setting) {
        return
      }
      return this.pro_info.product_setting.base_setting
    }
  },
  methods: {
    buyType() {
      if (!Object.keys(this.pro_info).length) {
        return
      }
      let buyTypeArray = []
      if (this.status === 1) {
        buyTypeArray = this.pro_info.buy_type_name
        return buyTypeArray[this.pro_info.buy_type]
      } else {
        buyTypeArray = this.pro_info.order_meal_type_list
        if (!buyTypeArray) {
          return
        }
        return buyTypeArray[this.pro_info.order_meal_type]
      }
    },
    billType() {
      if (!Object.keys(this.pro_info).length) {
        return
      }
      const billType = Number(this.pro_info.bill_type)
      if (billType === 0) {
        return '预支付'
      }
    },
    buyTime() {
      if (!Object.keys(this.pro_info).length) {
        return
      }
      const buy_time = this.pro_info.buy_time
      if (this.pro_name === 'taichi-web' || this.pro_name === 'monitor' || this.pro_name === 'red-guard' || this.pro_name === 'taichi-dns') {
        if (buy_time < 10) {
          return `${buy_time}个月`
        } else {
          return `${buy_time / 12}年`
        }
      } else if (this.pro_name === 'resolving' || this.pro_name === 'speed' || this.pro_name === 'mirror' || this.pro_name === 'detect') {
        return `${buy_time}年`
      } else {
        console.log(this.pro_name)
        return
      }
    },
    showMemberDiscount() {
      const member_discount = Number(this.pro_info.member_discount)
      if (member_discount === 1) {
        return '无折扣'
      } else {
        return `${member_discount * 10}折`
      }
    }
  }
}
</script>

<style scoped>
.item-name,
.item-area {
  display: inline-block;
  vertical-align: top;
}
.item-name {
  width: 4em;
}
.order-info {
  margin: 0 auto;
  margin-top: 12px;
  margin-bottom: 12px;
  width: 1200px;
}
.pro-desc {
  display: table;
  width: 100%;
  box-shadow: 0 0 3px 1px rgba(0,0,0,.12);
}
.pro-item {
  display: table-cell;
  border-right: 1px solid #dfdfdf;
  background-color: #fff;
}
.pro-item > .item,
.pro-item > .iteminfo {
  padding-right: 12px;
  padding-left: 12px;
}
.pro-item > .item {
  height: 36px;
  margin-right: -1px;
  line-height: 36px;
  color: #fff;
  background-color: #2d90e6;
}
.pro-item > .iteminfo {
  padding-top: 25px;
  padding-bottom: 25px;
}
.pro-item > .iteminfo.last {
  border-right: 0;
}
.config-title {
  font-weight: 600;
}
</style>
