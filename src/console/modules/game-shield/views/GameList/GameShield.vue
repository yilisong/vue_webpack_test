<template lang="html">
<console-page-layout title="节点信息列表">
  <ComboTable :total="gameOperationTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getGameOperationList" @on-current-change="getGameOperationList">
    <div slot="body">
      <el-table :data="gameOperationList" element-loading-text="拼命加载中" fit  style="width: 100%">
        <el-table-column label="防御套餐名称" width="140" align="left">
          <template scope="scope">
            <span>{{scope.row.package_name}}</span>
            <el-button type="text" size="small" class="cursorPointer" @click="handleGamelist('ComboSet', scope.row)">设置</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="package_expiration_date" width="170" label="到期时间" align="left">
        </el-table-column>
        <el-table-column prop="" label="防御节点" width="160" align="left">
          <template scope="scope">
            <ul class="origin-domain">
              <li v-if="scope.row.security_ip" @click="showMore($event)">
                <i class="el-icon-caret-bottom el-icon--right position-adjust"></i>
              </li>
              <li :key="index" v-for="(item,index) in scope.row.security_ip" v-show = "index <= 1" :value = "index">
                <span>{{item}}</span>
              </li>
              <li class="showTotalIP">共计<span>{{ scope.row.security_ip_total }}</span>条IP,<br/><span class="seeMore" :data-id="scope.row.id" @click="handleGamelist('ShowTotalIP', scope.row)">查看更多</span></li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column  label="大区" align="left" class="address">
          <template scope="scope">
          <div v-if="scope.row.member_server_list">
            <ul :key="index" v-for="(item,index) in scope.row.member_server_list" class="serverUl">
              <li v-if="index !== (scope.row.member_server_list.length -1)">
                <el-input type="text" class="server_name" :value="item.server_name" :disabled="item.server_edit_status" :title="item.server_name"></el-input>
                <el-button type="text" size="small" :data-id="item.server_id" :data-packageid="scope.row.id" @click="editServeGameArea($event)" class="editServer">编辑</el-button><el-button type="text" size="small" class="linehalving">|</el-button><el-button type="text" size="small" :data-id="item.server_id" :data-packageid="scope.row.id" :data-length="scope.row.member_server_list.length" @click="deleteServeGameArea($event, scope.$index, scope.row.member_server_list)" class="editServer">删除</el-button>
              </li>
              <li v-else>
                <el-input type="text" class="server_name" :value="item.server_name" :disabled="item.server_edit_status" :title="item.server_name"></el-input>
                <span v-if="item.server_edit_status === false">
                  <el-button type="text" size="small" :data-id="item.server_id" :data-packageid="scope.row.id" @click="editServeGameArea($event, scope.$index)" class="editServer">保存</el-button>
                </span>
                <span v-else>
                  <el-button type="text" size="small" :data-id="item.server_id" :data-packageid="scope.row.id" @click="editServeGameArea($event)" class="editServer">编辑</el-button>
                </span><el-button type="text" size="small" class="linehalving">|</el-button><el-button type="text" size="small" :data-id="item.server_id" :data-packageid="scope.row.id" :data-length="scope.row.member_server_list.length" @click="deleteServeGameArea($event)" class="editServer">删除</el-button><el-button type="text" size="small" class="linehalving">|</el-button><el-button type="text" size="small" :data-id="item.server_id" :data-packageid="scope.row.id" @click="appendServeGameArea(scope.$index, $event)" class="editServer">增加</el-button>
              </li>
            </ul>
          </div>
          <div v-else>
            <ul>
              <li>
                <span class="server_name none_name">暂未配置</span>
                <el-button type="text" size="small" :data-packageid="scope.row.id" @click="addServeGameAreaInfo($event, scope.$index)">添加</el-button>
              </li>
            </ul>
          </div>
          </template>
        </el-table-column>
        <el-table-column label="源IP" align="left">
          <template scope="scope">
            <div v-if="scope.row.member_server_list">
              <ul :key="index" v-for="(item,index) in scope.row.member_server_list" :value = "index">
                <li v-if="item.member_source_list" :data-serverid="item.server_id">
                  <div>
                    <div class="sourceHeight col-16">
                      <ul class="origin-domain">
                        <li v-if="scope.row.security_ip" @click="showMore($event, 'col-16 sourceHeight')">
                          <i class="el-icon-caret-bottom el-icon--right position-adjust"></i>
                        </li>
                        <li :key="index" v-for="(item,index) in item.member_source_list" v-show = "index <= 1" :value = "index">
                          <span>{{item.source_ip}}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="sourceHeight col-8" :data-serverid="item.server_id" :data-packageid="scope.row.id">
                      <el-button type="text" size="small" :data-serverid="item.server_id" :data-packageid="scope.row.id" @click="handleGameSource($event)">编辑</el-button>
                    </div>
                  </div>
                </li>
                <li v-else :data-serverid="item.server_id">
                   <div>
                    <div class="sourceHeight col-16">
                      <div>暂未数据</div>
                    </div>
                    <div class="sourceHeight col-8">
                      <el-button type="text" size="small" @click="addHandleGameSource($event, index, item.server_id, scope.row.id)">增加</el-button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else>
              <ul>
                <li>
                  <el-row>
                    <el-col :span="24">
                      <span>暂未配置</span>
                    </el-col>
                  </el-row>
                </li>
              </ul>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </ComboTable>
  <game-combo-set></game-combo-set>
  <edit-port></edit-port>
  <show-total></show-total>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import Rul from 'common/utils/verify'
