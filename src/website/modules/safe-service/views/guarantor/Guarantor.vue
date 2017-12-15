<template lang="html">
<div class="">
  <div class="top-banner">
    <div class="sub-layout banner-text">
      <p>
        <span class="title">安全重保</span>
        <!-- <img src="./images/title-icon.png" alt=""> -->
      </p>
      <p class="sub-title">
        丰富的政府及企业客户的重保经验，提供重大活动的网络安全保障、人工值守服务，制定完善的重保方案，重保结束后输出的专业服务报告。
      </p>
      <LinkService />
    </div>
    <div class="link-list" id="link-list">
      <ul>
        <li @click="goPosition('summarize')">服务概述</li>
        <li @click="goPosition('system')">服务体系</li>
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
  </div>
  <div class="sub-layout">
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
    title: '安全重保-上海云盾（YUNDUN）',
    meta: [{
        vmid: 'description',
        name: 'description',
        content: '安全重保,会议重保,检查评估,培训管控,测试加固,人工值守,安全服务'
      },
      {
        vmid: 'keywords',
        name: 'keywords',
        content: '安全重保,会议重保,检查评估,培训管控,测试加固,人工值守,安全服务'
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
          '通过深入解读《中华人民共和国网络安全法》，第三十一条规定国家对公共通信和信息服务、能源、交通、水利、金融、公共服务、电子政务等关键信息基础设施，在等保制度基础上，实行重点保护；第三十八条规定关键信息基础设施每年至少进行一次检测评估；第二十五条规定网络运营者制定网络安全事件应急预案，及时处置系统漏洞、计算机病毒、网络攻击、网络侵入等安全风险，在发生危害网络安全的事件时，立即启动应急预案，采取相应的补救措施。',
          '很多单位由于没有对自身网络和信息系统做安全检查，导致在面对黑客层出不穷的攻击手段时，缺乏网络信息安全应急处置能力，不能在第一时间做出有效应对，导致黑客渗透越来越深，危害越来越大，造成整体业务中断，甚至对国家和社会安全造成严重影响。',
          '上海云盾结合自身十年安全攻防经验，针对关键信息基础设施，推出安全重保服务。旨在通过前期的安全巡检的基础上，帮助客户在遇到安全事故时，能够快速响应，正确识别事件类型，及时保护日志等证据文件，并从中找出受到攻击的原因，在妥善修复后再将系统投入正常运行后，通过分析保存的日志文件，也能从中找到黑客攻击时的蛛丝马迹，为攻击溯源提供更多信息，即使在重大活动前也能从容应对。'
        ]
      },
      superiority: {
        title: '服务优势',
        describe: [
          '上海云盾作为首批专注互联网安全的公司，拥有十年的网络安全攻防经验，多次为重大活动做安全保障和应急支撑服务，不仅保证了活动的安全举办，还通过自主研发的盾眼大数据平台和安全专家帮助相关部门破获多起重大安全事件，为国家和企业挽回巨大损失。'
        ]
      },
      system: {
        title: '服务体系',
        describe: [
          '上海云盾安全重保服务体系分为四大模块:'
        ]
      },
      according: {
        title: '典型案例',
        describe: [
          '中国杭州G20峰会安全重保服务',
          '第九届全球健康促进大会安全重保服务',
          '第二届和第三届世界互联网大会安全重保服务',
          '知名互联网金融平台安全重保服务'
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
  height: 270px;
  background: #1085d7\9\0;
  background-image: linear-gradient(to right, #23a9fc, #0c59cc);
}

#summarize {
  height: 150px;
}

#according {
  height: 110px;
}
</style>
