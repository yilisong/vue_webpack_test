<template>
<websiteLayout>
  <ProductBanner name="double-mirror" :documents="documents">
    <i slot="icon" class="i-banner i-service"></i>
    <div slot="btns" class="bth-banner">
      <a class="purchase" @click="gotoPurchase()">立即购买</a>
      <a class="console" @click="isLogined(consoleUrl)">管理控制台</a>
    </div>
  </ProductBanner>
  <ProductContent :itemBlock="itemBlock">
    <div slot="advantage">
      <!-- production advantage -->
      <ProAdvantage :name="'double-mirror'" :documents="advantageDocument">
        <i slot="flexible" class="i-flexible"></i>
        <i slot="mirror" class="i-mirror"></i>
        <i slot="auto" class="i-auto"></i>
        <i slot="online" class="i-online"></i>
      </ProAdvantage>
    </div>
    <div slot="frame" class="frame">
      <!-- production frame -->
      <ProStructure :name="'double-mirror'"></ProStructure>
    </div>
    <div slot="scenarios">
      <!-- application scenarios -->
      <AppScenarios :name="'double-mirror'" :documents="appDocument">
        <i slot="crash" class="i-crash"></i>
        <i slot="destroy" class="i-destroy"></i>
        <i slot="spcial" class="i-spcial"></i>
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
import { doublemirrorTitle } from '../../assets/js/titles'
import { doublemirrorDoc } from '../../assets/js/introduceDoc'
import {
  mapActions
} from 'vuex'
import { isLogined } from 'common/utils/snippets'

export default {
  metaInfo: doublemirrorTitle,
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
      documents: doublemirrorDoc.documents,
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
      advantageDocument: doublemirrorDoc.advantageDocument,
      appDocument: doublemirrorDoc.appDocument,
      consoleUrl: '/console/double-mirror#/doubleMirrorList'
    }
  },
  methods: {
    ...mapActions([
      'getIsPurchasedOfMirror'
    ]),
    gotoPurchase() {
      this.getIsPurchasedOfMirror()
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
  background-image: url(../../assets/images/double-mirror/icon-service.png), url(../../assets/images/double-mirror/bg-service.png);
}

@each $icon in (i-flexible, i-mirror, i-auto, i-online) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/double-mirror/$(icon).png);
  }
}

/*application*/
@each $icon in (i-crash, i-destroy, i-spcial) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/double-mirror/i-app.png);
    vertical-align: middle;
  }
}

.i-destroy {
  background-position: 0 -99px;
}

.i-spcial {
  background-position: 0 -198px;
}
</style>
