<template>
<websiteLayout>
  <ProductBanner name="cloud-speed" :documents="documents">
    <i slot="icon" class="i-banner i-service"></i>
    <div slot="btns" class="bth-banner">
      <a class="purchase" @click="isLogined(consoleUrl)">立即开通<span class="badge">限量免费</span></a>
      <a class="console" @click="isLogined(purchaseUrl)">购买流量包</a>
    </div>
  </ProductBanner>
  <ProductContent :itemBlock="itemBlock">
    <div slot="advantage" class="layout">
      <!-- production advantage -->
      <ProAdvantage :name="'cloud-speed'" :documents="advantageDocument">
        <i slot="security" class="i-security"></i>
        <i slot="speed" class="i-speed"></i>
        <i slot="online" class="i-online"></i>
        <i slot="https" class="i-https"></i>
        <i slot="seo" class="i-seo"></i>
        <i slot="hadoop" class="i-hadoop"></i>
      </ProAdvantage>
    </div>
    <div slot="frame" class="frame">
      <!-- production frame -->
      <ProStructure :name="'cloud-speed'"></ProStructure>
    </div>
    <div slot="parameter" class="layout">
      <!-- parameters -->
      <ProParameter :name="'cloud-speed'" :documents="paramsDocument">
        <i slot="optimize" class="i-prop-optimize"></i>
        <i slot="safety" class="i-prop-safety"></i>
        <i slot="config" class="i-prop-config"></i>
        <i slot="hadoop" class="i-prop-hadoop"></i>
      </ProParameter>
    </div>
    <div slot="scenarios" class="layout">
      <!-- application scenarios -->
      <AppScenarios :name="'cloud-speed'" :documents="appDocument">
        <i slot="page" class="i-page"></i>
        <i slot="download" class="i-download"></i>
        <i slot="media" class="i-media"></i>
        <i slot="onhttps" class="i-onhttps"></i>
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
import {
  cloudspeedTitle
} from '../../assets/js/titles'
import {
  cloudspeedDoc
} from '../../assets/js/introduceDoc'
import { isLogined } from 'common/utils/snippets'

export default {
  metaInfo: cloudspeedTitle,
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
      documents: cloudspeedDoc.documents,
      itemBlock: [{
        title: '产品优势',
        slot: 'advantage'
      }, {
        title: '产品架构',
        slot: 'frame'
      }, {
        title: '功能参数',
        slot: 'parameter'
      }, {
        title: '应用场景',
        slot: 'scenarios'
      }],
      advantageDocument: cloudspeedDoc.advantageDocument,
      paramsDocument: cloudspeedDoc.paramsDocument,
      appDocument: cloudspeedDoc.appDocument,
      consoleUrl: '/console/cloud-speed#/websiteList',
      purchaseUrl: '/payment#/cloud-speed'
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
  background-image: url(../../assets/images/cloud-speed/icon-service.png), url(../../assets/images/cloud-speed/bg-service.png);
}

.purchase {
  position: relative;
}

.badge {
  position: absolute;
  top: -10px;
  right: -7px;
  width: 60px;
  height: 18px;
  font-size: 10px;
  line-height: 18px;
  color: #fff;
  background-color: #79bf1e;
  border-radius: 2px;
}


/*advantage*/

@each $icon in (i-security, i-speed, i-online, i-https, i-seo, i-hadoop) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/cloud-speed/$(icon).png);
  }
}


/*parameter*/

@each $icon in (i-prop-config, i-prop-hadoop, i-prop-optimize, i-prop-safety) {
  .$(icon) {
    display: inline-block;
    margin-right: 30px;
    margin-left: 20px;
    width: 18px;
    height: 18px;
    background-image: url(../../assets/images/cloud-speed/$(icon).png);
    vertical-align: middle;
  }
}




/*app scenarios*/

@each $icon in (i-page, i-download, i-media, i-onhttps) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/cloud-speed/i-app.png);
    vertical-align: middle;
  }
}

.i-download {
  background-position: 0 -99px;
}

.i-media {
  background-position: 0 -198px;
}

.i-onhttps {
  background-position: 0 -297px;
}

.parameter {
  background-color: #f6f6f6;
}
</style>
