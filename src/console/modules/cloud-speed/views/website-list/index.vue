<template lang="html">
<console-page-layout title="网站列表">
  <template>
    <div class="buy-flow-tip">
      <el-row :gutter="20">
        <!-- <el-col :span="24">当前账号本月增送流量50G，账号剩余加速流量60G</el-col> -->
        <el-col :span="24">加速流量限时限量免费中(50G/月)</el-col>
      </el-row>
      <el-row :gutter="20">
      <el-col :span="12">
        <p>1.仅当域名被托管到YUNDUN云解析后可选择NS接入模式</p>
        <p>2.当网站回源后，购买的“红网卫士”和“太极抗D”服务将一并关闭</p>
      </el-col>
      <el-col :span="12">
        <!-- <el-button class="fr buy-flow" type="default">购买加速流量包</el-button> -->
      </el-col>
      </el-row>
      <!-- <br>
      <el-row :gutter="20">
        <el-col :span="24">
          <h4>提供两种接入模式进行加速：</h4>
          <p>
    CNAME模式加速步骤：在本页面添加域名》认证并等待审核通过》选择CNAME接入模式》复制CNAME》在该域名解析管理处添加CNAME记录（接入域名）》开启加速<br>
    NS模式加速步骤：接入域名》在云解析添加域名》修改 DNS地址并添加该主机A记录》选择NS接入模式》在本页面添加域名并等待审核通过》开启加速
    （“云解析”字样可点击跳转到云解析域名列表）
         </p>
        </el-col>
      </el-row> -->
    </div>
  </template>
  <div class="card-content">
    <div class="header">
      <el-button type="primary" icon="fa-cart-plus" class="margin-15r del-website" @click="judgeAddWebsite">添加网站</el-button>
      <el-button type="default" icon="fa-cart-plus" class="margin-15r" @click="delAffirm">删除</el-button>
      <div class="fr">
        <el-input class="search" placeholder="请输入域名名称进行模糊查询" v-model="searchParam.domain" size="small" @keyup.enter.native="handleSearch" :on-icon-click="handleSearch" icon="search">
        </el-input>
      </div>
    </div>
    <!-- table -->
    <div>
      <el-table :data="getWebsiteList" v-loading="tableLoading" element-loading-text="拼命加载中" fit stripe highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="24"></el-table-column>
        <el-table-column class-name="row-padding" :show-overflow-tooltip="true" prop="" label="网站" min-width="80">
          <template scope="scope">
          <el-tooltip class="item" effect="dark" placement="top">
             <div slot="content">{{scope.row.domain}}配置管理</div>
             <div class="cursor-pointer table-website" @click="handleModifyConfig(scope.row)">
               {{scope.row.domain}}
             </div>
          </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label-class-name="label-origin-padding" prop="" label="源站地址" min-width="110" width="150" align="left">
          <template scope="scope">
              <ShowBox :webList="scope.row.records"/>
            </template>
        </el-table-column>
        <el-table-column prop="" label-class-name="row-padding" label="审核状态" width="100" align="left">
          <template scope="scope">
            <span v-if="Object.is(scope.row.check_status, '0')">
              <i class="again-dot"></i>
              待认证
              <el-button type="text" size="small" @click="handleWebsiteOperate('clickCertify', scope.row)"><i class="el-icon-click-approve"></i></el-button>
            </span>
            <span v-if="Object.is(scope.row.check_status, '1')">
              <i class="process-dot"></i>
              审核中
            </span>
            <span v-if="Object.is(scope.row.check_status, '2') || Object.is(scope.row.check_status, '4')">
              <i class="succceed-dot"></i>
              审核通过
            </span>
            <span v-if="Object.is(scope.row.check_status, '3') || Object.is(scope.row.check_status, '5')">
              <i class="fail-dot"></i>
              审核不通过
              <el-popover ref="failTip" placement="top" trigger="hover">
                <div class="fail-tip">
                  该网站不符合云加速产品接入标准，请咨询<a @click="openQQ">技术支持</a>接入<a href="/taichiddosWeb" target="_blank">太极抗D</a>类产品。
                </div>
              </el-popover>
              <i class="yun-icon yun-unappoint cursor-pointer" v-popover:failTip></i>
              <!-- <el-button type="text" class="divided-before" size="small" @click="handleWebsiteOperate('reCheck', scope.row)"><i class="el-icon-click-approve"></i></el-button> -->
            </span>
            <span v-if="Object.is(scope.row.check_status, '6')">
              <i class="fail-dot"></i>
              禁用
            </span>
            <span v-if="Object.is(scope.row.check_status, '7')">
              <i class="process-dot"></i>
              回源
            </span>
          </template>
          <i class="el-icon-circle-cross"></i>
        </el-table-column>
        <el-table-column prop="" label="已开通服务" min-width="70" align="center">
          <template scope="scope">
            <a href="/console/taichi-ddos#/websiteProtectList">
              <i v-if="scope.row.tjkd_status === '0'" class="taichi-ddos-web"></i>
              <i v-else class="taichi-ddos-web-active"></i>
            </a>
            <a href="/console/red-guard#/websiteList">
              <i v-if="scope.row.hwws_status === '0'" class="red-guard"></i>
              <i v-else class="red-guard-active"></i>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="" label="接入状态" min-width="45" align="center">
          <template scope="scope">
            <div v-if="scope.row.protected_mode === '1'">
              <i v-if="scope.row.use_yundun_cname === '1'" class="el-icon-circle-check"></i>
              <i v-else class="el-icon-circle-cross"></i>
            </div>
            <div v-if="scope.row.protected_mode === '2'">
              <i v-if="scope.row.use_yundun_dns === '1'" class="el-icon-circle-check"></i>
              <i v-else class="el-icon-circle-cross"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="加速状态" min-width="55" align="center">
          <template scope="scope">
            <div v-if="scope.row.protected_mode === '1'">
              <div v-if="scope.row.protected_status === '1' && scope.row.use_yundun_cname === '1'">
                <span v-if="scope.row.tjkd_plus_protected_status === '1' || scope.row.tjkd_protected_status === '1'">清洗加速中</span>
                <span v-else>CDN加速中</span>
              </div>
              <div v-else>未加速</div>
            </div>
            <div v-if="scope.row.protected_mode === '2'">
              <div v-if="scope.row.protected_status === '1' && scope.row.use_yundun_dns === '1'">
                <span v-if="scope.row.tjkd_plus_protected_status === '1' || scope.row.tjkd_protected_status === '1'">清洗加速中</span>
                <span v-else>CDN加速中</span>
              </div>
              <div v-else>未加速</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="接入模式" min-width="155" align="center">
          <template scope="scope">
            <el-radio-group v-model="scope.row.protected_mode" @change="handleSelectMode(scope.row)">
              <el-popover ref="cname" placement="top-end" trigger="hover">
                <div class="status-tips-head"><p>CNAME接入</p></div>
                <div v-if="scope.row.status !== '1'" class="speed-status-tips">
                  <p>需先待网站认证且审核通过</p>
                </div>
                <div v-else v-loading="scope.row.joinLoading">
                  <span v-if="scope.row.use_yundun_cname === '1'"><i class="yun-icon yun-access"></i></span>
                  <span v-else><i class="yun-icon yun-unaccess"></i></span>
                  <span v-if="scope.row.use_yundun_cname !== '1'" class="click-join" @click="clickJoin(scope)">我已接入</span>
                  <p v-if="scope.row.use_yundun_cname !== '1'">请前往该域名解析管理处添加指定CNAME记录</p>
                </div>
              </el-popover>
              <el-radio :disabled="scope.row.status !== '1'" :label="'1'" v-popover:cname>CNAME</el-radio>
              <el-popover ref="copyName" placement="top" trigger="hover" popper-class="popover-primary">
                <div class="speed-status-tips">
                  <a v-if="scope.row.status === '1'" class="cursor-pointer" @click="copyAliasName(scope.row.cname)">复制别名{{scope.row.cname}}</a>
                  <el-button type="text" class="disable-copy" v-else :disabled="true">需待审核通过</el-button>
                </div>
              </el-popover>
              <i class="el-icon el-icon-copy default-font copy-name-icon cursor-pointer" v-popover:copyName @click="copyAliasName(scope.row.cname)"></i>
              <i class="divided default-font"></i>
              <el-popover ref="ip" placement="top-end" trigger="hover">
                <div class="speed-status-tips">
                  <p class="status-tips-head">NS接入</p>
                  <p v-if="scope.row.use_yundun_dns === '1'"><i class="yun-icon yun-access"></i></p>
                  <p v-if="scope.row.use_yundun_dns !== '1'"><i class="yun-icon yun-unaccess"></i></p>
                  <div v-if="scope.row.status !== '1' && scope.row.use_yundun !== 1">
                    <p>需先待网站审核通过，并使用<a class="go-cloud-resolve" href="cloud-resolving#/domainList">云解析</a>且已添加A记录</p>
                  </div>
                  <div v-if="scope.row.status === '1' && scope.row.use_yundun !== 1">
                    <p>需先使用<a class="go-cloud-resolve" href="cloud-resolving#/domainList">云解析</a>且已添加A记录</p>
                  </div>
                  <div v-if="scope.row.status !== '1' && scope.row.use_yundun === 1">
                    <p>需先待网站审核通过</p>
                  </div>
                </div>
              </el-popover>
              <el-radio :disabled="scope.row.use_yundun_dns !== '1' || scope.row.status !== '1'" :label="'2'" v-popover:ip>NS</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="" label="加速/回源" min-width="60" align="center">
          <template scope="scope">
            <div v-if="scope.row.protected_mode === '1'">
              <el-switch on-color="#2d90e6" off-color="#ff4949" :disabled="!(scope.row.status === '1')" v-model="scope.row.protected_status" on-value="1" off-value="0" on-text="加速" off-text="回源" @change="handleSelectStatus(scope.row)"></el-switch>
            </div>
            <div v-if="scope.row.protected_mode === '2'">
              <el-switch on-color="#2d90e6" off-color="#ff4949" :disabled="((scope.row.status !== '1') || (scope.row.use_yundun_dns !== '1')) && scope.row.protected_status === '0'" v-model="scope.row.protected_status" on-value="1" off-value="0" on-text="加速" off-text="回源" @change="handleSelectStatus(scope.row)">
              </el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="50" align="right" class-name="row-padding-right" lable-class-name="row-padding-right">
          <template scope="scope">
            <div class="operation">
              <el-button :disabled="(scope.row.status !== '1')" type="text" size="small" @click="handleWebsiteOperate('console', scope.row)">管理</el-button>
              <!-- <el-button type="text" class="divided" size="small" @click="handleWebsiteOperate('aliasBind', scope.row)">别名绑定</el-button> -->
              <!-- <el-dropdown trigger="click" class="more-dropdown" size="small">
                <span class="el-dropdown-link">更多<i class="el-icon-caret-bottom el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown" :data-row="scope.row">
                  <el-dropdown-item>
                    <el-button class="" type="text" size="small" @click="handleWebsiteOperate('note', scope.row)">信息备注</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-popover ref="popover" placement="top" width="160" v-model="popoverArray[scope.$index].flag" trigger="click">
                      <p style="word-break: break-all;">您确定删除域名 {{scope.row.domain}} 吗？</p>
                      <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click.native.prevent="handleWebsiteOperate('deleteCancel', scope.row, scope.$index)">取消</el-button>
                      <el-button size="mini" type="primary" @click.native.prevent="handleWebsiteOperate('deleteConfirm', scope.row, scope.$index)">确定</el-button>
                    </div>
                    </el-popover>
                    <el-button class="" type="text" size="small" v-popover:popover>删除</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 翻页 -->
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handlePaginationSizeChange" @current-change="handlePaginationCurrentPageChange" :page-sizes="paginationParam.pageSizes" :page-size="paginationParam.pageSize" :total="websiteTotal"
          :current-page="paginationParam.currentPage">
      </el-pagination>
    </div>
  </div>
  <!-- 添加网站弹框 -->
  <add-website></add-website>
  <!-- 记录配置 -->
  <config-info></config-info>
  <!-- 别名绑定 -->
  <alias-bind></alias-bind>
  <!-- 点击认证 -->
  <click-certify :domainId="certifyId"></click-certify>
  <!-- 备注信息 -->
  <website-note></website-note>

  <el-dialog title="提示" :visible.sync="certifyDialog" size="samll" :close-on-click-modal="true">
    <span>添加域名前，请先前往<a href="/console/user-center#/authentication" class="a-link">用户中心</a>完成身份认证</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="certifyDialog = false">取 消</el-button>
    </span>
  </el-dialog>

