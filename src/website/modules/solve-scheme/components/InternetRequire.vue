<template lang="html">
<div class="product-container service">
  <p class="title">行业需求</p>
  <ul class="service-container">
    <li v-bind:class="{'active':!service.refer}" @mouseenter="switchCard('refer')" @mouseleave="judgeAll('refer')">
      <div class="safe-box">
        <h3 class="safe-title refer">DDoS攻击防护<i class="safe-refer normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.refer">
          <h4>互联网数据中心（IDC）具有高带宽、大流量...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.refer" v-bind:class="{'safe-fade':!service.refer}">
          <div class="">
            <p>互联网数据中心（IDC）具有高带宽、大流量、数据高度集中、服务用户所属行业复杂，一旦有用户遭受DDoS攻击，将影响整个IDC网络，带来其他客户投诉。</p>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.app}" @mouseenter="switchCard('app')" @mouseleave="judgeAll('app')">
      <div class="safe-box">
        <h3 class="safe-title app">安全合规要求<i class="safe-app normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.app">
          <h4>工信部根据IDC自身的特点，制定了...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.app" v-bind:class="{'safe-fade':!service.app}">
          <div class="">
            <p>工信部根据IDC自身的特点，制定了针对互联网数据中心（IDC）的等级保护要求，以促进IDC安全防护能力的提升。</p>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.polling,'safe-fade':!service.polling}" @mouseenter="switchCard('polling')" @mouseleave="judgeAll('polling')">
      <div class="safe-box">
        <h3 class="safe-title polling">业务升级要求<i class="safe-polling normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.polling">
          <h4>传统IDC机房涉及业务更多的是服务器托管...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.polling" v-bind:class="{'safe-fade':!service.polling}">
          <div class="">
            <p>传统IDC机房涉及业务更多的是服务器托管、机柜租用、大带宽租用等服务。随着云计算的发展，新型互联网公司正在蚕食IDC用户资源，传统IDC需要拓展自身业务类型来提升竞争力。</p>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.safeguard}" @mouseenter="switchCard('safeguard')" @mouseleave="judgeAll('safeguard')">
      <div class="safe-box">
        <h3 class="safe-title safeguard">用户安全需求<i class="safe-safeguard normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.safeguard">
          <h4>随着安全意识的提升和《中华人民共和国网络安全法》正式实施...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.safeguard" v-bind:class="{'safe-fade':!service.safeguard}">
          <div class="">
            <p>随着安全意识的提升和《中华人民共和国网络安全法》正式实施，越来越多客户希望运营商提供更多的增值服务来满足DDoS攻击、网页篡改、系统入侵、漏洞等防护需求。</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      service: {
        refer: false,
        app: true,
        polling: true,
        safeguard: true
      }
    }
  },
  methods: {
    switchCard(type) {
      for (const i in this.service) {
        this.service[i] = !(i === type)
      }
    },
    judgeAll(type) {
      let isAll = false
      for (const i in this.service) {
        if (i !== type)
          isAll = this.service[i]
      }
      this.service[type] = !isAll
    }
  }
}
</script>

<style scoped>
.service {
  height: 450px;
  .title {
    font-size: 24px;
    margin: 60px 0 30px 0;
    font-weight: 500px;
  }
}

.service-container {
  li {
    display: inline-block;
    width: 25%;
    height: 305px;
    box-sizing: border-box;
    vertical-align: top;
    position: relative;
    padding: 22px;
    margin-left: -4px;
    transition: all .3s cubic-bezier(.4, 0, .2, 1), z-index 0s .12s;
  }
  li+li::before {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 175px;
    background: #efefef;
    left: 0;
    top: 147px;
  }
}

.title-icon {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.safe-box {
  .safe-title {
    text-align: center;
    position: relative;
    padding: 20px 0;
    font-weight: 100;
    margin-top: 38px;
  }
  .normal-icon {
    position: absolute;
    display: block;
    width: 50px;
    height: 34px;
    bottom: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  hr {
    background: #efefef;
  }
  .brief {
    padding: 30px 0;
    h4 {
      font-size: 14px;
      color: #333;
    }
    h4+h4 {
      margin-top: 25px;
    }
  }
}

.safe-refer {
  background: url('../assets/images/ddos.png') bottom center no-repeat;
}

.active .safe-refer {
  background: url('../assets/images/ddos.png') top center no-repeat;
}

.safe-app {
  background: url('../assets/images/safe.png') bottom center no-repeat;
}

.active .safe-app {
  background: url('../assets/images/safe.png') top center no-repeat;
}

.safe-polling {
  background: url('../assets/images/business.png') bottom center no-repeat;
}

.active .safe-polling {
  background: url('../assets/images/business.png') top center no-repeat;
}

.safe-safeguard {
  background: url('../assets/images/user.png') bottom center no-repeat;
}

.active .safe-safeguard {
  background: url('../assets/images/user.png') top center no-repeat;
}

.refer+hr,
.polling+hr {
  width: 30%;
}

.app+hr {
  width: 45%;
}

.safeguard+hr {
  width: 47%;
}

.so-on {
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
}

.so-on,
.so-on::before,
.so-on::after {
  background: #2d90e6;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  display: block;
}

.so-on::before,
.so-on::after {
  content: "";
  position: absolute;
  margin: 0 2px;
}

.so-on::before {
  right: 100%;
}

.so-on::after {
  left: 100%;
}

.service-container .active {
  position: relative;
  width: 24.3%;
  height: 346px;
  /*border-bottom: 3px solid #2d90e6;*/
  box-shadow: 0 0 5px #dadcdf;
  .safe-box hr {
    width: 100%;
    background: #2d90e6;
    transition: all .3s cubic-bezier(.4, 0, .2, 1), z-index 0s .8s;
  }
  .details-box {
    transition: all .7s;
    h4,
    p {
      text-align: left;
      color: #333;
    }
    h4 {
      font-size: 14px;
      margin-top: 30px;
    }
    p {
      font-size: 12px;
      margin-top: 10px;
      line-height: 1.5;
      margin-top: 40px;
    }
    a {
      text-align: left;
      display: block;
      margin-top: 14px;
      color: #2d90e6;
      font-size: 12px;
    }
  }
}

.service-container .active::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 3px;
  background: #2d90e6;
  left: 0;
  bottom: 0;
  transition: all .3s;
}

.safe-fade {
  animation-duration: .7s;
  animation-fill-mode: both;
  animation-name: fadeIn;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
