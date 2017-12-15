<template>
  <div>
    <div class="main-body">
      <div class="center-ctrl">
        <div class="body-title">
        </div>
        <div class="body-center">
          <div class="table-title">
            11月1日 全新推出，现在年付可享低于<span class="number">1</span>折优惠
          </div>
          <div class="table-body">
            <div class="table-one">
              <div class="color-box"></div>
              <div class="box-title">
                套餐配置 1<br />
                <span class="package-name">电信、联通双线路</span><br />
                <span class="price-label"><span class="package-price">28.8</span>&nbsp;万包年</span><br />
                <span class="old-price-label">原价<span class="old-price">356.16</span>万元/年</span><br />
                <button class="advisory-color" @click="serviceFun()">商务咨询</button>
              </div>
            </div>
            <div class="table-two">
              <div class="color-box"></div>
              <div class="box-title">
                套餐配置 2<br />
                <span class="package-name">电信、联通、移动三线路</span><br />
                <span class="price-label"><span class="package-price">36.8</span>&nbsp;万包年</span><br />
                <span class="old-price-label">原价<span class="old-price">440.16</span>万元/年</span><br />
                <button class="advisory-color" @click="serviceFun()">商务咨询</button>
              </div>
            </div>
          </div>
        </div>
        <div class="body-footer">
          <div class="footer-left">
            <div class="color-line"></div>
            <div class="tip-title">
              高稳定性
            </div>
            <div class="tip-body">
              ⊙电信线路异地高防机房双IP，分担业务风险:区域和风险隔离，分散业务风险
            </div>
            <div class="tip-title">
              无计量抗D
            </div>
            <div class="tip-body">
              ⊙电信线路默认防护600Gb，根据客户需要提供无限防御，
   可最大化保障客户业务安全运行
            </div>
            <div class="tip-title">
              100%防CC
            </div>
            <div class="tip-body">
              ⊙针对非网站业务支持空链接、慢链接、报文黑名单等规则，
   并结合权威僵尸网络库和YUNDUN研究院攻击溯源数据，100%防CC
            </div>
            <div class="tip-title">
              不封禁
            </div>
            <div class="tip-body">
              ⊙客户超套餐(300Gb)默认不封禁，自动提供最高防护内的弹性防护
            </div>
          </div>
          <div class="footer-right">
            <div class="color-line"></div>
            <div class="tip-title">
              中立安全厂商
            </div>
            <div class="tip-body">
              ⊙我们是一个专业的安全公司，只会专注于云安全领域，不会涉及用户业务
            </div>
            <div class="tip-title">
              业务带宽大
            </div>
            <div class="tip-body">
              ⊙无论用户的源服务器在哪，默认提供不超过1Gb的业务带宽，
   额外赠送客户云加速流量(3Tb/每月，仅支持网站类业务使用)
            </div>
            <div class="tip-title">
              自由切换
            </div>
            <div class="tip-body">
              ⊙网站类业务自动提供加速，还可根据需要直接叠加云WAF实现业务防篡改、
   业务风控(垃圾注册、恶意登录、业务被刷)等安全需求
            </div>
            <div class="tip-title">
              一起成长
            </div>
            <div class="tip-body">
              ⊙我们有强烈的意愿服务好我们每一个客户，愿意与客户一起成长，
   无论客户大小均可根据需要进行定制
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import help from 'common/utils/help'

export default {
  methods: {
    serviceFun() {
      help.linkService()
    }
  }
}
</script>

<style scoped>
  .fl {
    float: left;
  }
  .clear {
    clear: both;
  }
  .main-body {
    min-height: 1348px;
    background-image: url('./assets/images/bg.jpg');
    background-position: top center;
  }
  .center-ctrl {
    width: 1200px;
    margin: 0 auto;
    padding-top: 158px;
  }
  .body-title {
    min-height: 195px;
    background: url('./assets/images/title.png') no-repeat;
    background-position: top center;
  }
  .body-center {
    margin-top: 110px;
    .table-title {
      line-height: 44px;
      height: 46px;
      text-align: center;
      font-family: MicrosoftYaHeiLight;
      font-size: 20px;
      font-weight: 300;
      color: #fff;
      background-image: linear-gradient(90deg, #00c6ff 0%, #2139b7 100%), linear-gradient(#ffffff, #ffffff);
      .number {
        font-family: MicrosoftYaHei-Bold;
	      font-size: 30px;
        font-style: italic;
        padding: 0 10px 0 6px;
      }
    }
    .table-body {
      height: 310px;
      border: 1px solid #2139b7;
      padding: 22px;
      box-sizing: border-box;
      .table-one, .table-two {
        display: inline-block;
        width: 563px;
	      height: 266px;
	      background-color: inherit;
      }
      .table-one, .table-two {
        position: relative;
        border: solid 1px #353c4c;
        box-sizing: border-box;
        color: #fff;
        font-weight: 300;
        .color-box {
          display: none;
          width: 24px;
	        height: 20px;
	        background-color: #1f78d0;
          position: absolute;
          top: 7px;
          left: -10px;
        }
        .box-title {
          float: left;
          margin-left: 20px;
          color: #e4e4e4;
          line-height: 36px;
          font-size: 16px;
        }
      }
      .table-one {
        position: relative;
        margin-right: 22px;
      }
      .table-one:hover, .table-two:hover{
        background-color: #353c4c;
        .color-box {
          display: block;
        }
      }
      .package-name {
        font-size: 16px;
        line-height: 78px;
        color: #e4e4e4;
        border-bottom: 2px solid #909090;
      }
      .price-label {
        font-size: 24px;
        .package-price {
          font-size: 42px;
          color: #2d90e6;
        }
      }
      .old-price-label {
        font-size: 14px;
      }
      .old-price {
        text-decoration: line-through;
        color: #2d90e6;
        padding: 0 4px;
      }
      .advisory-color {
        cursor: pointer;
        color: #fff;
        padding: 12px 59px 11px 57px;
        font-size: 16px;
        margin-top: 10px;
        background-color: inherit;
      }
      .table-one:hover .advisory-color,
      .table-two:hover .advisory-color {
        background-image: linear-gradient(90deg, #0a8bc3 0%, #3a60e1 28%, #6934ff 100%);
      }
      .table-two {
        box-sizing: border-box;
        background-color: inherit;
        .advisory-color {
          border: 1px solid #fff;
        }
      }
    }
  }
  .footer-left {
    float: left;
    .tip-title {
      color: #00a0df;
    }
  }
  .footer-right {
    float: right;
    .tip-title {
      color: #6835fe;
    }
  }
  .footer-right, .footer-left {
    margin-top: 116px;
    width: 468px;
    .color-line {
      width: 456px;
      height: 5px;
      border-radius: 2px;
      background: linear-gradient(to right, #00c6ff, #2139b7);
      margin: 0 0 40px 0;
    }
    .tip-title {
      font-size: 18px;
      margin-top: 10px;

    }
    .tip-body {
      font-size: 14px;
      color: #d2d2d2;
      margin: 14px 0;
    }
  }
  .body-footer {
    background: url('./assets/images/advantage.png') no-repeat;
    background-position: 458px 138px;
  }
</style>
