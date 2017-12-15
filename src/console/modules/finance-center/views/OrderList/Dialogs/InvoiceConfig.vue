<template lang="html">
  <el-dialog :title="title" :visible.sync="invoiceConfigVisible" :close-on-click-modal="true" class="dialog-common" @open="initStatus" @close="resetStatus" size="large">
    <template v-if="identified">
      <el-form :model="invoiceForm" ref="invoiceForm" :rules="invoiceRules" label-width="160px" label-position="left" v-loading="loading">
        <p class="title-context">
          发票信息
        </p>
        <el-form-item class="is-required" label="发票类型" prop="invoice_type">
          <el-radio-group v-model="invoiceForm.invoice_type">
            <el-radio :label="0">增值税普通发票</el-radio>
            <el-radio :label="1" v-if="!isPerson">增值税专用发票</el-radio>
          </el-radio-group>
        </el-form-item>
        <hr class="split-line">
        <p class="title-context">
          发票详细信息
        </p>
        <el-form-item class="is-required" label="抬头">
          <el-input v-model="invoiceForm.invoice_title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!isPerson && !isGovernment" class="is-required" label="税号">
          <el-input v-model="invoiceForm.tax_number" auto-complete="off"></el-input>
        </el-form-item>
        <template v-if="invoiceForm.invoice_type">
          <el-form-item class="is-required" label="注册地址" prop="register_address">
            <el-input v-model="invoiceForm.register_address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="is-required" label="注册固定电话" prop="register_mobile">
            <el-input v-model="invoiceForm.register_mobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="is-required" label="基本开户行名称" prop="bank_name">
            <el-input v-model="invoiceForm.bank_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="is-required" label="基本开户行账号" prop="bank_account">
            <el-input v-model="invoiceForm.bank_account" auto-complete="off"></el-input>
          </el-form-item>
        </template>
        <hr class="split-line">
        <p class="title-context">
          邮寄信息
        </p>
        <el-form-item class="is-required" label="姓名" prop="name">
          <el-input v-model="invoiceForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="联系方式" prop="mobile">
          <el-input v-model="invoiceForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="收件地址" prop="address">
          <el-input v-model="invoiceForm.address" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetStatus()">取消</el-button>
        <el-button type="primary" @click="handleSubmit('invoiceForm')">确定</el-button>
      </div>
    </template>
    <template v-else>
      <div v-loading="loading">
        <span>申请发票前，请先前往<a href="/console/user-center#/authentication" class="a-link">用户中心</a>完成身份认证</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="triggerInvoiceConfigVisible(false)">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import verify from 'common/utils/verify'
import specialFinanceResource from '../../../resource/specialFinanceResource'
import { mapActions } from 'vuex'

