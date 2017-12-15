<template>
<websiteLayout>
  <ProductBanner name="ssl-certificate" :documents="documents">
    <i slot="icon" class="i-banner i-service"></i>
    <div slot="btns" class="bth-banner">
      <a class="console" @click="isLogined(consoleUrl)">管理控制台</a>
      <!-- <a class="console lighten">管理控制台<span class="countdown">8.15</span></a> -->
    </div>
  </ProductBanner>
  <ProductContent :itemBlock="itemBlock">
    <div slot="advantage">
      <!-- production advantage -->
      <ProAdvantage :name="'ssl-certificate'" :documents="advantageDocument">
        <i slot="unifiedManage" class="i-unifiedManage"></i>
        <i slot="easyApply" class="i-easyApply"></i>
        <i slot="knownBrand" class="i-knownBrand"></i>
        <i slot="keyLess" class="i-keyLess"></i>
      </ProAdvantage>
    </div>
    <div slot="scenarios">
      <!-- application scenarios -->
      <AppScenarios :name="'ssl-certificate'" :documents="appDocument">
        <i slot="forWeb" class="i-forWeb"></i>
        <i slot="forApp" class="i-forApp"></i>
        <i slot="forAffairs" class="i-forAffairs"></i>
        <i slot="forPay" class="i-forPay"></i>
        <i slot="forEmail" class="i-forEmail"></i>
        <i slot="forAPI" class="i-forAPI"></i>
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
import AppScenarios from 'website/components/AppScenarios/AppScenarios'
import YundunBar from 'website/components/YundunBar'
import { sslcertificateTitle } from '../../assets/js/titles'
import { sslcertificateDoc } from '../../assets/js/introduceDoc'
import { isLogined } from 'common/utils/snippets'

export default {
  metaInfo: sslcertificateTitle,
  components: {
    websiteLayout,
    ProductBanner,
    ProductContent,
    ProAdvantage,
    AppScenarios,
    YundunBar
  },
  data() {
    return {
      documents: sslcertificateDoc.documents,
      itemBlock: [{
        title: '产品优势',
        slot: 'advantage'
      },{
        title: '应用场景',
        slot: 'scenarios'
      }],
      advantageDocument: sslcertificateDoc.advantageDocument,
      appDocument: sslcertificateDoc.appDocument,
      consoleUrl: '/console/ssl-certificate#/certificateList'
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
  background-image: url(../../assets/images/ssl-certificate/icon-service.png), url(../../assets/images/ssl-certificate/bg-service.png);
}

@each $icon in (i-unifiedManage, i-easyApply, i-knownBrand, i-keyLess) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/ssl-certificate/$(icon).png);
  }
}

@each $icon in (i-forWeb, i-forApp, i-forAffairs, i-forPay, i-forEmail, i-forAPI) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/ssl-certificate/i-app.png);
    vertical-align: middle;
  }
}

.i-forApp {
  background-position: 0 -99px;
}

.i-forAffairs {
  background-position: 0 -198px;
}

.i-forPay {
  background-position: 0 -297px;
}

.i-forEmail {
  background-position: 0 -396px;
}

.i-forAPI {
  background-position: 0 -495px;
}

.application {
  background-color: #f6f6f6;
}
</style>
