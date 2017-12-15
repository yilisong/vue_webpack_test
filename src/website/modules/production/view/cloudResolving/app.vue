<template>
<websiteLayout>
  <ProductBanner name="cloud-resolving" :documents="documents">
    <i slot="icon" class="i-banner i-service"></i>
    <div slot="btns" class="bth-banner">
      <a class="console" @click="isLogined(consoleUrl)">管理控制台</a>
    </div>
  </ProductBanner>
  <ProductContent :itemBlock="itemBlock">
    <div slot="advantage">
      <!-- production advantage -->
      <ProAdvantage :name="'cloud-resolving'" :documents="advantageDocument">
        <i slot="safeguard" class="i-safeguard"></i>
        <i slot="reduce" class="i-reduce"></i>
        <i slot="dependence" class="i-dependence"></i>
        <i slot="extend" class="i-extend"></i>
        <i slot="protect" class="i-protect"></i>
      </ProAdvantage>
    </div>
    <div slot="parameter">
      <!-- parameters -->
      <ProParameter :name="'cloud-resolving'" :documents="paramsDocument">
        <i slot="meal" class="i-prop-meal"></i>
        <i slot="valadded" class="i-prop-valadded"></i>
      </ProParameter>
    </div>
    <div slot="scenarios">
      <!-- application scenarios -->
      <AppScenarios :name="'cloud-resolving'" :documents="appDocument">
        <i slot="register" class="i-register"></i>
        <i slot="resolver" class="i-resolver"></i>
        <i slot="reserve" class="i-reserve"></i>
      </AppScenarios>
    </div>
  </ProductContent>
  <YundunBar></YundunBar>
  <!-- ends -->
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
import { cloudresolvingTitle } from '../../assets/js/titles'
import { cloudresolvingDoc } from '../../assets/js/introduceDoc'
import { isLogined } from 'common/utils/snippets'

export default {
  metaInfo: cloudresolvingTitle,
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
      documents: cloudresolvingDoc.documents,
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
      advantageDocument: cloudresolvingDoc.advantageDocument,
      appDocument: cloudresolvingDoc.appDocument,
      paramsDocument: cloudresolvingDoc.paramsDocument,
      consoleUrl: '/console/cloud-resolving#/domainList'
    }
  },
  methods: {
    isLogined(url) {
      isLogined(url)
    },
    addTaichiDnsUrl() {
      const el = document.querySelectorAll('.param-three')[1]
      let text = el.innerText
      text = text.replace(/太极抗D DNS版/,'<a href="/taichiddosDns" class="alink">太极抗D DNS版</a>')
      el.innerHTML = text
    }
  },
  mounted() {
    this.addTaichiDnsUrl()
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
  background-image: url(../../assets/images/cloud-resolving/icon-service.png), url(../../assets/images/cloud-resolving/bg-service.png);
}

/*advantage*/
@each $icon in (i-safeguard, i-reduce, i-dependence, i-extend, i-protect) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/cloud-resolving/$(icon).png);
  }
}

/*parameters*/
@each $icon in (i-prop-meal, i-prop-valadded) {
  .$(icon) {
    display: inline-block;
    margin-right: 30px;
    margin-left: 20px;
    width: 19px;
    height: 19px;
    background-image: url(../../assets/images/cloud-resolving/$(icon).png);
    vertical-align: middle;
  }
}

/*application*/
@each $icon in (i-register, i-resolver, i-reserve) {
  .$(icon) {
    display: inline-block;
    margin-right: 50px;
    width: 85px;
    height: 99px;
    background-image: url(../../assets/images/cloud-resolving/i-app.png);
    vertical-align: middle;
  }
}

.i-resolver {
  background-position: 0 -99px;
}

.i-reserve {
  background-position: 0 -198px;
}

.parameter {
  background-color: #f6f6f6;
}
</style>

<style>
/*added*/
.alink {
  color: var(--primary-blue);
}
</style>
