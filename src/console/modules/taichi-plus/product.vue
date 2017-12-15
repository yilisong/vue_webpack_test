<template lang="html">
  <console-layout :appMenu="appMenu" :breadcrumb="breadcrumb" :isProduct="false">
    <transition :name="mainTransition" mode="out-in">
      <router-view></router-view>
    </transition>
    <div slot="product">
      <ConsoleProduct :content="content" :banner="banner" :name="name">
        <span slot="btn"><a href="#" class="experience-btn" v-on:click="goToService">咨询商务</a></span>
      </ConsoleProduct>
    </div>
  </console-layout>
</template>

<script>
import ConsoleProduct from 'common/components/ConsoleProduct/ConsoleProduct'
import ConsoleLayout from 'common/components/layout/console-layout'
import routerSync from 'common/mixins/routerSync'
import help from 'common/utils/help'
import 'src/common/components/ConsoleProduct/taichi-plus/styles/TaichiPlus.css'

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
          title: '独享防护IP',
          description: [
            '根据用户购买套餐不同，分配电信、联通、BGP线路至多5个独享IP，丰富的独享防护资源提供充足的防护基础，全网储备带宽3Tb，黑洞牵引能力10Tb。'
          ]
        },
        {
          title: '全业务场景支持',
          description: [
            '支持网站和非网站防护接入，包括游戏应用、社区论坛、流媒体等，太极抗D Plus均能为这些业务场景提供快速有效的防护。'
          ]
        },
        {
          title: '应用层攻击识别算法',
          description: ['秒级攻击响应时延，动态指纹学习机制，并且支持攻击指纹报文匹配、丢弃。']
        },
        {
          title: '根据用量弹性计费',
          description: ['使用防护过程中，攻击超过基础套餐部分，根据实际用量弹性计费。']
        },
        {
          title: '自定义规则数',
          description: ['套餐默认可添加规则数为50条，允许用户根据实际业务需求，自定义添加可使用规则数。']
        },
        {
          title: '封禁时间短',
          description: ['当攻击极大导致套餐内IP被封禁时，默认IP封禁时间最短可至2分钟。']
        },
        {
          title: '无上限防护增值服务',
          description: ['对大型会议等重要业务场景，提供无上限的防护服务，承诺保证重大活动期间零网络事故。']
        },
        {
          title: '支持溯源取证',
          description: [
            '对于遭受网络攻击需要调查取证的机关或企业，太极抗D Plus版支持为用户提供溯源取证服务，帮助净化互联网行动。'
          ]
        }
      ],
      banner: {
        title: '太极抗D - PLUS版',
        description: [
          '太极抗D Plus版是一款防御超大规模的DDoS和高密度CC的安防产品，为用户提供独享防护资源，产品支持全业务抗D场景，致力于完美无损解决大规模DDoS攻击。'
        ]
      },
      name: 'taichiPlus'
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
