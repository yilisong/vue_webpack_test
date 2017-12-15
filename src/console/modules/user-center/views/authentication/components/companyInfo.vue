<template lang="html">
<div class="info-box">
  <h4>企业信息</h4>
  <ul class="info-content">
    <li><span>企业名称</span>{{companyName}}</li>
    <li><span>统一社会信用代码</span>{{companyCode}}</li>
    <!-- <li class="pic"><span>营业执照</span>{{companyLicense}}</li> -->
    <li class="pic"><span>营业执照</span>已上传</li>
  </ul>
  <hr class="split">
  <h4>联系人信息</h4>
  <ul class="info-content">
    <li><span>姓名</span>{{contact}}</li>
    <li><span>手机号码</span>{{contactMobile}}</li>
  </ul>
</div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    companyName() {
      return this.$store.state.authentiStore.info.company.company_name
    },
    companyCode() {
      return this.$store.state.authentiStore.info.company.company_tyshxy_card
    },
    companyLicense() {
      return this.$store.state.authentiStore.info.company.company_yyzz_pic
    },
    contact() {
      return this.$store.state.authentiStore.info.company.company_concat_name
    },
    contactMobile() {
      return this.$store.state.authentiStore.info.company.company_concat_mobile
    }
  }
}
</script>

<style lang="css" scoped>
h4 {
  font-weight: 100;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.info-box {
  padding: 0 10px;
}

.info-content li {
  font-size: 14px;
  color: #333;
}

.info-content li+li {
  margin-top: 15px;
}

.info-content li span {
  display: inline-block;
  width: 200px;
  color: #000;
}

/*.info-content li span::before {
  content: "*";
  color: red;
  padding: 0 1px;
}*/

.split {
  margin: 0;
  padding: 0;
  border: 0;
  background-color: #d7d7d7;
  height: 1px;
  margin-top: 25px;
}

/*.pic {
  color: rgb(46, 161, 233)!important;
}*/
</style>
