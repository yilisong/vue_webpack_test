<template lang="html">
<website-layout>
  <div class="login-bg">
    <div class="login-container">
      <!-- <div class="login-ad">
        <el-carousel trigger="click" height="392px" arrow="never">
          <el-carousel-item>
            <img src="../../static/images/login-part/banner002.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../static/images/login-part/banner003.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../static/images/login-part/banner004.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../static/images/login-part/banner005.jpg" alt="">
          </el-carousel-item>
        </el-carousel>
      </div> -->
      <!-- <img src="../../static/images/login-part/dot.png" alt="" class="eleven-dot"> -->
      <PromotionalDecember class="december" />
      <!-- <div class="eleven-container">
        <div class="eleven-tip">
          <p><span class="eleven-time">活动时间：2017.10.30 - 2017.11.15</span></p>
        </div>
        <img src="../../static/images/login-part/title.png" alt="" class="eleven-shine">
        <div class="eleven-tip">
          <p><span class="eleven-time">活动时间：2017.10.30 - 2017.11.15</span></p>
          <a href="/sale" class="eleven-btn" target="_blank"></a>
        </div>
      </div> -->
      <!-- <img src="../../static/images/login-part/login_title.png" alt="" class="activity-title">
      <img src="../../static/images/login-part/square.svg" alt="" class="square"> -->
      <div class="login-box">
        <h4 class="title">账号登录</h4>
        <div class="input-box website-common-input">
          <div class="input-box">
            <el-input type="text" v-model="userInfo.username" auto-complete="off" placeholder="手机或邮箱"></el-input>
            <!-- <span v-show="tip.user">手机或邮箱</span> -->
          </div>
          <div class="input-box">
            <el-input type="password" v-model="userInfo.password" auto-complete="off" @keyup.enter.native="login" placeholder="密码"></el-input>
            <!-- <span v-show="tip.password">密码</span> -->
          </div>

        </div>
        <div class="forgot">
          <a href="/find-pass">忘记密码？</a>
        </div>
        <el-button type="primary" class="login-btn" @click="login" :disabled="isClick" :loading="isClick">登录</el-button>
        <hr class="login-split">
        <div class="create-account">
          新用户？<a href="/register">创建一个YUNDUN账户</a>
        </div>
      </div>
    </div>
    <!-- <div class="eleven-light">

    </div> -->
    <!-- <img src="../../static/images/login-part/shining.png" alt="" class="eleven-light"> -->
  </div>
</website-layout>
</template>

<script>
import PromotionalDecember from './components/PromotionalDecember/PromotionalDecember'
import websiteLayout from 'common/components/layout/website-layout'
import {
  BASE_URL
} from 'common/config/interceptor'
import {
  judgeSend
} from '../../static/js/normal'
import SourceWebResource from '../../static/js/SourceWebResource'
import {
  JSONP,
  returnOrigin
} from 'common/assets/js/normal'

export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      userTip: {
        username: '用户名',
        password: '密码'
      },
      tip: {
        user: true,
        password: true
      },
      isClick: false
    }
  },
  mounted() {
    SourceWebResource.getUserInfo().then(response => {
      if (response.status === 200) {
        if (response.data.http_status_code !== 204) {
          window.location = document.referrer || returnOrigin()
        }
      }
    })
  },
  methods: {
    judgeUser() {
      this.tip.user = this.userInfo.username === ''
    },
    judgePass() {
      this.tip.password = this.userInfo.password === ''
    },
    login() {
      if (judgeSend(this.userInfo, this.userTip) === true) {
        this.isClick = true
        SourceWebResource.login(this.userInfo)
          .then(response => {
            if (response.status === 200) {
              if (
                document.referrer.indexOf('find-pass', 0) !== -1 ||
                document.referrer.indexOf('register', 0) !== -1 ||
                document.referrer.indexOf('login', 0) !== -1
              ) {
                window.location = returnOrigin()
              } else {
                window.location = document.referrer || returnOrigin()
              }
            } else {
              this.$message.error(response.data.status.message)
            }
            this.isClick = false
          })
          .catch(error => {
            if (
              error.response.status === 500 &&
              error.response.data.error === 'No token'
            ) {
              JSONP.getJSON(
                BASE_URL + '/sso/V4/attach', {
                  callback: '?'
                },
                res => {}
              )
            } else {
              this.$message.error(error.response.data.error)
            }
            this.isClick = false
          })
      }
    }
  },
  components: {
    websiteLayout,
    PromotionalDecember
  }
}
</script>
<style>
@import '../../static/css/common.css';
</style>
<style scoped>
.december {
  width: 700px;
  height: 400px;
  padding-top: 240px;
}

