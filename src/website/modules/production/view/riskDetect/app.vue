<template>
<websiteLayout>
  <ProductBanner name="risk-detect" :documents="documents">
    <i slot="icon" class="i-banner i-service"></i>
    <div slot="btns" class="bth-banner">
      <a class="purchase" @click="isLogined(purchaseUrl)">立即购买</a>
      <a class="console" @click="isLogined(consoleUrl)">管理控制台</a>
    </div>
  </ProductBanner>
  <ProductContent :itemBlock="itemBlock">
    <div slot="advantage" class="layout">
      <!-- production advantage -->
      <ProAdvantage :name="'risk-detect'" :documents="advantageDocument">
        <i slot="accurate" class="i-accurate"></i>
        <i slot="realtime" class="i-realtime"></i>
        <i slot="visual" class="i-visual"></i>
        <i slot="saas" class="i-saas"></i>
        <i slot="linked" class="i-linked"></i>
      </ProAdvantage>
    </div>
    <div slot="scenarios" class="layout">
      <!-- application scenarios -->
      <AppScenarios :name="'risk-detect'" :documents="appDocument">
        <i slot="forPublic" class="i-forPublic"></i>
        <i slot="forArea" class="i-forArea"></i>
        <i slot="forCompany" class="i-forCompany"></i>
      </AppScenarios>
    </div>
    <div slot="parameter" class="layout">
      <!-- parameters -->
      <ProParameter :name="'risk-detect'" :documents="paramsDocument">
        <i slot="asset" class="i-prop-asset"></i>
        <i slot="loophole" class="i-prop-loophole"></i>
        <i slot="detect" class="i-prop-detect"></i>
        <i slot="verify" class="i-prop-verify"></i>
        <i slot="notify" class="i-prop-notify"></i>
        <i slot="percept" class="i-prop-percept"></i>
      </ProParameter>
    </div>
  </ProductContent>
  <YundunBar></YundunBar>
</websiteLayout>
</template>

<script>
import 'website/modules/production/assets/css/theme-light.css'
import websiteLayout from 'common/components/layout/website-layout'
import ProductBanner from 'website/components/ProductBanner/ProductBanner'
import ProductContent from 'website/components/ProductContent/ProductContent'
import ProAdvantage from 'website/components/ProAdvantage/ProAdvantage'
import AppScenarios from 'website/components/AppScenarios/AppScenarios'
import ProParameter from 'website/components/ProParameter/ProParameter'
import YundunBar from 'website/components/YundunBar'
import { riskdetectTitle } from '../../assets/js/titles'
import { riskdetectDoc } from '../../assets/js/introduceDoc'
import { isLogined } from 'common/utils/snippets'

export default {
  metaInfo: riskdetectTitle,
  components: {
    websiteLayout,
    ProductBanner,
    ProductContent,
    ProAdvantage,
    AppScenarios,
    ProParameter,
    YundunBar
  },
  data() {
    return {
      documents: riskdetectDoc.documents,
      itemBlock: [{
        title: '产品优势',
        slot: 'advantage'
      },{
        title: '功能参数',
        slot: 'parameter'
      },{
        title: '应用场景',
        slot: 'scenarios'
      }],
      advantageDocument: riskdetectDoc.advantageDocument,
      paramsDocument: riskdetectDoc.paramsDocument,
      appDocument: riskdetectDoc.appDocument,
      purchaseUrl: '/payment#/setting-shield-eye?service_type=0',
      consoleUrl: '/console/shield-eye#/propertyList'
    }
  },
  methods: {
    isLogined(url) {
      isLogined(url)
    }
  }
}
</script>

<style scoped>

%icon-placeholder {
  display: inline-block;
  margin-bottom: 40px;
  width: 100%;
  height: 34px;
  background-repeat: no-repeat;
  background-position: center 0;
}

.i-service {
  background-image: url(../../assets/images/risk-detect/icon-service.png), url(../../assets/images/risk-detect/bg-service.png);
}

@each $icon in (i-accurate, i-realtime, i-visual, i-saas, i-linked) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/risk-detect/$(icon).png);
  }
}

@each $icon in (i-forPublic, i-forArea, i-forCompany) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/risk-detect/i-app.png);
    vertical-align: middle;
  }
}

.i-forArea {
  background-position: 0 -99px;
}

.i-forCompany {
  background-position: 0 -198px;
}

@each $icon in (i-prop-asset, i-prop-loophole, i-prop-detect, i-prop-verify, i-prop-notify, i-prop-percept) {
  .$(icon) {
    display: inline-block;
    margin-right: 30px;
    margin-left: 20px;
    width: 19px;
    height: 19px;
    background-image: url(../../assets/images/risk-detect/$(icon).png);
    vertical-align: middle;
  }
}

.parameter {
  background-color: #f6f6f6;
}
</style>
