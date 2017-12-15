<template lang="html">
    <console-page-layout title="批量记录添加">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="添加记录" name="first">

      </el-tab-pane>

      <el-tab-pane label="正在执行任务" name="second">
        <el-table :data="domainList" fit stripe highlight-current-row style="width: 100%">
          <el-table-column prop="domain" label="域名" min-width="120"></el-table-column>
          <el-table-column prop="desc" label="描述" min-width="120"></el-table-column>
          <el-table-column prop="result" label="结果" min-width="120"></el-table-column>
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
          <el-table-column prop="operate" label="操作" min-width="120"></el-table-column>
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



      domainList: [],
      paginationParam: {
        pageSizes: [20, 50, 100],
        pageSize: 20,
        totalCount: 0,
        currentPage: 1
      },
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

    }
  }
}
</script>

<style lang="">

</style>
