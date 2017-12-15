<template lang="html">
<div>
  <div>
    <div class="content-title">
      <div class="content-container">
        <div class="title">
          短信服务-购买
        </div>
      </div>
    </div>
    <!-- setting -->
    <div class="setting-area">
      <div class="setting-box clearfix">
        <div class="setting-left">
          <div class="titlebox">
            <h1 class="headline">短信</h1>
            <small>服务购买</small>
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
                        {{ item.meal_name }}
                      </label>
                      <input class="hide" type="radio" :value="index" :id="'meal'+index" v-model="meal_index">
                    </li>
                  </ul>
                </li>
                <li class="spec-item">
                  <span class="second-title">具体配置</span>
                  <ul class="spec-setting">
                    <li class="config-item" v-for="(item,index) in selectedConfig">
                      <span>{{ item.title }}：</span>
                      <span>{{ item.value }} {{ item.unit }}</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span class="first-title">数量选择</span>
              <ul class="spec-list">
                <li class="spec-item">
                  <span class="second-title">购买数量</span>
                  <div class="spec-setting">
                    <el-slider class="number-slide" v-model="buy_number" :step="minimum" :max="maximum" @change="loadBuyNumber">
                    </el-slider>
                    <div class="added-box">
                      <el-input class="show-number" v-model.number="show_buy_number" @blur="showBuyNumber"></el-input>
                      <small>(*10条)</small>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- shopping-list -->
        <shoppingList
          :pro_name="'message'"
          :selectedMeal="selectedMeal"
          :selectedConfig="selectedConfig"
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
      minimum: 1,
      maximum: 1000,
      //init
      meal_index: 0,
      product_meal_id: '',
      show_buy_number: 1,
      buy_number: 1
    }
  },
  created() {
    localStorage.removeItem('message_order_code')
    this.getMessageMealList()
  },
  computed: {
    total_price() {
      return this.$store.state.message.total_price
    },
    mealList() {
      return this.$store.state.message.mealList
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
      if (this.buy_number === 0) {
        this.total_price = 0
        return
      }
      const params = {
        product_meal_id: val,
        buy_number: this.buy_number
      }
      this.getTotalPrice(params)
    }
  },
  methods: {
    ...mapActions([
      'getMessageMealList',
      'confirmMessageSetting'
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
        buy_number: val
      }
      this.getTotalPrice(params)
    },
    getTotalPrice(params) {
      this.confirmMessageSetting(params)
    },
    handleSubmit() {
      localStorage.removeItem('order_code')
      const query = {
        pro_name: 'message',
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
  width: 79%;
  vertical-align: middle;
}
.added-box {
  float: right;
  width: 20%;
  text-align: right;
  vertical-align: middle;
  .show-number {
    width: 55px;
  }
}
</style>
