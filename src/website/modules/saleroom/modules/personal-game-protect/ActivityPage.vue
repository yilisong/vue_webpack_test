<template>
  <div>
    <div class="main-body">
      <div class="center-ctrl">
        <div style="padding-top: 280px;">
          <div class="title-bg">

          </div>
          <div class="canvas-area fl">
            <ul class="feature-list">
              <li class="feature-item" v-for="(feature,index) in featureDoc" :class="feature.name">
                <span class="feature-name">
                  {{ feature.title }}
                </span>
                <span class="feature-info" :class="'child-' + feature.name">
                  {{ feature.info }}
                </span>
              </li>
            </ul>
          </div>
          <div class="idc-box fl">
            <div class="idc-box-header">
              高防IDC
            </div>
            <ul>
              <li>
                防护大流量的DDoS攻击
              </li>
              <li>
                无法识别CC攻击
              </li>
              <li>
                根据不同的防护能力配置不同的业务带宽
              </li>
            </ul>
          </div>
          <div class="pro-safe-com fl">
            <div class="com-box-header">
              专业安全厂商
            </div>
            <ul>
              <li>
                防护大流量的DDoS攻击
              </li>
              <li>
                针对游戏特有的CC攻击防护
              </li>
              <li>
                无论防护大小，默认提供100Mbps的业务带宽，<br />最大可支持1Gbps的业务带宽扩容。
              </li>
              <li>
                <button class="advisory" @click="serviceFun">商务咨询</button>
              </li>
            </ul>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div class="package-label">
          <div class="package-label-box">
            <div class="package-box-header">
              套餐<span class="color">配置</span><span class="tiny">[可选]</span>
            </div>
            <div class="divide-line"></div>
            <div class="package-box-body">
              电信<span class="color">（同机房IP，异地机房IP）</span>
              <span class="divide-top">|</span>
              联通
              <span class="divide-top">|</span>
              移动
              <span class="divide-top">|</span>
              BGP等线路
            </div>
          </div>
          <div class="package-label-box">
            <div class="package-box-header">
              可选<span class="color">套餐</span><span class="tiny">【50G防护月仅千元】</span>
            </div>
            <div class="divide-line"></div>
            <div class="package-box-body">
              50G
              <span class="divide-top">|</span>
              100G
              <span class="divide-top">|</span>
              150G
              <span class="divide-top">|</span>
              200G
              <span class="divide-top">|</span>
              300G
              <span class="divide-top">|</span>
              400G
              <span class="divide-top">|</span>
              500G
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div class="buy-more">
          多<span class="color">买</span>多<span class="color">送</span>
        </div>
      </div>
    </div>
    <div class="promotion">
      <div class="center-ctrl">
        <span class="label">※ 买<span class="icon">4</span>月送<span class="icon">1</span>月</span>
        <span class="label">※ 买<span class="icon">6</span>月送<span class="icon">2</span>月</span>
        <span class="label">※ 买<span class="icon">8</span>月送<span class="icon">4</span>月</span>
        <span class="label">※ 买<span class="icon">10</span>月送<span class="icon">8</span>月</span>
      </div>
    </div>
    <div class="plus-version">
      <div class="center-ctrl">
        <div class="table-title">
          太极抗D PLUS 各版本对比
        </div>
        <div class="table-body">
          <table>
            <tr>
              <th>功能项</th>
              <th>标准版</th>
              <th>专业版</th>
              <th>尊享版</th>
              <th>备注</th>
            </tr>
            <tr>
              <td>无计量防御</td>
              <td>不支持</td>
              <td>支持</td>
              <td>支持</td>
              <td></td>
            </tr>
            <tr>
              <td>DDoS防护</td>
              <td>50Gb起</td>
              <td>50Gb起</td>
              <td>10Gb起</td>
              <td></td>
            </tr>
            <tr>
              <td>CC防护</td>
              <td>3万QPS起</td>
              <td>5万QPS起</td>
              <td>10万QPS起</td>
              <td></td>
            </tr>
            <tr>
              <td>云堤清洗</td>
              <td>不支持</td>
              <td>【可选】</td>
              <td>【可选】</td>
              <td></td>
            </tr>
            <tr>
              <td>海外限制</td>
              <td>不支持</td>
              <td>【可选】</td>
              <td>【可选】</td>
              <td></td>
            </tr>
            <tr>
              <td>UDP限制</td>
              <td>【可选】</td>
              <td>【可选】</td>
              <td>【可选】</td>
              <td></td>
            </tr>
            <tr>
              <td>网络链路</td>
              <td>共享链路</td>
              <td>独享链路</td>
              <td>独享链路 | 链路优化</td>
              <td></td>
            </tr>
            <tr>
              <td>基础硬件</td>
              <td>独享IP | 共享设备</td>
              <td>独享IP | 独享设备</td>
              <td>独享IP | 负载均衡多硬件设备</td>
              <td></td>
            </tr>
            <tr>
              <td>超防护套餐</td>
              <td>封禁</td>
              <td>提供更多弹性</td>
              <td>提供更多弹性</td>
              <td>超过购买套餐的默认处理方式</td>
            </tr>
            <tr>
              <td>泛解析域名的接入</td>
              <td>支持</td>
              <td>支持</td>
              <td>支持</td>
              <td>非CC攻击状态下的正常业务消耗(7层QPS能力)</td>
            </tr>
            <tr>
              <td>带宽</td>
              <td>100Mbps/每套餐</td>
              <td>200Mbps/每套餐</td>
              <td>1000Mbps/每套餐</td>
              <td>非DDoS攻击状态下的正常业务消耗带宽</td>
            </tr>
            <tr>
              <td>云加速流量赠送(最大/每月)</td>
              <td>3Tb</td>
              <td>5Tb</td>
              <td>15Tb</td>
              <td>网站类业务每月额外赠送的正常业务加速流量</td>
            </tr>
            <tr>
              <td>网页业务QPS(http/https)</td>
              <td>500QPS/每套餐</td>
              <td>1000QPS/每套餐</td>
              <td>3000QPS/每套餐</td>
              <td>非CC攻击状态下的正常业务消耗(7层QPS能力)</td>
            </tr>
            <tr>
              <td>每套餐默认规则数<br />(转发端口数+支持域名数)</td>
              <td>25</td>
              <td>50</td>
              <td>100</td>
              <td>TCP / UDP / HTTP / HTTPS转发支持条目数</td>
            </tr>
            <tr>
              <td>新建连接</td>
              <td>1000/单IP</td>
              <td>10000/单IP</td>
              <td>50000/VIP</td>
              <td>单IP的新建连接规格</td>
            </tr>
            <tr>
              <td>并发连接</td>
              <td>5000/单IP</td>
              <td>100000/单IP</td>
              <td>200000/VIP</td>
              <td>单IP的并发连接规格</td>
            </tr>
            <tr>
              <td>最低线路</td>
              <td>单线路(电信IP*1)</td>
              <td>单线路(电信异地IP*2)</td>
              <td>双线路(电信异地IP*2 | 联通IP*1)</td>
              <td>默认最低配置的线路及IP数量</td>
            </tr>
            <tr>
              <td>扩容费用<br />(以增加BGP线路为例)</td>
              <td>套餐价*50%</td>
              <td>套餐价*40%</td>
              <td>套餐价*25%</td>
              <td>扩容规则、线路、IP业务需求的费用</td>
            </tr>
            <tr>
              <td>可享服务</td>
              <td>普通会员</td>
              <td>黄金会员<br />(支持试用及弹性预付费)</td>
              <td>黄金会员<br />(支持试用及弹性后付费)</td>
              <td></td>
            </tr>
            <tr>
              <td>服务可用性(SLA)</td>
              <td>不承诺</td>
              <td>99.9</td>
              <td>99.9</td>
              <td></td>
            </tr>
            <tr>
              <td>默认活动</td>
              <td class="second-bottom">无活动</td>
              <td>买10月送2月</br>送弹性防护1次</td>
              <td>买10月送2月</br>送弹性防护3次</td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import help from 'common/utils/help'

