<template lang="html">
<div class="">
  <div class="top-banner">
    <div class="sub-layout banner-text">
      <p>
        <span class="title">政企行业安全解决方案</span>
        <!-- <img src="./images/title-icon.png" alt=""> -->
      </p>
      <p class="sub-title">
        为政府、教育、医疗等公共服务单位的门户、合规系统、核心应用、关键基础设施等政务业务及行业主管单位的预警、通报等监管需求，提供量身定制的合规、安全、可靠的政务专属安全解决方案。
      </p>
      <LinkService />
    </div>
    <div class="link-list" id="link-list">
      <ul>
        <li @click="goPosition('demand')">风险分析</li>
        <li @click="goPosition('framework')">方案架构</li>
        <li @click="goPosition('superiority')">方案价值</li>
      </ul>
    </div>
  </div>
  <div class="sub-layout">
    <div id="demand" class="demand">
      <GovernmentRequire />
    </div>
  </div>
  <div id="framework" class="framework">
    <div class="sub-layout">
      <div class="title">
        方案架构
      </div>
      <tabs :tabContent="tabContent">
        <li slot="1" class="active">政企防护架构</li>
        <li slot="2">政企监管架构</li>
        <li slot="1-content" class="govern-fence"></li>
        <li slot="2-content" class="govern-supervise"></li>
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
import GovernmentRequire from 'website/modules/solve-scheme/components/GovernmentRequire'
import LinkService from 'website/components/LinkService'
import 'website/static/css/link.css'

export default {
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
    GovernmentRequire,
    LinkService
  },
  data() {
    return {
      superiority: {
        title: '方案价值',
        describe: [
          '事前监控感知，事中实时防护，事后攻击追溯；',
          '随时掌握网站恶意代码、被篡改、服务可用性、漏洞、敏感词、DNS劫持等问题；',
          '智能防入侵、篡改、拖库、挂马、漏洞、Webshell、恶意扫描等各种黑客攻击；',
          '防DDoS、CC、DNS查询、递归DNS穿透等攻击；',
          'PB级大数据分析能力，挖掘真正威胁，形成清晰的黑客画像；',
          '可视化的实时攻防态势图，定制化安全分析报告；',
          '免安装、免维护、快速接入，即采即用；',
          '专属客户经理和安全专家，7*24小时管家式服务'
        ]
      },
      tabContent: {
        head: ['1','2'],
        body: ['1-content','2-content']
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
  background: url('./images/banner.jpg')center center no-repeat;
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
  .govern-fence {
    height: 626px;
    background: url('./images/govern-fence.png') center center no-repeat;
  }
  .govern-supervise {
    height: 402px;
    background: url('./images/govern-supervise.png') center center no-repeat;
  }
}

#superiority {
  height: 285px;
}
</style>
