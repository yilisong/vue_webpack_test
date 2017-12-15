<template lang="html">
<div class="product-container service">
  <p class="title">风险分析</p>
  <ul class="service-container">
    <li v-bind:class="{'active':!service.refer}" @mouseenter="switchCard('refer')" @mouseleave="judgeAll('refer')">
      <div class="safe-box">
        <h3 class="safe-title refer">系统漏洞<i class="safe-refer normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.refer">
          <h4>政府部门重要信息系统存在不同程度安全漏洞...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.refer" v-bind:class="{'safe-fade':!service.refer}">
          <div class="">
            <p>政府部门重要信息系统存在不同程度安全漏洞，并且据国家互联网应急响应中心监测，多数漏洞未能得到及时有效的修复，给政府信息系统带来了极大的威胁。</p>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.app}" @mouseenter="switchCard('app')" @mouseleave="judgeAll('app')">
      <div class="safe-box">
        <h3 class="safe-title app">页面篡改<i class="safe-app normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.app">
          <h4>门户网站作为政府发布重要新闻、重大方针政策...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.app" v-bind:class="{'safe-fade':!service.app}">
          <div class="">
            <p>门户网站作为政府发布重要新闻、重大方针政策、法规、企业信息等的重要渠道，一旦被黑客篡改，将严重损害政府的形象，破坏群众对政府部门的信任。</p>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.polling,'safe-fade':!service.polling}" @mouseenter="switchCard('polling')" @mouseleave="judgeAll('polling')">
      <div class="safe-box">
        <h3 class="safe-title polling">信息泄露<i class="safe-polling normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.polling">
          <h4>各级政府机构，尤其是涉及存储大量公众数据的公安...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.polling" v-bind:class="{'safe-fade':!service.polling}">
          <div class="">
            <p>各级政府机构，尤其是涉及存储大量公众数据的公安、卫生、社保、教育等部门，信息汇聚之后构成了国家宏观管理和调控的数据库，这些数据一旦遭到泄漏和破坏，后果不堪设想。</p>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.safeguard}" @mouseenter="switchCard('safeguard')" @mouseleave="judgeAll('safeguard')">
      <div class="safe-box">
        <h3 class="safe-title safeguard">监管挑战<i class="safe-safeguard normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.safeguard">
          <h4>传统的监管方式耗费大量的人力和时间...</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.safeguard" v-bind:class="{'safe-fade':!service.safeguard}">
          <div class="">
            <p>传统的监管方式耗费大量的人力和时间，随着越来越多的政务信息系统的上线，传统监测方式已无法适应新的监管需要，且无法保障监测结果的准确度、难以实现实时、高效、快速、全方位的监测。</p>
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
  background: url('../assets/images/system.png') bottom center no-repeat;
}

.active .safe-refer {
  background: url('../assets/images/system.png') top center no-repeat;
}

.safe-app {
  background: url('../assets/images/page.png') bottom center no-repeat;
}

.active .safe-app {
  background: url('../assets/images/page.png') top center no-repeat;
}

.safe-polling {
  background: url('../assets/images/message.png') bottom center no-repeat;
}

.active .safe-polling {
  background: url('../assets/images/message.png') top center no-repeat;
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
