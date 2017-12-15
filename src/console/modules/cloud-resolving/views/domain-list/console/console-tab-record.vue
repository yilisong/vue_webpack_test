<template>
  <console-page-layout :title="topTitleMessage">
    <Tip :content="contentTips" :className="tipType" v-loading="tiploading" class="tip-placeholder" element-loading-text="获取DNS信息中"></Tip>
    <div class="wrap-background">
      <div class="ctrl-btns">
        <el-button type="default"
          size="small"
          @click="handleButtonRecordAdd" :disabled="addBtnDisabled">添加</el-button>
        <el-button type="default"
          size="small"
          @click="handleButtonRecordPause">暂停</el-button>
        <el-button type="default"
          size="small"
          @click="handleButtonRecordOpen">启用</el-button>
        <el-button type="default"
          size="small"
          @click="handleButtonRecordDelete">删除</el-button>
      </div>
      <div class="tools-data">
        <el-table
          :data="recordList"
          v-loading="tableLoading"
          element-loading-text="拼命加载中"
          fit
          stripe
          style="width: 100%"
          @select="handleTableSelectionChange"
          @select-all="handleTableSelectionChange"
          class="table-cell-fix">
          <el-table-column type="selection"
            width="26"></el-table-column>
          <el-table-column align="left"
            prop="name"
            label="主机记录">
            <template scope="scope">
              <!-- 显示与编辑状态集合 -->
              <div v-if="scope.row.editForm.created_at !== 'aaa'">
                <!-- 显示状态 -->
                <div v-show="inputVisible !== scope.row.editForm.id">
                  <span>{{scope.row.editForm.name}}</span>
                </div>
                <!-- 编辑状态 -->
                <div v-show="inputVisible === scope.row.editForm.id">
                  <el-input v-model="scope.row.editForm.name"></el-input>
                </div>
              </div>
              <div v-else id="width-control">
                <!-- 添加状态 -->
                    <el-input class="add-input" @focus="tableEditTips = 'record'" size="small" v-model="scope.row.editForm.name" auto-complete="off"></el-input>
                  <p v-if="tableEditTips === 'record'" class="table-edit-tips">
                    <span class="header-tips">主机记录：</b><br />
                      YUNDUN 提示您：要将域名example.com解析为www.example.com,在主机记录（RR）处填写www即可。
                    </span><br />
                    主机记录就是域名前缀，常见用法有:<br />
                    <i class="title-tips">www</i>
                    :解析后的域名为 www.example.cn<br />
                    <i class="title-tips">@</i>
                    :直接解析主域名 example.cn<br />
                    <i class="title-tips">*</i>
                    :泛解析，匹配其他所有域名 *.example.cn<br />
                    <i class="title-tips">bbs</i>
                    :解析后的域名为 bbs.example.cn<br />
                    <i class="title-tips">blog</i>
                    :解析后的域名为 blog.example.cn</p>
                  <p v-else-if="tableEditTips === 'type'" class="table-edit-tips">
                    <span class="header-tips">记录类型：<br />
                      YUNDUN 提示您：要指向空间商提供的 IP 地址，选择「类型 A」，要指向一个域名，选择「类型 CNAME」<br />
                    </span>
                    <i class="title-tips">A 记录</i>
                    ：地址记录，用来指定域名的 IPv4 地址（如：8.8.8.8），如果需要将域名指向一个 IP 地址，就需要添加 A 记录<br />
                    <i class="title-tips">CNAME</i>
                    ： 如果需要将域名指向另一个域名，再由另一个域名提供 ip 地址，就需要添加 CNAME 记录<br />
                    <i class="title-tips">MX</i>
                    ：如果需要设置邮箱，让邮箱能收到邮件，就需要添加 MX 记录<br />
                    <i class="title-tips">TXT</i>
                    ：在这里可以填写任何东西，长度限制 255。绝大多数的 TXT 记录是用来做 SPF记录（反垃圾邮件）<br />
                    <i class="title-tips">NS</i>
                    ：域名服务器记录，如果需要把子域名交给其他 DNS 服务商解析，就需要添加 NS记录<br />
                    <i class="title-tips">AAAA</i>
                    ：用来指定主机名（或域名）对应的 IPv6 地址（例如：ff06:0:0:0:0:0:0:c3）记录<br />
                    <i class="title-tips">显性 URL</i>：从一个地址 301 重定向到另一个地址的时候，就需要添加显性 URL 记录。<br />
                    <i class="title-tips">隐性 URL</i>
                    ：类似于显性 URL，区别在于隐性 URL 不会改变地址栏中的域名
                  </p>
                  <p v-else-if="tableEditTips === 'type2'" class="table-edit-tips">
                    <!-- <span class="header-tips">线路类型：<br /></span>不论什么版本已有线路类型全部开放。<br /><br /><br /><br /><br /><br /><br /><br /><br /> -->
                  </p>
                  <p v-else-if="tableEditTips === 'value'" class="table-edit-tips">
                    <span class="header-tips">记录值：<br />
                    YUNDUN 提示您：最常见的是将空间商提供的「IP 地址」填写在这里哦～<br />
                  </span>各类型的记录值一般是这样的：<br />
                  <i class="title-tips">A 记录</i>
                  ：填写您服务器 IP，如果您不知道，请咨询您的空间商<br />
                  <i class="title-tips">CNAME</i>
                  ：填写空间商给您提供的域名，例如：yundun.com<br />
                  <i class="title-tips">MX 记录</i>
                  ：填写您邮件服务器的 IP 地址或企业邮局给您提供的域名，如果您不知道，请咨询您的邮件服务提供商<br />
                  <i class="title-tips">TXT 记录</i>
                  ：一般用于 Google、QQ 等企业邮箱的反垃圾邮件设置<br />
                  <i class="title-tips">NS 记录</i>
                  ：不常用。NS 向下授权，填写 dns 域名，例如：ns1.cloudcdns.com<br />
                  <i class="title-tips">AAAA</i>
                  ：不常用。解析到 IPv6 的地址<br />
                  <i class="title-tips">显性 URL</i>
                  ：填写要跳转到的网址，例如：http://www.baidu.com<br />
                  <i class="title-tips">隐性 URL</i>
                  ：填写要引用内容的网址,例如：http://www.baidu.com</p>
                  <p v-else-if="tableEditTips === 'priority'" class="table-edit-tips">
                    <span class="header-tips">优先级：</span><br />用来指定邮件服务器接收邮件的先后顺序 （1-50），一般默认设置为 5、10、15 等.<br /><br /><br /><br /><br /><br />
                  </p>
                  <p v-else-if="tableEditTips === 'ttl'" class="table-edit-tips">
                    <span class="header-tips">
                      TTL:<br />
                      YUNDUN 提示您：我们默认的 600 秒是最常用的，不用修改<br />
                    </span>
                    即 Time To Live，缓存的生存时间。指地方 dns 缓存您域名记录信息的时间，缓存失效后会再次到 YUNDUN 获取记录值。<br />
                    600（10 分钟）：建议正常情况下使用 600。<br />
                    &nbsp;60（1 分钟）&nbsp;&nbsp;&nbsp;：如果您经常修改 IP，修改记录一分钟即可生效。长期使用 60，解析速度会略受影响。<br />
                    3600（1 小时）：如果您 IP 极少变动（一年几次），建议选择 3600，解析速度快。如果要修改 IP，提前一天改为 60，即可快速生效。
                  </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center"
            prop="type"
            label="记录类型">
            <template scope="scope">
              <!-- 显示与编辑状态 -->
              <div v-if="scope.row.editForm.created_at !== 'aaa'">
                <!-- 显示状态 -->
                <div v-if="inputVisible !== scope.row.editForm.id">
                  <span>{{recordTypeChange[scope.row.editForm.type]}}</span>
                </div>
                <!-- 编辑状态 -->
                <div v-else>
                  <div>
                    <el-select size="small" class="select-test-list" v-model="scope.row.editForm.type" placeholder="请选择">
                      <el-option v-for="(item, index) in recordTypeOptions" :key="index" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div v-else>
                <div>
                  <el-select size="small" @visible-change="tableSelectVisibleChange" class="select-test add-input-fix" v-model="scope.row.editForm.type" placeholder="请选择">
                    <el-option v-for="(item, index) in recordTypeOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center"
            prop="view"
            label="线路类型">
            <template scope="scope">
              <!-- 列表状态 -->
              <div v-if="scope.row.editForm.created_at !== 'aaa'">
                <!-- 列表显示状态 -->
                <div v-if="inputVisible !== scope.row.editForm.id">
                  <div class="viewTypeClass">
                    <el-select size="small" filterable class="select-test-list" :disabled="(inputVisible !== scope.row.editForm.id)" v-model="scope.row.editForm.view2" placeholder="默认">
                      <el-option v-for="(item, index) in viewTypeOptions2" :key="index" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <!-- <span>{{scope.row.editForm.view2}}</span> -->
                </div>
                <!-- 列表编辑状态 -->
                <div v-else @click="jishuzongjian">
                  <el-cascader size="small" ref="cas" expand-trigger="hover" v-model="scope.row.editForm.view" change-on-select class="select-test-list cascader-warp" :options="viewTypeOptions" @change="hideCascader"></el-cascader>
                </div>
              </div>
              <!-- 添加状态 -->
              <div v-else @click="jishuzongjian">
                <el-cascader size="small" ref="cas2" change-on-select v-model="scope.row.editForm.view" expand-trigger="hover" change-on-select class="select-test add-input-fix" :options="viewTypeOptions" @change="hideCascaderAdd"></el-cascader>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center"
            prop="value"
            label="记录值">
            <template scope="scope">
              <div v-if="scope.row.editForm.created_at !== 'aaa'">
                <!-- 显示状态 -->
                <div v-show="inputVisible !== scope.row.editForm.id">
                  <span>{{scope.row.editForm.value}}</span>
                </div>
                <!-- 编辑状态 -->
                <div v-show="inputVisible === scope.row.editForm.id">
                  <el-input v-model="scope.row.editForm.value"></el-input>
                </div>
              </div>
              <div v-else  class="table-edit-fixclass">
                <el-input class="add-input" @focus="tableEditTips = 'value'" size="small" v-model="scope.row.editForm.value" auto-complete="off"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="mx" label="优先级">
            <template scope="scope">
              <div v-if="scope.row.editForm.created_at !== 'aaa'">
                <div v-if="scope.row.editForm.type === 'MX'">
                  <!-- 显示状态 -->
                  <div v-show="inputVisible !== scope.row.editForm.id">
                    <span>{{scope.row.editForm.mx}}</span>
                  </div>
                  <!-- 编辑状态 -->
                  <div v-show="inputVisible === scope.row.editForm.id">
                    <el-input v-model="scope.row.editForm.mx"></el-input>
                  </div>
                </div>
                <div v-else class="disabledTips2">
                    _ _ _
                </div>
              </div>
              <div v-else class="table-edit-fixclass">
                <!-- <el-form :model="scope.row.editForm" :rules="scope.row.formRule"> -->
                  <div v-if="scope.row.editForm.type === 'MX'">
                    <el-input class="add-input" @focus="tableEditTips = 'priority'" size="small" v-model.number="scope.row.editForm.mx" auto-complete="off"></el-input>
                  </div>
                  <div v-else class="disabledTips add-editing-class">_ _ _
                  </div>
                <!-- </el-form> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center"
            prop="ttl"
            label="TTL">
            <template scope="scope">
              <div v-if="scope.row.editForm.created_at !== 'aaa'">
                <!-- 显示状态 -->
                <div v-show="inputVisible !== scope.row.editForm.id">
                  <span>{{scope.row.editForm.ttl}}</span>
                </div>
                <!-- 编辑状态 -->
                <div v-show="inputVisible === scope.row.editForm.id">
                  <el-input v-model="scope.row.editForm.ttl"></el-input>
                </div>
              </div>
              <div v-else class="table-edit-fixclass">
                    <el-input class="add-input" @focus="tableEditTips = 'ttl'" size="small" v-model="scope.row.editForm.ttl" auto-complete="off"></el-input>
              </div>
            </template>
          </el-table-column>
          <!-- 隐性转发标题暂时不上 -->
          <!-- <el-table-column prop="yurl_title" label="隐性转发标题" min-width="100"></el-table-column> -->
          <el-table-column align="right"
            label="操作" width="180">
            <template scope="scope">
              <el-tooltip class="item" effect="light" content="本条记录已被锁定，无法编辑" placement="top">
              <el-button v-show="scope.row.editForm.status === '5'||scope.row.editForm.status === '6'" class="forbidden-edit">
              </el-button>
              </el-tooltip>
              <div class="operation" v-if="scope.row.editForm.created_at !== 'aaa'">
                <div v-show="inputVisible !== scope.row.editForm.id" style="display:inline;">
                  <img v-if="scope.row.editForm.is_sync_cdn === '0'" @click="handleRecordOperate('cloudSpeed', scope.row.editForm)" title="点击推送到云加速" style="width:30px;height:30px;cursor:pointer;align:bottom;margin:0 10px -10px 0" src="../../../assets/images/cloud.svg">
                  <img v-else title="已推送至云加速" style="width:30px;height:30px;cursor:pointer;align:bottom;margin:0 10px -10px 0" src="../../../assets/images/cloud_unable.svg">
                  <el-button type="text" size="small" @click="handleRecordOperate('edit', scope.row.editForm)" class="operate-fix">编辑</el-button>
                  <el-button v-if="scope.row.editForm.status === '2'||scope.row.editForm.status === '6'" type="text" size="small" @click="handleRecordOperate('open', scope.row.editForm)" class="operate-fix">启用</el-button>
                  <el-button v-else type="text" size="small" @click="handleRecordOperate('pause', scope.row.editForm)" class="operate-fix">暂停</el-button>
                  <el-popover ref="popovertest" placement="top" width="160" v-model="popoverArray[scope.$index].flag" trigger="click">
                    <p style="word-break: break-all;margin:4px 0 8px 0">您确定删除记录 {{scope.row.editForm.name}} 吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click.native.prevent="handleRecordOperate('deleteCancel', scope.row.editForm, scope.$index)">取消</el-button>
                      <el-button size="mini" style="padding:4px 5px;width:35px;" type="primary" @click.native.prevent="handleRecordOperate('deleteOk', scope.row.editForm, scope.$index)">确定</el-button>
                    </div>
                  </el-popover>
                  <el-button class="operate-fix" type="text" size="small" v-popover:popovertest>删除</el-button>
                </div>
                <div v-show="inputVisible === scope.row.editForm.id" class="editing" style="display:inline;">
                  <el-button class="table-button-layout-fix" type="text" size="small" @click="revolutionEditSave(scope.row.editForm)">保存</el-button>
                  <el-button type="text" size="small" @click="cancelEdit(scope.row.editForm)">取消</el-button>
                </div>
              </div>
              <div v-else class="table-edit-fixclass">
                <el-button class="btnLayout-fix" type="primary" @click="handleSubmitInTable(scope.row.editForm)" size="small">确认添加</el-button>
                <el-button size="small" @click="giveUpSubmit">取消</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentPageChange"
          :page-sizes="paginationParam.pageSizes"
          :page-size="paginationParam.pageSize"
          :total="paginationParam.totalCount"
          :current-page="paginationParam.currentPage"
          class="pagination-layout">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="certifyDialog" size="tiny" :close-on-click-modal="true">
      <span>推送到云加速前，请先前往<a href="/console/user-center#/authentication" class="a-link">用户中心</a>完成身份认证</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="certifyDialog = false">取 消</el-button>
      </span>
    </el-dialog>
