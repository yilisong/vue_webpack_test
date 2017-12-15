<template lang="html">
<div class="content-box">
  <msgbox></msgbox>
  <Tip :content="updateTip" v-show="containerShow" />
  <div class="audited-box">
    <companyinfo v-if="this.$store.state.authentiStore.type === 2"></companyinfo>
    <governInfo v-else-if="this.$store.state.authentiStore.type === 3" />
    <personalinfo v-else v-show="!containerShow">
    </personalinfo>
    <el-button type="primary" @click="showUp('containerShow','company')" v-show="!containerShow" v-if="this.$store.state.authentiStore.type === 1">升级认证为企业</el-button>
    <el-button type="primary" @click="showUp('containerShow','govern')" v-show="!containerShow" v-if="this.$store.state.authentiStore.type === 1">升级认证为政府或事业单位</el-button>
    <div class="" v-show="containerShow">
      <upgrade v-show="show.company"></upgrade>
      <governBox v-show="show.govern" />
      <el-button @click="containerShow=false" v-show="containerShow" class="cancel-btn">取消升级</el-button>
    </div>
  </div>
</div>
</template>

<script>
import Tip from 'common/components/Tip/Tip'
import msgBox from '../components/msgBox'
import personalInfo from '../components/personalInfo'
import companyInfo from '../components/companyInfo'
import governInfo from '../components/governInfo'
import governBox from '../components/governBox'
import Upgrade from '../components/upgrade'
export default {
  data() {
    return {
      containerShow: false,
      updateTip: [],
      tip: {
        company: [
          '1. 支持个人认证用户升级为企业认证用户； 不支持企业认证用户降级为个人认证用户。',
          '2. 支持企业认证用户申请企业增值税普通发票或增值税专用发票， 享企业专用节点资源等定制化服务。 ',
          '3. 您对您所填信息的真实性负全部法律责任， 上海云盾有权禁用任何有信息伪造行为的用户账号。 '
        ],
        govern: ['1.支持个人认证用户升级为政府或事业单位认证用户；不支持政府或事业单位认证用户降级为个人认证用户。',

          '2.支持政府或事业单位认证用户申请增值税普通发票或增值税专用发票，享政府或事业单位专用节点资源等定制化服务。',

          '3.您对您所填信息的真实性负全部法律责任，上海云盾有权禁用任何有信息伪造行为的用户账号。'
        ]
      },
      show: {
        company: false,
        govern: false
      },
      mainShow: true
    }
  },
  methods: {
    showUp(container, target) {
      this[container] = true
      this.showContent(this.show, target)
      this.updateTip = this.tip[target]
    },
    showContent(data, type) {
      for (const i in data)
        data[i] = i === type
    }
  },
  components: {
    msgbox: msgBox,
    personalinfo: personalInfo,
    companyinfo: companyInfo,
    upgrade: Upgrade,
    governInfo,
    governBox,
    Tip
  }
}
</script>

<style lang="css" scoped>
.content-box {
  padding: 7px 20px;
  /*height: calc(100vh - 230px);*/
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.audited-box {
  position: relative;
}

.cancel-btn {
  position: absolute;
  bottom: 21px;
}
</style>
