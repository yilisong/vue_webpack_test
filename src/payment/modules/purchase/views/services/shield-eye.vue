<template lang="html">
<div>
  <div>
    <div class="content-title">
      <div class="content-container">
        <div class="title">
          盾眼-购买
        </div>
      </div>
    </div>
    <!-- setting cloud-speed -->
    <div class="setting-area">
      <div class="setting-box clearfix">
        <div class="setting-left">
          <div class="titlebox">
            <h1 class="headline">盾眼</h1>
            <small>盾眼配置选择</small>
          </div>
          <ul class="option-area">
            <li class="option-list">
              <span class="first-title">基本配置</span>
              <ul class="spec-list">
                <li class="spec-item">
                  <span class="second-title">服务选择</span>
                  <ul class="spec-setting">
                    <li>
                      <el-radio-group v-model="service_type" @change="selectService">
                        <el-radio-button :label="0">漏洞扫描</el-radio-button>
                        <el-radio-button :label="1">内容监测</el-radio-button>
                      </el-radio-group>
                    </li>
                  </ul>
                </li>
                <li class="spec-item">
                  <span class="second-title">套餐选择</span>
                  <ul class="spec-setting">
                    <li class="meal-item" v-for="(item,index) in mealList" v-if="index < 2">
                      <label :class="{ active: index === meal_index }" :for="'meal'+index">
                        {{ item.meal_name }}
                      </label>
                      <input class="hide" type="radio" :value="index" :id="'meal'+index" v-model="meal_index">
                    </li>
                    <li v-show="service_type" class="meal-item">
                      如需全站监控，请<span class="text-info cursor" @click="linkedService">联系客服</span>
                    </li>
                  </ul>
                </li>
                <li class="spec-item" v-show="service_type">
                  <span class="second-title">最大监测频率</span>
                  <el-radio-group v-model="frequency" @change="loadFrequency">
                    <el-radio-button :label="5">5min</el-radio-button>
                    <el-radio-button :label="10">10min</el-radio-button>
                    <el-radio-button :label="30">30min</el-radio-button>
                  </el-radio-group>
                  <span class="ml20">
                    如需更高的监测频率，请<span class="text-info cursor" @click="linkedService">联系客服</span>
                  </span>
                </li>
                <li class="spec-item">
                  <span class="second-title">具体配置</span>
                  <ul class="spec-setting">
                    <li class="config-item" v-for="value in selectedConfig">
                      <span>{{ value.title }}</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li class="option-list" v-show="service_type === 1">
              <span class="first-title">时长</span>
              <ul class="spec-list">
                <li class="spec-item">
                  <span class="second-title">监测时长</span>
                  <div class="spec-setting">
                    <el-radio-group class="show-time" v-model="buy_time" @change="loadBuyTime">
                      <el-radio-button :label="1">1年</el-radio-button>
                      <el-radio-button :label="2">2年</el-radio-button>
                      <el-radio-button :label="3">3年</el-radio-button>
                    </el-radio-group>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <span class="first-title">数量选择</span>
              <ul class="spec-list">
                <li class="spec-item">
                  <span class="second-title">监测对象</span>
                  <div class="spec-setting">
                    <el-slider v-if="service_type" v-model="detect_buy_number" :min="minimum" @change="loadBuyNumber" :key="'detect'">
                    </el-slider>
                    <el-slider v-else v-model="scan_buy_number" :min="minimum" @change="loadBuyNumber" :key="'scan'">
                    </el-slider>
                    <div class="added-box">
                      <el-input class="show-number" :min="1" :max="100" v-model.number="show_buy_number" @blur="showBuyNumber"></el-input>
                      <span>个</span>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- setting-right -->
        <shoppingList
          :pro_name="pro_name"
          :selectedMeal="selectedMeal"
          :selectedConfig="selectedConfig"
          :frequency="frequency"
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
import help from 'common/utils/help'
import getSearch from 'common/utils/getUrlSearch'
import { mapActions } from 'vuex'

export default {
  components: {
    shoppingList
  },
  data() {
    return {
      minimum: 1,
      maximum: 100,
      service_type: 0,
      pro_name: 'scan',
      meal_index: 0,
      // map
      scan_buy_number: 1,
      detect_buy_number: 1,
      show_buy_number: 1,
      //init
      product_meal_id: '',
      buy_number: 1,
      buy_time: 1,
      frequency: 5
    }
  },
  created() {
    localStorage.removeItem('detect_order_code')
    localStorage.removeItem('scan_order_code')
    const search = getSearch()
    this.service_type = search.service_type === '1' ? 1 : 0
    this.selectService(this.service_type)
  },
  computed: {
    mealList() {
      return this.$store.state.shield.mealList
    },
    selectedMeal() {
      if (!this.mealList.length) {
        return
      }
      this.product_meal_id = Number(this.mealList[this.meal_index].id)
      return this.mealList[this.meal_index].meal_name
    },
    selectedConfig() {
      if (!this.mealList.length) {
        return
      }
      if (this.service_type === 0) {
        return this.mealList[this.meal_index].meal_detail
      } else {
        return this.mealList[this.meal_index].meal_detail.base_setting
      }
    },
    total_price() {
      return this.$store.state.shield.total_price
    }
  },
  watch: {
    product_meal_id(val) {
      this.buy_number = this.service_type ? this.detect_buy_number : this.scan_buy_number
      const params = {
        service_type: this.service_type,
        product_meal_id: val,
        frequency: this.frequency,
        buy_time: this.buy_time,
        buy_number: this.buy_number
      }
      this.getTotalPrice(params)
    }
  },
  methods: {
    ...mapActions([
      'getShieldMealList',
      'confirmShieldSetting'
    ]),
    selectService(val) {
      this.service_type = val
      this.pro_name = val ? 'detect' : 'scan'
      this.show_buy_number = this.service_type ? this.detect_buy_number : this.scan_buy_number
      this.getShieldMealList(this.service_type)
    },
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
      if (this.service_type) {
        this.detect_buy_number = buyNumber
      } else {
        this.scan_buy_number = buyNumber
      }
    },
    loadBuyNumber(val) {
      this.buy_number = this.service_type ? this.detect_buy_number : this.scan_buy_number
      this.show_buy_number = this.buy_number
      const params = {
        service_type: this.service_type,
        product_meal_id: this.product_meal_id,
        frequency: this.frequency,
        buy_time: this.buy_time,
        buy_number: val
      }
      this.getTotalPrice(params)
    },
    loadBuyTime(val) {
      const params = {
        service_type: this.service_type,
        product_meal_id: this.product_meal_id,
        frequency: this.frequency,
        buy_time: val,
        buy_number: this.buy_number
      }
      this.getTotalPrice(params)
    },
    loadFrequency(val) {
      const params = {
        service_type: this.service_type,
        product_meal_id: this.product_meal_id,
        frequency: val,
        buy_time: this.buy_time,
        buy_number: this.buy_number
      }
      this.getTotalPrice(params)
    },
    getTotalPrice(params) {
      this.confirmShieldSetting(params)
    },
    linkedService() {
      help.linkService()
    },
    handleSubmit() {
      const query = {
        pro_name: this.pro_name,
        service_type: this.service_type,
        product_meal_id: this.product_meal_id,
        buy_number: this.buy_number,
        frequency: this.frequency,
        buy_time: this.buy_time
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
.text-info {
  color: var(--primary-blue);
}
.cursor {
  cursor: pointer;
}
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
