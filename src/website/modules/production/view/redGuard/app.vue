<template>
<websiteLayout>
  <ProductBanner name="red-guard" :documents="documents">
    <i slot="icon" class="i-banner i-service"></i>
    <div slot="btns" class="bth-banner">
      <a class="purchase" @click="linkService()">咨询商务</a>
      <a class="console" @click="isLogined(consoleUrl)">管理控制台</a>
    </div>
  </ProductBanner>
  <ProductContent :itemBlock="itemBlock">
    <div slot="advantage">
      <!-- production advantage -->
      <ProAdvantage :name="'red-guard'" :documents="advantageDocument">
        <i slot="artificialIntelligence" class="i-artificialIntelligence"></i>
        <i slot="substitute" class="i-substitute"></i>
        <i slot="features" class="i-features"></i>
        <i slot="traceHacker" class="i-traceHacker"></i>
        <i slot="businessSecurity" class="i-businessSecurity"></i>
        <i slot="highPerformance" class="i-highPerformance"></i>
        <i slot="privateNode" class="i-privateNode"></i>
      </ProAdvantage>
    </div>
    <div slot="frame" class="frame">
      <!-- production frame -->
      <ProStructure :name="'red-guard'"></ProStructure>
    </div>
    <div slot="parameter">
      <!-- parameters -->
      <ProParameter :name="'red-guard'" :documents="paramsDocument">
        <i slot="waf" class="i-prop-waf"></i>
        <i slot="anti-tamper" class="i-prop-anti-tamper"></i>
        <i slot="replace" class="i-prop-replace"></i>
        <i slot="double" class="i-prop-double"></i>
        <i slot="lock" class="i-prop-lock"></i>
        <i slot="bait" class="i-prop-bait"></i>
        <i slot="risk" class="i-prop-risk"></i>
        <i slot="deduce" class="i-prop-deduce"></i>
        <i slot="analyse" class="i-prop-analyse"></i>
        <i slot="trace" class="i-prop-trace"></i>
      </ProParameter>
    </div>
    <div slot="scenarios">
      <!-- application scenarios -->
      <AppScenarios :name="'red-guard'" :documents="appDocument">
        <i slot="forGovernment" class="i-forGovernment"></i>
        <i slot="forFinance" class="i-forFinance"></i>
        <i slot="forEducation" class="i-forEducation"></i>
      </AppScenarios>
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
import ProStructure from 'website/components/ProStructure/ProStructure'
import AppScenarios from 'website/components/AppScenarios/AppScenarios'
import ProParameter from 'website/components/ProParameter/ProParameter'
import YundunBar from 'website/components/YundunBar'
import help from 'common/utils/help'
import { redguardTitle } from '../../assets/js/titles'
import { redguardDoc } from '../../assets/js/introduceDoc'
import { isLogined } from 'common/utils/snippets'

export default {
  metaInfo: redguardTitle,
  components: {
    websiteLayout,
    ProductBanner,
    ProductContent,
    ProAdvantage,
    ProStructure,
    AppScenarios,
    ProParameter,
    YundunBar
  },
  data() {
    return {
      documents: redguardDoc.documents,
      itemBlock: [{
        title: '产品优势',
        slot: 'advantage'
      },{
        title: '产品架构',
        slot: 'frame'
      },{
        title: '功能参数',
        slot: 'parameter'
      },{
        title: '应用场景',
        slot: 'scenarios'
      }],
      advantageDocument: redguardDoc.advantageDocument,
      paramsDocument: redguardDoc.paramsDocument,
      appDocument: redguardDoc.appDocument,
      consoleUrl: '/console/red-guard#/websiteList'
    }
  },
  methods: {
    linkService() {
      help.linkService()
    },
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
  background-image: url(../../assets/images/red-guard/icon-service.png), url(../../assets/images/red-guard/bg-service.png);
}

@each $icon in (i-artificialIntelligence, i-substitute, i-features, i-traceHacker, i-businessSecurity, i-highPerformance, i-privateNode) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/red-guard/$(icon).png);
  }
}

/*parameters*/
@each $icon in (i-prop-waf, i-prop-anti-tamper, i-prop-replace, i-prop-double, i-prop-lock, i-prop-bait, i-prop-risk, i-prop-deduce, i-prop-analyse, i-prop-trace) {
  .$(icon) {
    display: inline-block;
    margin-right: 30px;
    margin-left: 20px;
    width: 18px;
    height: 18px;
    background-image: url(../../assets/images/red-guard/$(icon).png);
    vertical-align: middle;
  }
}

/*application*/
@each $icon in (i-forGovernment, i-forFinance, i-forEducation) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/red-guard/i-app.png);
    vertical-align: middle;
  }
}

.i-forFinance {
  background-position: 0 -99px;
}

.i-forEducation {
  background-position: 0 -198px;
}

.parameter {
  background-color: #f6f6f6;
}
</style>
