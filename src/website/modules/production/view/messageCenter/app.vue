<template lang="html">
  <websiteLayout>
    <div class="main-body">
        <img v-if="status === 1" class="show-box" src="./images/success.png"/>
        <img v-else-if="status === 0" class="show-box" src="./images/error.png"/>
        <div v-else="status === -1" class="show-box holding-box"><h1>查询中...</h1></div>
        <div class="center-msg">
          {{info}}
        </div>
    </div>
</websiteLayout>
</template>

<script>
import 'website/static/css/link.css'
import websiteLayout from 'common/components/layout/website-layout'
import SourceProductionResource from '../../resource/sourceProduction'
export default {
  components: {
    websiteLayout
  },
  data() {
    return {
      status: -1,
      info: ''
    }
  },
  created() {
    this.getMessage()
  },
  mounted() {

  },
  methods: {
    getMessage() {
      const paramArr = window.location.pathname.split('/')
      SourceProductionResource.getEmailResponsePage({
        key: paramArr[paramArr.length - 1]
      }).then(response => {
        this.status = response.data.data.status
        this.info = response.data.data.info
      })
    }
  }
}
</script>

<style scoped>
div.main-body {
  position: relative;
  min-width: 1100px;
  min-height: 466px;
  padding-top: 140px;
}

.show-box {
  width:550px;
  display: block;
  margin: 0 auto;
}
.holding-box {
  min-height: 466px;
  text-align: center;
  padding-top: 200px;
}
.center-msg {
  position: absolute;
  width: 100%;
  top: 340px;
  text-align: center;
}
</style>
