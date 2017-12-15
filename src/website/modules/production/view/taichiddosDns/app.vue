<template lang="html">
  <websiteLayout>
    <ProductBanner name="taichi-ddos-dns" :documents="documents">
      <i slot="icon" class="i-banner i-dns"></i>
      <div slot="btns" class="bth-banner">
        <a class="purchase" @click="linkService()">咨询商务</a>
        <a class="console" @click="isLogined(consoleUrl)">管理控制台</a>
      </div>
    </ProductBanner>
    <!-- production advantage -->
    <ProAdvantage :name="'taichi-ddos-dns'" :documents="advantageDocument">
      <i slot="antiAttack" class="i-antiAttack"></i>
      <i slot="stable" class="i-stable"></i>
      <i slot="autoAnalyse" class="i-autoAnalyse"></i>
    </ProAdvantage>
    <YundunBar></YundunBar>
    <!-- ends -->
  </websiteLayout>
</template>

<script>
import 'website/modules/production/assets/css/theme-dark.css'
import websiteLayout from 'common/components/layout/website-layout'
import ProductBanner from 'website/components/ProductBanner/ProductBanner'
import ProAdvantage from 'website/components/ProAdvantage/ProAdvantage'
import YundunBar from 'website/components/YundunBar'
import help from 'common/utils/help'
import { taichiddosdnsTitle } from '../../assets/js/titles'
import { taichiddosdnsDoc } from '../../assets/js/introduceDoc'
import { isLogined } from 'common/utils/snippets'

export default {
  metaInfo: taichiddosdnsTitle,
  components: {
    websiteLayout,
    ProductBanner,
    ProAdvantage,
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
      documents: taichiddosdnsDoc.documents,
      advantageDocument: taichiddosdnsDoc.advantageDocument,
      consoleUrl: '/console/taichi-dns#/DomainList'
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

.i-dns {
  background-image: url(../../assets/images/taichi-ddos-dns/icon-service.png), url(../../assets/images/taichi-ddos-dns/bg-service.png);
}

@each $icon in (i-antiAttack, i-stable, i-autoAnalyse) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/taichi-ddos-dns/$(icon).png);
  }
}

</style>
