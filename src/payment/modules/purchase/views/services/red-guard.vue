<template lang="html">
<div>
  <div class="content-title">
    <div class="content-container">
      <div class="title">
        红网卫士 - 购买
      </div>
    </div>
  </div>
  <!-- setting taichi-ddos -->
  <div class="setting-area">
    <div class="setting-box clearfix">
      <div class="setting-left">
        <div class="titlebox">
          <h1 class="headline">红网卫士</h1>
        </div>
        <ul class="option-area">
          <li class="option-list">
            <span class="first-title">基本配置</span>
            <ul class="spec-list">
              <li class="spec-item">
                <span class="second-title">选择域名</span>
                <div class="spec-setting">
                  <input type="text" v-model="map_filter_domain" placeholder="输入筛选关键字">
                  <button class="domain-filter" @click="handleSearch">筛选</button>
                  <div class="domain-box">
                    <div class="hint">
                      勾选域名进行授权
                    </div>
                    <ul class="domain-list">
                      <li class="domain-item" v-for="(item,index) in domainList">
                        <input type="checkbox" :value="index" v-model="domain_index">
                        <span>{{ item.domain }}</span>
                      </li>
                    </ul>
                  </div>
                  <p class="domain-tip" v-if="noDomain">
                    提示：您当前没有可用于红网卫士的域名，请您将您的域名接入云加速后，刷新该页面再次尝试。
                    <br />
                    如有疑问请联系我们的技术支持。
                    <br />
                    <button class="link-service" @click="linkedService">立即联系</button>
                  </p>
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
                  <li class="config-item" v-for="item in selectedConfig">
                    <span>{{ item.title }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <span class="first-title">时长选择</span>
            <ul class="spec-list">
              <li class="spec-item">
                <span class="second-title">购买时长</span>
                <div class="spec-setting">
                  <el-radio-group class="show-time" v-model="buy_time" @change="loadBuyTime">
                    <el-radio-button :label="6">6个月</el-radio-button>
                    <el-radio-button :label="12">1年</el-radio-button>
                    <el-radio-button :label="24">2年</el-radio-button>
                    <el-radio-button :label="36">3年</el-radio-button>
                  </el-radio-group>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopping-list
        :pro_name="'red-guard'"
        :domain_name="domain_name"
        :domainArray="domainArray"
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
import help from 'common/utils/help'

export default {
  components: {
    shoppingList
  },
  created() {
    localStorage.removeItem('redguard_order_code')
    this.getRedGuardDomainList()
    this.getRedGuardMealList()
  },
  computed: {
    domainList() {
      if (this.filter_domain) {
        return this.$store.state.redGuard.domainList.filter(item => item.domain.indexOf(this.filter_domain) > -1)
      } else {
        return this.$store.state.redGuard.domainList
      }
    },
    noDomain() {
      return this.$store.state.redGuard.noDomain
    },
    mealList() {
      return this.$store.state.redGuard.mealList
    },
    domainArray() {
      const temp = []
      this.domain_id = []
      this.domain_index.forEach(item => {
        temp.push(this.domainList[item].domain)
        this.domain_id.push(this.domainList[item].id)
      })
      return temp
    },
    selectedMeal() {
      if (!this.mealList.length) {
        return
      }
      this.product_meal_id = this.mealList[this.meal_index].id
      return this.mealList[this.meal_index].meal_name
    },
    selectedConfig() {
      if (!this.mealList.length) {
        return
      }
      return this.mealList[this.meal_index].meal_detail
    },
    total_price() {
      return this.$store.state.redGuard.total_price
    }
  },
  watch: {
    domain_id(val) {
      if (!(val.length && this.product_meal_id)) {
        this.resetTotalPrice()
        return
      }
      const params = {
        product_meal_id: this.mealList[this.meal_index].id,
        buy_time: this.buy_time,
        domain_id: val
      }
      this.getTotalPrice(params)
    },
    product_meal_id(val) {
      if (!this.domain_id.length) {
        this.resetTotalPrice()
        return
      }
      const params = {
        product_meal_id: val,
        buy_time: this.buy_time,
        domain_id: this.domain_id
      }
      this.getTotalPrice(params)
    }
  },
  methods: {
    ...mapActions([
      'getRedGuardDomainList',
      'getRedGuardMealList',
      'confirmRedGuardSetting',
      'resetTotalPrice'
    ]),
    loadBuyTime(val) {
      if (!this.domain_id.length) {
        this.resetTotalPrice()
        return
      }
      const params = {
        product_meal_id: this.mealList[this.meal_index].id,
        buy_time: val,
        domain_id: this.domain_id
      }
      this.getTotalPrice(params)
    },
    getTotalPrice(params) {
      this.confirmRedGuardSetting(params)
    },
    handleSubmit() {
      const query = {
        pro_name: 'red-guard',
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
    },
    linkedService() {
      help.linkService()
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
      domain_index: [],
      meal_index: 0,
      //data
      domain_id: [],
      buy_time: 6,
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
.domain-tip {
  margin-top: 10px;
  width: 409px;
}
.link-service {
  margin-top: 5px;
  padding: 5px 8px;
  line-height: 20px;
  border: 1px solid #cdcdcd;
  cursor: pointer;
  background-color: #fff;
}
</style>
