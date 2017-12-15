<template lang="html">
<div class="setting-right">
  <div class="title">
    购买清单
  </div>
  <ul class="config-box">
    <li class="config-item" v-if="domainArray || domain_name">
      <span class="config-name">选择域名</span>
      <ul class="config-info" v-if="domainArray && domainArray.length">
        <li v-for="(item,index) in domainArray">
          {{ item }}
        </li>
      </ul>
      <span class="config-info" v-if="domain_name">
        {{ domain_name }}
      </span>
    </li>
    <li class="config-item">
      <span class="config-name">选择套餐</span>
      <span class="config-info">{{ selectedMeal }}</span>
    </li>
    <li class="config-item">
      <span class="config-name">具体配置</span>
      <template v-if="pro_name === 'taichi-web' || pro_name === 'resolving' || pro_name === 'message'">
        <ul class="config-info">
          <li v-for="item in selectedConfig">
            <span class="item-name">{{ item.title }}</span>
            <span class="item-info">
              {{ item.value }}
              <span v-if="item.unit !== 'num'">{{ item.unit }}</span>
            </span>
          </li>
        </ul>
      </template>
      <template v-else-if="pro_name === 'speed'">
        <el-tree class="tree-module" :data="selectedConfig" accordion :props="treeProps" :render-content="renderContent">
        </el-tree>
      </template>
      <template v-else-if="pro_name === 'taichi-dns'">
        <el-tree class="tree-module" :data="selectedConfig" accordion :props="treeProps" :render-content="renderContent">
        </el-tree>
      </template>
      <template v-else>
        <ul class="config-info">
          <li v-for="item in selectedConfig">
            <span class="item-name">{{ item.title }}</span>
          </li>
        </ul>
      </template>
    </li>
    <li class="config-item" v-if="pro_name === 'detect'">
      <span class="config-name">最大监测频率</span>
      <span class="config-info">{{ frequency }} min</span>
    </li>
    <li class="config-item" v-if="surplusTime && pro_name === 'taichi-web'">
      <span class="config-name">剩余时长</span>
      <span class="config-info">{{ surplusTime }}</span>
    </li>
    <li class="config-item" v-if="buy_time && pro_name !== 'scan'">
      <span class="config-name">
        <template v-if="pro_name === 'detect'">
          监测时长
        </template>
        <template v-else-if="pro_name === 'monitor'">
          有效时长
        </template>
        <template v-else>
          购买时长
        </template>
      </span>
      <span class="config-info">
        <template v-if="pro_name === 'taichi-web' || pro_name === 'monitor' || pro_name === 'red-guard' || pro_name === 'taichi-dns'">
          {{ showTime(buy_time) }}
        </template>
        <template v-if="pro_name === 'speed'|| pro_name === 'resolving' || pro_name === 'mirror' || pro_name === 'detect'">
          {{ buy_time }}年
        </template>
      </span>
    </li>
    <li class="config-item" v-if="pro_name === 'mirror'">
      <span class="config-name">基础容量</span>
      <span class="config-info">{{ remain }} GB</span>
    </li>
    <li class="config-item" v-if="buy_number">
      <template v-if="pro_name === 'speed'">
        <span class="config-name">购买流量</span>
        <span class="config-info">{{ buy_number }} {{ unit }}</span>
      </template>
      <template v-else-if="pro_name === 'mirror'">
        <span class="config-name">扩容容量</span>
        <span class="config-info">{{ buy_number }} {{ unit }}</span>
      </template>
      <template v-else-if="pro_name === 'message'">
        <span class="config-name">购买数量</span>
        <span class="config-info">{{ buy_number }}</span>
      </template>
      <template v-else-if="pro_name === 'monitor'">
        <span class="config-name">购买任务</span>
        <span class="config-info">{{ buy_number }}个</span>
      </template>
      <template v-else>
        <span class="config-name">监测对象</span>
        <span class="config-info">{{ buy_number }}个</span>
      </template>
    </li>
    <li class="config-item">
      <span class="config-name">类型</span>
      <span class="config-info">{{ showBillType() }}</span>
    </li>
  </ul>
  <div class="amount-box">
    <div class="amount">
      费用总计 <span class="cost">￥ {{ total_price }}</span>
    </div>
    <input class="btn-pay" type="button" value="立即支付" :disabled="isForbidden" @click="handleSubmit">
  </div>
