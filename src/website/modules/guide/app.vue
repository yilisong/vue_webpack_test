<template>
<website-layout :footer="false" :blackHeader="true">
  <div class="wrapper">
    <div class="inner-wrapper">
      <div class="title">
        <div class="title-main">
          <img width="562" src="./images/title.svg" />
          <a href="/console"><button class="enter">立即体验</button></a>
        </div>
        <p class="sub-title">旗下基础应用、红网卫士(云WAF)、盾眼(云观测)、太极抗D(云抗D)产品系列，为在线应用提供全生命周期的业务护航。</p>
      </div>
      <div class="operation">
        <div class="operation-title">
          <span class="blue-block"></span>
          <span class="operation-text">进入旧版控制台</span>
        </div>
        <div class="operation-main">
          <box v-for="(item, key) in boxItems" :key="key" :name="item.name" :domain="item.domain" />
        </div>
      </div>
      <div class="footer">
        <div class="footer-above">
          <div class="footer-above-left">
            <img width="100" class="footer-logo" src="./images/logo.svg">
          </div>
          <div class="footer-above-middle">
            了解<a href="/about#/introduce">YUNDUN</a>
          </div>
          <div class="footer-above-right">
            <ul>
              <li>| <a href="/about#/advantage">优势</a></li>
              <li>| <a href="/about#/cooperation">合作</a></li>
              <li>| <a href="/about#/events">大事记</a></li>
              <li>| <a href="/about#/legalNotice">法律声明</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-below">
          <p>Copyright YUNDUN,All Rights Reserved. 上海云盾信息技术有限公司版权所有  沪ICP备11032572号 上海网警110 上海工商</p>
        </div>
      </div>
    </div>
  </div>
</website-layout>
</template>

<script>
import WebsiteLayout from 'common/components/layout/website-layout'
import Box from './components/Box'
import SourceWebResource from 'src/website/static/js/SourceWebResource'
import axios from 'axios'

export default {
  components: {
    WebsiteLayout,
    Box
  },
  created() {
    SourceWebResource.getUserInfo().then(response => {
      if (!response.data.email) {
        window.location.href = '/login'
      }
    })

    axios.get('/api/V4/overview.guide.memberDisplayProduct').then(response => {
      const { display } = response.data.data
      display.v3_site && this.boxItems.push(this.oldPlatform)
      display.tjkd && this.boxItems.push(this.tachi)
      display.ecs && this.boxItems.push(this.ecs)
    })
  },
  data() {
    return {
      oldPlatform: {
        name: '云盾平台',
        domain: 'http://v4.yundun.com/domainList'
      },
      tachi: {
        name: '太极抗D Plus版',
        domain: 'https://ddos.yundun.com/backmanager'
      },
      ecs: {
        name: '云主机',
        domain: 'http://cloud.yundun.com/console/#/ecs/server'
      },
      boxItems: []
    }
  }
}
</script>

<style>
.console-style {
  display: none !important;
}

.menu {
  display: none !important;
}
</style>

<style scoped>
.wrapper {
  background: url('./images/pic.png'), linear-gradient(to right, #f4fafe, #e9f4fd, #f4fafe, #fff);
}

.inner-wrapper {
  width: 795px;
  min-height: 800px;
  margin: 0 auto;
  padding-top: 192px;
}

.title-main {
  clear: fix;

  img {
    float: left
  }

  .enter {
    cursor: pointer;
    outline: 0 none;
    background-color: #E2EEFA;
    border: 1px solid #83B8EC;
    padding: 10px 40px;
    margin-left: 20px;
    margin-top: 24px;
    float: left;

    a {
      color: #83B8EC;
    }
  }

}

.sub-title {
  margin-top: 17px;
  font-size: 14px;
}

.operation {
  margin-top: 140px;
  min-height: 250px;
}

.operation-title {
  .blue-block {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
    background-color: #2d90e6;
  }

  .operation-text {
    font-size: 16px;
    vertical-align: middle;
  }
}

.operation-main {
  margin-top: 30px;
  clear: fix;
}

.footer {
  margin-top: 240px;

  .footer-above {
    clear: fix;

    .footer-above-left, .footer-above-right, .footer-above-middle {
      float: left;
    }

    .footer-above-middle {
      a {
        color: #2d90e6;
      }
    }

    .footer-above-middle, .footer-above-right {
      margin-left: 10px;
      margin-top: 7px;
    }

    .footer-above-right ul li {
      display: inline;

      a {
        color: #333;
      }
    }
  }

  .footer-below {
    margin-top: 10px;
  }
}
</style>
