<template lang="html">
<div class="">
  <div class="top-banner">
    <div class="sub-layout banner-text">
      <p>
        <span class="title">安全测试和渗透服务</span>
        <!-- <img src="./images/title-icon.png" alt=""> -->
      </p>
      <p class="sub-title">
        通过对目标（WEB/APP/微信）进行安全检查和漏洞扫描，组织安全专家对漏洞进行验证、渗透测试和APT高级持续渗透，全面了解信息系统的漏洞，增强信息系统的稳定性和安全性。
      </p>
      <LinkService />
    </div>
    <div class="link-list" id="link-list">
      <ul>
        <li @click="goPosition('summarize')">服务概述</li>
        <li @click="goPosition('system')">服务框架</li>
        <li @click="goPosition('superiority')">服务优势</li>
        <li @click="goPosition('according')">典型案例</li>
      </ul>
    </div>
  </div>
  <div class="sub-layout">
    <Distribution id="summarize" :text="summarize" class="distribution"/>
  </div>
  <div class="system" id="system">
    <SafePic :text="system"><img src="./images/system.png" alt=""></SafePic>
  </div>
  <div class="sub-layout">
    <Distribution id="superiority" :text="superiority" class="distribution"/>
    <Distribution id="according" :text="according" class="distribution"/>
  </div>
</div>
</template>

<script>
import Distribution from 'website/components/distribution/Distribution'
import toolJquery from 'common/utils/helpWithJquery'
import SafePic from 'website/components/safePic/SafePic'
import LinkService from 'website/components/LinkService'
import 'website/static/css/link.css'

export default {
  metaInfo: {
    title: '安全测试和渗透服务-上海云盾（YUNDUN）',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '安全测试和渗透服务,安全测试,渗透测试,白帽测试,安全服务'
      },
      {
        vmid: 'keywords',
        name: 'keywords',
        content: '安全测试和渗透服务,安全测试,渗透测试,白帽测试,安全服务'
      }
    ]
  },
  components: {
    Distribution,
    SafePic,
    LinkService
  },
  data() {
    return {
      summarize: {
        title: '服务概述',
        describe: [
          'WEB应用是互联网上最为丰富的资源呈现形式，由于其访问简单、拓展性好等优点，目前在资讯、电子政务、电子商务和企业管理等诸多领域得到了广泛的应用。与此同时，WEB应用、APP和微信程序代码，也面临着数量庞大、种类繁多的安全威胁，操作系统、通信协议、服务发布程序和编程语言等无不存在大量安全漏洞。WEB应用的安全事件频频发生，究其根源，关键原因有二：一是WEB应用自身存在技术上的安全漏洞和安全隐患；二是相关的防护设备和防护手段欠缺。WEB应用的体系架构一般分为三层，底层是操作系统，中间层是Web服务程序、数据库服务等通用组件，上层是内容和业务相关的网页程序。这三层架构中任何一层出现了安全问题都会导致整个WEB应用受到威胁，而这三层架构中任何一层都不可避免地存在安全漏洞，底层的操作系统（不管是Windows还是Linux）都不时会有黑客可以远程利用的安全漏洞被发现和公布；中间层的Web服务器（IIS或Apache等）、ASP、PHP等也常会有漏洞爆出；上层的网页程序有SQL注入、跨站脚本等Web漏洞。另一方面，目前很多WEB应用的防护设备和防护手段不够完善，虽然大部分网站都部署了防火墙，但针对WEB应用漏洞的攻击都是应用层的攻击，都可以通过80端口完成，所以防火墙对这类攻击也是无能为力，另外，有些网站除了部署防火墙外还部署了IDS/IPS，但同样都存在有大量误报情况，导致检测精度有限。为此，带有攻击性安全测试成为发现和解决WEB安全问题最有效和最直接的手段。',
          'WEB应用的安全事件频频发生，究其根源，关键原因有二：一是WEB应用自身存在技术上的安全漏洞和安全隐患；二是相关的防护设备和防护手段欠缺。WEB应用的体系架构一般分为三层，底层是操作系统，中间层是Web服务程序、数据库服务等通用组件，上层是内容和业务相关的网页程序。这三层架构中任何一层出现了安全问题都会导致整个WEB应用受到威胁，而这三层架构中任何一层都不可避免地存在安全漏洞，底层的操作系统（不管是Windows还是Linux）都不时会有黑客可以远程利用的安全漏洞被发现和公布；中间层的Web服务器（IIS或Apache等）、ASP、PHP等也常会有漏洞爆出；上层的网页程序有SQL跨站脚本等Web漏洞。另一方面，目前很多WEB应用的防护设备和防护手段不够完善，虽然大部分网站都部署了防火墙，但针对WEB应用漏洞的攻击都是应用层的攻击，都可以通过80端口完成，所以防火墙对这类攻击也是无能为力，另外，有些网站除了部署防火墙外还部署了IDS/IPS，但同样都存在有大量误报情况，导致检测精度有限。为此，带有攻击性安全测试成为发现和解决WEB安全问题最有效和最直接的手段。'
        ]
      },
      superiority: {
        title: '服务优势',
        describe: [
          '上海云盾的渗透测试服务完全模拟黑客的行为，对客户网站进行入侵尝试，帮助用户理解黑客是如何思考的，比黑客更早的发现问题。',
          '渗透测试服务将尝试利用每一个漏洞获取敏感数据、管理后台、服务器权限，让你真正的理解漏洞的危害大小。',
          '我们确信安全专家的经验是扫描器所不可能替代的。因此为了保证效果，我们的每一次渗透测试都是由安全专家手动实施。',
          '我们的专家团队拥有丰富的安全行业经验。在渗透测试完成后，还会提出可实施性强的专业修复建议，帮助用户真正解决安全问题。'
        ]
      },
      system: {
        title: '服务框架',
        describe: [
          '通过安全检测、渗透测试和APT测试，可以深入的了解信息系统面临的风险和威胁，更好的让使用单位采取有效的措施积极防御。安全测试和渗透测试服务框架如下图所示:'
        ]
      },
      according: {
        title: '典型案例',
        describe: [
          '中国电信嘉兴分公司',
          '长沙市政府',
          '宝付网络科技（上海）有限公司',
          '天津金中资贵金属经营有限公司',
          '北京微星优财网络科技有限公司',
          '上海小宝在线金融信息服务有限公司',
          '爱德威（上海）广告有限公司'
        ]
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

.system {
  height: 500px;
  background: #1085d7\9\0;
  background-image: linear-gradient(to right, #23a9fc, #0c59cc);
}

#summarize {
  height: 300px;
}

#superiority {
  height: 100px;
}

#according {
  height: 240px;
}
</style>