</div>
</template>

<script>
export default {
  props: {
    pro_name: String,
    buy_type: {
      type: Number,
      default: 0
    },
    domainArray: Array,
    domain_name: String,
    selectedMeal: String,
    selectedConfig: {
      type: [Object, Array]
    },
    frequency: Number,
    buy_time: Number,
    surplusTime: {
      type: Number,
      default: 0
    },
    bill_type: Number,
    buy_number: Number,
    remain: String,
    unit: {
      type: String,
      default: 'GB'
    },
    // total price
    total_price: {
      type: [Number, String],
      default: 0.00
    }
  },
  computed: {
    isForbidden() {
      if (this.total_price === 0 || this.total_price === '0.00') {
        return true
      } else {
        return false
      }
    }
  },
  data() {
    return {
      treeProps: {
        label: 'title',
        children: 'children'
      }
    }
  },
  methods: {
    // format time
    showTime(val) {
      if (val < 10) {
        return `${val}个月`
      } else {
        return `${val / 12}年`
      }
    },
    // return package type
    showBillType() {
      const val = this.buy_type
      if (val === 0) {
        return '套餐购买'
      } else if (val === 1) {
        return '套餐升级'
      } else if (val === 2) {
        return '套餐续费'
      } else {
        return val
      }
    },
    handleSubmit() {
      this.$emit('toConfirm')
    },
    renderContent(h, { node, data, store }) {
      if (this.pro_name === 'cloud-speed') {
        const value = data.value === 1 || data.value === undefined ? '' : data.value
        const unit = data.unit === 'num' ||  data.unit === undefined ? '' : data.unit
        return (
          <span>{ data.title + value + unit }</span>
        )
      } else {
        const value = data.value === 1 || data.value === undefined ? '' : data.value
        const show = data.show === '' || data.show === undefined ? '' : data.show
        return (
          <span>{ data.title + show }</span>
        )
      }
    }
  }
}
</script>

<style scoped>
.setting-right {
  position: relative;
  float: left;
  width: 310px;
  min-height: 400px;
  padding: 20px 25px 100px;
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, .12)
}
.setting-right > .title {
  padding-bottom: 20px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid $borderColor;
}
.config-box {
  margin-top: 20px;
  margin-bottom: 20px;
}
.config-item {
  line-height: 30px;
}
.config-name,
.config-info {
  display: inline-block;
  vertical-align: top;
}
.config-name {
  color: #565656;
  width: 6em;
}
.config-info {
  width: 15em;
  .item-name {
    min-width: 7em;
  }
  .item-info {
    max-width: 13em;
    word-break: break-all;
  }
  .es-item-name {
    display: block;
    border-bottom: 1px dotted #cdcdcd;
  }
}

.config-info .item-info .subitem:first-child {
  display: none;
}
.amount-box {
  position: absolute;
  bottom: 15px;
  width: 100%;
}
.amount {
  font-size: 16px;
  line-height: 50px;
}
.amount .cost {
  font-size: 24px;
  color: #f36631;
}
.btn-pay {
  width: 310px;
  height: 40px;
  color: #fff;
  background-color: #f36631;
  border: 1px solid #f36631;
  cursor: pointer;
}
/**/
input[disabled] {
  border-color: #d1dbe5;
  color: #bfcbd9;
  background-color: #eef1f6;
  cursor: not-allowed;
}
</style>

<style>
.tree-module {
  display: inline-block;
  width: 210px;
  &.el-tree {
    border: 0;
  }
  .el-tree-node__content {
    line-height: 30px;
    height: 30px;
  }
  .el-tree-node__expand-icon {
    margin-left: 2px;
  }
}
</style>