import gameComboSet from './Dialogs/GameComboSet'
import EditPort from './Dialogs/EditPort'
import ShowTotal from './Dialogs/ShowTotalIP'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import { mapActions } from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    gameComboSet,
    ComboTable,
    EditPort,
    ShowTotal,
    Tip,
    Rul
  },
  directives: {
    tip: TipDirective
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    showMore(e, box) {
      const current = e.target || e.srcElement
      const parent = current.parentNode.parentNode
      const oldParent = parent.parentNode
      if (!this.showDomain) {
        oldParent.className = 'box-active ' + box
        for (const item of parent.childNodes) {
          if (item.nodeType !== 3) {
            item.style.display = 'block'
          }
        }
        this.showDomain = true
        parent.childNodes[parent.childNodes.length - 1].style.display = 'block'
      } else {
        oldParent.className = box
        if (parent.childNodes.length > 3) {
          parent.childNodes[parent.childNodes.length - 1].style.display = 'none'
          for (const item of parent.childNodes) {
            if (item.nodeType !== 3 && item.value && item.value > 1) {
              item.style.display = 'none'
            }
          }
        }
        this.showDomain = false
      }
    },
    async editServeGameArea(ev, index) {
      const targetArea = ev.target || ev.srcElement
      const editAreaParent = targetArea.parentNode.parentNode.parentNode
      if (!targetArea.firstElementChild) {
        if (targetArea.childNodes[0].nodeValue === '编辑') {
          editAreaParent.getElementsByTagName('input')[0].disabled = false
          editAreaParent.getElementsByTagName('input')[0].style.border = '1px solid #ccc'
          targetArea.childNodes[0].nodeValue = '保存'
        } else if (targetArea.childNodes[0].nodeValue === '保存') {
          const inputVal = editAreaParent.getElementsByTagName('input')[0].value
          const reg = Rul.regChFig
          if (!reg.test(inputVal)) {
            this.showMessageInfo('游戏大区格式有误,仅支持中文、字母以及数字', 'error')
            return false
          } else if (inputVal.length < 2 || inputVal.length > 20) {
            this.showMessageInfo('游戏大区格式有误,仅限2~20位字符', 'error')
            return false
          } else {
            const data = {
              server_name: inputVal,
              server_id: targetArea.parentNode.getAttribute('data-id'),
              package_id: targetArea.parentNode.getAttribute('data-packageid')
            }
            const pageSize = this.$store.state.gameOperation.pageSize
            const params = {
              data,
              page: {
                page: 1,
                per_page: pageSize
              }
            }
            await this.editAreaSave(params)
            editAreaParent.getElementsByTagName('input')[0].disabled = true
            editAreaParent.getElementsByTagName('input')[0].style.border = 'none'
            targetArea.childNodes[0].nodeValue = '编辑'
          }
        }
      } else {
        const elVal = targetArea.childNodes[2]
        const targetAreaDbp = targetArea.parentNode.parentNode
        if (elVal.innerText === '编辑') {
          targetAreaDbp.getElementsByTagName('input')[0].disabled = false
          targetAreaDbp.getElementsByTagName('input')[0].style.border = '1px solid #ccc'
          elVal.innerText = '保存'
        } else if (elVal.innerText === '保存') {
          const inputVal = targetAreaDbp.getElementsByTagName('input')[0].value
          if (targetArea.getAttribute('data-id') === null) {
            targetArea.getAttribute('data-id') === ''
          }
          const data = {
            server_name: inputVal,
            server_id: targetArea.getAttribute('data-id'),
            package_id: targetArea.getAttribute('data-packageid')
          }
          const reg = Rul.regChFig
          if (!reg.test(inputVal)) {
            this.showMessageInfo('游戏大区格式有误,仅支持中文、字母以及数字', 'error')
            return false
          } else if (inputVal.length < 2 || inputVal.length > 20) {
            this.showMessageInfo('游戏大区格式有误,仅限2~20位字符', 'error')
            return false
          } else {
            const pageSize = this.$store.state.gameOperation.pageSize
            const params = {
              data,
              page: {
                page: 1,
                per_page: pageSize
              }
            }
            await this.editAreaSave(params)
            targetAreaDbp.getElementsByTagName('input')[0].disabled = true
            targetAreaDbp.getElementsByTagName('input')[0].style.border = 'none'
            elVal.innerText = '编辑'
          }
        }
      }
    },
    deleteServeGameArea(ev, index, memberServerList) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const targetArea = ev.target || ev.srcElement
        let serverId
        let packageId
        const targetAreaP = targetArea.parentNode
        if (navigator.userAgent.indexOf('Chrome') >= 0) {
          serverId = targetAreaP.getAttribute('data-id')
          packageId = targetAreaP.getAttribute('data-packageid')
        } else {
          serverId = targetArea.getAttribute('data-id')
          packageId = targetArea.getAttribute('data-packageid')
        }
        const nodeVal = targetAreaP.parentNode.childNodes[0].getElementsByTagName('input')[0].value
        if (nodeVal === '' || serverId === '') {
          this.getGameOperationList(1, this.pageSize)
        } else {
          const data = {
            server_id: serverId,
            package_id: packageId
          }
          const pageSize = this.$store.state.gameOperation.pageSize
          const params = {
            data,
            page: {
              page: 1,
              per_page: pageSize
            }
          }
          this.deleteArea(params)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })        
      })
    },
    addServeGameAreaInfo(e, index) {
      const addArea = e.target || e.srcElement
      this.addServeGameArea(index)
      const parmas = {
        package_id: addArea.parentNode.getAttribute('data-packageid'),
        server_name: addArea.parentNode.parentNode.getElementsByTagName('input')[0].value
      }
      this.editAreaSave(parmas)
    },
    appendServeGameArea(index, e) {
      const appendArea = e.target || e.srcElement
      const nodeServer = appendArea.parentNode.parentNode.childNodes[0].getElementsByTagName('input')[0]
      const nodeVal = nodeServer.value
      const dis = nodeServer.getAttribute('disabled')
      if (nodeVal === '') {
        this.showMessageInfo('请填写好当前游戏所属区域后再操作', 'error')
        return false
      }
      if (dis === 'disabled' || dis === '') {
        this.addServeGameArea(index)
      } else {
        this.showMessageInfo('请保存好当前信息后再增加', 'error')
        return false
      }
    },
    ...mapActions([
      'triggerGameComboSetVisible',
      'changeGameComboId',
      'triggerEditPortVisible',
      'triggerShowTotalIPVisible',
      'getGameByPage',
      'editAreaSave',
      'deleteArea',
      'getPackageInfo',
      'getTotalIP',
      'getTotalSourceIPAndPort',
      'addServeGameArea',
      'getTotalIPList'
    ]),
    showMessageInfo(correctMessage, typeInfo) {
      this.$message({
        showClose: true,
        message: correctMessage,
        type: typeInfo
      })
    },
    // 网站控制操作
    handleGamelist(operate, row, index) {
      const id = row.id
      this.$store.dispatch('changeGameComboId', id)
      const parmas = {
        package_id: id
      }
      switch (operate) {
        case 'ComboSet':
          this.getPackageInfo(parmas)
          this.triggerGameComboSetVisible(true)
          break
        case 'ShowTotalIP':
          this.getTotalIPList(1, 10)
          this.triggerShowTotalIPVisible(true)
          break
        default:
      }
    },
    getTotalIPList(current, size) {
      this.getTotalIP({
        page: current,
        per_page: size,
        package_id: this.comboId
      })
    },
    handleGameSource(eve) {
      const targetSource = eve.target || eve.srcElement
      const serverId = targetSource.parentNode.getAttribute('data-serverid')
      const gameComboId = targetSource.parentNode.getAttribute('data-packageid')
      this.changeGameComboId(gameComboId)
      const pageSize = this.$store.state.gameOperation.pageSize
      const data = {
        package_id: gameComboId,
        server_id: serverId
      }
      this.getTotalSourceIPAndPort(data)
      this.triggerEditPortVisible(true)
    },
    addHandleGameSource(eve, index, serverid, packageid) {
      this.changeGameComboId(packageid)
      this.getTotalSourceIPAndPort({
        package_id: packageid,
        server_id: serverid
      })
      this.triggerEditPortVisible(true)
    },
    getGameOperationList(current, size) {
      this.getGameByPage({
        page: current,
        per_page: size
      })
    }
  },
  computed: {
    gameOperationList() {
      return this.$store.state.gameOperation.list
    },
    gameOperationTotal() {
      return this.$store.state.gameOperation.total
    },
    comboId() {
      return this.$store.state.id.package.gameComboId
    },
    getServerId() {
      return this.$store.state.gameOperation.serverId
    }
  },
  created() {
    this.getGameOperationList(1, this.pageSize)
  },
  data() {
    return {
      pageSizes: [5, 10, 15, 20],
      pageSize: 5,
      popoverArray: []
    }
  }
}
</script>

