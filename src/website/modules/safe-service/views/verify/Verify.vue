<template lang="html">
<div class="">
  <div class="top-banner">
    <div class="sub-layout banner-text">
      <p>
        <span class="title">源代码审计及验证</span>
        <!-- <img src="./images/title-icon.png" alt=""> -->
      </p>
      <p class="sub-title">
        使用专业代码审计设备对网站源代码的逻辑流程、编程规范性、安全特性等方面进行审计，在完成后针对所发现漏洞的严重程度提出解决建议并定位存在漏洞的代码位置。同时安全工程师以黑盒（渗透性测试）方式对源代码检测结果进行验证，检验现有安全机制对漏洞防护的效果。
      </p>
      <LinkService />
    </div>
    <div class="link-list" id="link-list">
      <ul>
        <li @click="goPosition('summarize')">审计概述</li>
        <li @click="goPosition('target')">审计必须性</li>
        <li @click="goPosition('range')">审计范围</li>
        <li @click="goPosition('according')">参考依据</li>
        <li @click="goPosition('system')">服务流程</li>
        <li @click="goPosition('superiority')">服务优势</li>
      </ul>
    </div>
  </div>
  <div class="sub-layout">
    <Distribution id="summarize" :text="summarize" class="distribution"/>
    <Distribution id="target" :text="target" class="distribution"/>
    <Distribution id="range" :text="range" class="distribution"/>
  </div>
  <div id="according">
    <According :text="according" class="according" />
  </div>
  <div class="system" id="system">
    <SafePic :text="system"><img src="./images/system.png" alt=""></SafePic>
  </div>
  <div class="sub-layout">
    <Distribution id="superiority" :text="superiority" class="distribution"/>
  </div>
</div>
</template>

<script>
import According from 'website/components/according/According'
import Distribution from 'website/components/distribution/Distribution'
import toolJquery from 'common/utils/helpWithJquery'
import SafePic from 'website/components/safePic/SafePic'
import LinkService from 'website/components/LinkService'
import 'website/static/css/link.css'

export default {
  metaInfo: {
    title: '源代码审计及验证-上海云盾（YUNDUN）',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '代码审计,安全验证,逻辑验证,可靠性检查,安全服务'
      },
      {
        vmid: 'keywords',
        name: 'keywords',
        content: '代码审计,安全验证,逻辑验证,可靠性检查,安全服务'
      }
    ]
  },
  components: {
    Distribution,
    According,
    SafePic,
    LinkService
  },
  data() {
    return {
      summarize: {
        title: '审计概述',
        describe: [
          '代码审计（Code Review）是由具备丰富编码经验，并对安全编码原则及应用安全具有深刻理解的安全服务人员，对系统的源代码和软件架构的安全性、可靠性进行全面的安全检查。',
          '代码审计服务的目的在于充分挖掘当前代码中存在的安全缺陷以及规范性缺陷，利用一定的编程规范和标准，针对应用程序源代码，从结构、脆弱性以及缺陷等方面进行审查，以发现当前应用程序中存在的安全缺陷以及代码的规范性缺陷，从而让开发人员了解其开发的应用系统可能会面临的威胁，并指导开发人员正确修复程序缺陷。'
        ]
      },
      target: {
        title: '审计必须性',
        describe: [
          '实践证明，程序的安全性是否有保障很大程度上取决于程序代码的质量，而保证代码质量最快捷有效的手段就是代码审计。',
          '在风险评估过程中，代码审计是一般脆弱性评估的一种很好的补充，上海云盾代码审计服务的代码覆盖率为100%，能够找到一些安全测试所无法发现的安全漏洞。',
          '同时，由于主持代码审计的安全服务人员一般都具备丰富的安全编码经验和技能，所以其针对性比常见的脆弱性评估手段会更强、粒度也会更为细致。'
        ]
      },
      range: {
        title: '审计范围',
        describe: [
          '上海云盾代码审计服务的范围包括使用ASP、ASP.NET（VB/C#）、JSP（JAVA）、PHP等主流语言开发的B/S应用系统、使用C++、JAVA、C#、VB等主流语言开发的C/S应用系统，以及使用XML语言编写的文件、SQL语言和数据库存储过程等'
        ]
      },
      superiority: {
        title: '服务优势',
        describe: [
          '全程化服务,有效保证服务质量,上海云盾可以为客户提供约定期限内的全程化代码审计服务。服务的过程不仅仅是帮助客户发现问题,也会为客户的问题修补提供专业的建议和指导',
          '专家级解决方案,一切以解决问题为目标,上海云盾有专业的安全服务团队，团队成员无论是在风险评估、安全加固、渗透测试，还是在代码审计等领域均有着丰富的经验，所有问题的解决方案均由团队成员根据多年经验总结而来',
          '降低成本,节省投资,在上海云盾为客户打造的年度服务方案中,服务人员第一次代码审计的结果将会成为后续审计服务的参考依据,避免了单次服务中每次都会为某一特定问题所累,节省了审计时间,同时也降低了客户在每个阶段的投入'
        ]
      },
      system: {
        title: '服务流程',
        describe: [
          '上海云盾代码审计服务主要分为四个阶段，包括代码审计前期准备阶段、代码审计阶段实施、复查阶段实施以及成果汇报阶段:'
        ]
      },
      according: {
        title: '参考依据',
        subtitle:
          '上海云盾代码审计服务将参考下列规范进行工作：',
        describe: [
          'OWASP TOP 10',
          'CWE/SANS TOP 25',
          'ASP/ASP.NET/PHP/JSP安全编码规范',
          '上海云盾代码审计最佳实践',
          '上海云盾安全服务工作规范、代码审计实施规范'
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

.according {
  padding-bottom: 50px;
  background: url('./images/ballBg.png')center center no-repeat;
  background-size: cover;
}

.system {
  height: 300px;
  background: #1085d7\9\0;
  background-image: linear-gradient(to right, #23a9fc, #0c59cc);
}

#superiority {
  height: 110px;
}
</style>
