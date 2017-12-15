<template lang="html">
<div class="product-container service">
  <p class="title">行业需求</p>
  <ul class="service-container">
    <li v-bind:class="{'active':!service.refer}" @mouseenter="switchCard('refer')" @mouseleave="judgeAll('refer')">
      <div class="safe-box">
        <h3 class="safe-title refer">应用安全<i class="safe-refer normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.refer">
          <h4>棋牌游戏在活动页面、官网、代理商系统...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.refer" v-bind:class="{'safe-fade':!service.refer}">
          <div class="">
            <p>棋牌游戏在活动页面、官网、代理商系统、API接口、APP包等应用存在WEB漏洞、数据篡改、接口篡改、入侵拖库、内容篡改、钓鱼APP等风险。</p>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.app}" @mouseenter="switchCard('app')" @mouseleave="judgeAll('app')">
      <div class="safe-box">
        <h3 class="safe-title app">业务安全<i class="safe-app normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.app">
          <h4>棋牌游戏存在被恶意登录注册、羊毛党、DNS劫持...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.app" v-bind:class="{'safe-fade':!service.app}">
          <div class="">
            <p>棋牌游戏存在被恶意登录注册、羊毛党、DNS劫持、安全合规、外挂等风险，可能导致活动推广薅羊毛、玩家账号被盗、信息泄露、虚拟财产转移、恶意刷分、网站劫持跳转、游戏下载更新植入恶意代码等风险，会破坏游戏平衡、降低玩家体验、导致用户流失。</p>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.polling,'safe-fade':!service.polling}" @mouseenter="switchCard('polling')" @mouseleave="judgeAll('polling')">
      <div class="safe-box">
        <h3 class="safe-title polling">可用性安全<i class="safe-polling normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.polling">
          <h4>游戏行业因其高额的利润和不断攀升的竞争使得...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.polling" v-bind:class="{'safe-fade':!service.polling}">
          <div class="">
            <p>游戏行业因其高额的利润和不断攀升的竞争使得游戏行业已成为DDoS攻击重灾区, 同时部分棋牌游戏厂商因无技术团队、低质量代码、无高可用性平行扩展技术方案使支付接口、WEB应用、登录服务器/房间服务器等业务支撑不可用并影响业务的正常运行。</p>
          </div>
        </div>
      </div>
    </li>
    <!-- <li v-bind:class="{'active':!service.safeguard}" @mouseenter="switchCard('safeguard')" @mouseleave="judgeAll('safeguard')">
      <div class="safe-box">
        <h3 class="safe-title safeguard">监管挑战<i class="safe-safeguard normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.safeguard">
          <h4>传统的监管方式耗费大量的人力和时间...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.safeguard" v-bind:class="{'safe-fade':!service.safeguard}">
          <div class="">
            <p>传统的监管方式耗费大量的人力和时间，随着越来越多的政务信息系统的上线，传统监测方式已无法适应新的监管需要，且无法保障监测结果的准确度、难以实现实时、高效、快速、全方位的监测</p>
          </div>
        </div>
      </div>
    </li> -->
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
  background: url('../assets/images/app.png') bottom center no-repeat;
}

.active .safe-refer {
  background: url('../assets/images/app.png') top center no-repeat;
}

.safe-app {
  background: url('../assets/images/profession.png') bottom center no-repeat;
}

.active .safe-app {
  background: url('../assets/images/profession.png') top center no-repeat;
}

.safe-polling {
  background: url('../assets/images/usable.png') bottom center no-repeat;
}

.active .safe-polling {
  background: url('../assets/images/usable.png') top center no-repeat;
}

.safe-safeguard {
  background: url('../assets/images/supervise.png') bottom center no-repeat;
}

.active .safe-safeguard {
  background: url('../assets/images/supervise.png') top center no-repeat;
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
