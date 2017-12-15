<template lang="html">
  <div class="order-summary">
    <div class="title">
      订单概要
    </div>
    <ul class="summary-box">
      <li class="odd">
        <div class="summary-item">
          订单编号
        </div>
        <div class="summary-info">
          {{ order_code }}
        </div>
      </li>
      <li class="even">
        <div class="summary-item">
          支付状态
        </div>
        <div class="summary-info">
          <i class="to-pay yun-icon yun-unpaid"></i>
        </div>
      </li>
      <li class="odd">
        <div class="summary-item">
          创建时间
        </div>
        <div class="summary-info">
          {{ created_at }}
        </div>
      </li>
      <li class="even">
        <div class="summary-item">
          支付时间
        </div>
        <div class="summary-info">
          ---
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import 'common/assets/styles/yundun-theme/icon.css'

export default {
  props: {
    order_code: String,
    created_at: String
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.order-summary {
  width: 1200px;
  margin: 0 auto;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  box-shadow: 0 0 3px 1px rgba(0,0,0,.12);
  box-sizing: border-box;
}
.order-summary > .title {
  font-size: 16px;
  line-height: 30px;
  border-bottom: 1px solid #dfdfdf;
}
.summary-box {
  padding-top: 15px;
  padding-bottom: 10px;
  line-height: 25px;
}
.summary-box > li {
  display: inline-block;
}
.summary-box > .odd {
  width: 360px;
}
.summary-box > .even {
  width: 810px;
}
.summary-box .summary-item,
.summary-box .summary-info {
  display: inline-block;
}
.summary-box .summary-item {
  width: 90px;
  color: #888;
}
.summary-info {
  color: #000;
}
.summary-info .to-pay {
  width: 45px;
  height: 16px;
}
</style>
