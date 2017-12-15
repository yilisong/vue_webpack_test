<template lang="html">
  <websiteLayout>
    <ProductBanner name="taichi-ddos-plus" :documents="documents">
      <i slot="icon" class="i-banner i-plus"></i>
      <div slot="btns" class="bth-banner">
        <div class="notice">
          <i class="i-notice"></i>
          倾情回馈：针对个人游戏的高性价比高防IP服务，点击<a href="/personal-game-protect" target="_blank">了解详情</a>
        </div>
        <div class="notice">
          <i class="i-notice"></i>
          全新推出 : PLUS 专业版 300G高防服务 包年优惠，点击<a href="/yearly-custom-made" target="_blank">了解详情</a>
        </div>
        <a class="purchase" @click="linkService()">咨询商务</a>
        <a class="console" @click="isLogined(consoleUrl)">管理控制台</a>
        <!-- <a class="console" href="http://ddos.yundun.com/backmanager">管理控制台</a> -->
      </div>
    </ProductBanner>
    <ProductContent :color="'dark'" :itemBlock="itemBlock">
      <div slot="advantage">
        <!-- production advantage -->
        <ProAdvantage :name="'taichi-ddos-plus'" :documents="advantageDocument">
          <i slot="uniqueIP" class="i-uniqueIP"></i>
          <i slot="forAll" class="i-forAll"></i>
          <i slot="recognizer" class="i-recognizer"></i>
          <i slot="flexibleBill" class="i-flexibleBill"></i>
          <i slot="definedRule" class="i-definedRule"></i>
          <i slot="banTime" class="i-banTime"></i>
          <i slot="unlimitedGuard" class="i-unlimitedGuard"></i>
          <i slot="tractPath" class="i-tractPath"></i>
        </ProAdvantage>
      </div>
      <div slot="frame">
        <!-- production structure -->
        <ProStructure :name="'taichi-ddos-plus'"></ProStructure>
      </div>
      <div slot="scenarios">
        <!-- AppScenarios -->
        <AppScenarios :name="'taichi-ddos-plus'" :documents="appDocument">
          <i slot="forWebsite" class="i-forWebsite"></i>
          <i slot="forOthers" class="i-forOthers"></i>
          <i slot="forConference" class="i-forConference"></i>
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
import ProStructure from 'website/components/ProStructure/ProStructure'
import AppScenarios from 'website/components/AppScenarios/AppScenarios'
import YundunBar from 'website/components/YundunBar'
import help from 'common/utils/help'
import { taichiddosplusTitle } from '../../assets/js/titles'
import { taichiddosplusDoc } from '../../assets/js/introduceDoc'
import { isLogined } from 'common/utils/snippets'

export default {
  metaInfo: taichiddosplusTitle,
  components: {
    websiteLayout,
    ProductBanner,
    ProductContent,
    ProAdvantage,
    ProStructure,
    AppScenarios,
    YundunBar
  },
  methods: {
    linkService() {
      help.linkService()
    },
    isLogined(url) {
      isLogined(url)
    }
  },
  data() {
    return {
      documents: taichiddosplusDoc.documents,
      itemBlock: [{
        title: '产品优势',
        slot: 'advantage'
      },{
        title: '产品架构',
        slot: 'frame'
      },{
        title: '应用场景',
        slot: 'scenarios'
      }],
      advantageDocument: taichiddosplusDoc.advantageDocument,
      appDocument: taichiddosplusDoc.appDocument,
      consoleUrl: '/console/taichi-plus#/PackageList'
    }
  }
}
</script>

<style scoped>

.i-plus {
  background-image: url(../../assets/images/taichi-ddos-plus/icon-service.png), url(../../assets/images/taichi-ddos-plus/bg-service.png);
}

%icon-placeholder {
  display: inline-block;
  margin-bottom: 40px;
  width: 100%;
  height: 99px;
  background-repeat: no-repeat;
  background-position: center 0;
}

@each $icon in (i-uniqueIP, i-forAll, i-recognizer, i-flexibleBill, i-definedRule, i-banTime, i-unlimitedGuard, i-tractPath) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/taichi-ddos-plus/$(icon).png);
  }
}

/*notice added*/
.notice {
  margin-top: -8px;
  margin-bottom: 15px;
  font-family: "Microsoft Yahei";
  font-size: 12px;
  color: #fff;
  line-height: 18px;
  a {
    font-size: 14px;
    font-style: italic;
    color: var(--primary-blue);
  }
}

.i-notice {
  display: inline-block;
  margin-top: 1px;
  margin-right: 4px;
  width: 18px;
  height: 18px;
  vertical-align: top;
  background-image: url(../../assets/images/taichi-ddos-plus/i-notice.svg);
}

/*application*/
@each $icon in (i-forWebsite, i-forOthers, i-forPrivate, i-forConference) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/taichi-ddos-plus/i-app.png);
    vertical-align: middle;
  }
}

.i-forOthers {
  background-position: 0 -99px;
}

.i-forPrivate {
  background-position: 0 -198px;
}

.i-forConference {
  background-position: 0 -297px;
}
</style>
