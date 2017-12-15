<template>
<websiteLayout>
  <ProductBanner name="taichi-ddos-web" :documents="documents">
    <i slot="icon" class="i-banner i-web"></i>
    <div slot="btns" class="bth-banner">
      <a class="purchase" @click="gotoPurchase()">立即购买</a>
      <a class="console" @click="isLogined(consoleUrl)">管理控制台</a>
    </div>
  </ProductBanner>
  <ProductContent :color="'dark'" :itemBlock="itemBlock">
    <div slot="advantage">
      <!-- production advantage -->
      <ProAdvantage :name="'taichi-ddos-web'" :documents="advantageDocument">
        <i slot="ddosClean" class="i-ddosClean"></i>
        <i slot="appGuard" class="i-appGuard"></i>
        <i slot="definedRule" class="i-definedRule"></i>
        <i slot="suitedPrice" class="i-suitedPrice"></i>
      </ProAdvantage>
    </div>
    <div slot="meal">
      <!-- meal show -->
      <div class="meal">
        <div class="container">
          <h2 class="title">
            套餐类型
          </h2>
          <ul class="meals clearfix">
            <li class="an-meal" v-for="(item,index) in mealList" :key="'meal' + index">
              <div class="top-line"></div>
              <div class="right-line"></div>
              <div class="bottom-line"></div>
              <div class="left-line"></div>
              <div class="terminus"></div>
              <i class="square-blue"></i>
              <div class="meal-name">
                {{ item.meal_name }}
              </div>
              <div class="base-setting">
                <div class="settings">
                  防护能力
                </div>
                <div class="settings-info">
                  <span class="info">DDoS: {{ item.meal_detail.ddos_fence.value }}Gbs</span>
                  <span class="info">CC: {{ item.meal_detail.cc_fence.value/10000 }}万QPS</span>
                </div>
                <div class="show-price">
                  <span class="current">限时 ￥<span class="price">{{ item.price.price }}</span></span>
                  <span class="origin">￥{{ item.price.origin_price }}</span>
                </div>
              </div>
              <!-- <a class="go-purchase" :href="'/payment#/setting-taichi-ddos?mealIndex=' + index">立即购买</a> -->
              <a class="go-purchase" @click="gotoPurchase(index)">立即购买</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div slot="scenarios">
      <!-- AppScenarios -->
      <AppScenarios :name="'taichi-ddos-web'" :documents="appDocument">
        <i slot="forCompany" class="i-forCompany"></i>
        <i slot="forIndividual" class="i-forIndividual"></i>
      </AppScenarios>
    </div>
  </ProductContent>
  <YundunBar></YundunBar>
  <!-- ends -->
</websiteLayout>
</template>

<script>
import 'website/modules/production/assets/css/theme-dark.css'
import websiteLayout from 'common/components/layout/website-layout'
import ProductBanner from 'website/components/ProductBanner/ProductBanner'
import ProductContent from 'website/components/ProductContent/ProductContent'
import ProAdvantage from 'website/components/ProAdvantage/ProAdvantage'
import AppScenarios from 'website/components/AppScenarios/AppScenarios'
import YundunBar from 'website/components/YundunBar'
import {
  mapActions
} from 'vuex'
import {
  taichiddoswebTitle
} from '../../assets/js/titles'
import {
  taichiddoswebDoc
} from '../../assets/js/introduceDoc'
import SourceWebResource from 'website/static/js/SourceWebResource'
import { isLogined } from 'common/utils/snippets'

export default {
  metaInfo: taichiddoswebTitle,
  components: {
    websiteLayout,
    ProductBanner,
    ProductContent,
    ProAdvantage,
    AppScenarios,
    YundunBar
  },
  created() {
    this.getProductionMealList({
      product_flag: 'TW'
    })
  },
  computed: {
    mealList() {
      return this.$store.state.meal.mealList
    }
  },
  data() {
    return {
      documents: taichiddoswebDoc.documents,
      itemBlock: [{
        title: '产品优势',
        slot: 'advantage'
      }, {
        title: '套餐类型',
        slot: 'meal'
      }, {
        title: '应用场景',
        slot: 'scenarios'
      }],
      advantageDocument: taichiddoswebDoc.advantageDocument,
      appDocument: taichiddoswebDoc.appDocument,
      consoleUrl: '/console/taichi-ddos#/WebsiteProtectList'
    }
  },
  methods: {
    ...mapActions([
      'getProductionMealList'
    ]),
    gotoPurchase(index = 0) {
      SourceWebResource.getUserInfo().then(response => {
        if (!response.data.email) {
          window.location.href = '/login'
        } else {
          window.location.href = '/payment#/setting-taichi-ddos?mealIndex=' + index
        }
      })
    },
    isLogined(url) {
      isLogined(url)
    }
  }
}
</script>

