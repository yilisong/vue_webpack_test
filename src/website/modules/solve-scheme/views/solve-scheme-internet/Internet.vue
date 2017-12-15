<template lang="html">
<div class="">
  <div class="top-banner">
    <div class="sub-layout banner-text">
      <p>
        <span class="title">互联网数据中心（IDC）安全解决方案</span>
        <!-- <img src="./images/title-icon.png" alt=""> -->
      </p>
      <p class="sub-title">
        为数据中心用户提供DDoS清洗服务、虚拟化系统、安全服务、安全合规服务和增值服务，完美解决IDC自身安全需求的同时，助力IDC转型和提升行业竞争能力。
      </p>
      <LinkService />
    </div>
    <div class="link-list" id="link-list">
      <ul>
        <li @click="goPosition('demand')">行业需求</li>
        <li @click="goPosition('framework')">方案架构</li>
        <li @click="goPosition('superiority')">方案特点</li>
      </ul>
    </div>
  </div>
  <div class="sub-layout">
    <div id="demand" class="demand">
      <InternetRequire />
    </div>
  </div>
  <div id="framework" class="framework">
    <div class="sub-layout">
      <div class="title">
        方案架构
      </div>
      <tabs :tabContent="tabContent" class="tabContent">
        <li slot="1" class="active">IDC自身合规安全方案架构</li>
        <li slot="2">增值服务方案</li>
        <li slot="1-content" class="idc"></li>
        <li slot="2-content" class="val-added"></li>
      </tabs>
    </div>
  </div>
  <div class="sub-layout">
    <Distribution id="superiority" :text="superiority" class="distribution"/>
  </div>
</div>
</template>

<script>
import Distribution from 'website/components/distribution/Distribution'
import toolJquery from 'common/utils/helpWithJquery'
import tabs from 'website/components/tabs/tabs'
import InternetRequire from 'website/modules/solve-scheme/components/InternetRequire'
import LinkService from 'website/components/LinkService'
import 'website/static/css/link.css'

export default {
  metaInfo: {
    title: 'DDoS清洗_高防机房_虚拟化系统_流量攻击防护-上海云盾（YUNDUN）',
    meta: [{
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
    InternetRequire,
    LinkService
  },
  data() {
    return {
      superiority: {
        title: '方案特点',
        describe: [
          '多种流量清洗部署方案，无损防御各种DDoS攻击',
          '完善的安全产品和服务，助力IDC服务安全合规',
          '极具竞争力的增值业务方案，提升企业营收和竞争力'
        ]
      },
      tabContent: {
        head: ['1', '2'],
        body: ['1-content', '2-content']
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
.demand {
  padding: 50px 0;
}

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
    margin: 60px 0 30px 0;
    font-size: 24px;
    font-weight: 500;
  }
  .tabs {
    border: 1px solid #cdcdcd;
  }
  .tab-hd li {
    position: relative;
    z-index: 10;
    margin-left: -1px;
    width: 50%;
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
  .idc {
    height: 660px;
    background: url('./images/idc-basic.png') center center no-repeat;
    background-repeat: no-repeat;
  }
  .val-added {
    height: 615px;
    background: url('./images/idc-valadded.png') center center no-repeat;
  }
}

#superiority {
  height: 60px;
}
</style>
