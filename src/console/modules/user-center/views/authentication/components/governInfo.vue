<template lang="html">
<div class="info-box">
  <h4>政府信息</h4>
  <ul class="info-content">
    <li><span>机构名称</span>{{governName}}</li>
    <li><span>机构组织代码</span>{{governCode}}</li>
    <li><span>法定/负责人姓名</span>{{governMan}}</li>
    <li><span v-if="governTel">办公室电话</span>{{governTel}}</li>
    <li><span v-if="governAdd">机构地址</span>{{governAdd}}</li>
    <!-- <li class="pic"><span>营业执照</span>{{companyLicense}}</li> -->
    <li class="pic" v-if="governPic"><span>事业单位</span>已上传</li>
  </ul>
  <hr class="split">
  <h4>联系人信息</h4>
  <ul class="info-content">
    <li><span>姓名</span>{{contact}}</li>
    <li><span>手机号码</span>{{contactMobile}}</li>
    <li><span>联系QQ</span>{{contactQQ}}</li>
  </ul>
</div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    governName() {
      return this.$store.state.authentiStore.info.government.organization_name
    },
    governCode() {
      return this.$store.state.authentiStore.info.government.organization_code
    },
    governMan() {
      return this.$store.state.authentiStore.info.government.charge_man_name
    },
    governTel() {
      return this.$store.state.authentiStore.info.government.office_phone
    },
    governAdd() {
      return this.$store.state.authentiStore.info.government.organization_address
    },
    governPic() {
      return this.$store.state.authentiStore.info.government.organization_certificate_pic
    },
    contact() {
      return this.$store.state.authentiStore.info.government.contact_name
    },
    contactQQ() {
      return this.$store.state.authentiStore.info.government.contact_qq
    },
    contactMobile() {
      return this.$store.state.authentiStore.info.government.contact_mobile
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
