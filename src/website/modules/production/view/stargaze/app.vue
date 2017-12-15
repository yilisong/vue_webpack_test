<template lang="html">
  <websiteLayout>
    <ProductBanner name="hadoop-risk-detect" :documents="documents">
      <i slot="icon" class="i-banner i-service"></i>
      <div slot="btns" class="bth-banner">
        <a class="purchase" @click="linkService">咨询商务</a>
        <!-- <a class="console" href="/console/observe-risk">管理控制台</a> -->
        <a class="console darken">管理控制台<span class="countdown">敬请期待</span></a>
      </div>
    </ProductBanner>
    <!-- production advantage -->
    <ProAdvantage :name="'hadoop-risk-detect'" :documents="advantageDocument">
      <i slot="verify" class="i-verify"></i>
      <i slot="credit" class="i-credit"></i>
      <i slot="cloud" class="i-cloud"></i>
      <i slot="checkCode" class="i-checkCode"></i>
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
import {
  stargazeTitle
} from '../../assets/js/titles'
import {
  stargazeDoc
} from '../../assets/js/introduceDoc'

export default {
  metaInfo: stargazeTitle,
  components: {
    websiteLayout,
    ProductBanner,
    ProAdvantage,
    YundunBar
  },
  data() {
    return {
      documents: stargazeDoc.documents,
      advantageDocument: stargazeDoc.advantageDocument
    }
  },
  methods: {
    linkService() {
      help.linkService()
    }
  }
}
</script>

<style scoped>
.i-service {
  background-image: url(../../assets/images/hadoop-risk-detect/icon-service.png), url(../../assets/images/hadoop-risk-detect/bg-service.png);
}

%icon-placeholder {
  display: inline-block;
  margin-bottom: 40px;
  width: 100%;
  height: 99px;
  background-repeat: no-repeat;
  background-position: center 0;
}

@each $icon in (i-verify, i-credit, i-cloud, i-checkCode) {
  .$(icon) {
    @extend %icon-placeholder;
    background-image: url(../../assets/images/hadoop-risk-detect/$(icon).png);
  }
}
</style>
