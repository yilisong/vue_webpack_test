<template lang="html">
<div class="product-container service">
  <p class="title">行业需求</p>
  <ul class="service-container">
    <li v-bind:class="{'active':!service.refer}" @mouseenter="switchCard('refer')" @mouseleave="judgeAll('refer')">
      <div class="safe-box">
        <h3 class="safe-title refer">业务安全<i class="safe-refer normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.refer">
          <h4>新金融行业时刻面临着垃圾注册、恶意扫号撞库...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.refer" v-bind:class="{'safe-fade':!service.refer}">
          <div class="">
            <p>新金融行业时刻面临着垃圾注册、恶意扫号撞库、活动作弊、恶意评论、虚假资料等各类欺诈攻击，业务安全风控面临严重挑战，成为制约其发展的一大瓶颈。</p>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.app}" @mouseenter="switchCard('app')" @mouseleave="judgeAll('app')">
      <div class="safe-box">
        <h3 class="safe-title app">黑客入侵<i class="safe-app normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.app">
          <h4>新金融行业因其业务的特殊性，时刻面临黑客入侵...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.app" v-bind:class="{'safe-fade':!service.app}">
          <div class="">
            <p>新金融行业因其业务的特殊性，时刻面临黑客入侵、数据篡改、APT攻击、客户信息泄露、业务逻辑漏洞、撞库盗号等安全问题。</p>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.polling,'safe-fade':!service.polling}" @mouseenter="switchCard('polling')" @mouseleave="judgeAll('polling')">
      <div class="safe-box">
        <h3 class="safe-title polling">流量攻击<i class="safe-polling normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.polling">
          <h4>大流量DDoS攻击导致服务器拒绝对外提供服务...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.polling" v-bind:class="{'safe-fade':!service.polling}">
          <div class="">
            <p>大流量DDoS攻击导致服务器拒绝对外提供服务，严重威胁业务系统安全和稳定，特别是应用层CC攻击，经常在防御攻击者同时也拦截了正常访客，影响了新金融行业服务体验、业务发展和用户信任。</p>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.safeguard}" @mouseenter="switchCard('safeguard')" @mouseleave="judgeAll('safeguard')">
      <div class="safe-box">
        <h3 class="safe-title safeguard">服务质量QoS<i class="safe-safeguard normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.safeguard">
          <h4>新金融行业因其特殊性，交易实时性要求非常高...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.safeguard" v-bind:class="{'safe-fade':!service.safeguard}">
          <div class="">
            <p>新金融行业因其特殊性，交易实时性要求非常高。当相关业务系统出现卡、慢情况时将极大降低用户对其信任度、满意度，导致信誉损失、客户流失，特别是互联网金融，甚至出现大量挤兑事件，导致平台无以为继。</p>
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
  background: url('../assets/images/operation.png') bottom center no-repeat;
}

.active .safe-refer {
  background: url('../assets/images/operation.png') top center no-repeat;
}

.safe-app {
  background: url('../assets/images/cracker.png') bottom center no-repeat;
}

.active .safe-app {
  background: url('../assets/images/cracker.png') top center no-repeat;
}

.safe-polling {
  background: url('../assets/images/attack.png') bottom center no-repeat;
}

.active .safe-polling {
  background: url('../assets/images/attack.png') top center no-repeat;
}

.safe-safeguard {
  background: url('../assets/images/quality.png') bottom center no-repeat;
}

.active .safe-safeguard {
  background: url('../assets/images/quality.png') top center no-repeat;
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