</console-page-layout>
</template>

<script>
import ResolvingResource from '../../../resource/ResolvingResource'
import Tip from 'common/components/Tip/Tip'
import '../../../assets/styles/select-style.css'
import { on, off } from 'common/utils/dom'
import getSelectItems from '../../../constants/getSelectItems'
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import Verify from 'common/utils/verify'
export default {
  components: {
    Tip,
    ConsolePageLayout
  },
  data() {
    return {
      certifyDialog: false,
      tipType: 'default',
      addBtnDisabled: false,
      editCache: {},
      contentTips: [],
      tiploading: false,
      popoverVisible: -1,
      tableEditTips: '',
      addButtonVisible: false,
      readonly: 0,
      inputVisible: 0,
      recordType: [],
      lineType: [],
      saveMiddle: [],
      revolutionAdd: {
        created_at: 'aaa',
        domain_id: '',
        id: '',
        is_sync_cdn: '',
        mx: '',
        name: '',
        sort: '',
        status: '',
        ttl: '',
        type: '',
        updated_at: '',
        value: '',
        view: '',
        yurl_title: null
      },
      revolution: {
        inputValueParams: {
          name: '',
          type: '',
          view: '',
          value: '',
          mx: '',
          ttl: '',
          yurl: ''
        },
        isMxDisabled: true,
        isYurlDisabled: true,
        editDomainId: '',
        visible: false,
        submitting: false
      },
      popoverArray: [],
      desc: '',
      list2: [],
      recordList: [],
      tableMultipleSelection: [],
      tableLoading: false,
      paginationParam: {
        pageSizes: [10, 20, 50],
        pageSize: 10,
        totalCount: 0,
        currentPage: 1
      },
      recordAddDialog: {
        visible: false,
        submitting: false,
        isMxDisabled: true,
        isYurlDisabled: true,
        editDomainId: '',
        editForm: {
          name: '',
          type: '',
          view: '',
          value: '',
          mx: '',
          ttl: '',
          yurl: ''
        }
      },
      recordTypeOptions: [],
      viewTypeOptions: [],
      viewTypeOptions2: [],
      recordTypeChange: {
        A: 'A',
        AAAA: 'AAAA',
        CNAME: 'CNAME',
        MX: 'MX',
        XURL: '显性 URL',
        YURL: '隐性 URL',
        TXT: 'TXT',
        NS: 'NS'
      },
      topTitleMessage:''
    }
  },
  computed: {
    dnsTitle() {
      return this.preDns.DNStitle
    },
    dnsType() {
      return this.preDns.DNStype
    }
  },
  created() {
    this.fetch2()
    this.fetchRecordList()
    this.getSelectItems()
  },
  methods: {
    cascaderClick(e) {
      if (e.target.className.indexOf('el-cascader-menu__item') > -1) {
        if (e.target.className.indexOf('is-active') === 58) {
          this.$refs.cas.$el.click()
        } else if (e.target.className.indexOf('is-active') === 23) {
          this.$refs.cas.$el.click()
          this.$refs.cas.$el.click()
        }
      }
    },
    cancelEdit(row) {
      this.inputVisible = -1
      for (const key in this.editCache) {
        row[key] = this.editCache[key]
      }
    },
    cascaderHover(e) {
      const triggerSiblings = (sibling, visible) => {
        if (!sibling) return false
        sibling.style.display = visible ? 'inline-block' : 'none'
        triggerSiblings(sibling.nextSibling)
      }

      const className = e.target.className

      if (className.indexOf('el-cascader-menu__item') > -1
      && className.indexOf('el-cascader-menu__item--extensible') === -1) {
        triggerSiblings(e.target.parentNode.nextSibling, false)
      } else {
        triggerSiblings(e.target.parentNode.nextSibling, true)
      }
    },
    jishuzongjian() {
      const cascaderMenus = document.querySelector('.el-cascader-menus')
      off(cascaderMenus, 'mouseover', this.cascaderHover)
      on(cascaderMenus, 'mouseover', this.cascaderHover)
    },
    hideCascader(e) {
      const cascaderMenus = document.querySelector('.el-cascader-menus')
      off(cascaderMenus, 'click', this.cascaderClick)
      on(cascaderMenus, 'click', this.cascaderClick)
    },
    cascaderClickAdd(e) {
      if (e.target.className.indexOf('el-cascader-menu__item') > -1) {
        if (e.target.className.indexOf('is-active') === 58) {
          this.$refs.cas2.$el.click()
        } else if (e.target.className.indexOf('is-active') === 23) {
          this.$refs.cas2.$el.click()
          this.$refs.cas2.$el.click()
        }
      }
    },
    hideCascaderAdd() {
      const cascaderMenus = document.querySelector('.el-cascader-menus')

      off(cascaderMenus, 'click', this.cascaderClickAdd)
      on(cascaderMenus, 'click', this.cascaderClickAdd)
    },
    fetch2() {
      // 获取顶部标题名和版本名
      ResolvingResource.getDomainList().then(response => {
        response.data.data.list.forEach((value, index) => {
          if (value.id === this.$route.params.id) {
            this.topTitleMessage = `控制台(${value.domain})${value.level_desc}`
          }
        })
      })
      this.tiploading = true
      ResolvingResource.getDnsStatus({
        domain_id: this.$route.params.id
      }).then(res => {
              const result = res.data.data
              if (res && res.data.status.code === 1) {
                if (result.type === 1) {
                  this.tipType = 'success'
                  this.contentTips = ['您已经使用YUNDUN高防智能DNS',result.yundun_servers[0],result.yundun_servers[1]]
                } else if (result.type === 2) {
                  this.tipType = 'default'
                  this.contentTips = ['您未使用分配的云盾NS服务器','请按照以下方式，修改您的域名DNS服务器地址',result.current_servers[0] + ' ' + ' >>> ' + ' ' + result.yundun_servers[0],result.current_servers[1] + ' ' + ' >>> ' + ' ' + result.yundun_servers[1]]
                } else if (result.type === 0) {
                  this.tipType = 'error'
                  this.contentTips = ['YUNDUN未能查询到您的DNS服务器','请将域名的NS服务器修改为',result.yundun_servers[0],result.yundun_servers[1]]
                }
              }
              this.tiploading = false
        }
      ).catch(res => {
        const result = res.data.data
        if (res && res.data.status.code === 0) {
          if (result.type === 0) {
            this.tipType = 'error'
            this.contentTips = ['YUNDUN未能查询到您的DNS服务器','请将域名的NS服务器修改为',result.yundun_servers[0],result.yundun_servers[1]]
          } else {
            this.tipType = 'warn'
            this.contentTips = ['您的NS服务器地址未接入','请按照以下方式，修改您的域名NS服务器地址',result.current_servers[0] + ' ' + ' >>> ' + ' ' + result.yundun_servers[0],result.current_servers[1] + ' ' + ' >>> ' + ' ' + result.yundun_servers[1]]
          }
        }
        this.tiploading = false
        // this.contentTips = ['暂时未能查询到您的NS服务器，请稍后再试']
      })
    },
    handleTableSelectionChange(selection) {
      this.tableMultipleSelection = selection
    },
    handleButtonRecordAdd() {
      this.addBtnDisabled = true
      this.saveMiddle.unshift({
        editForm: {
          created_at: 'aaa',
          domain_id: '',
          id: '',
          is_sync_cdn: '',
          mx: '',
          name: '',
          sort: '',
          status: '',
          ttl: '600',
          type: 'A',
          updated_at: '',
          value: '',
          view: ['any'],
          yurl_title: null
        }
      })
      this.recordList = this.format1(this.saveMiddle)
    },
    tableSelectVisibleChange(param) {
      if (param === true) {
        this.tableEditTips = 'type'
      }
    },
    tableSelectVisibleChange2(param) {
      if (param === true) {
        this.tableEditTips = 'type2'
      }
    },
    handleButtonRecordPause() {
      const ids = []
      this.tableMultipleSelection.forEach(item => {
        ids.push(item.editForm.id)
      })
      if (ids.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择暂停项！',
          type: 'warning'
        })
        return
      }
      this.fetchPostJSON('CloudDns.DomainRecords.batchPause', {
        record_ids: ids,
        domain_id: this.$route.params.id
      }).then(res => {
        if (res.ok) {
          res.json().then(data => {
            if (data && data.status.code === 1) {
              this.$message({
                showClose: true,
                message: '记录批量暂停成功',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: data.status.message,
                type: 'error'
              })
            }
          })
          this.tableMultipleSelection = []
          this.fetchRecordList()
        }
      })
    },
    handleButtonRecordOpen() {
      const ids = []
      this.tableMultipleSelection.forEach(item => {
        ids.push(item.editForm.id)
      })
      if (ids.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择启用项！',
          type: 'warning'
        })
        return
      }
      this.fetchPostJSON('CloudDns.DomainRecords.batchOpen', {
        record_ids: ids,
        domain_id: this.$route.params.id
      }).then(res => {
        if (res.ok) {
          res.json().then(data => {
            if (data && data.status.code === 1) {
              this.$message({
                showClose: true,
                message: '记录批量启用成功',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: data.status.message,
                type: 'error'
              })
            }
          })
          this.tableMultipleSelection = []
          this.fetchRecordList()
        }
      })
    },
    handleButtonRecordDelete() {
      const ids = []
      this.tableMultipleSelection.forEach(item => {
        ids.push(item.editForm.id)
      })
      if (ids.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择删除项！',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定要删除该条记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableLoading = true
          this.fetchPostJSON('CloudDns.DomainRecords.batchDelete', {
            record_ids: ids,
            domain_id: this.$route.params.id
          }).then(res => {
            if (res.ok) {
              res.json().then(data => {
                if (data && data.status.code === 1) {
                  this.$message({
                    showClose: true,
                    message: '记录批量删除成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    showClose: true,
                    message: data.status.message,
                    type: 'error'
                  })
                }
              })
              this.tableMultipleSelection = []
              this.fetchRecordList()
            }
          })
        })
    },
    handleRecordOperate(operate, row, index) {
      const id = row.id
      switch (operate) {
        case 'edit': // 编辑
          this.editCache = JSON.parse(JSON.stringify(row))
          row.view = [row.view2]

          this.inputVisible = id
          if (
            row.type in
            {
              AP: true,
              CNAMEP: true,
              MX: true
            }
          ) {
            this.revolution.isMxDisabled = false
            this.revolution.inputValueParams.mx = Number(row.mx)
          } else {
            this.revolution.isMxDisabled = true
            this.revolution.inputValueParams.mx = 0
          }

          if (row.type === 'YURL') {
            this.revolution.isYurlDisabled = false
            this.revolution.inputValueParams.yurl = row.yurl
          } else {
            this.revolution.isYurlDisabled = true
            this.revolution.inputValueParams.yurl = ''
          }

          this.revolution.editDomainId = id
          this.revolution.visible = true
          break
        case 'open': // 启用
          this.tableLoading = true
          this.fetchPostJSON('CloudDns.DomainRecords.open', {
            record_id: id,
            domain_id: this.$route.params.id
          }).then(res => {
            if (res.ok) {
              res.json().then(data => {
                if (data && data.status.code === 1) {
                  this.tableLoading = false
                  this.$message({
                    showClose: true,
                    message: '记录启用成功',
                    type: 'success'
                  })
                } else {
                  this.tableLoading = false
                  this.$message({
                    showClose: true,
                    message: data.status.message,
                    type: 'error'
                  })
                }
              })
              this.fetchRecordList()
            }
          })
          break
        case 'pause': // 暂停
          this.tableLoading = true
          this.fetchPostJSON('CloudDns.DomainRecords.pause', {
            record_id: id,
            domain_id: this.$route.params.id
          }).then(res => {
            if (res.ok) {
              res.json().then(data => {
                if (data && data.status.code === 1) {
                  this.tableLoading = false
                  this.$message({
                    showClose: true,
                    message: '记录暂停成功',
                    type: 'success'
                  })
                } else {
                  this.tableLoading = false
                  this.$message({
                    showClose: true,
                    message: data.status.message,
                    type: 'error'
                  })
                }
              })
              this.fetchRecordList()
            }
          })
          break
        case 'deleteCancel':
          this.popoverArray[index].flag = false
          break
        case 'deleteOk': // 删除
          this.popoverArray[index].flag = false
          this.tableLoading = true
          this.fetchPostJSON('CloudDns.DomainRecords.delete', {
            record_id: id,
            domain_id: this.$route.params.id
          }).then(res => {
            if (res.ok) {
              res.json().then(data => {
                if (data && data.status.code === 1) {
                  this.$message({
                    showClose: true,
                    message: '记录删除成功',
                    type: 'success'
                  })
                } else {
                  this.tableLoading = false
                  this.$message({
                    showClose: true,
                    message: data.status.message,
                    type: 'error'
                  })
                }
              })
              this.fetchRecordList()
            }
          })
          break
        case 'cloudSpeed':
          this.tableLoading = true
          ResolvingResource.importToSpeed({
            domain_id: this.$route.params.id,
            record_id: id
          }).then(result => {
              this.$message({
                showClose: true,
                message: '成功推送到云加速',
                type: 'success'
              })
            this.fetchRecordList()
          }).catch(result => {
            if (result.code === 1124) {
              this.certifyDialog = true
            }
            this.tableLoading = false
          })
          break
        default:
      }
    },
    handlePaginationSizeChange(size) {
      this.tableLoading = true
      this.paginationParam.pageSize = size
      this.fetchRecordList(true)
    },
    handlePaginationCurrentPageChange(currentPage) {
      this.tableLoading = true
      this.paginationParam.currentPage = currentPage
      this.fetchRecordList()
    },
    format1(data) {
      const result = data
      result.forEach(v => {
        this.popoverArray.push({
          flag: false
        })
      })
      return result
    },
    // doubleClickEdit(row, column, cell, event) {
    //   if (row.editForm.created_at === 'aaa') {
    //     return
    //   }
    //   if (row.editForm.status === '5' || row.editForm.status === '6') {
    //     return
    //   }
    //   this.editCache = JSON.parse(JSON.stringify(row))
    //   row.editForm.view = [row.editForm.view2]
    //   this.inputVisible = row.editForm.id
    // },
    getSelectItems,
    fetchRecordList(resetPage = false) {
      this.addBtnDisabled = false
      this.tableLoading = true
      this.paginationParam.currentPage = resetPage
        ? 1
        : this.paginationParam.currentPage
      const params = {
        domain_id: this.$route.params.id,
        page: this.paginationParam.currentPage,
        per_page: this.paginationParam.pageSize
      }
      ResolvingResource.getRecordList(params).then(
        res => {
          res.data.data.list.forEach((value, index) => {
            const obj = {}
            obj.editForm = value
            res.data.data.list[index] = obj
          })
          res.data.data.list.forEach((value, index) => {
            let a = res.data.data.list[index].editForm.view
            if (a === '') {
              a = 'any'
            }
            res.data.data.list[index].editForm.view2 = a
            res.data.data.list[index].editForm.view = []
          })
          this.saveMiddle = res.data.data.list
          this.recordList = this.format1(this.saveMiddle)
          this.paginationParam.totalCount = Number(res.data.data.total)
          this.recordTypeOptions = this.formatter2(res.data.data.record_types)
          this.tableLoading = false
        }
      )
    },
    formatter2(originList) {
      const labels = {
        A: 'A',
        AAAA: 'AAAA',
        CNAME: 'CNAME',
        MX: 'MX',
        XURL: '显性 URL',
        YURL: '隐性 URL',
        TXT: 'TXT',
        NS: 'NS'
      }
      const result = []
      for (const key of originList) {
        result.push({
          value: key,
          label: labels[key]
        })
      }
      return result
    },
    formatter3(originList) {
      const labels = {
        A: 'A',
        AAAA: 'AAAA',
        CNAME: 'CNAME',
        MX: 'MX',
        XURL: '显性跳转',
        YURL: '隐性跳转',
        TXT: 'TXT',
        NS: 'NS'
      }
      const result = []
      for (const key of originList) {
        result.push({
          value: key,
          label: labels[key]
        })
      }
      return result
    },
    revolutionEditSave(row) {
      if (row.name === '') {
        row.name = '@'
      } else if (row.name.indexOf('-') === 0 || row.name.indexOf('-') === row.name.length - 1) {
        this.$message({
          showClose: true,
          message: '主机记录格式不正确',
          type: 'warning'
        })
        return
      } else if (row.name.indexOf('.') === 0 || row.name.indexOf('.') === row.name.length - 1) {
        this.$message({
          showClose: true,
          message: '主机记录格式不正确',
          type: 'warning'
        })
        return
      } else if (row.name.indexOf('@') >= 0) {
        if (row.name.length > 1) {
          this.$message({
            showClose: true,
            message: '主机记录格式不正确',
            type: 'warning'
          })
          return
        }
      } else if (row.name.indexOf('*') >= 0) {
        const nameArr = row.name.split('')
        let flag = true
        nameArr.forEach((value,index) => {
          if (value === '*') {
            if (index !== 0) {
              flag = false
            }
            if (nameArr[index + 1] !== '.' && nameArr[index + 1] !== undefined) {
              flag = false
            }
          }
        })
        if (flag === false) {
          this.$message({
            showClose: true,
            message: '主机记录格式不正确',
            type: 'warning'
          })
          return
        }
      } else if (row.name.length > 63) {
        this.$message({
          showClose: true,
          message: '主机记录长度不能超过63个字符',
          type: 'warning'
        })
        return
      }
      if (row.value === '') {
        this.$message({
          showClose: true,
          message: '记录值不能为空',
          type: 'warning'
        })
        return
      }
        const Ipv4Reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
        const Ipv6Reg = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/
        const DomainWithLastPoint = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+.$/
        switch (row.type) {
          case '':
            this.$message({
              showClose: true,
              message: '记录类型不能为空',
              type: 'warning'
            })
            return
            break
          case 'A':
            if (!Ipv4Reg.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
            }
            break
          case 'CNAME':
            if (!Verify.resolvingDomain.test(row.value) && !DomainWithLastPoint.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
            }
            break
          case 'MX':
            if (!Verify.domain.test(row.value) && !Verify.ipReg.test(row.value) &&
          !DomainWithLastPoint.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
            }
            break
          case 'NS':
          if (!Verify.domain.test(row.value) && !DomainWithLastPoint.test(row.value)) {
            this.$message({
              showClose: true,
              message: '记录值格式错误',
              type: 'warning'
            })
            return
          }
            break
            case 'AAAA':
            if (!Verify.Ipv6Reg.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
            }
              break
            case 'XURL':
            if (!Verify.defaultUrl.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
              }
              break
            case 'YURL':
            if (!Verify.defaultUrl.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
              }
              break
          default:

        }

      if (row.ttl === '') {
        row.ttl = 600
      } else if (row.ttl < 1 || row.ttl > 604800) {
        this.$message({
          showClose: true,
          message: 'TTL值超出范围',
          type: 'warning'
        })
        return
      }
      if (!Number(row.ttl)) {
        this.$message({
          showClose: true,
          message: 'TTL数据必须为数字',
          type: 'warning'
        })
        return
      }
      if (row.mx !== '-' && row.mx !== '') {
        if (!Number(row.mx)) {
          this.$message({
            showClose: true,
            message: '优先级必须为数字',
            type: 'warning'
          })
          return
        }
      }
      if (row.view === '') {
        row.view = ['any']
      }
      this.tableLoading = true
      const params = {
        domain_id: this.$route.params.id,
        record_id: row.id,
        record_name: row.name,
        record_type: row.type,
        record_view: row.view[row.view.length - 1],
        record_value: row.value,
        record_ttl: row.ttl,
        record_mx: row.mx
      }
      ResolvingResource.saveRecordEdit(params).then(res => {
        this.$message({
          showClose: true,
          message: '记录修改成功',
          type: 'success'
        })
        this.inputVisible = 0
        this.fetchRecordList(true)
      }).catch(res => {
        this.tableLoading = false
      })
    },
    giveUpSubmit() {
      this.addBtnDisabled = false
      this.saveMiddle.splice(0, 1)
    },
    handleSubmitInTable(row) {
      if (row.name === '') {
        row.name = '@'
      } else if (row.name.indexOf('-') === 0 || row.name.indexOf('-') === row.name.length - 1) {
        this.$message({
          showClose: true,
          message: '主机记录格式不正确',
          type: 'warning'
        })
        return
      } else if (row.name.indexOf('.') === 0 || row.name.indexOf('.') === row.name.length - 1) {
        this.$message({
          showClose: true,
          message: '主机记录格式不正确',
          type: 'warning'
        })
        return
      } else if (row.name.indexOf('@') >= 0) {
        if (row.name.length > 1) {
          this.$message({
            showClose: true,
            message: '主机记录格式不正确',
            type: 'warning'
          })
          return
        }
      } else if (row.name.indexOf('*') >= 0) {
        const nameArr = row.name.split('')
        let flag = true
        nameArr.forEach((value,index) => {
          if (value === '*') {
            if (index !== 0) {
              flag = false
            }
            if (nameArr[index + 1] !== '.' && nameArr[index + 1] !== undefined) {
              flag = false
            }
          }
        })
        if (flag === false) {
          this.$message({
            showClose: true,
            message: '主机记录格式不正确',
            type: 'warning'
          })
          return
        }
      } else if (row.name.length > 63) {
        this.$message({
          showClose: true,
          message: '主机记录长度不能超过63个字符',
          type: 'warning'
        })
        return
      }
      if (row.value === '') {
        this.$message({
          showClose: true,
          message: '记录值不能为空',
          type: 'warning'
        })
        return
      }
        const Ipv4Reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
        const Ipv6Reg = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/
        const DomainWithLastPoint = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+.$/
        switch (row.type) {
          case '':
            this.$message({
              showClose: true,
              message: '记录类型不能为空',
              type: 'warning'
            })
            return
            break
          case 'A':
            if (!Ipv4Reg.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
            }
            break
          case 'CNAME':
            if (!Verify.resolvingDomain.test(row.value) && !DomainWithLastPoint.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
            }
            break
          case 'MX':
            if (!Verify.domain.test(row.value) && !Verify.ipReg.test(row.value) &&
          !DomainWithLastPoint.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
            }
            break
          case 'NS':
          if (!Verify.domain.test(row.value) && !DomainWithLastPoint.test(row.value)) {
            this.$message({
              showClose: true,
              message: '记录值格式错误',
              type: 'warning'
            })
            return
          }
            break
            case 'AAAA':
            if (!Verify.Ipv6Reg.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
            }
              break
            case 'XURL':
            if (!Verify.defaultUrl.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
              }
              break
            case 'YURL':
            if (!Verify.defaultUrl.test(row.value)) {
              this.$message({
                showClose: true,
                message: '记录值格式错误',
                type: 'warning'
              })
              return
              }
              break
          default:

        }

      if (row.ttl === '') {
        row.ttl = 600
      } else if (row.ttl < 1 || row.ttl > 604800) {
        this.$message({
          showClose: true,
          message: 'TTL值超出范围',
          type: 'warning'
        })
        return
      }
      if (!Number(row.ttl)) {
        this.$message({
          showClose: true,
          message: 'TTL数据必须为数字',
          type: 'warning'
        })
        return
      }
      if (row.mx !== '-' && row.mx !== '') {
        if (!Number(row.mx)) {
          this.$message({
            showClose: true,
            message: '优先级必须为数字',
            type: 'warning'
          })
          return
        }
      }
      if (row.view === '') {
        row.view = ['any']
      }
      const params = {
        domain_id: this.$route.params.id,
        record_name: row.name,
        record_type: row.type,
        record_view: row.view[row.view.length - 1],
        record_value: row.value,
        record_ttl: row.ttl,
        record_mx: row.mx
      }
      this.tableLoading = true
      ResolvingResource.addNewRecord(params).then(res => {
        this.$message({
          showClose: true,
          message: '记录添加成功',
          type: 'success'
        })
        this.fetchRecordList(true)
      }).catch(res => {
        this.tableLoading = false
      })
    },
    handleRecordAddDialogSubmit() {
      this.recordAddDialog.submitting = true
      let API = ''
      const params = {
        domain_id: this.$route.params.id,
        record_name: this.recordAddDialog.editForm.name,
        record_type: this.recordAddDialog.editForm.type,
        record_view: this.recordAddDialog.editForm.view,
        record_value: this.recordAddDialog.editForm.value
      }

      if (this.recordAddDialog.editForm.ttl !== '') {
        params.record_ttl = this.recordAddDialog.editForm.ttl
      }

      if (!this.recordAddDialog.isMxDisabled) {
        params.record_mx = this.recordAddDialog.editForm.mx
      }

      if (!this.recordAddDialog.isYurlDisabled) {
        params.yurl_title = this.recordAddDialog.editForm.yurl
      }

      if (this.recordAddDialog.editDomainId) {
        params.record_id = this.recordAddDialog.editDomainId
        API = 'CloudDns.DomainRecords.edit'
      } else {
        API = 'CloudDns.DomainRecords.add'
      }
      this.fetchPostJSON(API, params).then(res => {
        if (res.ok) {
          res.json().then(data => {
            if (data && data.status.code === 1) {
              this.$message({
                showClose: true,
                message: this.recordAddDialog.editDomainId
                  ? '记录修改成功'
                  : '记录添加成功',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: data.status.message,
                type: 'error'
              })
            }
          })
          this.recordAddDialog.visible = false
          this.fetchRecordList(true)
        }
        this.recordAddDialog.submitting = false
      })
    },
    handleRecordAddDialogClose() {
      this.recordAddDialog.visible = false
      this.recordAddDialog.submitting = false
      // this.$refs.recordAddDialogForm.resetFields()
    }
  }
}

