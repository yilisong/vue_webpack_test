<template lang="html">
<console-page-layout title="账户充值">
  <ComboTable :total="rechargeTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="rechargeList" @on-current-change="rechargeList" class="add-wrap">
    <div slot="headerLeft">
      <div>
        当前账户余额：<span class="balance">{{ balance }}元</span>
        <el-button type="primary" @click="handleRecharge">充值</el-button>
      </div>
    </div>
    <div slot="body">
      <el-table :data="accountList" style="width: 100%">
        <el-table-column prop="out_trade_no" label="充值ID">
        </el-table-column>
        <el-table-column prop="total_fee" label="充值金额/元" align="right">
        </el-table-column>
        <!-- <el-table-column prop="trade_no" label="交易号">
        </el-table-column> -->
        <el-table-column label="下单时间" align="center">
          <template scope="scope">
            {{ scope.row.created_at.split(' ')[0] }}
            <br>
            {{ scope.row.created_at.split(' ')[1] }}
          </template>
        </el-table-column>
        <el-table-column label="交易时间" align="center">
          <template scope="scope">
            {{ scope.row.gmt_payment.split(' ')[0] }}
            <br>
            {{ scope.row.gmt_payment.split(' ')[1] }}
          </template>
        </el-table-column>
        <el-table-column label="充值状态" align="right">
          <template scope="scope">
            <div v-if="showPayStatusBtn(scope,0)">
              <i class="again-dot"></i>
              <el-button type="text" size="small" @click="continueToPay(scope.row)">继续充值</el-button>
              <span class="separator"></span>
              <span>待支付</span>
            </div>
            <div v-if="showPayStatusBtn(scope,1)">
              <i class="fail-dot"></i>
              <span>已支付</span>
            </div>
            <div v-if="showPayStatusBtn(scope,2)">
              <i class="succceed-dot"></i>
              <span>已过期</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </ComboTable>
  <PayConfig
    :pageName="'rechargePage'"
    :pageSize="pageSize"
  ></PayConfig>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import PayConfig from '../Dialogs/PayConfig'
import { mapActions } from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    ComboTable,
    PayConfig
  },
  created() {
    this.rechargeList(1, this.pageSize)
    this.getUserBalance()
  },
  mounted() {
    const startIndex = window.location.hash.indexOf('?') + 1
    if (startIndex > 0) {
      const searchArray = window.location.hash.substring(startIndex).split('=')
      if (searchArray[0] === 'recharge' && searchArray[1] === '1') {
        this.triggerPayConfigVisible(true)
      }
    }
  },
  computed: {
    accountList() {
      return this.$store.state.recharge.list
    },
    rechargeTotal() {
      return this.$store.state.recharge.total
    },
    balance() {
      return this.$store.state.recharge.balance
    }
  },
  methods: {
    ...mapActions([
      'getRechargeByPage',
      'getUserBalance',
      'triggerPayConfigVisible'
    ]),
    rechargeList(current, size) {
      this.getRechargeByPage({
        page: current,
        per_page: size
      })
    },
    showPayStatusBtn(scope, code) {
      const status = Number(scope.row.status)
      if (status === code) {
        return true
      }
    },
    handleRecharge() {
      this.triggerPayConfigVisible(true)
    },
    continueToPay(row) {
      window.open(row.request_url)
    }
  },
  data() {
    return {
      pageSizes: [5, 10, 20],
      pageSize: 5
    }
  }
}
</script>

<style scoped>
.balance {
  margin-right: 1em;
}
.separator {
  display: inline-block;
  margin-left: 7px;
  margin-right: 7px;
  width: 1px;
  height: 12px;
  vertical-align: middle;
  background-color: #666;
}
</style>
