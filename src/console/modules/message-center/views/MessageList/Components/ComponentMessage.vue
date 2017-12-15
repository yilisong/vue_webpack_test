<component-message :tableData="tableData">
  <div slot="TableHeader">
    <el-button type="primary">全部消息</el-button>
    <el-button>标记为已读</el-button>
    <el-button>删除</el-button>
    <i class="el-icon-document" style="cursor:pointer">已读({{readNum}})</i>
    <i class="el-icon-message" style="cursor:pointer">未读({{unReadNum}})</i>
    <!-- 消息类型选择 -->
    <el-select v-model="value" placeholder="消息类型">
      <el-option v-for="(item,index) in messageType" :label="item.label" :value="item.value" :key="index">
      </el-option>
    </el-select>
    <!-- 模糊搜索 -->
    <div class="fuzzyQuery">
      <el-input placeholder="请输入域名进行模糊查询" v-model="fuzzyQuery">
          <template slot="append" cursor>查询</template>
      </el-input>
    </div>
      <!-- 时间选择器 -->
      <div class="timeSelect">
        <span class="demonstration">带快捷选项</span>
        <el-date-picker v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
    </div>
</component-message>




















<template>
<div>
  <slot name="TableHeader">
  </slot>
  <table v-loading="tableData.loading">
    <thead>
      <tr>
        <th v-for="(title, index) in tableData.titles" :key="index">
          {{title}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data,index) in tableData.data" :key="index">
        <td>
          <el-radio class="radio" v-model="this.tableData.checkArray[index]" label="1">{{data.title}}</el-radio>
        </td>
        <td>
          {{data.updated_at}}
        </td>
        <td>
          {{data.type}}
        </td>
        <td width="15%">
          <i class="el-icon-delete" style="cursor:pointer;width:100%" :id="data.id" @click="delMsg($event)"></i>
        </td>
      </tr>
    </tbody>
  </table>
  <slot name="TableFooter">

  </slot>
</div>
</template>


<script>
export default {
  props: ['tableData'],
  methods: {
    delMsg() {}
  },
  watch: {
    tableData: (newVal, oldVal) => {
      this.tableData = newVal
    }
  },
  data() {
    return {
      checkList:[],
      a:true
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  border-collapse: collapse;
  text-align: center;
  th {
    height: 40px;
  }
  td {
    height: 50px;
    i {
      font-size: 25px;
    }
  }
  thead {
    th {
      padding: 0;
      color: #fff;
      background-color: rgb(32, 160, 255);
    }
  }
}

.selectCtrl {
  float: right;
  margin-right: 10px;
}
</style>
