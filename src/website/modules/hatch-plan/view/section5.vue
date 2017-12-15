<template lang="html">
  <div class="section5">
    <div class="content">
      <p class="title-mian">如何加入“安孵计划”</p>
      <p class="title-sub">只要您属于非营利性组织或您的公司还处于创业过程中，提供相关材料均可加入“安孵计划”。享受“安孵计划”带来的各种优质资源。</p>
      <p class="flow">整个流程将在<span>7</span>个工作日内完成</p>
      <div class="step">
      </div>
      <p class="step-text">
        <span>注册YUNDUN账号</span>
        <span>完成非营利性组织或企业实名认证</span>
        <span>
          <!-- <p>访问<a href="" class="plan">“安孵计划”</a>专题页面</p>
          <p>点击页面下方共同扶持计划的申请按钮</p> -->
          <p>在<a href="#" class="plan">“总览页”</a>访问专题页面申请加入</p>
        </span>
        <span>
          按要求填写相关资料
        </span>
        <span>
          等待审核结果反馈
        </span>
      </p>
      <div class="join-partner">
        <p class="join-header">
          合作伙伴加入
        </p>
        <p class="join-content">
          无论您是安全企业、行业标杆企业、法律咨询或者投资公司，我们均期待您的加入，让我们携手助力非营利性组织和初创企业成长。
        </p>
        <p class="join-footer">
          <span class="mail">邮箱 marketing@yundun.com</span>
          <span class="hot-line">热线电话 <span class="phone">400 - 999 -7070</span></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'section5'
}
</script>

<style scoped>
.section5 {
  position: absolute;
  z-index: 3;
}
.content {
  width: 1200px;
  text-align: center;
  position: absolute;
}
.title-mian {
  font-size: 36px;
  color: var(--primary-blue);
  margin-top: 16vh;
  margin-bottom: 2vh;
}
.step-text {
  margin-top: 1vh;
  font-size: 14px;
  color: #000000;
  .plan {
    color: var(--primary-blue);
  }
  span {
    display: inline-block;
    float: left;
  }
  span:nth-child(1) {
    margin-left: 95px;
  }
  span:nth-child(2) {
    margin-left: 60px;
  }
  span:nth-child(3) {
    margin-left: 35px;
  }
  span:nth-child(4) {
    margin-left: 26px;
  }
  span:nth-child(5) {
    margin-left: 96px;
  }
}
.title-sub {
  font-size: 14px;
  color: #333333;
}
.flow {
  margin-top: 7vh;
  font-size: 14px;
  color: #333333;
  span {
    font-size: 18px;
    color: #000000;
  }
}
.step {
  position: relative;
  left: -365px;
  width: 1920px;
  height: 115px;
  background: url('../assets/images/step.png') no-repeat left;
}
.join-partner {
  text-align: center;
  margin-top: 10vh;
  padding: 30px 0;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  .join-header {
    font-size: 20px;
    color: #333333;
  }
  .join-content {
    font-size: 14px;
    color: #333333;
    margin-top: 20px;
    margin-bottom: 36px;
  }
  .join-footer {
    .phone {
      font-size: 14px;
      color: #000000;
    }
    .mail {
      padding-right: 15px;
      border-right: 1px solid #e6e6e6;
    }
    .hot-line {
      padding-left: 15px;
    }
  }
}

@media screen and (max-height: 650px) {
  .join-partner {
    padding: 10px 0;
    .join-content {
      margin-bottom: 18px;
    }
  }
}
</style>
