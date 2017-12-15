<template lang="html">
<website-layout>
  <div class="user-container">
    <div class="img-box">
      <img src="../../static/images/success.png" alt="">
      <p class="state">注册成功</p>
    </div>
    <div class="content-box">
      <p class="login-des">您的登录邮箱:<span>osh@qq.com</span>，前往
        <a class="router-cursor">登录页面</a>
      </p>
    </div>
  </div>
</website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'

export default {
  data() {
    return {

    }
  },
  components: {
    websiteLayout
  }
}
</script>

<style lang="css">
.user-container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}

.img-box {
  position: relative;
  width: 477px;
  margin: 160px 0 160px 100px;
}

.img-box .state {
  position: absolute;
  left: 41.5%;
  top: 58%;
}

.content-box {
  position: absolute;
  top: 45%;
  left: 57%;
}

.content-box a {
  color: #2d90e6;
}
</style>