<style scoped>
  .col-16, .col-8 {
    float: left;
    box-sizing: border-box;
  }
  .col-16 {
    width: 60%;
  }
  .col-8 {
    width: 40%
  }
  .sourceHeight{
    /*height: 70px;*/
    position: relative;
  }
  .position-adjust-test {
    width: 10px;
    height: 10px;
    right: 7%;
    top: 15px;
    z-index: 999;
    cursor: pointer
  }
  @media screen and (min-width: 1600px) {
    .col-16 {
      width: 190px;
    }
    .col-8 {
      width: auto;
    }
  }
  @media screen and (max-width: 1450px) {
    .col-16 {
      width: 180px;
    }
    .col-8 {
      width: auto;
    }
    .server_name {
      width: 110px!important;
      margin-top: -5px;
    }
  }
</style>
<style>
  .el-message-box .el-message-box .el-message-box__btns .el-button {
    margin-left: 5px;
  }
  .el-table__body-wrapper, .small_el_dialog .el-table__body-wrapper {
    overflow: hidden!important;
    position: relative!important;
  }
  .el-input__inner {
    padding-left: 0!important
  }
  .el-input .el-input__inner:disabled {
    border-color: #d1dbe5!important;
    color: #333!important;
    cursor: not-allowed!important;
  }
  .server_name input:disabled{
    border: none;
  }
  ul li {
    list-style: none;
  }
  .position-adjust {
    position: absolute;
    width: 10px;
    height: 10px;
    right: 7% ;
    top: 15px;
    z-index: 999;
    cursor: pointer;
  }
  .cursorPointer{
    cursor: pointer;
  }
  .box-active {
      width: 160px;
      background: #fff;
      box-shadow: 0 0 25px #eaeaea;
      padding: 10px 20px;
      margin-top: -7%;
      display: block;
      position: static;
      z-index: 9999999;
      margin: 20px 0;
  }

  .box-active .origin-domain li+li {
    /*margin-top: 9px;*/
  }

  .box-active .origin-domain li .type {
    top: 0;
    left: 32px;
  }

  .box-active .origin-domain li .position-adjust {
    /*right: 18px;*/
    top: 10px;
  }
  .origin-domain {
    position: relative;
  }

  .origin-domain li {
    position: relative;
  }

  .origin-domain li .type {
    font-size: 10px;
    position: absolute;
    top: -1px;
    left: 40px;
  }
  .showTotalIP {
    display: none;
  }
  .seeMore {
    color: #2d90e6;
    cursor: pointer;
  }
  .server_name {
    width: 150px!important;
    margin-top: -5px;
  }
  .none_name {
    display: inline-block;
  }
  .el-table_1_column_4>.cell>div>ul {
    height: 74px;
  }
  .el-table_1_column_5>.cell>div>ul{
    width: 100%;
    top: 0px;
    min-height: 70px;
    display: -webkit-inline-box;
    position: inherit;
  }
  .el-table_1_column_5>.cell>div>ul>li{
    width: 100%;
  }
  .el-table_1_column_5>.cell>div>ul>li>div{
    padding-top: 10px;
  }
  .el-dialog__header {
    border-bottom: 1px solid #ccc;
    padding: 20px 20px 10px 20px!important;
  }
  .el-button+.el-button {
     margin-left: 0px!important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-clip: padding-box;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td .el-input.is-disabled .el-input__inner{
    background-color: #eef1f6!important;
  }
  .serverUl>li>button, .serverUl>li>span>button, .serverUl>li {
    line-height: 24px;
    vertical-align: top;
    padding: 0 3px;
  }
  .serverUl button span {
    display: block;
    padding-top: 2px;
  }
  .el-table--enable-row-transition .el-table__body td {
     transition: background-color 0s ease!important;
  }
  .linehalving {
    cursor: auto;
  }
  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #dfe6ec!important;
  }
  .el-pagination__editor {
    border: 1px solid #d1dbe5;
    border-radius: 2px;
    line-height: 18px;
    padding: 4px 2px;
    width: 50px!important;
    text-align: center;
    margin: 0 6px;
    box-sizing: border-box;
    transition: border .3s;
  }
  .small_el_dialog .el-dialog--small {
    width: 33%!important;
  }
  .serverUl .el-button--small {
    padding: 0px 3px!important;
    font-size: 12px;
    border-radius: 4px;
    cursor: default!important;
  }
  .serverUl .el-button--small:hover {
    color: #333!important;
  }
  .serverUl  .editServer{
    cursor: pointer!important;
  }
  .serverUl  .editServer:hover {
    color: #20a0ff!important;
  }
</style>
