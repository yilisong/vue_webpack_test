<template>
<websiteLayout>
  <ProductBanner name="cloud-monitor" :documents="documents">
    <i slot="icon" class="i-banner i-service"></i>
    <div slot="btns" class="bth-banner">
      <a class="purchase" @click="isLogined(purchaseUrl)">立即购买</a>
      <a class="console" @click="isLogined(consoleUrl)">管理控制台</a>
    </div>
  </ProductBanner>
  <ProductContent :itemBlock="itemBlock">
    <div slot="advantage" class="layout">
      <!-- production advantage -->
      <ProAdvantage :name="'cloud-monitor'" :documents="advantageDocument">
        <i slot="highPerformance" class="i-highPerformance"></i>
        <i slot="fault-tolerant" class="i-fault-tolerant"></i>
        <i slot="accurate" class="i-accurate"></i>
        <i slot="notify" class="i-notify"></i>
      </ProAdvantage>
    </div>
    <div slot="frame" class="frame">
      <!-- production frame -->
      <ProStructure :name="'cloud-monitor'"></ProStructure>
    </div>
    <div slot="scenarios" class="layout">
      <!-- application scenarios -->
      <AppScenarios :name="'cloud-monitor'" :documents="appDocument">
        <i slot="focus-monitor" class="i-focus-monitor"></i>
        <i slot="app-fault-tolerant" class="i-app-fault-tolerant"></i>
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
import YundunBar from 'website/components/YundunBar'
import { cloudmonitorTitle } from '../../assets/js/titles'
import { cloudmonitorDoc } from '../../assets/js/introduceDoc'
import { isLogined } from 'common/utils/snippets'

export default {
  metaInfo: cloudmonitorTitle,
  components: {
    websiteLayout,
    ProductBanner,
    ProductContent,
    ProAdvantage,
    ProStructure,
    AppScenarios,
    YundunBar
  },
  data() {
    return {
      documents: cloudmonitorDoc.documents,
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
      advantageDocument: cloudmonitorDoc.advantageDocument,
      appDocument: cloudmonitorDoc.appDocument,
      purchaseUrl: '/payment#/setting-cloud-monitor',
      consoleUrl: '/console/cloud-monitor#/monitorList'
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
  background-image: url(../../assets/images/cloud-monitor/icon-service.png), url(../../assets/images/cloud-monitor/bg-service.png);
}

@each $icon in (i-highPerformance, i-fault-tolerant, i-accurate, i-notify) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/cloud-monitor/$(icon).png);
  }
}

/*application*/
@each $icon in (i-focus-monitor, i-app-fault-tolerant) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/cloud-monitor/i-app.png);
    vertical-align: middle;
  }
}

.i-app-fault-tolerant {
  background-position: 0 -99px;
}
</style>
