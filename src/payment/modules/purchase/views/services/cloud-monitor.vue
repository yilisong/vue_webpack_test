<template lang="html">
<div>
  <div>
    <div class="content-title">
      <div class="content-container">
        <div class="title">
          云监控-购买
        </div>
      </div>
    </div>
    <!-- setting cloud-speed -->
    <div class="setting-area">
      <div class="setting-box clearfix">
        <div class="setting-left">
          <div class="titlebox">
            <h1 class="headline">云监控</h1>
          </div>
          <ul class="option-area">
            <li class="option-list">
              <span class="first-title">基本配置</span>
              <ul class="spec-list">
                <li class="spec-item">
                  <span class="second-title">套餐选择</span>
                  <ul class="spec-setting">
                    <li class="meal-item" v-for="(item,index) in mealList">
                      <label :class="{ active: index === meal_index }" :for="'meal'+index">
                        <span class="title">云监控</span>
                      </label>
                      <input class="hide" type="radio" :value="index" :id="'meal'+index" v-model="meal_index">
                    </li>
                  </ul>
                </li>
                <li class="spec-item">
                  <span class="second-title">具体配置</span>
                  <ul class="spec-setting">
                    <li class="config-item" v-for="(item,index) in selectedConfig">
                      <span>{{ item.title }}</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li class="option-list">
              <span class="first-title">时长</span>
              <ul class="spec-list">
                <li class="spec-item">
                  <span class="second-title">有效时长</span>
                  <div class="spec-setting">
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
                </li>
              </ul>
            </li>
            <li>
              <span class="first-title">数量选择</span>
              <ul class="spec-list">
                <li class="spec-item">
                  <span class="second-title">购买任务</span>
                  <div class="spec-setting">
                    <el-slider class="number-slide" v-model="buy_number" :step="1" :min="minimum" :max="maximum" @change="loadBuyNumber">
                    </el-slider>
                    <div class="added-box">
                      <el-input class="show-number" v-model.number="show_buy_number" @blur="showBuyNumber"></el-input>
                      <small>个</small>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- setting-right -->
        <shoppingList
          :pro_name="'monitor'"
          :selectedMeal="selectedMeal"
          :selectedConfig="selectedConfig"
          :buy_number="buy_number"
          :buy_time="buy_time"
          :total_price="total_price"
          @toConfirm="handleSubmit">
        </shoppingList>
      </div>
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
      minimum: 1,
      maximum: 100,
      //init
      meal_index: 0,
      product_meal_id: '',
      show_buy_number: 1,
      buy_number: 1,
      buy_time: 1
    }
  },
  created() {
    localStorage.removeItem('monitor_order_code')
    this.getCloudMonitorMealList()
  },
  computed: {
    mealList() {
      return this.$store.state.monitor.mealList
    },
    total_price() {
      return this.$store.state.monitor.total_price
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
    }
  },
  watch: {
    product_meal_id(val) {
      const params = {
        product_meal_id: val,
        buy_number: this.buy_number,
        buy_time: this.buy_time
      }
      this.getTotalPrice(params)
    }
  },
  methods: {
    ...mapActions([
      'getCloudMonitorMealList',
      'confirmCloudMonitorSetting'
    ]),
    showBuyNumber() {
      let buyNumber
      if (!/^[-+]?\d{1,}$/.test(this.show_buy_number)) {
        buyNumber = this.minimum
      } else if (this.show_buy_number < this.minimum) {
        buyNumber = this.minimum
      } else if (this.show_buy_number > this.maximum) {
        buyNumber = this.maximum
      } else {
        buyNumber = this.show_buy_number
      }
      this.show_buy_number = buyNumber
      this.buy_number = buyNumber
    },
    loadBuyNumber(val) {
      this.show_buy_number = val
      const params = {
        product_meal_id: this.product_meal_id,
        buy_time: this.buy_time,
        buy_number: val
      }
      this.getTotalPrice(params)
    },
    loadBuyTime(val) {
      this.buy_time = val
      const params = {
        product_meal_id: this.product_meal_id,
        buy_time: val,
        buy_number: this.buy_number
      }
      this.getTotalPrice(params)
    },
    getTotalPrice(params) {
      this.confirmCloudMonitorSetting(params)
    },
    handleSubmit() {
      const query = {
        pro_name: 'monitor',
        product_meal_id: this.product_meal_id,
        buy_time: this.buy_time,
        buy_number: this.buy_number
      }
      this.$router.push({
        path: '/confirm',
        query
      })
    }
  }
}
</script>

<style scoped>
.el-slider {
  display: inline-block;
  width: 84%;
  vertical-align: middle;
}
.added-box {
  float: right;
  width: 15%;
  text-align: right;
  vertical-align: middle;
  .show-number {
    width: 55px;
  }
}
</style>
