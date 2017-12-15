<template>
<websiteLayout>
  <ProductBanner name="cloud-host" :documents="documents">
    <i slot="icon" class="i-banner i-service"></i>
    <div slot="btns" class="bth-banner">
      <a class="purchase" href="http://cloud.yundun.com/vhost.html">立即购买</a>
      <a class="console" href="http://cloud.yundun.com/console/#/ecs/server">管理控制台</a>
    </div>
  </ProductBanner>
  <ProductContent :itemBlock="itemBlock">
    <div slot="advantage">
      <!-- production advantage -->
      <ProAdvantage :name="'cloud-host'" :documents="advantageDocument">
        <i slot="stabilize" class="i-stabilize"></i>
        <i slot="secure" class="i-secure"></i>
        <i slot="solveAll" class="i-solveAll"></i>
        <i slot="flexible" class="i-flexible"></i>
        <i slot="highPerformance" class="i-highPerformance"></i>
        <i slot="professional" class="i-professional"></i>
        <i slot="personalize" class="i-personalize"></i>
      </ProAdvantage>
    </div>
    <div slot="scenarios">
      <!-- application scenarios -->
      <AppScenarios :name="'cloud-host'" :documents="appDocument">
        <i slot="forFinance" class="i-forFinance"></i>
        <i slot="forGame" class="i-forGame"></i>
        <i slot="forGovernment" class="i-forGovernment"></i>
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
import { cloudhostTitle } from '../../assets/js/titles'
import { cloudhostDoc } from '../../assets/js/introduceDoc'

export default {
  metaInfo: cloudhostTitle,
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
      documents: cloudhostDoc.documents,
      itemBlock: [{
        title: '产品优势',
        slot: 'advantage'
      },{
        title: '应用场景',
        slot: 'scenarios'
      }],
      advantageDocument: cloudhostDoc.advantageDocument,
      appDocument: cloudhostDoc.appDocument
    }
  }
}
</script>

<style scoped>
/*variables*/
%icon-placeholder {
  display: inline-block;
  margin-bottom: 40px;
  width: 100%;
  height: 34px;
  background-repeat: no-repeat;
  background-position: center 0;
}

/*banner*/
.i-service {
  background-image: url(../../assets/images/cloud-host/icon-service.png), url(../../assets/images/cloud-host/bg-service.png);
}

/*advantages*/
@each $icon in (i-stabilize, i-secure, i-solveAll, i-flexible, i-highPerformance, i-professional, i-personalize) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/cloud-host/$(icon).png);
  }
}

/*application*/
@each $icon in (i-forFinance, i-forGame, i-forGovernment) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/cloud-host/i-app.png);
    vertical-align: middle;
  }
}

.i-forGame {
  background-position: 0 -99px;
}

.i-forMedia {
  background-position: 0 -198px;
}

.application {
  background-color: #f6f6f6 !important;
}
</style>