</script>

<style>
 .table-cell-fix.el-table .cell,
.el-table__footer-wrapper,
.el-table__header-wrapper {
  overflow: visible;
}
.el-pagination{
  margin-top: 16px;
}
input.el-input__inner {
  /* background-color: transparent; */
  height:31px;
}
.el-select .el-input.is-disabled .el-input__inner {
  color:#000;
}
.el-table_1_column_3 .el-select.select-test-list,.el-table_1_column_4 .el-select.select-test-list{
  box-sizing: border-box;
}
</style>
<style scoped>
.ctrl-btns {
  margin: 0 0 10px 0;
}

.basic-input {
  border: 1px solid #2d90e6;
  border-radius: 3px;
  padding: 7px;
  width: 95%;
  max-width: 180px;
  background-color: transparent;
}

.small-input {
  border: 1px solid #2d90e6;
  border-radius: 3px;
  padding: 6px;
  max-width: 130px;
}

.hideborder {
  border: 0;
  padding: 5px 0;
  border-radius: 3px;
  outline: medium;
  text-align: center;
  width: 100%;
}

.select-test {
  position: absolute;
  top: 0;
  z-index: 2;
  right: 1px;
  padding: 0 4px;
}

.select-test-list {
  /*position: absolute;
  top: 4px;
  right:4px;*/
  z-index: 2;
}