export default {
  data() {
    return {
      featureDoc: [{
        name: 'for-all',
        title: '全业务支持',
        info: '支持HTTP/HTTPS/TCP/UDP/WebSocket等协议'
      },{
        name: 'high-stable',
        title: '高稳定性',
        info: '客户可选择叠加电信线路异地IP或增加多线路提高业务稳定'
      },{
        name: 'professional',
        title: '专业安全厂商',
        info: '我们是一个专业的安全公司，有十多年安全防护经验'
      },{
        name: 'convenient',
        title: '自由切换',
        info: '客户可根据实际需要，自主升级更高防护能力、提升防护服务，无需做任何配置精细化服务'
      },{
        name: 'anytime',
        title: '精细化服务',
        info: '提供7*24小时的人工响应'
      }]
    }
  },
  methods: {
    serviceFun() {
      help.linkService()
    }
  }
}
</script>

<style scoped>
 .table-body {
   padding-bottom: 60px;
   table {
     position: relative;
     text-align: center;
     color: #ababab;
     font-size: 12px;
     th {
       background-color: #3a3a3a;
     }
     th, td {
       width: 219px;
	     height: 42px;
       line-height: 43px;
       border: 1px solid #3a3a3a;
     }
     td:nth-of-type(5) {
       width: 320px;
     }
     td:nth-of-type(2) {
       border-left: 2px solid #0a8bc3;
       border-right: 2px solid #6934ff;
     }
     th:nth-of-type(2) {
       position: absolute;
       line-height: 58px;
       top: -10px;
       left: 219px;
       width: 216px;
       height: 54px;
       background-image: linear-gradient(90deg, #0a8bc3 0%, #3a60e1 28%, #6934ff 100%),linear-gradient(#00a0df,#00a0df);
       border-left: 2px solid #0a8bc3;
       border-right: 2px solid #6934ff;
       border-top: 2px
     }
     td.second-bottom {
       border-bottom: 2px solid #6934ff;
     }
   }
 }
 .fl {
   float: left;
 }
 .ilb {
   display: inline-block;
 }
 .main-body {
   min-height: 500px;
   background: url('./assets/images/bg.jpg') no-repeat;
   background-position: top center;
   background-color: #1d1d1d;
 }
 .promotion {
   height: 108px;
   background-image: url('./assets/images/sale-bg.jpg');
   background-position: top center;
   .center-ctrl {
     height: 25px;
     padding-top: 41px;
     .label {
       font-size: 20px;
       line-height: 20px;
       color: #ffffff;
       margin: 0 76px;
       font-style: italic;
       .icon {
         font-size: 27px;
       }
     }
   }
 }
 .center-ctrl {
   width: 1200px;
   margin: 0 auto;
 }
 .canvas-area {
   width: 500px;
   height: 500px;
   background: url('./assets/images/roll.png') center 40px no-repeat;
   /*animation: rotate 16s infinite;*/
 }
 .feature-list {
   margin-top: 0;
   line-height: 30px;
   .feature-item {
     position: relative;
     white-space: nowrap;
   }
   .feature-name {
     position: relative;
     display: inline-block;
     padding: 0 15px;
     color: #fff;
     background-color: #00c6ff;
     border-radius: 15px;
     vertical-align: top;
     z-index: 9;
     /*animation: negative-rotate 16s infinite;*/
     &:hover {
       color: #00c6ff;
       background-color: #fff;
     }
     &:hover + .child-for-all {
       padding-right: 15px;
       width: 320px;
     }
     &:hover + .child-high-stable {
       padding-right: 15px;
       width: 380px;
     }
     &:hover + .child-professional {
       padding-right: 15px;
       width: 340px;
     }
     &:hover + .child-convenient {
       padding-right: 15px;
       width: 580px;
     }
     &:hover + .child-anytime {
       padding-right: 15px;
       width: 180px;
     }
   }
   .feature-info {
     display: inline-block;
     margin-left: -25px;
     padding-left: 20px;
     width: 0;
     height: 30px;
     border-top-right-radius: 15px;
     border-bottom-right-radius: 15px;
     background-color: rgba(15,20,65,.95);
     text-indent: 1em;
     overflow: hidden;
             transition: width .5s;
          -o-transition: width .5s;
        -moz-transition: width .5s;
     -webkit-transition: width .5s;
   }
   .for-all {
     top: -5px;
     left: 146px;
   }
   .high-stable {
     top: 153px;
     left: 330px;
   }
   .professional {
     top: 70px;
   }
   .convenient {
     top: 130px;
     left: 20px;
   }
   .anytime {
     top: 270px;
     left: 190px;
   }
 }
 .idc-box {
   width: 308px;
   height: 194px;
   border: solid 1px #4a4a4a;
   opacity: 0.6;
   margin-top: 150px;
 }
 .pro-safe-com {
   width: 370px;
   height: 256px;
   border-style: solid;
	 border-width: 1px;
	 border-image-source: linear-gradient(90deg,
		#0a8bc3 0%,
		#3a60e1 28%,
		#6934ff 100%);
	border-image-slice: 1;
   margin-top: 140px;
 }
 .idc-box-header, .com-box-header{
   height: 56px;
   font-size: 22px;
   font-style: italic;
   line-height: 56px;
   border-bottom: 2px solid #404040;
   text-indent: 12px;
   color: #fff;
 }
 .com-box-header {
   background-image: linear-gradient(90deg,
 		#0a8bc3 0%,
 		#3a60e1 28%,
 		#6934ff 100%)
 }
 .center-ctrl ul {
   margin-top: 16px;
 }
 .center-ctrl li {
   padding-left: 30px;
   height: 30px;
   line-height: 30px;
   color: #fff;
 }
 .package-label {
   width: 1200px;
	 height: 113px;
	 background-color: #313131;
	 opacity: 0.6;
 }
 .package-label-box {
   width: 50%;
   float: left;
   padding: 12px;
   box-sizing: border-box;
 }
 .package-box-header {
   height: 30px;
   margin-top: 10px;
   color: #fff;
   font-size: 24px;
   font-weight: lighter;
   .tiny {
     font-size: 14px;
   }
   .color {
     color: #05b2f5;
   }
 }
 .divide-line {
   height: 2px;
   background: linear-gradient(to right, #00b2f9, #1738ae)
 }
 .title-bg {
   width: 519px;
   height: 214px;
   position: absolute;
   background-image: url('./assets/images/title.png');
   top: 170px;
 }
 .package-box-body {
   color: #fff;
   font-size: 16px;
   line-height: 42px;
   font-family: PingFangSC-Regular;
   .color {
     font-size: 12px;
     color: #04b5f7;
   }
   .divide-top {
     padding: 0 9px;
   }
 }
 .buy-more {
   margin: 60px 0 0 20px;
   padding-bottom: 30px;
   height: 28px;
   font-family: MicrosoftYaHeiLight;
   font-size: 24px;
   line-height: 28px;
   color: #ffffff;
   .color {
     font-size: 28px;
     font-style: italic;
     color: #2a6ed7;
   }
 }
 .plus-version {
   background-color: #1d1d1d;
   .table-title {
     padding: 60px 0 30px 0;
     height: 26px;
     font-family: MicrosoftYaHeiLight;
     font-size: 28px;
     font-weight: 300;
     color: #ffffff;
    }
 }
 .advisory {
   cursor: pointer;
   color: #fff;
   padding: 8px 51px 8px 51px;
   font-size: 16px;
   margin-top: 40px;
   background-color: rgba(255,255,255,0.1);
   border-radius: 4px;
   border-style: solid;
   border-width: 1px;
 }
 .advisory:hover {
   background-image: linear-gradient(90deg, #0a8bc3 0%, #3a60e1 28%, #6934ff 100%);
   border: none;
   padding: 9px 52px 9px 52px;
 }

@keyframes rotate {
  from { transform: rotate( 0) }
  to { transform: rotate( 360deg) }
}

@keyframes negative-rotate {
  from { transform: rotate( 0) }
  to { transform: rotate( -360deg) }
}
</style>