<style scoped>
.i-web {
  background-image: url(../../assets/images/taichi-ddos-web/icon-service.png), url(../../assets/images/taichi-ddos-web/bg-service.png);
}

%icon-placeholder {
  display: inline-block;
  margin-bottom: 40px;
  width: 100%;
  height: 99px;
  background-repeat: no-repeat;
  background-position: center 0;
}

@each $icon in (i-ddosClean, i-appGuard, i-definedRule, i-suitedPrice) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/taichi-ddos-web/$(icon).png);
  }
}


/*meal*/

.square-blue {
  display: inline-block;
  width: 24px;
  height: 18px;
  background-color: var(--primary-blue);
}

.meal {
  background-color: #272727;
  .title {
    margin-bottom: 33px;
  }
}

.meals {
  margin-bottom: 47px;
  color: #b9b9b9;
}

.an-meal {
  position: relative;
  float: left;
  margin-right: 16px;
  margin-bottom: 18px;
  padding: 25px 36px;
  width: 280px;
  height: 150px;
  background-color: #2e2e2e;
  &:nth-child(3n) {
    margin-right: 0;
  }
  &:hover {
    .terminus {
      opacity: 1;
      transition-delay: 0.4s;
    }
    .top-line {
      width: 70px;
      transition-delay: 0.3s;
    }
    .right-line {
      height: 200px;
      transition-delay: 0.2s;
    }
    .bottom-line {
      width: 352px;
      transition-delay: 0.1s;
    }
    .left-line {
      height: 157px;
      transition-delay: 0s;
    }
    .go-purchase {
      color: var(--primary-blue);
      border-color: var(--primary-blue);
      background-color: rgba(45, 144, 230, .1);
    }
  }
  .top-line,
  .right-line,
  .bottom-line,
  .left-line,
  .terminus {
    position: absolute;
    background-color: #2d90e6;
    transition-duration: 0.1s;
  }
  .terminus {
    right: 70px;
    top: 0;
    width: 2px;
    height: 2px;
    background-color: #fff;
    border-radius: 1px;
    box-shadow: 0 0 2px 2px #2d90e6;
    opacity: 0;
    transition-property: opacity;
    transition-delay: 0s;
  }
  .top-line {
    top: 0;
    right: 0;
    width: 0;
    height: 1px;
    transition-property: width;
    transition-delay: 0.1s;
  }
  .right-line {
    right: 0;
    bottom: 0;
    width: 1px;
    height: 0;
    transition-property: height;
    transition-delay: 0.2s;
  }
  .bottom-line {
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    transition-property: width;
    transition-delay: 0.3s;
  }
  .left-line {
    top: 43px;
    left: 0;
    width: 1px;
    height: 0;
    transition-property: height;
    transition-delay: 0.4s;
  }
  .square-blue {
    position: absolute;
    left: 0;
  }
  .meal-name {
    margin-bottom: 15px;
    font-size: 18px;
  }
  .base-setting {
    margin-bottom: 10px;
    .settings {
      font-size: 12px;
      margin-bottom: 10px;
    }
    .settings-info {
      margin-bottom: 13px;
      font-size: 14px;
    }
    .current {
      color: #2d90e6;
    }
    .price {
      font-size: 30px;
    }
    .origin {
      text-decoration: line-through;
    }
  }
  .go-purchase {
    display: inline-block;
    width: 98px;
    height: 28px;
    border: 1px solid #555;
    font-size: 12px;
    line-height: 28px;
    text-align: center;
    color: #b9b9b9;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      color: var(--primary-blue);
      border-color: var(--primary-blue);
      background-color: rgba(45, 144, 230, .1);
    }
  }
}

.settings-info .info {
  margin-right: 32px;
  &:last-child {
    margin-right: 0;
  }
}


/*application*/

@each $icon in (i-forCompany, i-forIndividual) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/taichi-ddos-web/i-app.png);
    vertical-align: middle;
  }
}

.i-forIndividual {
  background-position: 0 -99px;
}
</style>