.btnLayout-fix {
  margin-top: 22px;
}

.selectBorder {
  border: 1px solid #2d90e6;
  border-radius: 3px;
}

.disabledTips {
  width: 100%;
}

.disabledTips2 {
  position: relative;
  bottom: 6px;
  text-align: center;
}

p.table-edit-tips {
  position: relative;
  width: 1000px;
  padding: 2px 0 20px 0;
  z-index: 3;
  text-align: left;
}

.table-edit-fixclass {
  position: absolute;
  top: 0;
  width: 90%;
  text-align: center;
}

.table-button-layout-fix {
  margin-left: 6px;
}

.cascader-warp {
  height:30px;
}

.header-tips {
  font-weight: bold;
}

.title-tips {
  width: 70px;
  display: inline-block;
  text-align: center;
}

.add-input {
  margin: 20px 0 30px;
  max-width: 170px;
}

.add-input-fix {
  margin: 20px 0 30px;
  color: #ccc;
}
.add-editing-class {
  position: relative;
  right: 8px;
  top: 12px;
}

.operation {
  text-align: right;
}

.tip-placeholder {
  min-height: 80px;
  padding-top: 14px;
  line-height: 20px;
  font-size: 14px;
  padding-left: 26px;
}
.el-select .el-input .el-input__icon {
  display: none;
}
.operate-fix {
  margin-left: 10px;
}
.el-button.forbidden-edit {
  position: absolute;
  z-index: 2;
  left: 0;
  width:90%;
  height:80%;
  border: none;
  background-color: transparent;
  cursor: not-allowed;
  padding: 0;
}
#width-control {
  width: 132px;
}
.a-link {
  font-size: 16px;
  color: var(--primary-blue);
  cursor: pointer;
}
div.table-cell-fix {
  min-height: 120px;
}
</style>
