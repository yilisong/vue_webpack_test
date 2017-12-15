<template lang="html">
<div class="">
  <div class="top-banner">
    <div class="sub-layout banner-text">
      <p>
        <span class="title">新金融行业安全解决方案</span>
        <!-- <img src="./images/title-icon.png" alt=""> -->
      </p>
      <p class="sub-title">
        从网络、业务、数据多个维度为新金融客户在应用、业务、可用等安全领域提供量身定制的个性化安全解决方案，通过立体防护机制、大数据日志联动分析抵御多种恶意攻击，结合资深安全专家服务，助力新金融行业做到全面合规、持续发展，保障业务和数据安全。
      </p>
      <LinkService />
    </div>
    <div class="link-list" id="link-list">
      <ul>
        <li @click="goPosition('demand')">行业需求</li>
        <li @click="goPosition('framework')">方案架构</li>
        <li @click="goPosition('superiority')">方案价值</li>
      </ul>
    </div>
  </div>
  <div class="sub-layout">
    <div id="demand" class="demand">
      <FinanceRequire />
    </div>
  </div>
  <div id="framework" class="framework">
    <div class="sub-layout">
      <div class="title">
        方案架构
      </div>
      <tabs :tabContent="tabContent">
        <li slot="1" class="active">新金融行业安全解决方案架构</li>
        <li slot="1-content" class="finance"></li>
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
import FinanceRequire from 'website/modules/solve-scheme/components/FinanceRequire'
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
    FinanceRequire,
    LinkService
  },
  data() {
    return {
      superiority: {
        title: '方案价值',
        describe: [
          '实时可用性和安全监控，随时了解业务系统安全和可用性状况',
          '多种业务风控产品和方案，保证金融系统业务安全',
          '提供BGP高防IP和1V1专家抗DDoS服务，完美解决各种类型的DDoS攻击',
          'PB级大数据分析系统和智能防护模型，实时防御未知威胁的同时有效降低误封',
          '支持深度量身定制专属业务防护方案',
          '具备7*24小时在线技术支持、安全技术专家、行业资深安全顾问服务'
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
.demand {
  border-top: 1px solid #fff;
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
  .finance {
    height: 591px;
    background: url('./images/finance.png') center center no-repeat;
  }
}

#superiority {
  height: 200px;
}
</style>