export default {
  created() {
    this.$store.watch(
      state => state.dialog.invoiceConfig.visible,
      visible => {
        this.invoiceConfigVisible = visible
      }
    )
  },
  methods: {
    ...mapActions([
      'applyForInvoice',
      'triggerInvoiceConfigVisible'
    ]),
    initStatus() {
      specialFinanceResource.getApplyInfo().then(response => {
        const code = response.data.status.code
        const message = response.data.status.message
        if (code === 91064) {
          // goto Authorize
          this.identified = false
          this.title = '提示'
        } else if (code === 1) {
          // Authorized
          this.identified = true
          this.title = '申请发票'
          const { certification,expressInfo } = response.data.data
          this.isCompany = Boolean(certification.company)
          this.isGovernment = Boolean(certification.government)
          this.isPerson = !this.isCompany && !this.isGovernment
          // details
          if (this.invoiceForm.invoice_type) {
            this.invoiceForm.register_address = expressInfo.register_address
            this.invoiceForm.register_mobile = expressInfo.register_mobile
            this.invoiceForm.bank_name = expressInfo.bank_name
            this.invoiceForm.bank_account = expressInfo.bank_account
          }
          // expressInfo
          this.invoiceForm.invoice_title = expressInfo.invoice_title
          this.invoiceForm.tax_number = expressInfo.tax_number
          this.invoiceForm.name = expressInfo.name
          this.invoiceForm.mobile = expressInfo.mobile
          this.invoiceForm.address = expressInfo.address
        } else {
          this.$message({
            type: 'error',
            message
          })
        }
        this.loading = false
      })
    },
    resetStatus() {
      this.triggerInvoiceConfigVisible(false)
      this.$refs.invoiceForm.resetFields()
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.invoiceForm.order_code = this.$store.state.order.orderCode
          if (this.isGovernment || this.isPerson) {
            delete this.invoiceForm.tax_number
          }
          this.applyForInvoice(this.invoiceForm)
          this.triggerInvoiceConfigVisible(false)
        } else {
          this.$message({
            type: 'info',
            message: '请输入的信息有误，请核对后再提交。'
          })
        }
      })
    }
  },
  data() {
    const validateName = function(rule,value,callback) {
      if (!value) {
        callback(new Error('请填写姓名'))
      } else if (value.length > 20) {
        callback(new Error('姓名最长为20个字符'))
      } else if (!verify.name.test(value)) {
        callback(new Error('姓名由汉字、数字、英文字母组成'))
      } else {
        callback()
      }
    }
    const validateMobile = function(rule,value,callback) {
      if (!value) {
        callback(new Error('请填写联系方式'))
      } else if (!verify.mobile.test(value)) {
        callback(new Error('手机的格式不正确'))
      } else {
        callback()
      }
    }
    const validateAddress = function(rule,value,callback) {
      if (!value) {
        callback(new Error('请填写地址'))
      } else if (value.length > 100) {
        callback(new Error('地址最长为100个字符'))
      } else if (!verify.address.test(value)) {
        callback(new Error('地址由汉字、数字、英文字母、符号组成'))
      } else {
        callback()
      }
    }
    const validateTel = function(rule,value,callback) {
      if (!value) {
        callback(new Error('请填写注册固定电话'))
      } else if (!(verify.tel.test(value) || verify.localTel.test(value))) {
        callback(new Error('固定电话的格式不正确'))
      } else {
        callback()
      }
    }
    const validateBankName = function(rule,value,callback) {
      if (!value) {
        callback(new Error('请填写注册开户行名称'))
      } else if (value.length > 80) {
        callback(new Error('开户行名称最长为80个字符'))
      } else if (!verify.bankName.test(value)) {
        callback(new Error('开户行名称由汉字、数字、英文字母组成'))
      } else {
        callback()
      }
    }
    const validateBankAccount = function(rule,value,callback) {
      if (!value) {
        callback(new Error('请填写基本开户行账号'))
      } else if (!verify.bankAccount.test(value)) {
        callback(new Error('开户行账号的格式有误'))
      } else {
        callback()
      }
    }
    return {
      identified: true,
      loading: true,
      invoiceConfigVisible: false,
      title: '',
      isPerson: true,
      isCompany: false,
      isGovernment: false,
      //plainInvoice
      invoiceRules: {
        name:[
          { validator: validateName,trigger:'blur' }
        ],
        mobile:[
          { validator: validateMobile,trigger:'blur' }
        ],
        address:[
          { validator: validateAddress,trigger:'blur' }
        ],
        register_address:[
          { validator: validateAddress,trigger:'blur' }
        ],
        register_mobile:[
          { validator: validateTel,trigger:'blur' }
        ],
        bank_name:[
          { validator: validateBankName,trigger:'blur' }
        ],
        bank_account:[
          { validator: validateBankAccount,trigger:'blur' }
        ]
      },
      invoiceForm: {
        // hidden
        order_code: '',
        invoice_type: 0,
        // info
        invoice_title: '',
        tax_number: '',
        // details
        register_address: '',
        register_mobile: '',
        bank_name: '',
        bank_account: '',
        // expressInfo
        name: '',
        mobile: '',
        address: ''
      }
    }
  }
}
</script>

<style>
.a-link {
  color: var(--primary-blue);
  cursor: pointer;
}
</style>

<style scoped>
.split-line {
  margin-bottom: 20px;
  background-color: #e6e6e6;
}
.title-context {
  margin-bottom: 20px;
}
/*el-input*/
.el-input,
.el-input__inner {
  width: 330px;
}
</style>
