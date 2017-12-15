<template lang="html">
<div class="content-box">
  <msgbox></msgbox>
  <!-- <div class="info-box" v-if="this.$store.state.authentiStore.type === 2||this.$store.state.authentiStore.status === 4">
    <h4>企业信息</h4>
    <ul class="info-content">
      <li><span>企业名称</span>{{companyName}}</li>
      <li><span>统一社会信用代码</span>{{companyCode}}</li>
      <li class="pic"><span>营业执照</span>{{companyLicense}}</li>
    </ul>
    <hr class="split">
    <h4>联系人信息</h4>
    <ul class="info-content">
      <li><span>姓名</span>{{contact}}</li>
      <li><span>手机号码</span>{{contactMobile}}</li>
    </ul>
  </div>
  <div class="info-box" v-else>
    <h4>个人信息</h4>
    <ul class="info-content">
      <li><span>姓名</span>{{name}}</li>
      <li><span>身份证号码</span>{{IDnumber}}</li>
      <li><span>手机号码</span>{{mobile}}</li>
      <li class="pic"><span>手持身份证</span>{{pic}}</li>
    </ul>
  </div> -->
  <companyinfo v-if="this.$store.state.authentiStore.type === 2||this.$store.state.authentiStore.status === 4"></companyinfo>
  <governInfo v-else-if="this.$store.state.authentiStore.type === 3||this.$store.state.authentiStore.status === 7" />
  <personalinfo v-else></personalinfo>
</div>
</template>

<script>
import msgBox from '../components/msgBox'
import personalInfo from '../components/personalInfo'
import companyInfo from '../components/companyInfo'
import governInfo from '../components/governInfo'
export default {
  data() {
    return {
      personalInfo: {
        name: '吴世勋',
        IDcard: '35412544',
        phone: '13717546532',
        pic: '已上传'
      },
      companyInfo: {
        name: '上海**公司',
        code: '1234564567',
        busLicense: '已上传'
      }
    }
  },
  mounted() {},
  computed: {
    name() {
      return this.$store.state.authentiStore.info.personal.name
    },
    IDnumber() {
      return this.$store.state.authentiStore.info.personal.personal_id_card
    },
    mobile() {
      return this.$store.state.authentiStore.info.personal.mobile
    },
    pic() {
      return this.$store.state.authentiStore.info.personal.personal_id_card_pic
    },
    companyName() {
      return this.$store.state.authentiStore.info.company.name
    },
    companyCode() {
      return this.$store.state.authentiStore.info.company.code
    },
    companyLicense() {
      return this.$store.state.authentiStore.info.company.license
    },
    contact() {
      return this.$store.state.authentiStore.info.company.contact
    },
    contactMobile() {
      return this.$store.state.authentiStore.info.company.mobile
    }
  },
  components: {
    msgbox: msgBox,
    personalinfo: personalInfo,
    companyinfo: companyInfo,
    governInfo
  }
}
</script>
<style media="screen" scoped>
.content-box {
  padding: 10px;
}
</style>
