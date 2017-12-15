<template>
<websiteLayout>
  <ProductBanner name="server-guard" :documents="documents">
    <i slot="icon" class="i-banner i-service"></i>
    <div slot="btns" class="bth-banner">
      <!-- <a class="purchase" href="/console/serve-guard">免费下载</a> -->
      <a class="purchase darken">免费下载<span class="countdown">敬请期待</span></a>
    </div>
  </ProductBanner>
  <ProductContent :color="'dark'" :itemBlock="itemBlock">
    <div slot="parameter">
      <!-- parameters -->
      <ProParameter :name="'cloud-speed'" :documents="paramsDocument">
        <i slot="package" class="i-prop-package"></i>
        <i slot="rate" class="i-prop-rate"></i>
        <i slot="tcp" class="i-prop-tcp"></i>
        <i slot="port" class="i-prop-port"></i>
        <i slot="list" class="i-prop-list"></i>
        <i slot="ddos" class="i-prop-ddos"></i>
        <i slot="web" class="i-prop-web"></i>
        <i slot="defend" class="i-prop-defend"></i>
      </ProParameter>
    </div>
    <div slot="scenarios">
      <!-- AppScenarios -->
      <AppScenarios :name="'server-guard'" :documents="appDocument">
        <i slot="forWindServer" class="i-forWindServer"></i>
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
import ProParameter from 'website/components/ProParameter/ProParameter'
import AppScenarios from 'website/components/AppScenarios/AppScenarios'
import YundunBar from 'website/components/YundunBar'
import {
  serverguardTitle
} from '../../assets/js/titles'
import {
  serverguardDoc
} from '../../assets/js/introduceDoc'

export default {
  metaInfo: serverguardTitle,
  components: {
    websiteLayout,
    ProductBanner,
    ProductContent,
    ProParameter,
    AppScenarios,
    YundunBar
  },
  data() {
    return {
      documents: serverguardDoc.documents,
      itemBlock: [{
        title: '功能参数',
        slot: 'parameter'
      }, {
        title: '应用场景',
        slot: 'scenarios'
      }],
      paramsDocument: serverguardDoc.paramsDocument,
      appDocument: serverguardDoc.appDocument
    }
  }
}
</script>

<style scoped>
.i-service {
  background-image: url(../../assets/images/server-guard/icon-service.png), url(../../assets/images/server-guard/bg-service.png);
}


/*parameter*/

@each $icon in (i-prop-package, i-prop-rate, i-prop-tcp, i-prop-port, i-prop-list, i-prop-ddos, i-prop-web, i-prop-defend) {
  .$(icon) {
    display: inline-block;
    margin-right: 30px;
    margin-left: 20px;
    width: 18px;
    height: 18px;
    background-image: url(../../assets/images/server-guard/$(icon).png);
    vertical-align: middle;
  }
}

.a-param {
  &:hover,
  &.active {
    i {
      background-position: 0 -18px;
    }
  }
}


/*application*/

@each $icon in (i-forWindServer) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/server-guard/i-app.png);
    vertical-align: middle;
  }
}
</style>
