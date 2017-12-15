<template lang="html">
  <el-dialog title="账户充值" :visible.sync="payConfigVisible" :close-on-click-modal="true" size="small" @close="resetStatus">
    <el-form :rules="rules" ref="rechargeForm" :model="rechargeForm" label-width="160px" label-position="left">
      <div class="el-form-item">
        <label class="el-form-item__label" style="width: 160px">账户余额</label>
        <div class="el-form-item__content">
          {{ balance }}元
        </div>
      </div>
      <div class="el-form-item">
        <label class="el-form-item__label title-purchase" style="width: 160px">充值方式</label>
        <span class="i-alipay"></span>
      </div>
      <el-form-item class="recharge-amount" label="充值金额" prop="amount">
        <el-radio-group v-model="rechargeForm.amount">
          <el-radio-button :label="200">200元</el-radio-button>
          <el-radio-button :label="1000">1000元</el-radio-button>
          <el-radio-button :label="2000">2000元</el-radio-button>
          <el-radio-button v-show="rechargeForm.amount !== 'defined'" :label="'defined'">自定义</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="zdy-item" label="" v-show="rechargeForm.amount === 'defined'" prop="definedAmount">
        <el-input v-model="rechargeForm.definedAmount"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('rechargeForm')">取消</el-button>
      <el-button type="primary" @click="handleSubmit('rechargeForm')">立即充值</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  props: {
    pageName: String,
    orderCode: String,
    couponCode: String,
    pageSize: Number
  },
  computed: {
    balance() {
      return this.$store.state.recharge.balance
    }
  },
  created() {
    this.getUserBalance()
    this.$store.watch(
      state => state.dialog.payConfig.visible,
      visible => {
        this.payConfigVisible = visible
      }
    )
  },
  methods: {
    ...mapActions([
      'triggerPayConfigVisible',
      'getUserBalance',
      'launchRecharge'
    ]),
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let totalFee = 0
          if (this.rechargeForm.amount !== 'defined') {
            totalFee = this.rechargeForm.amount
          } else {
            totalFee = this.rechargeForm.definedAmount
          }
          const tempWindow = window.open()
          this.launchRecharge({
            pageName: this.pageName,
            orderCode: this.orderCode,
            couponCode: this.couponCode,
            pageSize: this.pageSize,
            total_fee: totalFee,
            tempWindow,
            vm: this
          })
        } else {
          this.$message({
            type: 'info',
            message: '提交的信息有误，请核对后再提交。'
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.triggerPayConfigVisible(false)
    },
    resetStatus() {
      this.$refs.rechargeForm.resetFields()
      this.triggerPayConfigVisible(false)
    }
  },
  data() {
    const checkDefinedAmount = (rule, value, callback) => {
      if (this.rechargeForm.amount === 'defined') {
        if (!value) {
          return callback(new Error('请补充充值金额'))
        } else if (isNaN(value)) {
          return callback(new Error('请填写数字'))
        } else if (!/^(([1-9]\d{0,6}(\.\d{1,2})?)|(0\.\d[1-9])|(0\.[1-9]\d?))$/.test(value)) {
          return callback(new Error('金额范围为 0.01 ~ 9999999.99，请核对后再提交'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      rules: {
        definedAmount: [
          { validator: checkDefinedAmount, trigger: 'blur' }
        ]
      },
      payConfigVisible: false,
      rechargeForm: {
        recharge_type: '1',
        amount: 200,
        definedAmount: ''
      }
    }
  }
}
</script>

<style>
.zdy-item {
  position: absolute;
  top: 181px;
  left: 379px;
  display: inline-block;
  margin-bottom: 0;
}
.zdy-item > .el-form-item__content{
  display: inline-block;
  margin-left: 0!important;
  width: 70px;
}
.zdy-item .el-input__inner {
  margin-left: -1px;
  height: 32px;
  border-radius: 0;
}
.zdy-item .el-form-item__error {
  width: 180px;
  line-height: 1.2;
}
.recharge-amount .el-form-item__label {
  margin-top: 5px;
}
</style>

<style scoped>
.title-purchase {
  margin-top: 7px;
}
.i-alipay {
  display: inline-block;
  width: 106px;
  height: 36px;
  background: url('../../assets/images/alipay.svg') no-repeat;
}
</style>