.login-bg {
  background: #0c1133;
  position: relative;
  height: 681px;
  overflow: hidden;
  z-index: 100;
  background: url(../../static/images/login-part/top_bar.png) top left no-repeat;
}

.eleven-time {
  font-size: 12px;
}



/*.login-bar {
  background: url("../../static/images/login-part/red_bar.png")center center no-repeat;
  background-size: cover;

  height: 109px;
  width: 100%;
  z-index: 9;
  position: absolute;
}*/

.eleven-btn {
  margin-left: -2px;
  display: inline-block;
  width: 215px;
  height: 43px;
  background: url('../../static/images/login-part/btn.png')center center no-repeat;
}

.eleven-green {
  letter-spacing: 1px;
  color: #91ff00;
}

.eleven-tip {
  position: absolute;
  top: 407px;
  left: 134px;
  /* bottom: 299px; */
  color: #fff;
  text-align: center;
  span {
    display: block;
  }
  p {
    padding: 7px 35px;
    height: 43px;
    box-sizing: border-box;
    line-height: 30px;
    background: rgba(0, 0, 0, .3);
    display: inline-block;
    vertical-align: top;
  }
}

.eleven-dot {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.eleven-light {
  position: absolute;
  bottom: 0;
  z-index: -1;
}

.eleven-container {
  position: relative;
}

.eleven-shine {
  position: absolute;
  top: 57px;
  left: -45px;
}

.square {
  width: 474.7px;
  height: 204px;
  position: absolute;
  bottom: -78px;
  left: 0;
}

.activity-title {
  display: inline-block;
  vertical-align: top;
  margin-top: 225px;
  margin-left: 48px;
}

.login-split {
  background: #e5e5e5;
}

.login-box a {
  color: #2d90e6;
}

.login-container {
  width: 1200px;
  height: 576px;
  margin: 0 auto;
  position: relative;
}

.login-ad {
  display: inline-block;
  width: 56%;
  vertical-align: top;
  margin-top: 87px;
}

.login-box {
  display: inline-block;
  box-sizing: border-box;
  /*margin: 95px 0;
  margin-left: 41px;*/
  width: 422px;
  height: 394px;
  padding: 44px 40px;
  box-shadow: 0px 4px 12px 0 rgba(3, 3, 3, .12);
  background: #fff;
  position: absolute;
  right: 43px;
  top: 147px;
  z-index: 100;
}

.login-box .title {
  font-size: 18px;
  color: #333;
  font-weight: 100;
}

.login-box .input-box {
  margin-top: 54px;
}

.login-box .forgot {
  text-align: right;
  color: #2d90e6;
  margin-top: 10px;
}

.login-box .forgot a {
  color: inherit;
  margin-top: 5px;
}

.login-box .login-btn {
  margin: 34px 0;
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
  height: 36px;
  border-radius: 4px;
}

.input-box {
  position: relative;
  span {
    position: absolute;
    top: 10px;
    left: 12px;
    color: #97a8be;
  }
}

.input-box+.input-box {
  margin-top: 12px;
}

.create-account {
  margin-top: 19px;
}
</style>
<style>
.login-box .input-box .el-input {
  border-color: #ccc;
}

.login-box .input-box .el-input+.el-input {
  margin-top: 12px;
}

.login-ad .el-carousel__indicator .el-carousel__button {
  background: #D6D6D6;
  width: 12px;
}

.login-ad .is-active .el-carousel__button {
  background: #2ea1e9;
  width: 24px;
}

.login-ad .el-carousel__indicators {
  bottom: 13px;
}
</style>
