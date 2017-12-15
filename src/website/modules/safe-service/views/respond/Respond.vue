<template lang="html">
<div class="">
  <div class="top-banner">
    <div class="sub-layout banner-text">
      <p>
        <span class="title">应急响应</span>
        <!-- <img src="./images/title-icon.png" alt=""> -->
      </p>
      <p class="sub-title">
        在网站遭到黑客攻击时进行响应，抑制事件的影响程度，并且调查黑客入侵原因及网站存在的安全问题，在成功阻止黑客攻击后提供可行的解决方案，向客户提供安全防护建议。
      </p>
      <LinkService />
    </div>
    <div class="link-list" id="link-list">
      <ul>
        <li @click="goPosition('summarize')">服务概述</li>
        <li @click="goPosition('system')">应急响应体系</li>
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
    title: '应急响应-上海云盾（YUNDUN）',
    meta: [{
        vmid: 'description',
        name: 'description',
        content: '应急响应,事件抑制,事件恢复,事件调查,溯源'
      },
      {
        vmid: 'keywords',
        name: 'keywords',
        content: '应急响应,事件抑制,事件恢复,事件调查,溯源'
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
          '在数字化、网络化、智能化为特征的信息化浪潮蓬勃兴起的大背景下，IT技术在社会生活中发挥着日益重要的作用，然而在高度信息化的过程中，网络安全一直没有受到各部门的高度重视，导致近几年网络安全事件频发，尤其在金融、保险、证券、交通、能源、电商、游戏、医疗、教育等领域的信息系统，面对黑客层出不穷的攻击手段。由于没有完善的应急预案和培训机制，且缺乏网络安全应急处置能力，不能在第一时间做出有效应对，导致黑客渗透越来越深，危害越来越大，甚至对国家和社会安全造成严重影响。',
          '定制一套切实有效的应急响应和培训方案，可以帮助使用单位在发生安全事故时快速响应，正确识别事件类型，及时保护日志等证据文件，并从中找出受到攻击的原因，在妥善修复后再将系统投入正常运行，还可以通过分析保存的日志文件，从中找到黑客攻击时的蛛丝马迹，为攻击溯源提供更多信息。通过安全培训，提高使用单位用户和专业人员的安全意识和防护技能，更好的保障信息系统安全、可靠运行。'
        ]
      },
      superiority: {
        title: '服务优势',
        describe: [
          '上海云盾作为首批专注互联网安全的公司，拥有十年的网络安全攻防和安全咨询经验，多次为重大活动做安全保障和应急支撑服务，不仅保证了活动的安全举办，还通过自主研发的盾眼大数据平台和安全专家帮助相关部门破获多起重大安全事件，为国家和企业挽回巨大损失。'
        ]
      },
      system: {
        title: '应急响应体系',
        describe: [
          '建立完善的应急响应体系，是做好应急响应服务的基础和保障。应急响应体系包括成立应急响应小组，制定应急预案和计划，事前进行演技演练，事件发生时启动应急响应，事后进行事件总结:'
        ]
      },
      according: {
        title: '典型案例',
        describe: [
          '中国杭州G20峰会安全重保服务',
          '第九届全球健康促进大会安全重保服务',
          '第二届和第三届世界互联网大会安全重保服务',
          '某游戏公司新游戏上线期间应急响应服务',
          '某知名电商平台促销活动应急响应服务'
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
  background: #1085d7\9\0;
  background-image: linear-gradient(to right, #23a9fc, #0c59cc);
}

#summarize {
  height: 95px;
}

#according {
  height: 145px;
}
</style>
<style>
.system {
  height: 360px;
}
</style>
