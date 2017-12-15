<template lang="html">
<div>
  <div>
    <div class="content-title">
      <div class="content-container">
        <div class="title">
          替身镜像-购买
        </div>
      </div>
    </div>
    <!-- setting cloud-speed -->
    <div class="setting-area">
      <div class="setting-box clearfix">
        <div class="setting-left">
          <div class="titlebox">
            <h1 class="headline">替身镜像</h1>
          </div>
          <ul class="option-area">
            <li class="option-list">
              <span class="first-title">基本配置</span>
              <ul class="spec-list">
                <li class="spec-item">
                  <span class="second-title">套餐选择</span>
                  <ul class="spec-setting">
                    <li class="es-meal-item" v-for="(item,index) in mealList" v-if="index === 0">
                      <label :class="{ active: index === meal_index }" :for="'meal'+index">
                        <span class="title">替身镜像</span>
                        <br>
                        <span class="txt">适用于政企网站</span>
                      </label>
                      <input class="hide" type="radio" :value="index" :id="'meal'+index" v-model="meal_index">
                    </li>
                  </ul>
                </li>
                <li class="spec-item">
                  <span class="second-title">具体配置</span>
                  <ul class="spec-setting">
                    <li class="config-item" v-for="value in selectedConfig">
                      {{ value.title }}
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
                    <el-radio-group v-model="buy_time" @change="loadBuyTime">
                      <el-radio-button :label="1">1年</el-radio-button>
                      <el-radio-button :label="2">2年</el-radio-button>
                      <el-radio-button :label="3">3年</el-radio-button>
                      <el-radio-button :label="4">4年</el-radio-button>
                      <el-radio-button :label="5">5年</el-radio-button>
                    </el-radio-group>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <span class="first-title">数量选择</span>
              <ul class="spec-list">
                <li class="spec-item">
                  <span class="second-title">基础容量</span>
                  <div class="spec-setting">
                    <span class="config-item es-time-item"> 5 GB</span>
                  </div>
                </li>
                <li class="spec-item">
                  <span class="second-title">扩容容量</span>
                  <div class="spec-setting">
                    <el-slider class="number-slide" v-model="buy_number" :min="minimum" :max="maximum" @change="loadBuyNumber">
                    </el-slider>
                    <div class="added-box">
                      <el-input class="show-number" :min="minimum" :max="maximum" v-model.number="show_buy_number" @blur="showBuyNumber"></el-input>
                      <span>GB</span>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- setting-right -->
        <shoppingList
          :pro_name="'mirror'"
          :selectedMeal="selectedMeal"
          :selectedConfig="selectedConfig"
          :buy_time="buy_time"
          :remain="'5'"
          :buy_number="buy_number"
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
      maximum: 100,
      //init
      meal_index: 0,
      product_meal_id: '',
      show_buy_number: 0,
      buy_number: 0,
      buy_time: 1
    }
  },
  created() {
    localStorage.removeItem('mirror_order_code')
    this.getDoubleMirrorMealList()
  },
  computed: {
    mealList() {
      return this.$store.state.mirror.mealList
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
      return this.$store.state.mirror.total_price
    }
  },
  methods: {
    ...mapActions([
      'getDoubleMirrorMealList',
      'confirmDoubleMirrorSetting'
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
    loadBuyTime(val) {
      const params = {
        product_meal_id: this.product_meal_id,
        buy_time: val,
        buy_number: this.buy_number
      }
      this.getTotalPrice(params)
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
    getTotalPrice(params) {
      this.confirmDoubleMirrorSetting(params)
    },
    handleSubmit() {
      const query = {
        pro_name: 'mirror',
        buy_time: this.buy_time,
        product_meal_id: this.product_meal_id,
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
  width: 83%;
  vertical-align: middle;
}
.added-box {
  float: right;
  width: 16%;
  text-align: right;
  vertical-align: middle;
  .show-number {
    width: 55px;
  }
}
</style>
