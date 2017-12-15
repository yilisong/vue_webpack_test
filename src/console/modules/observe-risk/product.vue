<template lang="html">
  <console-layout :appMenu="appMenu" :breadcrumb="breadcrumb" :isProduct="false">
    <transition :name="mainTransition" mode="out-in">
      <router-view></router-view>
    </transition>
    <div slot="product">
      <ConsoleProduct :content="content" :banner="banner" :name="name">
        <span slot="btn"><a href="#" class="experience-btn">敬请期待</a></span>
      </ConsoleProduct>
    </div>
  </console-layout>
</template>

<script>
import ConsoleProduct from 'common/components/ConsoleProduct/ConsoleProduct'
import ConsoleLayout from 'common/components/layout/console-layout'
import routerSync from 'common/mixins/routerSync'
import help from 'common/utils/help'
import 'src/common/components/ConsoleProduct/observe-risk/styles/ObserveRisk.css'

export default {
  mixins: [routerSync(require('./constants/AppMenu'))],
  components: {
    ConsoleProduct,
    ConsoleLayout
  },
  data() {
    return {
      content: [
        {
          title: '权威的信息核验',
          description: [
            '基于权威API接口数据，提供身份证、银行卡、手机实名的核验。'
          ]
        },
        {
          title: '征信风控',
          description: ['基于用户授权场景，提供稳定高效的互联网诚信分析服务，帮助互联网金融、消费金融识别借贷欺诈行为，提高业务风控能力。']
        },
        {
          title: '内容安全云服务',
          description: [
            '基于智能识别及海量样本库、信用库，高效识别色情图片，定位暴恐图像，排查谣言、涉政等违规信息。'
          ]
        },
        {
          title: '验证码服务',
          description: [
            '依托YUNDUN海量数据分析、特征模型实时更新，根据设备信誉返回不同的验证方法，包括滑动拼图验证码、点选验证码、短信上行验证码等多种验证模式。'
          ]
        }
      ],
      banner: {
        title: '观星风控 (业务安全)',
        description: [
          '观星风控，是上海云盾在数据智能的基础上，为业务安全保障提供的信息核验、征信风控、反垃圾、验证码等服务。'
        ]
      },
      name: 'observeRisk'
    }
  },
  created() {},
  methods: {
    goToService() {
      help.linkService()
    }
  }
}
</script>

<style scope>
</style>
