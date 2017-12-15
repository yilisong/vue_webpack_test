<template lang="html">
<div class="">
  <ul class="tip" v-bind:class="colorBox">
    <li v-for="item in status.testInfo">{{item.content}}</li>
  </ul>
</div>
</template>

<script>
export default {
  mounted() {
    let param = {}
    switch (this.$store.state.authentiStore.status) {
      case 0:
        this.status.testInfo = this.status.testing.first
        this.blue = true
        break
      case 1:
        param = {
          msg: this.status.testing.sixth,
          anothermsg: this.status.testing.seventh,
          thirdmsg: this.status.testing.tenth
        }
        this.getInfo(param)
        this.green = true
        break
      case 2:
        param = {
          msg: this.status.testing.third,
          anothermsg: this.status.testing.forth,
          thirdmsg: this.status.testing.nineth
        }
        this.getInfo(param)
        this.orange = true
        break
      case 3:
        this.status.testInfo = this.status.testing.first
        this.blue = true
        break
      case 4:
        this.status.testInfo = this.status.testing.fifth
        this.orange = true
        break
      case 5:
        this.status.testInfo = this.status.testing.second
        this.blue = true
        break
      case 6:
        this.status.testInfo = this.status.testing.eighth
        this.green = true
        break
      case 7:
        this.status.testInfo = this.status.testing.nineth
        this.orange = true
        break
      case 8:
        this.status.testInfo = this.status.testing.first
        this.blue = true
        break
      default:
        this.status.testInfo = this.status.testing.first
        break

    }
  },
  computed: {
    colorBox() {
      return {
        blue: this.blue,
        orange: this.orange,
        green: this.green
      }
    }
  },
  methods: {
    getInfo(obj) {
      switch (this.$store.state.authentiStore.type) {
        case 1:
          this.status.testInfo = obj.msg
          break
        case 2:
          this.status.testInfo = obj.anothermsg
          break
        case 3:
          this.status.testInfo = obj.thirdmsg
          break
        default:

      }
    }
  },
  data() {
    return {
      blue: false,
      orange: false,
      green: false,
      status: {
        type: '1',
        msg: [{
          content: '1.个人认证用户和其他类别认证用户在发票申请、资源使用、咨询服务、产品使用等方面存在差异，请根据自身实际情况进行身份认证；若企业或组织进行个人认证，遇到人员变动、账号欠费时可能会对个人/企业/组织造成麻烦和经济损失；'
        }, {
          content: '2.支持个人认证用户升级为其他类别认证用户；'
        }, {
          content: '3.您对您所填信息的真实性负全部法律责任，上海云盾有权禁用任何有信息伪造行为的用户账号。'
        }],
        testing: {
          first: [{
            content: '1.个人认证用户和其他类别认证用户在发票申请、资源使用、咨询服务、产品使用等方面存在差异，请根据自身实际情况进行身份认证；若企业或组织进行个人认证，遇到人员变动、账号欠费时可能会对个人/企业/组织造成麻烦和经济损失；'
          }, {
            content: '2.支持个人认证用户升级为其他类别认证用户；'
          }, {
            content: '3.您对您所填信息的真实性负全部法律责任，上海云盾有权禁用任何有信息伪造行为的用户账号。'
          }],
          second: [{
            content: '1.支持个人认证用户升级为企业认证用户，不支持企业认证用户降级为个人认证用户。'
          }, {
            content: '2.支持企业认证用户申请企业增值税普通发票或增值税专用发票，享企业专用节点资源等定制化服务。'
          }, {
            content: '3.企业信息提交后，需邮寄加盖企业公章的企业营业执照复印件，审核过程中，用户需配合进行相应的身份核实。'
          }, {
            content: '4.用户对所填信息的真实性负全部法律责任，上海云盾有权禁用任何有信息伪造行为的用户账号。'
          }],
          third: [{
            content: '个人认证审核中...'
          }, {
            content: '个人认证信息提交后，将于3个工作日内完成认证审核。'
          }],
          forth: [{
              content: '企业认证审核中...'
            },
            // {
            //   content: '1. 请您将营业执照复印件加盖公章寄往上海云盾信息技术有限公司，邮寄信息：上海市闵行区中春路7001号（明谷科技园）F栋705。'
            // },
            // {
            //   content: '2. 我们将于收到复印件后的三个工作日内完成审核。'
            // },
            {
              content: '用户对所填信息的真实性负全部法律责任，上海云盾有权禁用任何有信息伪造行为的用户账号。'
            },
            {
              content: '如有任何疑问，请联系在线客服 800090007。'
            }
          ],
          fifth: [{
              content: '个人升级为企业认证审核中'
            }, {
              content: '1. 请您将营业执照复印件加盖公章寄往上海云盾信息技术有限公司，邮寄信息：上海市闵行区中春路7001号（明谷科技园）F栋705。'
            },
            {
              content: '2. 我们将于收到复印件后的三个工作日内完成审核。'
            },
            {
              content: '3. 如有任何疑问，请联系在线客服 800090007。'
            }
          ],
          sixth: [{
            content: '个人认证审核通过'
          }],
          seventh: [{
            content: '企业认证审核通过'
          }],
          eighth: [{
            content: '个人升级企业审核通过'
          }],
          nineth: [{
            content: '政府或事业单位认证审核中'
          }, {
            content: '政府或事业单位认证信息提交后，将于3个工作日内完成认证审核'
          }],
          tenth: [{
            content: '政府或事业单位认证申请通过'
          }]
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
ul {
  list-style: none;
}

.tip {
  font-size: 14px;
  padding: 10px;
  line-height: 1.5em;
  margin-bottom: 10px;
}

.blue {
  background: #EEF6FC;
  border: 2px solid #5EB3ED;
}

.orange {
  background: #FFF6ED;
  border: 2px solid #FFA752;
}

.green {
  background: #F5FBEF;
  border: 2px solid #95D150;
}
</style>
