<template lang="html">
<div>
  <div class="content-title">
    <div class="content-container">
      <div class="title">
        太极抗D DNS版 - 购买
      </div>
    </div>
  </div>
  <!-- setting taichi-ddos -->
  <div class="setting-area">
    <div class="setting-box clearfix">
      <div class="setting-left">
        <div class="titlebox">
          <h1 class="headline">太极抗D</h1>
          <span class="subline">DNS版</span>
        </div>
        <ul class="option-area">
          <li class="option-list">
            <span class="first-title">基本配置</span>
            <ul class="spec-list">
              <li class="spec-item">
                <span class="second-title">选择域名</span>
                <div class="spec-setting" v-if="this.buy_type === 0">
                  <input type="text" v-model="map_filter_domain" placeholder="输入筛选关键字">
                  <button class="domain-filter" @click="handleSearch">筛选</button>
                  <div class="domain-box">
                    <div class="hint">
                      勾选域名进行授权
                    </div>
                    <ul class="domain-list">
                      <li class="domain-item" v-for="(item,index) in domainList">
                        <input type="radio" :value="index" v-model="domain_index" name="domain">
                        <span>{{ item.domain }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="spec-setting" v-if="this.buy_type === 1 || this.buy_type === 2">
                  <span class="config-item es-domain-item">{{ domain_name }}</span>
                </div>
              </li>
              <li class="spec-item">
                <span class="second-title">套餐选择</span>
                <ul class="spec-setting">
                  <li class="meal-item" v-for="(item,index) in mealList">
                    <input class="hide" type="radio" :value="index" :id="'meal' + index" v-model="meal_index">
                    <label :class="{ active: index === meal_index }" :for="'meal' + index">{{ item.meal_name }}</label>
                  </li>
                </ul>
              </li>
              <li class="spec-item">
                <span class="second-title">具体配置</span>
                <ul class="spec-setting">
                  <li class="config-speed" v-for="item in selectedConfig">
                    <div class="subtitle">{{ item.title }}</div>
                    <template v-for="config in item.children">
                      <span class="subcontent">{{ config.title }} {{ config.show }}</span>
                    </template>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <span class="first-title">时长选择</span>
            <ul class="spec-list">
              <li class="spec-item"  v-if="this.buy_type === 2">
                <span class="second-title">剩余时长</span>
                <div class="spec-setting">
                  <span class="config-item es-time-item">{{ remain }}</span>
                </div>
              </li>
              <li class="spec-item">
                <span class="second-title">购买时长</span>
                <div class="spec-setting" v-if="this.buy_type === 0 || this.buy_type === 2">
                  <el-radio-group class="show-time" v-model="buy_time" @change="loadBuyTime">
                    <el-radio-button :label="1">1个月</el-radio-button>
                    <el-radio-button :label="2">2个月</el-radio-button>
                    <el-radio-button :label="3">3个月</el-radio-button>
                    <el-radio-button :label="4">4个月</el-radio-button>
                    <el-radio-button :label="5">5个月</el-radio-button>
                    <el-radio-button :label="6">6个月</el-radio-button>
                    <el-radio-button :label="7">7个月</el-radio-button>
                    <el-radio-button :label="8">8个月</el-radio-button>
                    <el-radio-button :label="9">9个月</el-radio-button>
                    <el-radio-button :label="12">1年</el-radio-button>
                    <el-radio-button :label="24">2年</el-radio-button>
                    <el-radio-button :label="36">3年</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="spec-setting" v-if="this.buy_type === 1">
                  <span class="config-item es-time-item">{{ remain }}</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopping-list
        :pro_name="'taichi-dns'"
        :buy_type="buy_type"
        :domain_name="domain_name"
        :selectedMeal="selectedMeal"
        :selectedConfig="selectedConfig"
        :buy_time="buy_time"
        :total_price="total_price"
        @toConfirm="handleSubmit">
      </shopping-list>
    </div>
  </div>
</div>
</template>

<script>
import '../../assets/styles/setting.css'
import shoppingList from '../../components/shopping-list'
import { mapActions } from 'vuex'

export default {
  components: {
    shoppingList
  },
  created() {
    localStorage.removeItem('taichiDns_order_code')
    this.getTaichiDnsDomainList()
    this.getTaichiDnsMealList()
  },
  computed: {
    domainList() {
      if (this.filter_domain) {
        return this.$store.state.taichiDns.domainList.filter(item => item.domain.indexOf(this.filter_domain) > -1)
      } else {
        return this.$store.state.taichiDns.domainList
      }
    },
    mealList() {
      return this.$store.state.taichiDns.mealList
    },
    remain() {
      return this.$store.state.taichiDns.remain
    },
    selectedMeal() {
      if (!this.mealList.length) {
        return
      }
      this.product_meal_id = this.mealList[this.meal_index].id
      return this.mealList[this.meal_index].meal_name
    },
    selectedConfig() {
      if (!(this.mealList.length && this.meal_index !== '')) {
        return
      }
      const configObject = this.mealList[this.meal_index].meal_detail
      const configList = []
      for (const i in configObject) {
        const item = configObject[i]
        const children = []
        for (const i in item) {
          children.push(item[i])
        }
        children.shift()
        children.shift()
        configList.push({
          title: item.title,
          children
        })
      }
      return configList
    },
    total_price() {
      return this.$store.state.taichiDns.total_price
    }
  },
  watch: {
    domain_index(val) {
      this.domain_id = this.domainList[val].id
      this.domain_name = this.domainList[val].domain
      if (!(this.domain_id && this.domain_name)) {
        this.resetTotalPrice()
        return
      }
      const params = {
        buy_type: this.buy_type,
        product_meal_id: this.mealList[this.meal_index].id,
        buy_time: this.buy_time,
        domain_id: this.domain_id
      }
      this.getTotalPrice(params)
    },
    product_meal_id(val) {
      if (!this.domain_id.length) {
        this.resetTotalPrice()
        return
      }
      const params = {
        buy_type: this.buy_type,
        product_meal_id: val,
        buy_time: this.buy_time,
        domain_id: this.domain_id
      }
      this.getTotalPrice(params)
    }
  },
  methods: {
    ...mapActions([
      'getTaichiDnsDomainList',
      'getTaichiDnsMealList',
      'confirmTaichiDnsSetting',
      'resetTotalPrice'
    ]),
    loadBuyTime(val) {
      if (!this.domain_id.length) {
        this.resetTotalPrice()
        return
      }
      const params = {
        buy_type: this.buy_type,
        product_meal_id: this.mealList[this.meal_index].id,
        buy_time: val,
        domain_id: this.domain_id
      }
      this.getTotalPrice(params)
    },
    getTotalPrice(params) {
      this.confirmTaichiDnsSetting(params)
    },
    handleSubmit() {
      const query = {
        pro_name: 'taichi-dns',
        buy_type: this.buy_type,
        product_meal_id: this.product_meal_id,
        buy_time: this.buy_time,
        domain_id: this.domain_id
      }
      this.$router.push({
        path: '/confirm',
        query
      })
    },
    handleSearch() {
      this.filter_domain = this.map_filter_domain
    }
  },
  data() {
    return {
      // update or renew
      domain_name: '',
      // domain
      filter_domain: '',
      map_filter_domain: '',
      //init
      domain_index: '',
      meal_index: 0,
      //data
      buy_type: 0,
      domain_id: '',
      buy_time: 1,
      product_meal_id: ''
    }
  }
}
</script>

<style lang="css" scoped>
input[type="text"] {
  padding: 7px 8px;
  font-size: 14px;
  width: 314px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #cdcdcd;
}
.domain-list {
  max-height: 140px;
  overflow-y: scroll;
  .domain-item {
    width: 360px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
}

.config-speed {
  font-size: 12px;
  line-height: 1.5;
  border-bottom: 1px dotted #cdcdcd;
}
.config-speed:last-child {
  border-bottom: 0;
}
.config-speed .subtitle {
  font-weight: 600;
}
.config-speed .subcontent {
  display: inline-block;
  width: 33%;
}
</style>
