<template lang="">
<console-page-layout title="批量域名添加">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="添加域名" name="first">
      <el-input type="textarea" :rows="2" placeholder="请使用回车分隔多个域名，一次最多100个域名" v-model="textarea">
      </el-input>
      <el-checkbox v-model="checked">同时为新域名添加@和www的A记录</el-checkbox>
      <el-input v-model="input" placeholder="请填写记录IP"></el-input>
      <el-button :plain="true" type="success" @click="handleButtonDomainAdd">添加域名</el-button>
    </el-tab-pane>

    <el-tab-pane label="正在执行任务" name="second">
      <el-table :data="domainList" fit stripe highlight-current-row style="width: 100%">
        <el-table-column prop="domain" label="域名" min-width="120"></el-table-column>
        <el-table-column prop="desc" label="描述" min-width="120"></el-table-column>
        <el-table-column prop="status" label="托管状态" min-width="120"></el-table-column>
      </el-table>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handlePaginationSizeChange" @current-change="handlePaginationCurrentPageChange" :page-sizes="paginationParam.pageSizes" :page-size="paginationParam.pageSize" :total="paginationParam.totalCount"
        :current-page="paginationParam.currentPage">
      </el-pagination>
    </el-tab-pane>

    <el-tab-pane label="历史任务" name="third">
      <el-table :data="domainList2" fit stripe highlight-current-row style="width: 100%">
        <el-table-column prop="time" label="创建时间" min-width="120"></el-table-column>
        <el-table-column prop="desc" label="描述" min-width="120"></el-table-column>
        <el-table-column prop="status" label="状态" min-width="120"></el-table-column>
      </el-table>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handlePaginationSizeChange2" @current-change="handlePaginationCurrentPageChange2" :page-sizes="paginationParam2.pageSizes" :page-size="paginationParam2.pageSize" :total="paginationParam2.totalCount"
        :current-page="paginationParam2.currentPage">
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
export default {
  components: {
    ConsolePageLayout
  },
  data() {
    return {
      activeName: 'first',

      textarea: '',
      checked: false,
      input: '',

      domainList: [],
      paginationParam: {
        pageSizes: [20, 50, 100],
        pageSize: 20,
        totalCount: 0,
        currentPage: 1
      },
      domainList2: [],
      paginationParam2: {
        pageSizes: [20, 50, 100],
        pageSize: 20,
        totalCount: 0,
        currentPage: 1
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handlePaginationSizeChange(size) {
      this.paginationParam.pageSize = size
      this.fetchDomainList(true)
    },
    handlePaginationCurrentPageChange(currentPage) {
      this.paginationParam.currentPage = currentPage
      this.fetchDomainList()
    },
    fetchDomainList(reset) {

    },
    handlePaginationSizeChange2(size) {
      this.paginationParam2.pageSize = size
      this.fetchDomainList2(true)
    },
    handlePaginationCurrentPageChange2(currentPage) {
      this.paginationParam2.currentPage = currentPage
      this.fetchDomainList2()
    },
    fetchDomainList2(reset) {

    },
    handleButtonDomainAdd() {
      console.log('this.checked', this.checked)
      const params = {
        domain: this.textarea.split(','),
        add_record: this.checked ? '1' : '0',
        record_value: this.input
      }
      this.fetchPostJSON('CloudDns.Domain.DnsDomain.batchAdd', params).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && res.status.code === 1) {
                this.$message({
                  showClose: true,
                  message: '批量域名添加成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: res.status.message,
                  type: 'error'
                })
              }
            })
          }
        },
        e => {})
    }
  }
}
</script>

<style lang="">

</style>
