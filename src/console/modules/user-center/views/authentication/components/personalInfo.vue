<template lang="html">
<div class="info-box">
  <h4>个人信息</h4>
  <ul class="info-content">
    <li><span>姓名</span>{{name}}</li>
    <li><span>身份证号码</span>{{IDnumber}}</li>
    <li><span>手机号码</span>{{mobile}}</li>
    <!-- <li class="pic"><span>手持身份证正面</span>{{pic}}</li>
    <li class="pic"><span>手持身份证反面</span>{{picNegative}}</li> -->
    <li class="pic"><span>手持身份证正面</span>已上传</li>
    <li class="pic"><span>手持身份证反面</span>已上传</li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.$store.state.authentiStore)
  },
  computed: {
    name() {
      return this.$store.state.authentiStore.info.personal.personal_name
    },
    IDnumber() {
      return this.$store.state.authentiStore.info.personal.personal_id_card
    },
    mobile() {
      return this.$store.state.authentiStore.info.personal.personal_mobile
    },
    pic() {
      return this.$store.state.authentiStore.info.personal.personal_id_card_pic
    },
    picNegative() {
      return this.$store.state.authentiStore.info.personal.personal_id_card_pic_negative
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
  padding: 20px 10px;
}

.info-content li {
  font-size: 14px;
  color: #333;
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

.pic {
  color: rgb(46, 161, 233);
}
</style>
