<template lang="html">
<div class="">
  <div class="top-banner">
    <div class="sub-layout banner-text">
      <p>
        <span class="title">棋牌游戏安全解决方案</span>
        <!-- <img src="./images/title-icon.png" alt=""> -->
      </p>
      <p class="sub-title">
        针对棋牌游戏行业应用安全、业务安全、可用性安全，为游戏运营商量身打造的云、管、端立体安全服务方案。抵御大流量攻击、CC攻击，进行APP加固等。结合多年的攻防实战经验，为游戏运营打造最全面、可信赖的安全解决方案
      </p>
      <LinkService />
    </div>
    <div class="link-list" id="link-list">
      <ul>
        <li @click="goPosition('demand')">行业需求</li>
        <li @click="goPosition('framework')">方案架构</li>
        <li @click="goPosition('offer')">独家提供</li>
        <li @click="goPosition('superiority')">方案特点</li>
        <li @click="goPosition('typical')">典型案例</li>
      </ul>
    </div>
  </div>
  <div class="sub-layout">
    <div id="demand" class="demand">
      <ChessRequire />
    </div>
  </div>
  <div id="framework" class="framework">
    <div class="sub-layout">
      <div class="title">
        方案架构
      </div>
      <tabs :tabContent="tabContent">
        <li slot="1" class="active">棋牌游戏安全解决方案架构</li>
        <li slot="1-content" class="chess"></li>
      </tabs>
    </div>
  </div>
  <div class="sub-layout">
    <Distribution id="offer" :text="offer" class="distribution"/>
  </div>
  <div class="sub-layout">
    <Distribution id="superiority" :text="superiority" class="distribution"/>
  </div>
  <div class="sub-layout">
    <Distribution id="typical" :text="typical" class="distribution"/>
  </div>
</div>
</template>

<script>
import According from 'website/components/according/According'
import Distribution from 'website/components/distribution/Distribution'
import toolJquery from 'common/utils/helpWithJquery'
import tabs from 'website/components/tabs/tabs'
import ChessRequire from 'website/modules/solve-scheme/components/ChessRequire'
import LinkService from 'website/components/LinkService'
import 'website/static/css/link.css'

export default {
  name: 'Chess',
  metaInfo: {
    title: 'DDoS清洗_高防机房_虚拟化系统_流量攻击防护-上海云盾（YUNDUN）',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '互联网数据中心（IDC）安全解决方案,等保合规,DDoS防御,防篡改,防CC攻击,端口转发,高防IP,清洗系统,高防节点'
      },
      {
        vmid: 'keywords',
        name: 'keywords',
        content: '等保合规,DDoS防御,防篡改,防CC攻击,端口转发,高防IP,清洗系统'
      }
    ]
  },
  components: {
    Distribution,
    tabs,
    ChessRequire,
    According,
    LinkService
  },
  data() {
    return {
      superiority: {
        title: '方案特点',
        describe: [
          '充分调研被防护系统，定制专属防护方案，可根据棋牌游戏成长阶段提供伴随式安全方案',
          '高性能架构，全业务支持，多种流量清洗部署方案，无损防御各种DDoS及CC攻击',
          '零误封、无限防，保护棋牌游戏免遭各个层级的攻击，提高棋牌游戏业务可靠性'
        ]
      },
      offer: {
        title: '独家提供',
        describe: [
          '年度服务报告以及行业报告',
          '无限抗服务（无上限阈值，防不住不收费）',
          '重大活动保障服务',
          '客户经理+抗D专家的1对1服务'
        ]
      },
      typical: {
        title: '典型案例',
        describe: [
          '2017年2月，某大型游戏平台，该游戏平台持续遭受不明黑客的DDoS攻击，接入上海云盾云安全平台，抵御攻击峰值流量高达500G+。',
          '2016年4月，某棋牌游戏平台，由于该棋牌游戏运营商没有采用有效的防护措施造成重大损失。该棋牌游戏平台接入上海云盾云安全平台，成功抵挡多次大规模攻击。',
          '2015年10月，某华东棋牌游戏平台，该棋牌游戏平台刚上线，就被黑客多次攻击，玩家无法正常使用，运营商无奈停止服务，接入上海云盾云安全平台，即恢复正常，玩家体验不断提升。'
        ]
      },
      tabContent: {
        head: ['1'],
        body: ['1-content']
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      toolJquery.bindScroll('link-list')
    })
  },
  methods: {
    goPosition(pname) {
      toolJquery.position(pname)
    }
  }
}
</script>

<style scoped>
.framework {
  padding: 5px 0 40px 0;
  background: #eeeeee;
}

.top-banner {
  width: 100%;
  background: url('./images/banner.png')center center no-repeat;
  background-size: cover;
  position: relative;
  .sub-title {
    margin-top: 20px;
  }
  .title {
    font-size: 36px;
    color: #ffffff;
    margin-right: 20px;
  }
  .sub-title {
    color: #ffffff;
  }
}

p {
  line-height: 1.5;
  font-size: 14px;
}

#framework {
  .title {
    margin: 60px 0 30px;
    font-size: 24px;
    font-weight: 500;
  }
  .tabs {
    border: 1px solid #cdcdcd;
  }
  .tab-hd li {
    margin-left: -1px;
    width: 100%;
    border-right: 1px solid #cdcdcd;
    border-bottom: 1px solid #cdcdcd;
    line-height: 54px;
    text-align: center;
    color: #999;
  }
  .tab-hd li:last-child {
    margin-left: 0;
    border-right: 0;
  }
  .tab-hd .active {
    margin-top: -1px;
    border-top: 2px solid #2d90e6;
    border-bottom: 0;
    color: #333;
  }
  .tab-bd li {
    margin: 15px 0;
    min-height: 1px;
  }
  .chess {
    height: 825px;
    background: url('./images/chess.png') center center no-repeat;
  }
}

#typical {
  height: 100px;
}

#demand {
  padding: 10px;
}
</style>
