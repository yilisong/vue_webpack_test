<template lang="html">
<div>
  <div class="content-title">
    <div class="content-container">
      <div class="title">
        云解析-购买
      </div>
    </div>
  </div>
  <!-- setting taichi-ddos -->
  <div class="setting-area">
    <div class="setting-box clearfix">
      <div class="setting-left">
        <div class="titlebox">
          <h1 class="headline">云解析</h1>
          <span class="subline">配置选择</span>
        </div>
        <ul class="option-area">
          <li class="option-list">
            <span class="first-title">基本配置</span>
            <ul class="spec-list">
              <li class="spec-item">
                <span class="second-title">选择域名</span>
                <div class="spec-setting">
                  <span class="config-item es-domain-item">{{ domain }}</span>
                </div>
              </li>
              <li class="spec-item">
                <span class="second-title">套餐选择</span>
                <ul class="spec-setting">
                  <li class="meal-item" v-for="(item,index) in mealList">
                    <input class="hide" type="radio" :value="index" name="meal" :id="'meal' + index" v-model="meal_index">
                    <label :class="{ active: index === meal_index }" :for="'meal' + index">{{ item.meal_name }}</label>
                  </li>
                </ul>
              </li>
              <li class="spec-item">
                <span class="second-title">具体配置</span>
                <ul class="spec-setting">
                  <li class="config-item" v-for="item in selectedConfig">
                    <span class="item-name">{{ item.title }}</span>
                    <span class="item-info">{{ item.value }}</span>
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
                <ul class="spec-setting">
                  <li >
                    <el-radio-group v-model="buy_time" @change="loadBuyTime">
                      <el-radio-button :label="1">1年</el-radio-button>
                      <el-radio-button :label="2">2年</el-radio-button>
                      <el-radio-button :label="3">3年</el-radio-button>
                      <el-radio-button :label="4">4年</el-radio-button>
                      <el-radio-button :label="5">5年</el-radio-button>
                    </el-radio-group>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- setting-right -->
      <shopping-list
        :pro_name="'resolving'"
        :buy_type="buy_type"
        :domain_name="domain"
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
  data() {
    return {
      //init
      meal_index: 0,
      //data
      buy_type: 0,
      product_meal_id: 0,
      buy_time: 1,
      domain_id: '3133',
      domain: 'qidian.com'
    }
  },
  computed: {
    mealList() {
      return this.$store.state.resolving.mealList
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
      return this.$store.state.resolving.total_price
    }
  },
  watch: {
    product_meal_id(val) {
      const params = {
        buy_type: 0,
        product_meal_id: val,
        buy_time: this.buy_time,
        domain_id: this.domain_id
      }
      this.getTotalPrice(params)
    }
  },
  created() {
    localStorage.removeItem('resolving_order_code')
    this.getResolvingMealList()
  },
  methods: {
    ...mapActions([
      'getResolvingMealList',
      'confirmResolvingSetting'
    ]),
    loadBuyTime(val) {
      const params = {
        buy_type: 0,
        product_meal_id: this.product_meal_id,
        buy_time: val,
        domain_id: this.domain_id
      }
      this.getTotalPrice(params)
    },
    getTotalPrice(params) {
      this.confirmResolvingSetting(params)
    },
    handleSubmit() {
      const query = {
        pro_name: 'resolving',
        buy_type: this.buy_type,
        product_meal_id: this.product_meal_id,
        buy_time: this.buy_time,
        domain_id: this.domain_id
      }
      this.$router.push({
        path: '/confirm',
        query
      })
    }
  }
}
</script>
