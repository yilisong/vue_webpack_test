<template lang="html">
<div class="">
  <div class="center-position partner-box">
    <h1 class="normal-title">YUNDUN合作伙伴</h1>
    <img src="../../../../static/images/about-part/hzhb.png" alt="" class="partner-img">
    <!-- <ul class="partner-show">
      <li>云智慧</li>
      <li>丽水安盾网络科技</li>
      <li>成都创腾软件</li>
      <li>浙江辰龙检测</li>
      <li>上海柯力士信息安全</li>
      <li>福建省海峡信息</li>
      <li>杭州司塔科信息安全</li>
      <li>安徽云探索网络科技</li>
    </ul> -->
  </div>
  <div class="plan-container">
    <div class="center-position plan-box">
      <h1 class="normal-title">YUNDUN生态合作伙伴计划</h1>
      <p>致力于建设合作伙伴生态体系，帮助合作伙伴及用户构建基于YUNDUN云平台的成功业务实践和解决方案。</p>
      <div class="plan-tab center-position">
        <el-tabs v-model="activeName" class="main-tab">
          <el-tab-pane label="代理合作" name="first">
            <div class="state-box">
              <p>推广及销售上海云盾产品、服务及解决方案，可OEM。</p>
              <img src="../../../../static/images/about-part/proxy.jpg" alt="">
            </div>
          </el-tab-pane>
          <el-tab-pane label="安孵计划" name="second">
            <div class="state-box">
              <p>上海云盾通过整合内外部各项优质资源推出的针对非营利性组织和初创企业的创业扶持计划。</p>
              <img src="../../../../static/images/about-part/takePartWay.jpg" alt="">
            </div>
          </el-tab-pane>
          <el-tab-pane label="产品合作" name="third">
            <div class="state-box">
              <p>基于YUNDUN云产品/技术开发增值服务，直接向用户销售自己的产品或技术给YUNDUN云客户。</p>
              <img src="../../../../static/images/about-part/product.jpg" alt="">
            </div>
          </el-tab-pane>
          <el-tab-pane label="服务合作" name="fourth">
            <div class="state-box">
              <p>基于YUNDUN云平台为客户提供云产品相关的运维服务，或基于您服务内容为YUNDUN客户提供咨询、检测、培训等安全服务。</p>
              <img src="../../../../static/images/about-part/service.jpg" alt="">
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  <div class="link-box">
    <h1 class="normal-title">友情链接</h1>
    <ul class="partner-show">
      <li v-for="item in linkData"><a :href="item.href" target="_blank">{{item.name}}</a></li>
    </ul>
    <p>互换友链：marketing#yundun.com</p>
  </div>
  <YundunBar />
</div>
</template>

<script>
import SourceAboutResource from '../../resource/SourceAboutResource'
import YundunBar from '../../../../components/YundunBar'
export default {
  components: {
    YundunBar
  },
  data() {
    return {
      activeName: 'first',
      linkData: []
    }
  },
  mounted() {
    SourceAboutResource.getLink().then(response => {
      console.log(response.data, '0000')
      this.linkData = response.data.data
    })
  }
}
</script>

<style lang="css" scoped="">
a {
  text-decoration: none;
  color: #333;
}

.partner-box {
  overflow: hidden;
  padding-top: 100px;
  padding-bottom: 120px;
  h1 {
    margin-bottom: 65px;
  }
}

.partner-img {
  width: 100%;
}

.center-position {
  width: 1200px;
  margin: 0 auto;
}

.normal-title {
  text-align: center;
  font-size: 42px;
  font-weight: 100;
  margin: 0 auto;
}

.partner-show {
  text-align: center;
  margin-top: 50px;
  li {
    display: inline-block;
    padding: 0 17px;
  }
  li+li {
    border-left: 1px solid rgba(0, 0, 0, .5);
  }
}

.plan-box {
  background: #F7F7F7;
  p {
    font-size: 16px;
    text-align: center;
    padding: 15px 0;
    padding-bottom: 60px;
  }
}

.plan-container {
  background: #F7F7F7;
  padding-top: 100px;
  padding-bottom: 40px;
}

.link-box {
  padding: 100px 0 50px;
  p {
    text-align: center;
    margin-top: 50px;
  }
}

</style><style media="screen">.main-tab {
  margin-top: 20px;
  .el-tabs__nav {
    width: 360px;
    margin: 0 auto;
    float: none;
  }
  .state-box {
    margin: 40px auto 50px;
  }
}
</style>
