<template>
<websiteLayout>
  <ProductBanner name="taichi-ddos-app" :documents="documents">
    <i slot="icon" class="i-banner i-app"></i>
    <div slot="btns" class="bth-banner">
      <a class="purchase" @click="linkService()">咨询商务</a>
      <a class="console" @click="isLogined(consoleUrl)">管理控制台</a>
    </div>
  </ProductBanner>
  <ProductContent :color="'dark'" :itemBlock="itemBlock">
    <div slot="advantage">
      <!-- production advantage -->
      <ProAdvantage :name="'taichi-ddos-app'" :documents="advantageDocument">
        <i slot="distributedNode" class="i-distributedNode"></i>
        <i slot="autoAntiCC" class="i-autoAntiCCImg"></i>
        <i slot="access" class="i-access"></i>
      </ProAdvantage>
    </div>
    <div slot="frame">
      <!-- production frame -->
      <ProStructure :name="'taichi-ddos-app'"></ProStructure>
    </div>
    <div slot="scenarios">
      <!-- application scenarios -->
      <AppScenarios :name="'taichi-ddos-app'" :documents="appDocument">
        <i slot="window" class="i-forWindow"></i>
        <i slot="android" class="i-forAndroid"></i>
        <i slot="ios" class="i-forIOS"></i>
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
import {
  taichiddosappTitle
} from '../../assets/js/titles'
import {
  taichiddosappDoc
} from '../../assets/js/introduceDoc'
import { isLogined } from 'common/utils/snippets'

export default {
  metaInfo: taichiddosappTitle,
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
      documents: taichiddosappDoc.documents,
      itemBlock: [{
        title: '产品优势',
        slot: 'advantage'
      }, {
        title: '产品架构',
        slot: 'frame'
      }, {
        title: '应用场景',
        slot: 'scenarios'
      }],
      advantageDocument: taichiddosappDoc.advantageDocument,
      appDocument: taichiddosappDoc.appDocument,
      consoleUrl: '/console/game-shield#/gameList'
    }
  }
}
</script>

<style scoped>
%icon-placeholder {
  display: inline-block;
  margin-bottom: 40px;
  width: 100%;
  height: 99px;
  background-repeat: no-repeat;
  background-position: center 0;
}

.i-app {
  background-image: url(../../assets/images/taichi-ddos-app/icon-service.png), url(../../assets/images/taichi-ddos-app/bg-service.png);
}

@each $icon in (i-distributedNode, i-autoAntiCCImg, i-access) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/taichi-ddos-app/$(icon).png);
  }
}



/*application*/

@each $icon in (i-forWindow, i-forAndroid, i-forIOS) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/taichi-ddos-app/i-app.png);
    vertical-align: middle;
  }
}

.i-forAndroid {
  background-position: 0 -99px;
}

.i-forIOS {
  background-position: 0 -198px;
}
</style>
