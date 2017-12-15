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
          {{data.member_name}}
        </td>
        <td width="25%">
          {{data.email}}
        </td>
        <td width="20%" style="position:relative">
          {{data.mobile}}&nbsp;&nbsp;<i :id="data.id" @mouseenter="changeTipsIn($event)" @mouseout="changeTipsOut" class="el-icon-information" v-if="data.mobile_status==0"></i><span class="little-notice" v-show="phoneTips==data.id">您的手机尚未验证，点击验证。</span>
        </td>
        <td>
          {{data.wx}}
        </td>
        <td>
          <!-- {{data.belong_group}} -->
          财务组
        </td>
        <td width="15%">
          <i class="el-icon-delete" style="cursor:pointer;" :id="data.id" @click="delUser($event)"></i>
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
      delUser(event) {
        this.$emit('clickdel',event.currentTarget.id)
      },
      changeTipsIn(event) {
        this.phoneTips = event.currentTarget.id
        console.log(this.phoneTips === event.currentTarget.id)
      },
      changeTipsOut() {
        this.phoneTips = -1
      }
  },
  watch: {
    tableData: (newVal,oldVal) => {
      this.tableData = newVal
    }
  },
  data() {
    return {
        phoneTips:false
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
.little-notice{
  font-size: 12px;
  position: absolute;
  bottom:40px;
  left:120px;
  border:1px solid rgb(32, 160, 255);
  border-radius: 3px;
  width:170px;
  height: 15px;
  padding: 3px;
  background-color:rgb(32, 160, 255) ;
  color: #fff;
}
.el-icon-information{
  color:rgb(32, 160, 255);
  font-size:20px;
  cursor:pointer;
}
</style>
