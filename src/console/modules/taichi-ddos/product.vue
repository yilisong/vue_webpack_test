<template lang="html">
  <console-layout :appMenu="appMenu" :breadcrumb="breadcrumb" :isProduct="false">
    <transition :name="mainTransition" mode="out-in">
      <router-view></router-view>
    </transition>
    <div slot="product">
      <ConsoleProduct :content="content" :banner="banner" :name="name">
        <span slot="btn"><a href="/payment#/setting-taichi-ddos" class="experience-btn">立即购买</a></span>
      </ConsoleProduct>
    </div>
  </console-layout>
</template>

<script>
import ConsoleProduct from 'common/components/ConsoleProduct/ConsoleProduct'
import ConsoleLayout from 'common/components/layout/console-layout'
import routerSync from 'common/mixins/routerSync'
import 'src/common/components/ConsoleProduct/taichi-ddos/styles/TaichiDdos.css'


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
          title: '海量资源清洗',
          description: [
            '全国多所自建超大防护抗D数据中心;拥有海量清洗资源，数千台LVS集群服务器;全网储备带宽3TB;黑洞牵引能力10TB'
          ]
        },
        {
          title: '运营商级联动',
          description: ['通过与运营商深度合作;在骨干路由进行近源压制;近源清洗和QOS限速;进一步保障清洗能力']
        },
        {
          title: '应用层攻击识别算法',
          description: ['秒级攻击响应延时;动态指纹学习机制;并且支持攻击指纹报文匹配、丢弃']
        },
        {
          title: '大数据分析联动',
          description: ['利用平台亿级大数据分析处理能力;探知互联网威胁，并将识别到的攻击指纹;实时同步到全网节点,实现云端联动防御']
        },
        {
          title: '快速接入即采即用',
          description: [
            '采用SaaS模式，任何需要抗D的网站;无需额外购买硬件设备，无需部署，无需维护;只需要通过DNS解析修改;即可享受无限量的防护服务'
          ]
        },
        {
          title: '24H安全监控告警',
          description: [
            '7*24H全方位立体化的攻击监控;告警和安全值守;DDoS和CC多维度实时攻击图形化展示;及攻防态势全景地图展示'
          ]
        }
      ],
      banner: {
        title: '太极抗D - WEB版',
        description: [
          '太极抗D Web版基于高防共享IP资源，通过SAAS云平台为网站类应用场景提供全方位抗DDoS服务，主要面向中小型企业和个人站点'
        ]
      },
      name: 'taichiDdos'
    }
  },
  created() {}
}
</script>

<style scoped>
</style>
