<template lang="html">
<div>
  <div>
    <div class="content-title">
      <div class="content-container">
        <div class="title">
          云加速-购买
        </div>
      </div>
    </div>
    <!-- setting -->
    <div class="setting-area">
      <div class="setting-box clearfix">
        <div class="setting-left">
          <div class="titlebox">
            <h1 class="headline">云加速</h1>
          </div>
          <ul class="option-area">
            <li class="option-list">
              <span class="first-title">基本配置</span>
              <ul class="spec-list">
                <li class="spec-item">
                  <span class="second-title">套餐选择</span>
                  <ul class="spec-setting">
                    <li class="es-meal-item" v-for="(item,index) in mealList">
                      <label :class="{ active: index === meal_index }" :for="'meal'+index">
                        <span class="title">云加速</span>
                        <br>
                        <span class="txt">适用于起步阶段的个人网站</span>
                      </label>
                      <input class="hide" type="radio" :value="index" :id="'meal'+index" v-model="meal_index">
                    </li>
                  </ul>
                </li>
                <li class="spec-item">
                  <span class="second-title">具体配置</span>
                  <ul class="spec-setting">
                    <li class="config-speed" v-for="item in selectedConfig">
                      <p class="subtitle">{{ item.title }}</p>
                      <div class="subcontent" v-for="child in item.children">
                        <span>{{ child.title }}</span>
                        <span v-if="child.value !== 1">{{ child.value }}</span>
                        <span v-if="child.unit !== 'num'">{{ child.unit }}</span>
                      </div>
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
                    <span class="config-item es-time-item">1年</span>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <span class="first-title">数量选择</span>
              <ul class="spec-list">
                <li class="spec-item">
                  <span class="second-title">剩余流量</span>
                  <div class="spec-setting">
                    <span class="config-item es-time-item">{{ remain }} GB</span>
                  </div>
                </li>
                <li class="spec-item">
                  <span class="second-title">购买流量</span>
                  <div class="spec-setting">
                    <el-slider class="number-slide" v-model="buy_number" :step="1" :min="minimum" :max="maximum" @change="loadBuyNumber">
                    </el-slider>
                    <div class="added-box">
                      <el-input class="show-number" v-model.number="show_buy_number" @blur="showBuyNumber"></el-input>
                      <el-select class="show-unit" v-model="unit" @change="loadUnit">
                        <el-option
                        v-for="item in unitList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- setting-right -->
        <shoppingList
          :pro_name="'speed'"
          :selectedMeal="selectedMeal"
          :selectedConfig="selectedConfig"
          :buy_number="buy_number"
          :unit="unit"
          :buy_time=1
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
      minimum: 0,
      maximum: 1024,
      //init
      buy_type: 0,
      meal_index: 0,
      product_meal_id: '',
      show_buy_number: 0,
      buy_number: 0,
      times: 1,
      // data
      unit: 'GB',
      unitList: [
        { value:'GB',label: 'GB' },
        { value:'TB',label: 'TB' }
      ]
    }
  },
  computed: {
    mealList() {
      return this.$store.state.speed.mealList
    },
    selectedMeal() {
      if (!(this.mealList.length && this.meal_index !== '')) {
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
        configList.push({
          title: item.title,
          children
        })
      }
      return configList
    },
    total_price() {
      return this.$store.state.speed.total_price
    },
    remain() {
      return this.$store.state.speed.remain
    }
  },
  created() {
    localStorage.removeItem('speed_order_code')
    this.getSpeedMealList()
  },
  methods: {
    ...mapActions([
      'getSpeedMealList',
      'confirmSpeedSetting',
      'resetTotalPrice'
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
      if (val === 0) {
        this.resetTotalPrice()
        return
      }
      const params = {
        buy_type: 0,
        product_meal_id: this.product_meal_id,
        buy_number: val * this.times
      }
      this.getTotalPrice(params)
    },
    loadUnit(val) {
      if (val === 'GB') {
        this.times = 1
      } else {
        this.times = 1024
      }
      if (this.buy_number === 0) {
        this.resetTotalPrice()
        return
      }
      const params = {
        buy_type: 0,
        product_meal_id: this.product_meal_id,
        buy_number: this.buy_number * this.times
      }
      this.getTotalPrice(params)
    },
    getTotalPrice(params) {
      this.confirmSpeedSetting(params)
    },
    handleSubmit() {
      const query = {
        pro_name: 'speed',
        buy_type: this.buy_type,
        product_meal_id: this.product_meal_id,
        buy_number: this.buy_number * this.times
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
.config-speed .subcontent:nth-child(2) {
  display: none;
}

.el-slider {
  display: inline-block;
  width: 74%;
  vertical-align: middle;
}
.added-box {
  float: right;
  width: 25%;
  text-align: right;
  vertical-align: middle;
  .show-number {
    width: 55px;
  }
  .el-select {
    width: 70px;
  }
}
</style>
