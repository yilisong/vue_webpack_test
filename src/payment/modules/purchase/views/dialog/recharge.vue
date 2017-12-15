<template lang="html">
  <el-dialog class="recharge" title="账户充值" :visible.sync="rechargeVisible" @close="resetStatus">
    <el-form :model="form" ref="form" label-width="80px" :inline="true" class="clearfix">
      <el-form-item class="account-balance" label="账户余额">
        ￥ {{ balance }}
      </el-form-item>
      <el-form-item class="bill-type" label="充值方式">
        <i class="i-alipay" v-if="form.recharge_type === '1'"></i>
      </el-form-item>
      <el-form-item class="recharge-sum" label="充值金额" prop="amount">
        <el-radio-group v-model="form.amount">
          <el-radio-button :label="200">200元</el-radio-button>
          <el-radio-button :label="1000">1000元</el-radio-button>
          <el-radio-button :label="5000">5000元</el-radio-button>
          <el-radio-button :label="'defined'">自定义</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="defined-amount" label="" prop="defined_amount" v-show="form.amount === 'defined'">
        <el-input v-model="form.defined_amount" placeholder="自定义"></el-input>
      </el-form-item>
    </el-form>
    <div class="settle-box">
      <div>
        充值费用
      </div>
      <div class="sum">
        ￥{{ getRechargeAmount }}
      </div>
      <button class="btn-recharge" @click="handleSubmit">立即充值</button>
    </div>
  </el-dialog>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  created() {
    this.$store.watch(
      state => state.dialog.recharge.visible,
      visible => {
        this.rechargeVisible = visible
      }
    )
  },
  computed: {
    balance() {
      return this.$store.state.order.balance
    },
    getRechargeAmount() {
      return this.form.amount === 'defined' ? this.form.defined_amount : this.form.amount
    }
  },
  methods: {
    ...mapActions([
      'triggerRechargeVisible',
      'launchRecharge'
    ]),
    handleSubmit() {
      let total_fee = 0
      if (this.form.amount !== 'defined') {
        total_fee = this.form.amount
      } else {
        total_fee = this.form.defined_amount
        let msg = ''
        if (isNaN(Number(total_fee))) {
          msg = '充值金额必须为数字，请核对后再提交'
          this.$message({
            type: 'error',
            message: msg
          })
          return
        }
        if (Number(total_fee) === 0) {
          msg = '充值金额必须大于0元，请核对后再提交'
          this.$message({
            type: 'error',
            message: msg
          })
          return
        }
      }
      const tempWindow = window.open()
      this.launchRecharge({
        total_fee,
        tempWindow
      })
    },
    showRechargeType() {
      if (this.form.recharge_type === '1') {
        return '支付宝'
      } else {
        return '微信'
      }
    },
    resetStatus() {
      this.triggerRechargeVisible(false)
      this.$refs.form.resetFields()
    }
  },
  data() {
    return {
      rechargeVisible: false,
      form: {
        recharge_type: '1',
        amount: '',
        defined_amount: ''
      }
    }
  }
}
</script>

<style scoped>
.i-alipay {
  display: inline-block;
  width: 106px;
  height: 36px;
  background: url('../../assets/images/alipay.svg') no-repeat;
}

.account-balance,
.bill-type {
  width: 225px;
}

.recharge-sum {
  margin-right: 0 !important;
  width: 400px;
}

.settle-box {
  font-size: 16px;
  line-height: 25px;
  text-align: right;
  .sum {
    margin-top: 10px;
    margin-bottom: 15px;
    font-size: 25px;
    color: #2d90e6;
  }
}

.btn-recharge {
  width: 210px;
  height: 40px;
  font-size: 16px !important;
  color: #fff;
  background-color: #2d90e6;
  border: 1px solid #2d90e6;
  cursor: pointer;
}
</style>

<style>
.recharge .el-dialog--small {
  width: 1000px;
}
.recharge {
  .el-dialog__header {
    height: 100px;
    border-bottom: 1px solid #efefef;
  }
  .el-dialog__title {
    margin-left: 40px;
    font-size: 25px;
    font-weight: 500;
    line-height: 100px;
  }
  .el-dialog__body {
    padding: 20px 60px;
    border-bottom: 1px solid #efefef;
  }
  .el-form {
    border-bottom: 1px solid #efefef;
  }
  .el-form-item__label {
    text-align: left;
    font-size: 16px;
    font-weight: 500;
  }
  .el-form-item__content {
    display: block;
    font-size: 18px;
  }
}


.defined-amount {
  position: absolute;
  top: 0;
  right: -10px;
  .el-form-item__content {
    position: absolute;
    top: 179px;
    right: 73px;
  }
  .el-input {
    width: 90px;
  }
  .el-input__inner {
    border-color: #008ed6;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .01);
    :hover {
      border-color: #008ed6;
    }
  }
}

.recharge-sum {
  .el-radio-button {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  .el-radio-button__inner {
    width: 90px;
    height: 36px;
    border: 1px solid #bfcbd9;
    border-radius: 2px;
    &:first-child {
      border-radius: 2px;
    }
    &:last-child {
      border-radius: 2px;
    }
  }
  .is-active .el-radio-button__inner {
    color: #3aa7ea;
    background-color: #eaf4fc;
    border-color: #008ed6;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .01);
  }
}
</style>
