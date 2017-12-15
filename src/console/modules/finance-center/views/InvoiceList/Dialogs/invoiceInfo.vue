<template lang="html">
  <el-dialog title="发票详情" :visible.sync="invoiceInfoVisible" :close-on-click-modal="true" @open="getInvoiceDetails" @close="resetStatus" size="small">
    <div class="wrapper" v-loading="infoLoading">
      <el-row v-if="show_express">
        <el-col :span="6" class="lead">物流信息</el-col>
        <el-col :span="7">快递公司</el-col>
        <el-col :span="11">{{ invoiceInfo.express_company }}</el-col>
      </el-row>
      <el-row v-if="show_express">
        <el-col :offset="6" :span="7">快递单号</el-col>
        <el-col :span="11">{{ invoiceInfo.express_code }}</el-col>
      </el-row>
      <el-row v-if="show_express">
        <el-col :offset="6" :span="7">快递状态</el-col>
        <el-col :span="11">{{ invoiceInfo.express_status_desc }}</el-col>
      </el-row>
      <hr v-if="show_express">
      <el-row>
        <el-col :span="6" class="lead">邮寄信息</el-col>
        <el-col :span="7">邮寄姓名</el-col>
        <el-col :span="11">{{ detail.name }}</el-col>
      </el-row>
      <el-row>
        <el-col :offset="6" :span="7">联系方式</el-col>
        <el-col :span="11">{{ detail.mobile }}</el-col>
      </el-row>
      <el-row>
        <el-col :offset="6" :span="7">邮寄地址</el-col>
        <el-col :span="11">{{ detail.address }}</el-col>
      </el-row>
      <hr>
      <el-row>
        <el-col :span="6" class="lead">发票信息</el-col>
        <el-col :span="7">发票类型</el-col>
        <el-col :span="11">{{ invoiceInfo.invoice_type_desc }}</el-col>
      </el-row>
      <el-row>
        <el-col :offset="6" :span="7">抬头</el-col>
        <el-col :span="11">{{ detail.invoice_title }}</el-col>
      </el-row>
      <el-row v-if="!isPerson && !isGovernment ">
        <el-col :offset="6" :span="7">税号</el-col>
        <el-col :span="11">{{ detail.tax_number }}</el-col>
      </el-row>
      <el-row v-if="!isPlain">
        <el-col :offset="6" :span="7">注册地址</el-col>
        <el-col :span="11">{{ detail.register_address }}</el-col>
      </el-row>
      <el-row v-if="!isPlain">
        <el-col :offset="6" :span="7">注册固话</el-col>
        <el-col :span="11">{{ detail.register_mobile }}</el-col>
      </el-row>
      <el-row v-if="!isPlain">
        <el-col :offset="6" :span="7">开户行名称</el-col>
        <el-col :span="11">{{ detail.bank_name }}</el-col>
      </el-row>
      <el-row v-if="!isPlain">
        <el-col :offset="6" :span="7">开户行账号</el-col>
        <el-col :span="11">{{ detail.bank_account }}</el-col>
      </el-row>
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
      state => state.dialog.invoiceInfo.visible,
      visible => {
        this.invoiceInfoVisible = visible
        const invoice_status = this.$store.state.invoice.invoice_status
        if (invoice_status === '0' || invoice_status === '1') {
          this.show_express = false
        } else {
          this.show_express = true
        }
      }
    )
  },
  methods: {
    ...mapActions([
      'getInvoiceDetailsById',
      'triggerInvoiceInfoVisible'
    ]),
    getInvoiceDetails() {
      const id = this.$store.state.invoice.invoiceId
      this.getInvoiceDetailsById({ id }).then(response => {
        const data = response.data.data
        this.invoiceInfo = data
        this.isPlain = this.invoiceInfo.invoice_type === '0'
        this.detail = data.detail
        this.certificationInfo = data.certificationInfo
        this.company = data.certificationInfo.company
        this.government = data.certificationInfo.government
        if (this.company) {
          this.isCompany = true
          this.isGovernment = false
        } else if (this.government) {
          this.isCompany = false
          this.isGovernment = true
        }
        this.isPerson = !(this.isCompany || this.isGovernment)
        this.infoLoading = false
      })
    },
    resetStatus() {
      this.triggerInvoiceInfoVisible(false)
      this.infoLoading = true
    }
  },
  data() {
    return {
      // status
      isPlain: false,
      isPerson: true,
      isCompany: false,
      isGovernment: false,
      // transmit
      show_express: false,
      // local
      invoiceInfoVisible: false,
      infoLoading: true,
      invoiceInfo: {},
      detail: {},
      certificationInfo: {},
      company: {}
    }
  }
}
</script>

<style lang="css" scoped>
.wrapper {
  line-height: 30px;
}
.lead {
  font-size: 14px;
}
hr {
  height: 1px;
  border: 0;
  background-color: #e6e6e6;
}
</style>
