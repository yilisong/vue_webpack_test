<template lang="html">
<console-page-layout title="订单管理">
  <ComboTable :total="orderTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getOrderList" @on-current-change="getOrderList" class="add-wrap">
    <div slot="body">
      <el-table :data="orderList" style="width: 100%">
        <el-table-column prop="order_code" label="订单编号" min-width="190">
        </el-table-column>
        <el-table-column prop="product_name" label="产品" :formatter="formatProductName">
        </el-table-column>
        <el-table-column prop="meal_name" label="套餐" :formatter="formatMealName" min-width="90">
        </el-table-column>
        <el-table-column prop="type" label="类型" :formatter="formatType">
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="90" align="center">
        </el-table-column>
        <el-table-column prop="amount" label="实付金额/元" width="100" :formatter="formatPayPrice" align="right">
        </el-table-column>
        <el-table-column prop="status" label="状态" class-name="status">
          <template scope="scope">
            <div>
              <i v-if="scope.row.status === '0'" class="fail-dot"></i>
              <i v-if="scope.row.status === '1'" class="succceed-dot"></i>
              <i v-if="scope.row.status === '2' || scope.row.status === '3'" class="again-dot"></i>
              <i v-if="scope.row.status === '4'" class="process-dot"></i>
              <span>{{ order_status_list[scope.row.status] }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pay_time" label="支付时间"  width="90" align="center">
        </el-table-column>
        <el-table-column label="操作" align="right" min-width="120">
          <template scope="scope">
            <template v-if="showOperator(scope,0)">
              <el-popover
                ref="popover5"
                placement="top"
                width="80"
                v-model="cancelTipArray[scope.$index]">
                <p>确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="dbCancel(scope)">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleCancel(scope)">确定</el-button>
                </div>
              </el-popover>
              <el-button type="text" v-popover:popover5>撤销订单</el-button>
              <span class="separator"></span>
            </template>
            <template v-if="showOperator(scope,0)">
              <el-button type="text" @click="handlePay(scope)">支付</el-button>
              <span class="separator"></span>
            </template>
            <template v-if="showOperator(scope,1)">
              <el-button type="text" @click="handleApply(scope)">申请发票</el-button>
              <span class="separator"></span>
            </template>
            <template v-if="showOperator(scope,2)">
              <i class="succceed-dot"></i>
              <el-button type="text" @click="showInvoiceHref(scope)">发票已申请</el-button>
              <span class="separator"></span>
            </template>
            <el-button type="text" @click="handleDetails(scope)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </ComboTable>
  <InvoiceConfig></InvoiceConfig>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import InvoiceConfig from './Dialogs/InvoiceConfig'
import formatText from 'common/utils/formatText'
import {
  mapActions
} from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    ComboTable,
    InvoiceConfig
  },
  methods: {
    ...mapActions([
      'getOrderByPage',
      'cancelOrderByCode',
      'triggerInvoiceConfigVisible'
    ]),
    getOrderList(current, size) {
      this.getOrderByPage({
        page: current,
        per_page: size
      }).then(response => {
        const data = response.data.data
        const { list, total } = data
        this.$store.commit({
          type: 'RECEIVE_ORDER_BY_PAGE',
          list
        })
        this.$store.commit({
          type: 'RECEIVE_ORDER_TOTAL',
          total
        })
        this.order_meal_type_list = data.order_meal_type_list
        this.product_list = data.product_meal_list.product_list
        this.meal_list = data.product_meal_list.meal_list
        this.order_status_list = data.order_status_list
      })
    },
    showOperator(scope, code) {
      const status = Number(scope.row.status)
      const applyInvoice = Number(scope.row.apply_invoice)
      if (status === 0 && code === 0) {
        return true
      } else if (status === 1 && applyInvoice === 0 && code === 1) {
        return true
      } else if (status === 1 && applyInvoice === 1 && code === 2) {
        return true
      } else {
        return false
      }
    },
    handleCancel(scope) {
      this.cancelTipArray.splice(scope.$index,1,false)
      this.cancelOrderByCode({
        order_code: scope.row.order_code
      }).then(() => {
        this.getOrderList(1, this.pageSize)
      })
    },
    dbCancel(scope) {
      this.cancelTipArray.splice(scope.$index,1,false)
    },
    handlePay(scope) {
      const coupon_code = scope.row.coupon_code
      this.$router.push({
        path: '/pay',
        query: {
          order_code: scope.row.order_code,
          coupon_code
        }
      })
    },
    handleApply(scope) {
      const code = scope.row.order_code
      this.$store.commit({
        type: 'RECEIVE_ORDER_CODE',
        code
      })
      this.triggerInvoiceConfigVisible(true)
    },
    showInvoiceHref(scope) {
      const order_code = scope.row.order_code
      this.$router.push({
        path: '/invoiceList',
        query: {
          order_code
        }
      })
    },
    handleDetails(scope) {
      const id = scope.row.id
      const status = scope.row.status
      this.$router.push({
        path: '/orderDetail',
        query: {
          id,
          status
        }
      })
    },
    formatProductName(row) {
      const productFlag = row.product_flag
      return this.product_list[productFlag]
    },
    formatMealName(row) {
      const mealFlag = row.meal_flag
      return this.meal_list[mealFlag]
    },
    formatType(row) {
      const orderMealType = row.order_meal_type
      return this.order_meal_type_list[orderMealType]
    },
    formatMoney(val) {
      return formatText('money',val)
    },
    formatPayPrice(row) {
      return `${row.pay_price}`
    }
  },
  computed: {
    orderList() {
      this.$store.state.order.list.forEach((item,index,arr) => {
        if (item.status === 0) {
          this.cancelTipArray.push(false)
        }
      })
      return this.$store.state.order.list
    },
    orderTotal() {
      return this.$store.state.order.total
    },
    changeOrderList() {
      return this.$store.state.order.changeOrderList
    }
  },
  created() {
    this.getOrderList(1, this.pageSize)
  },
  watch: {
    changeOrderList(val) {
      if (val) {
        window.location.reload()
      }
    }
  },
  data() {
    return {
      cancelTipArray: [],
      pageSizes: [5, 10, 20],
      pageSize: 5,
      // only for cache
      product_list: [],
      meal_list: [],
      // packageType
      order_meal_type_list: [],
      // product list
      product_meal_list: [],
      // order status
      order_status_list: []
    }
  }
}
</script>

<style scoped>
.item,
.iteminfo {
  display: inline-block;
  vertical-align: middle;
}
.item {
  min-width: 5em;
  /*padding-right: 1em;*/
}
.discount {
  margin-left: -0.4em;
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

<style>
.status.is-leaf .cell {
  padding-left: 24px;
}
.el-button.el-button--text {
  line-height: 16px;
  height: 16px;
}
</style>