</console-page-layout>
</template>


<script>
import Help from 'common/utils/help'
import ShowBox from 'common/components/ShowBox/show-box'
import './assets/styles/website-help.css'
import SourceSpeedResource from '../../resource/SourceSpeedResource'
import SourceSpeedCommonResource from '../../resource/SourceSpeedCommonResource'
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import AddWebsite from './dialogs/add-website'
import ConfigInfo from './dialogs/config-info'
import AliasBind from './dialogs/alias-bind'
import ClickCertify from './dialogs/click-certify'
import WebsiteNote from './dialogs/website-note'
import * as types from '../../constants/mutation-types'
import {
  mapActions
} from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    AddWebsite,
    ConfigInfo,
    AliasBind,
    ClickCertify,
    WebsiteNote,
    ShowBox
  },
  data() {
    return {
      switchFlag: false,
      certifyId: '',
      certifyDialog: false,
      getWebsiteList: [],
      websiteTotal: 0,
      popoverArray: [],
      websiteList: [],
      searchParam: {
        domain: ''
      },
      //显示域名
      showDomain: false,
      // 分页
      paginationParam: {
        pageSizes: [10, 30, 50],
        pageSize: 10,
        currentPage: 1
      },
      // loading
      tableLoading: false,
      formLoading: false,
      aliasTableLoading: false,
      multipleSelection: []
    }
  },
  created() {
    this.fetchWebsiteList()
  },
  computed: {
    websiteAdded() {
      return this.$store.state.website.websiteAdded
    }
  },
  watch: {
    websiteAdded() {
      if (this.$store.state.website.websiteAdded) {
        this.fetchWebsiteList()
        this.$store.commit(types.WEBSITE_ADDED, {
          websiteAdded: false
        })
      }
    }
  },
  methods: {
    openQQ() {
      Help.linkService()
    },
    clickJoin(scope) {
      scope.row.joinLoading = true
      const params = {
        domain_id: scope.row.id
      }
      SourceSpeedCommonResource.getJoinStatus(params)
        .then(res => {
          const flag = res.data.data.use_yundun
          if (flag === '1') {
            this.getWebsiteList[scope.$index].use_yundun_cname = '1'
            this.$message({
              showClose: true,
              message: '操作成功!',
              type: 'success'
            })
          }
          scope.row.joinLoading = false
        })
        .catch(res => {
          scope.row.joinLoading = false
        })
    },
    ...mapActions([
      'triggerAddWebsiteVisible',
      'triggerConfigInfoVisible',
      'triggerClickCertifyVisible'
      // 'triggerAliasBindVisible',
      // 'triggerWebsiteNoteVisible'
    ]),
    judgeAddWebsite() {
      SourceSpeedCommonResource.getCertificationInfo()
        .then(res => {
          const state = res.data.data.check_status
          if (
            state === '1' ||
            state === '6' ||
            state === '4' ||
            state === '5'
          ) {
            this.triggerAddWebsiteVisible(true)
          } else {
            this.$message({
              showClose: true,
              message: '添加网站前，需先待用户认证审核通过',
              type: 'warning'
            })
          }
        })
        .catch(res => {
          if (res.code === 16161) {
            this.certifyDialog = true
          }
        })
    },
    // 网站列表获取
    fetchWebsiteList(resetPage = false) {
      this.switchFlag = true
      this.tableLoading = true
      this.paginationParam.currentPage = resetPage ?
        1 :
        this.paginationParam.currentPage
      const params = {
        page: this.paginationParam.currentPage,
        per_page: this.paginationParam.pageSize,
        domain: this.searchParam.domain
      }
      SourceSpeedResource.getWebsiteByParams(params)
        .then(response => {
          console.log('list====', response)
          const {
            list,
            total
          } = response.data.data
          this.getWebsiteList = this.tabJoinPopover(list)
          this.websiteTotal = Number(total)
          this.tableLoading = false
          const vm = this
          this.$nextTick(() => {
            vm.switchFlag = false
            this.detectionJoin()
          })
        })
        .catch(res => {
          // this.switchFlag = false
        })
    },
    tabJoinPopover(list) {
      list.forEach(v => {
        v.joinLoading = false
      })
      return list
    },
    detectionJoin() {
      this.getWebsiteList.forEach(item => {
        item.joinLoading = true
        const params = {
          domain_id: item.id
        }
        SourceSpeedCommonResource.getJoinStatus(params)
          .then(res => {
            const flag = res.data.data.use_yundun
            if (flag === '1') {
              item.use_yundun_cname = '1'
            }
            item.joinLoading = false
          })
          .catch(res => {
            item.joinLoading = false
          })
      })
    },
    // 查询和过滤显示
    handleSearch() {
      this.switchFlag = true
      this.fetchWebsiteList()
    },
    // cname&&cloudresolve
    handleSelectMode(row) {
      if (this.switchFlag) {
        return
      }
      const param = {
        domain_id: row.id,
        protected_mode: row.protected_mode,
        protected_status: row.protected_status
      }
      SourceSpeedResource.openCloseProtect(param)
        .then(response => {})
        .catch(response => {
          this.fetchWebsiteList()
        })
    },
    handleSelectStatus(row) {
      if (this.switchFlag) {
        return
      }
      const param = {
        domain_id: row.id,
        protected_mode: row.protected_mode,
        protected_status: row.protected_status
      }
      SourceSpeedResource.openCloseProtect(param)
        .then(response => {
          this.operationSucceed()
        })
        .catch(response => {
          this.fetchWebsiteList()
        })
    },
    handleModifyConfig(row) {
      this.$store.commit({
        type: 'WEBSITE',
        website: row
      })
      this.triggerConfigInfoVisible(true)
    },
    // 网站控制操作
    handleWebsiteOperate(operate, row, index) {
      const id = row.id
      let param
      this.$store.dispatch('changeWebsite', row)
      switch (operate) {
        case 'reCheck': //
          param = {
            domain: row.domain
          }
          SourceSpeedResource.postReCheck(param).then(res => {
            this.operationSucceed()
            this.fetchWebsiteList()
          })
          break
        case 'clickCertify': //
          this.certifyId = id
          this.triggerClickCertifyVisible(true)
          break
        case 'console': //
          this.$router.push(`/websiteList/console/${id}/perform`)
          break
        case 'deleteCancel':
          this.popoverArray[index].flag = false
          break
        case 'deleteConfirm':
          this.popoverArray[index].flag = false
          this.delWebsite(id)
          break
          // case 'aliasBind':
          //   this.triggerAliasBindVisible(true)
          //   break
          // case 'note':
          //   this.triggerWebsiteNoteVisible(true)
          //   break
        default:
      }
    },
    copyAliasName(text) {
      if (text === '') {
        return
      }
      Help.copyText(text)
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success'
      })
    },
    // 列表分页
    handlePaginationSizeChange(size) {
      this.switchFlag = true
      this.paginationParam.pageSize = size
      this.fetchWebsiteList()
    },
    handlePaginationCurrentPageChange(currentPage) {
      this.switchFlag = true
      this.paginationParam.currentPage = currentPage
      this.fetchWebsiteList()
    },
    // 删除
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delAffirm() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择删除项!'
        })
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delWebsite(this.multipleSelection)
      })
    },
    delWebsite(selection) {
      const delArray = []
      selection.forEach(item => {
        delArray.push(item.id)
      })
      const params = {
        domain_id: delArray
      }
      this.fetchDel('Web.Domain.remove', params).then(res => {
        if (res.ok) {
          res.json().then(data => {
            if (data && data.status.code === 1) {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
              this.fetchWebsiteList()
            } else {
              this.$message({
                showClose: true,
                message: data.status.message,
                type: 'error'
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.fail-tip {
  a {
    cursor: pointer;
    color: var(--primary-blue);
  }
}

.del-website {
  margin-right: 8px;
}

.card-content {
  margin-top: 12px;
  background: var(--wrap-background);
  padding: 12px;
}

.yun-icon {
  width: 14px;
  height: 14px;
}

.yun-access,
.yun-unaccess {
  width: 50px;
  height: 20px;
}

.table-website {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

ul li {
  list-style: none;
}

.header {
  margin-bottom: 12px;
}

.default-font {
  font-size: 12px;
}

.el-button+.el-button {
  margin-left: 0;
}

.search {
  width: 300px;
}

.more-dropdown {
  font-size: 12px;
  color: #20a0ff;
}

.buy-flow-tip {
  font-size: 12px;
  border: 1px solid var(--tip-border);
  padding: 15px;
  /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  background-color: var(--tip-background);
}

.buy-flow {
  padding: 10px;
}

.el-icon-circle-check::before {
  color: #8aca36;
}

.el-icon-circle-cross::before {
  color: #969696;
}

.el-icon-hhws,
.el-icon-tjkd {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  line-height: 20px;
}

.speed-status-tips {
  padding: 5px;
}

.status-tips-head {
  font-size: 14px;
  margin-bottom: 5px;
}

.go-cloud-resolve {
  color: var(--primary-blue);
  text-decoration: underline;
}

.copy-name-icon {
  margin-left: 5px;
}

.disable-copy {
  padding: 0;
  font-size: 12px;
}

.click-join {
  color: var(--primary-blue);
  position: relative;
  top: -7px;
  cursor: pointer;
}
</style>

<style>
.row-padding-right {
  padding-right: 12px;
}

.row-padding {
  padding-left: 12px;
}

.label-origin-padding {
  padding-left: 25px;
}

.el-table {
  div {
    .cell,
    th>div {
      padding: 0px;
    }
  }
}

td {
  &:last-child {
    padding-right: 12px;
  }
  &:first-child {
    padding-left: 12px;
  }
}

th {
  &:last-child {
    padding-right: 12px;
  }
  &:first-child {
    padding-left: 12px;
  }
}
</style>
