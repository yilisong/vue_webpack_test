<template>
<console-page-layout :title="domainName">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="普通模式" name="first">
      <div class="overflowFix">
        <div class="protect-cc cloud-speed-item">
          <div class="protect-cc-title-left">
            云加速
          </div>
          <div class="protect-cc-title-right">
            您已启用<span class="go-other-page" @click="goToCloudSpeed">云加速</span>服务，如需配置CDN高级缓存、页面压缩、页面优化等功能，请至<span @click="goToCloudSpeed">云加速</span>配置。
          </div>
          <div class="clear"></div>
        </div>
        <div class="protect-cc cloud-ids" v-show="hwwsStatus === 'off'">
          <div class="protect-cc-title-left">
            云IDS
          </div>
          <div class="protect-cc-title-right">
            云端WEBIDS入侵检测，实时更新安全规则，发现攻击后YUNDUN会进行实时记录，但不做攻击拦截。如需进行后续的入侵防御，请开启<a href="/console/red-guard#/websiteList">红网卫士</a>服务。
          </div>
          <div class="clear"></div>
        </div>
        <div class="protect-cc cloud-ids" v-show="hwwsStatus === 'on'">
          <div class="protect-cc-title-left">
            云IDS
          </div>
          <div class="protect-cc-title-right">
            <!-- 您已开启红网卫士服务，更高级配置请前往<span class="go-other-page" @click="goToHWWS">红网卫士</span>控制台。 -->
            您已开启红网卫士服务，更高级配置请前往<a href="/console/red-guard#/websiteList">红网卫士</a>页面。
          </div>
          <div class="clear"></div>
        </div>
        <div class="bg-suround">
          <div class="label-fix">
            <div class="protect-cc-title-left">
              防CC
            </div>
            <div class="protect-cc-title-right">
              有效防止CC攻击,业务系统防刷,恶意爬虫采集等。<br />
              YUNDUN全局默认对搜索引擎放行
            </div>
            <el-select @change="changeProtectCcSetting" @visible-change="visibleChangeFun" v-model="protectCcTypeValue" placeholder="请选择" class="fr select-layout">
              <el-option v-for="item in protectCcType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div class="clear"></div>
          </div>
          <div class="protect-cc-body protect-cc-body-layout">
            <Tip :content="ccTip" class="cc-tip"></Tip>
              <el-radio-group size="small" v-model="radioButton" @change="blackWhiteChangeFun">
                <el-radio-button label="black">黑名单</el-radio-button>
                <i class="yun-icon yun-prior"></i>
                <el-radio-button label="white">白名单</el-radio-button>
              </el-radio-group>
            <el-button class="addNewBlackWhiteListBtn" size="small" @click="addNewBlackWhiteList" :disabled="addButtonActive">新增</el-button>
            <div v-loading="protectCcTableLoading">
              <div v-show="blackWhiteChange === 'black'" style="margin:20px 40px 0 0;">
                <el-table :data="ccBlackList">
                  <el-table-column prop="value.type" label="类型">
                    <template scope="scope">
                      <div v-if="scope.row.group === 'addNewList'">
                        <el-select @visible-change="visibleChangeFun" @change="clearContent(scope.row)" v-model="scope.row.value.type" placeholder="请选择">
                          <el-option v-for="item in protectCcCacheType" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div v-else>
                        <div v-if="edittingId === scope.row.id ">
                          <el-select @visible-change="visibleChangeFun" @change="clearContent(scope.row)" v-model="scope.row.value.type" placeholder="请选择">
                            <el-option v-for="item in protectCcCacheType" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                        <div v-else>
                          {{scope.row.value.type === 'suffix'?'后缀名':scope.row.value.type.toUpperCase()}}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="匹配内容">
                    <template scope="scope">
                      <div v-if="scope.row.group === 'addNewList'">
                        <input-suffix v-if="scope.row.value.type === 'suffix'" :inputSuffixList="scope.row.value.content" v-on:resSuffixList="updateSuffix"></input-suffix>
                        <el-input v-else v-model="scope.row.value.content"></el-input>
                      </div>
                      <div v-else>
                        <div v-if="edittingId === scope.row.id ">
                          <input-suffix v-if="scope.row.value.type === 'suffix'" :inputSuffixList="scope.row.value.content" v-on:resSuffixList="updateSuffix"></input-suffix>
                          <el-input v-else v-model="scope.row.value.content"></el-input>
                        </div>
                        <div v-else>
                          {{scope.row.value.content}}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="id" label="操作" align="right">
                    <template scope="scope">
                      <div v-if="scope.row.group === 'addNewList'">
                        <el-button type="text" @click="saveCcAddBlackData(scope.row)">保存</el-button>
                        <el-button type="text" @click="cancelAdd">取消</el-button>
                      </div>
                      <div v-else>
                        <div v-show="edittingId === scope.row.id">
                          <el-button type="text" @click="saveCcEditkData(scope.row)">保存</el-button>
                          <el-button type="text" @click="cancelEdit(scope.row)">取消</el-button>
                        </div>
                        <div v-show="edittingId !== scope.row.id">
                          <el-button type="text" @click="editData(scope.row)">编辑</el-button>
                          <span style="margin:0 9px;">|</span>
                          <el-popover ref="popovertest" placement="top" width="160" v-model="popoverArray1[scope.$index].flag" trigger="click">
                            <p style="word-break: break-all;margin:4px 0 8px 0">您确定删除记录吗？</p>
                            <div style="text-align: right; margin: 0">
                              <el-button size="mini" type="text" @click.native.prevent="handleRecordOperate('deleteCancel', scope.row, scope.$index)">取消</el-button>
                              <el-button size="mini" style="padding:4px 5px;width:35px;" type="primary" @click.native.prevent="handleRecordOperate('deleteOk', scope.row,scope.$index)">确定</el-button>
                            </div>
                          </el-popover>
                          <el-button type="text" v-popover:popovertest><i class="el-icon-delete"></i></el-button>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="blackWhiteChange !== 'black'" style="margin:20px 40px 0 0;">
                <el-table :data="ccWhiteList">
                  <el-table-column prop="value.type" label="类型">
                    <template scope="scope">
                      <div v-if="scope.row.group === 'addNewList'">
                        <!-- <el-input v-model="scope.row.value.type"></el-input> -->
                        <el-select @visible-change="visibleChangeFun" @change="clearContent(scope.row)" v-model="scope.row.value.type" placeholder="请选择">
                          <el-option v-for="item in protectCcCacheType" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div v-else>
                        <div v-if="edittingId === scope.row.id ">
                          <!-- <el-input v-model="scope.row.value.type"></el-input> -->
                          <el-select @visible-change="visibleChangeFun" @change="clearContent(scope.row)" v-model="scope.row.value.type" placeholder="请选择">
                            <el-option v-for="item in protectCcCacheType" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                        <div v-else>
                          {{scope.row.value.type === 'suffix'?'后缀名':scope.row.value.type.toUpperCase()}}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="value.content" label="匹配内容">
                    <template scope="scope">
                      <div v-if="scope.row.group === 'addNewList'">
                        <input-suffix v-if="scope.row.value.type === 'suffix'" :inputSuffixList="scope.row.value.content" v-on:resSuffixList="updateSuffix"></input-suffix>
                        <el-input v-else v-model="scope.row.value.content"></el-input>
                      </div>
                      <div v-else>
                        <div v-if="edittingId === scope.row.id ">
                          <input-suffix v-if="scope.row.value.type === 'suffix'" :inputSuffixList="scope.row.value.content" v-on:resSuffixList="updateSuffix"></input-suffix>
                          <el-input v-else v-model="scope.row.value.content"></el-input>
                        </div>
                        <div v-else>
                          {{scope.row.value.content}}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="id" label="操作" align="right">
                    <template scope="scope">
                      <div v-if="scope.row.group === 'addNewList'">
                        <el-button type="text" @click="saveCcAddWhiteData(scope.row)">保存</el-button>
                        <el-button type="text" @click="cancelAdd">取消</el-button>
                      </div>
                      <div v-else>
                        <div v-show="edittingId === scope.row.id">
                          <el-button type="text" @click="saveCcEditkData(scope.row)">保存</el-button>
                          <el-button type="text" @click="cancelEdit(scope.row)">取消</el-button>
                        </div>
                        <div v-show="edittingId !== scope.row.id">
                          <el-button type="text" @click="editData(scope.row)">编辑</el-button>
                          <span style="margin:0 9px;">|</span>
                          <el-popover ref="popovertests" placement="top" width="160" v-model="popoverArray2[scope.$index].flag" trigger="click">
                            <p style="word-break: break-all;margin:4px 0 8px 0">您确定删除记录吗？</p>
                            <div style="text-align: right; margin: 0">
                              <el-button size="mini" type="text" @click.native.prevent="handleRecordOperate2('deleteCancel', scope.row, scope.$index)">取消</el-button>
                              <el-button size="mini" style="padding:4px 5px;width:35px;" type="primary" @click.native.prevent="handleRecordOperate2('deleteOk', scope.row,scope.$index)">确定</el-button>
                            </div>
                          </el-popover>
                          <el-button type="text" v-popover:popovertests><i class="el-icon-delete"></i></el-button>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="surrounder">
        <div class="pointer-fix" v-loading="urlTagsLoading">
          <div class="protect-cc-title-left url-list-title">
            重点URL保护
          </div>
          <div class="protect-cc-title-right bottom-layout">
              URL支持三种添加格式，格式示例：<br />
              http(s)://www.yundun.com/ceshi.html； www.yundun.com/ceshi.html； /ceshi.html<br />
              URL被重点保护后，所有访问该URL均需输入验证码；规则数上限为10条；
          </div>
          <el-select @visible-change="handleChangeProtectUrlList" v-model="urlProtectSwitchValue" placeholder="请选择" class="fr select-layout">
            <el-option v-for="item in urlProtectSwitch" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div class="clear"></div>
          <div style="padding-left:174px;">
            <el-table :data="tags" style="width: 100%">
              <el-table-column prop="name" label="URL地址">
              </el-table-column>
              <el-table-column prop="operate" label="操作" width="120">
                <template scope="scope">
                  <i class="el-icon-delete" @click="handleClose(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table><br />
            <el-input class="url-protect-title-input" v-model="newAddUrl"></el-input>
            <el-button type="primary" @click="addProtectUrl">添加</el-button>
          </div>
        </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="专家模式" name="second">
      <div class="pro-surround" v-loading="expertSettingLoading">
        <div class="protect-cc" style="background-color: rgb(213, 211, 218); margin:0 20px;">
          <div class="protect-cc-title-left pro-background">
            专家配置项
          </div>
          <div class="pro-right-text">
            只对专业人士开放的功能模块，非专业人士慎用
          </div>
          <div class="clear"></div>
        </div>
        <div class="single-line"></div>
        <div style="margin: 20px 0;">
          <el-form :label-position="labelPosition" label-width="270px" class="expert-console-form">
            <el-form-item label="防护对象">
              <el-select @change="handleExpertChange" @visible-change="visibleChangeFun" v-model="protectObjectValue" placeholder="请选择" class="mr">
                <el-option v-for="item in protectObject" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对请求代理IP的访问行为控制">
              <el-select @change="handleExpertChange" @visible-change="visibleChangeFun" v-model="forbitIpValue" placeholder="请选择" class="mr">
                <el-option v-for="item in forbitIp" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单IP请求频率">
              <span class="form-inline-fix form-span">请求数</span>
              <el-input @blur="handleExpertChange" @focus="visibleChangeFun" v-model="iprate.iprate_request" class="input-fix"></el-input>
              <span class="form-inline-fix form-span">/ 秒数：</span><el-input v-model="iprate.iprate_second" @blur="handleExpertChange" @focus="visibleChangeFun" class="input-fix"></el-input>
            </el-form-item>
            <el-form-item label="单IP单URL请求频率">
              <span class="form-inline-fix form-span">请求数</span><el-input v-model="ipurlrate.ipurlrate_request" @focus="visibleChangeFun" @blur="handleExpertChange" class="input-fix"></el-input>
              <span class="form-inline-fix form-span">/ 秒数：</span><el-input v-model="ipurlrate.ipurlrate_second" @focus="visibleChangeFun" @blur="handleExpertChange" class="input-fix"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="user-surround">
        <div class="protect-cc">
          <div class="fl cc-protect-title">
            UserAgent黑白名单
          </div>
          <div class="fl cc-protect-body">
            对特定的UserAgent进行放行或禁止处理，黑名单优先级高于白名单<br />
            黑名单和白名单的规则数上限分别为10条；
          </div>
          <div class="clear"></div>
        </div>
        <div class="protect-cc-title-right bottom-layout">
          <el-form :inline="true">
            <el-form-item label="添加黑白名单">
              <el-input v-model.trim="waittingToAddUA" @focus="visibleChangeFun" class="black-list-input">
              </el-input>
              <el-select @visible-change="visibleChangeFun" v-model="blackWhiteSelectValue" placeholder="请选择" class="mr">
                <el-option v-for="item in blackWhiteSelect" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-button type="primary" size="small" @click="addBlackWhiteUa">添加</el-button>
              &nbsp;|&nbsp;
              <el-checkbox v-model="regexComputed" @change="handleRegexChange">模糊匹配</el-checkbox>
            </el-form-item>
          </el-form>
          <div class="list-black-title">
            黑名单
          </div>
          <div class="black-list">
            <el-tag v-for="tag in uaBlackListTags" @close="delUaBlackList(tag)" :key="tag.name" :closable="true">
              {{tag.name}}
            </el-tag>
          </div>
          <div class="list-white-title">
            白名单
          </div>
          <div class="black-list">
            <el-tag v-for="tag in uaWhiteListTags" @close="delUaWhiteList(tag)" :key="tag.name" :closable="true">
              {{tag.name}}
            </el-tag>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import Tip from 'common/components/Tip/Tip'
import TaichiPlusResource from '../../../resource/TaichiPlusResource'
import InputSuffix from 'common/components/InputSuffix/InputSuffix'
import Verify from 'common/utils/verify'
import { mapActions } from 'vuex'

export default {
  components: {
    InputSuffix,
    ConsolePageLayout,
    ComboTable,
    Tip
  },
  directives: {},
  methods: {
    ...mapActions(['saveAddData', 'delListData']),
    editData(row) {
      this.edittingId = row.id
      this.edittingCache = JSON.parse(JSON.stringify(row))
    },
    cancelEdit(row) {
      this.edittingId = -1
      for (const key in this.edittingCache) {
        row[key] = this.edittingCache[key]
      }
    },
    getHwwsStatus() {
      const id = this.$route.params.id
      TaichiPlusResource.getHwwsStatus(id).then(response => {
        this.hwwsStatus = response.data.data.cloud_ids.status
      })
    },
    handleClose(row) {
      this.$confirm('确定要删除该URL地址吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.urlTagsLoading = true
          const tagName = row.name
          this.tags.forEach((value, index) => {
            if (value.name === tagName) {
              this.tags.splice(index, 1)
            }
          })
          this.changeProtectUrlList()
        })
        .catch(() => {})
    },
    format1(data) {
      const result = data
      result.forEach(() => {
        this.popoverArray1.push({
          flag: false
        })
      })
      return result
    },
    format2(data) {
      const result = data
      result.forEach(() => {
        this.popoverArray2.push({
          flag: false
        })
      })
      return result
    },
    getProtectCcData() {
      this.protectCcTableLoading = true
      const param = this.$route.params.id
      TaichiPlusResource.getProtectCcData(param).then(response => {
        const a = response.data.data.list
        if (a) {
          this.format1(a.black_list)
          this.format2(a.white_list)
          this.blackList = a.black_list
          this.whiteList = a.white_list
          this.protectCcTableLoading = false
        } else {
          this.protectCcTableLoading = false
        }
      })
    },
    handleClick() {
      sessionStorage.setItem('activeName', this.activeName)
    },
    addNewBlackWhiteList() {
      this.addButtonActive = true
      if (this.blackWhiteChange === 'black') {
        if (this.blackList.length === 20) {
          this.$message({
            showClose: true,
            message: '黑名单已达到最大数量',
            type: 'warning'
          })
          this.addButtonActive = false
          return
        }
        this.popoverArray1.unshift({
          flag: false
        })
        this.changeProtectCcData('blackAdd')
      } else if (this.blackWhiteChange === 'white') {
        if (this.whiteList.length === 20) {
          this.$message({
            showClose: true,
            message: '白名单已达到最大数量',
            type: 'warning'
          })
          this.addButtonActive = false
          return
        }
        this.popoverArray2.unshift({
          flag: false
        })
        this.changeProtectCcData('whiteAdd')
      }
    },
    changeProtectCcData(params) {
      if (params === 'blackAdd') {
        this.blackList.unshift({
          group: 'addNewList',
          value: {
            type: '',
            mode: '',
            content: '',
            remark: ''
          },
          order: ''
        })
      } else if (params === 'whiteAdd') {
        this.whiteList.unshift({
          group: 'addNewList',
          value: {
            type: '',
            mode: '',
            content: '',
            remark: ''
          },
          order: ''
        })
      }
    },
    cancelAdd() {
      this.addButtonActive = false
      if (this.blackWhiteChange === 'black') {
        this.blackList.splice(0, 1)
      } else if (this.blackWhiteChange === 'white') {
        this.whiteList.splice(0, 1)
      }
    },
    saveCcAddBlackData(row) {
      if (row.value.type === 'suffix') {
        row.value.content = this.suffixCache
      }
      if (row.value.type === '' || row.value.content === '') {
        this.$message({
          showClose: true,
          message: '类型或匹配内容不能为空',
          type: 'warning'
        })
        return
      }
      //数据类型验证，IP类型和URL类型
      const domainUrlReg = /^((http|ftp|https):\/\/)?[\w-_.]+(\/[\w-_]+)*\/?(.*)$/
      if (row.value.type === 'url') {
        if (
          !Verify.defaultUrl.test(row.value.content) &&
          !Verify.domain.test(row.value.content) &&
          !Verify.noProtocolUrl.test(row.value.content) &&
          !domainUrlReg.test(row.value.content)
        ) {
          this.$message({
            showClose: true,
            message: 'URL格式错误',
            type: 'warning'
          })
          return
        }
        if (row.value.content[0] !== '/') {
          const topDomainFlag = row.value.content.indexOf(
            this.domainName.slice(4, this.domainName.length - 1)
          )
          if (topDomainFlag === -1) {
            this.$message({
              showClose: true,
              message: '输入的域名部分有误，请与当前配置的域名保持一致',
              type: 'warning'
            })
            return
          }
        }
      } else if (row.value.type === 'ip') {
        if (!Verify.cidrREG.test(row.value.content) && !Verify.ipRangeReg.test(row.value.content)) {
          this.$message({
            showClose: true,
            message: 'IP格式错误',
            type: 'warning'
          })
          return
        }
      }
      //重复校验
      let state = 0
      this.blackList.forEach((v, i) => {
        if (
          v.value.content === row.value.content &&
          v.value.type === row.value.type
        ) {
          state++
        }
      })
      this.whiteList.forEach((v, i) => {
        if (
          v.value.content === row.value.content &&
          v.value.type === row.value.type
        ) {
          state++
        }
      })
      if (state > 1) {
        this.$message({
          showClose: true,
          message: '添加的数据在黑白名单中已存在',
          type: 'warning'
        })
        return
      }
      this.protectCcTableLoading = true
      const param = {
        type: row.value.type,
        content: row.value.content,
        mode: 'black'
      }
      const id = this.$route.params.id
      TaichiPlusResource.saveAddData(param, id)
        .then(response => {
          if (response.data.status.code === 1) {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.addButtonActive = false
            this.protectCcTableLoading = false
            this.getProtectCcData()
          }
        })
        .catch(response => {
          this.addButtonActive = false
          this.protectCcTableLoading = false
        })
    },
    delCcData(row) {
      this.protectCcTableLoading = true
      const id = row.id
      const domainId = this.$route.params.id
      TaichiPlusResource.delListData(id, domainId)
        .then(response => {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.protectCcTableLoading = false
            this.getProtectCcData()
        })
        .catch(response => {
          this.protectCcTableLoading = false
        })
    },
    saveCcEditkData(row) {
      //IP和 URL 格式验证
      const domainUrlReg = /^((http|ftp|https):\/\/)?[\w-_.]+(\/[\w-_]+)*\/?(.*)$/
      if (row.value.type === 'url') {
        if (
          !Verify.defaultUrl.test(row.value.content) &&
          !Verify.domain.test(row.value.content) &&
          !Verify.noProtocolUrl.test(row.value.content) &&
          !domainUrlReg.test(row.value.content)
        ) {
          this.$message({
            showClose: true,
            message: 'URL格式错误',
            type: 'warning'
          })
          return
        }
        if (row.value.content[0] !== '/') {
          const topDomainFlag = row.value.content.indexOf(
            this.domainName.slice(4, this.domainName.length - 1)
          )
          if (topDomainFlag === -1) {
            this.$message({
              showClose: true,
              message: '输入的域名部分有误，请与当前配置的域名保持一致',
              type: 'warning'
            })
            return
          }
        }
      } else if (row.value.type === 'ip') {
        if (!Verify.cidrREG.test(row.value.content) && !Verify.ipRangeReg.test(row.value.content)) {
          this.$message({
            showClose: true,
            message: 'IP格式错误',
            type: 'warning'
          })
          return
        }
      }
      //重复性校验
      let state = 0
      this.blackList.forEach((v, i) => {
        if (
          v.value.content === row.value.content &&
          v.value.type === row.value.type
        ) {
          state++
        }
      })
      this.whiteList.forEach((v, i) => {
        if (
          v.value.content === row.value.content &&
          v.value.type === row.value.type
        ) {
          state++
        }
      })
      if (state > 1) {
        this.$message({
          showClose: true,
          message: '添加的数据在黑白名单中已存在',
          type: 'warning'
        })
        return
      }
      // if (this.suffixCache === undefined || this.suffixCache === '') {
      //   this.suffixCache = row.value.content
      // }
      if (row.value.type === 'suffix') {
        row.value.content = this.suffixCache
      }
      if (row.value.type === '' || row.value.content === '') {
        this.$message({
          showClose: true,
          message: '类型或匹配内容不能为空',
          type: 'warning'
        })
        return
      }
      const id = row.id
      const domainId = this.$route.params.id
      const modeset = this.blackWhiteChange
      const params = {
        type: row.value.type,
        content: row.value.content,
        mode: modeset
      }
      this.protectCcTableLoading = true
      TaichiPlusResource.saveCcEditkData(id, domainId, params)
        .then(response => {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.edittingId = -1
            this.suffixCache = ''
            // sessionStorage.setItem('blackWhiteChange', this.blackWhiteChange)
            this.getProtectCcData()
        })
        .catch(response => {
          this.protectCcTableLoading = false
        })
    },
    visibleChangeFun() {
      if (this.firstLoading === true) {
        this.firstLoading = false
      }
    },
    saveCcAddWhiteData(row) {
      if (row.value.type === 'suffix') {
        row.value.content = this.suffixCache
      }
      if (row.value.type === '' || row.value.content === '') {
        this.$message({
          showClose: true,
          message: '类型或匹配内容不能为空',
          type: 'warning'
        })
        return
      }
      const domainUrlReg = /^((http|ftp|https):\/\/)?[\w-_.]+(\/[\w-_]+)*\/?(.*)$/
      if (row.value.type === 'url') {
        if (
          !Verify.defaultUrl.test(row.value.content) &&
          !Verify.domain.test(row.value.content) &&
          !Verify.noProtocolUrl.test(row.value.content) &&
          !domainUrlReg.test(row.value.content)
        ) {
          this.$message({
            showClose: true,
            message: 'URL格式错误',
            type: 'warning'
          })
          return
        }
        if (row.value.content[0] !== '/') {
          const topDomainFlag = row.value.content.indexOf(
            this.domainName.slice(4, this.domainName.length - 1)
          )
          if (topDomainFlag === -1) {
            this.$message({
              showClose: true,
              message: '输入的域名部分有误，请与当前配置的域名保持一致',
              type: 'warning'
            })
            return
          }
        }
      } else if (row.value.type === 'ip') {
        if (!Verify.cidrREG.test(row.value.content) && !Verify.ipRangeReg.test(row.value.content)) {
          this.$message({
            showClose: true,
            message: 'IP格式错误',
            type: 'warning'
          })
          return
        }
      }
      let state = 0
      this.blackList.forEach((v, i) => {
        if (
          v.value.content === row.value.content &&
          v.value.type === row.value.type
        ) {
          state++
        }
      })
      this.whiteList.forEach((v, i) => {
        if (
          v.value.content === row.value.content &&
          v.value.type === row.value.type
        ) {
          state++
        }
      })
      if (state > 1) {
        this.$message({
          showClose: true,
          message: '添加的数据在黑白名单中已存在',
          type: 'warning'
        })
        return
      }
      this.protectCcTableLoading = true
      const param = {
        type: row.value.type,
        content: row.value.content,
        mode: 'white'
      }
      const id = this.$route.params.id
      TaichiPlusResource.saveAddData(param, id)
        .then(response => {
          if (response.data.status.code === 1) {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.addButtonActive = false
            this.protectCcTableLoading = false
            this.getProtectCcData()
          }
        })
        .catch(response => {
          this.addButtonActive = false
          this.protectCcTableLoading = false
        })
    },
    clearContent(row) {
      console.log(row)
      row.value.content = ''
    },
    getProtectUrlList() {
      TaichiPlusResource.getProtectDomainList().then(response => {
        console.log('API run!')
          response.data.data.list.forEach((value, index) => {
            console.log(value.domain_id)
            if (value.domain_id === this.$route.params.id) {
              this.domainName = '设置：（' + value.domain + '）'
            }
          })
      })
      TaichiPlusResource.getProtectUrlList(this.$route.params.id).then(response => {
        if (response.data.data.tjkd_web_import_url_protect.urls === undefined) {
          response.data.data.tjkd_web_import_url_protect.urls = []
          return
        }
        this.urlProtectSwitchValue =
          response.data.data.tjkd_web_import_url_protect.status
        response.data.data.tjkd_web_import_url_protect.urls.forEach(
          (value, index) => {
            this.tags.push({
              name: value
            })
          }
        )
      })
    },
    handleChangeProtectUrlList(param) {
      if (param === false) {
        this.changeProtectUrlList()
      }
    },
    handleExpertChange() {
      if (this.firstLoading === true) {
        return
      }
      const [a, b, c, d] = [
        this.iprate.iprate_request,
        this.iprate.iprate_second,
        this.ipurlrate.ipurlrate_request,
        this.ipurlrate.ipurlrate_second
      ]
      const arr = [a, b, c, d]
      if (a === '' || b === '' || c === '' || d === '') {
        this.$message({
          showClose: true,
          message: '请求频率不能为空',
          type: 'warning'
        })
        return
      }
      if (a < 1 || a > 1000 || c < 1 || c > 1000) {
        this.$message({
          showClose: true,
          message: '请求数必须在1~1000之间',
          type: 'warning'
        })
        return
      }
      if (b < 1 || b > 60 || d < 1 || d > 60) {
        this.$message({
          showClose: true,
          message: '秒数必须在1~60之间',
          type: 'warning'
        })
        return
      }
      const isNum = arr.some((value, index) => isNaN(Number(value)))
      if (isNum) {
        this.$message({
          showClose: true,
          message: '请求频率必须为数字',
          type: 'warning'
        })
        return
      }
      this.expertSettingLoading = true
      this.changeProtectCcSetting()
    },
    changeProtectUrlList() {
      this.urlTagsLoading = true
      const domainId = this.$route.params.id
      const urlsMidValue = []
      this.tags.forEach((value, index) => {
        urlsMidValue.push(value.name)
      })
      const urlProtectSwitchValue = this.urlProtectSwitchValue
      TaichiPlusResource.changeProtectUrlList(domainId, {
        status: this.urlProtectSwitchValue,
        urls: urlsMidValue
      })
        .then(response => {
            this.urlProtectSwitchValue =
              response.data.data.tjkd_web_import_url_protect.status
            const urlArray = response.data.data.tjkd_web_import_url_protect.urls
            this.tags = []
            urlArray.forEach((value, index) => {
              this.tags.push({
                name: value
              })
            })
            this.urlTagsLoading = false
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
        })
        .catch(response => {
          this.urlTagsLoading = false
        })
    },
    addProtectUrl() {
      if (this.newAddUrl === '') {
        this.$message({
          showClose: true,
          message: 'URL不能为空',
          type: 'warning'
        })
        return
      }
      if (this.tags.length === 10) {
        this.$message({
          showClose: true,
          message: 'URL添加数量达到上限',
          type: 'warning'
        })
        return
      }
      let status = true
      this.tags.forEach((value, index) => {
        if (value.name === this.newAddUrl) {
          status = false
        }
      })
      if (status === false) {
        this.$message({
          showClose: true,
          message: '不能添加相同的URL地址',
          type: 'warning'
        })
        return
      }
      const domainUrlReg = /^((http|ftp|https):\/\/)?[\w-_.]+(\/[\w-_]+)*\/?(.*)$/
      if (
        !Verify.domain.test(this.newAddUrl) &&
        !Verify.defaultUrl.test(this.newAddUrl) &&
        !Verify.noProtocolUrl.test(this.newAddUrl) &&
        !domainUrlReg.test(this.newAddUrl)
      ) {
        this.$message({
          showClose: true,
          message: 'URL格式错误',
          type: 'warning'
        })
        return
      }
      if (this.newAddUrl[0] !== '/') {
        const topDomainFlag = this.newAddUrl.indexOf(
          this.domainName.slice(4, this.domainName.length - 1)
        )
        if (topDomainFlag === -1) {
          this.$message({
            showClose: true,
            message: '输入的域名部分有误，请与当前配置的域名保持一致',
            type: 'warning'
          })
          return
        }
      }
      this.urlTagsLoading = true
      const newAddUrl = this.newAddUrl
      const tags = this.tags
      const updateArr = []
      const domainId = this.$route.params.id
      updateArr.push(newAddUrl)
      this.tags.forEach((value, index) => {
        updateArr.push(value.name)
      })
      if (this.urlProtectSwitchValue === undefined) {
        this.urlProtectSwitchValue = 'off'
      }
      TaichiPlusResource.changeProtectUrlList(domainId, {
        status: this.urlProtectSwitchValue,
        urls: updateArr
      })
        .then(response => {
          if (response.data.status.code === 1) {
            const urlArray = response.data.data.tjkd_web_import_url_protect.urls
            this.tags = []
            urlArray.forEach((value, index) => {
              this.tags.push({
                name: value
              })
            })
            this.newAddUrl = ''
            this.urlTagsLoading = false
            this.$message({
              showClose: true,
              message: 'URL地址添加成功',
              type: 'success'
            })
          } else if (response.data.status.code === 1060) {
            this.$message({
              showClose: true,
              message: response.data.status.message,
              type: 'warning'
            })
          }
        })
        .catch(response => {
          this.urlTagsLoading = false
        })
    },
    getProtectCcSetting() {
      // Tab页切换
      const activeName = sessionStorage.getItem('activeName')
      if (activeName !== null) {
        this.activeName = activeName
      }
      TaichiPlusResource.getProtectCcSetting(
        this.$route.params.id
      ).then(response => {
        console.log(response)

          if (response.data.data.anti_cc.status === 'on') {
            this.protectCcTypeValue = response.data.data.anti_cc.type
          } else if (response.data.data.anti_cc.status === 'off') {
            this.protectCcTypeValue = 'off'
          }
          if (response.data.data.anti_cc.method === undefined) {
            return
          }
          this.protectObjectValue = response.data.data.anti_cc.method
          this.forbitIpValue = JSON.stringify(
            response.data.data.anti_cc.block_proxy
          )
          this.iprate.iprate_request = response.data.data.anti_cc.iprate_request
          this.iprate.iprate_second = response.data.data.anti_cc.iprate_second
          this.ipurlrate.ipurlrate_request =
            response.data.data.anti_cc.ipurlrate_request
          this.ipurlrate.ipurlrate_second =
            response.data.data.anti_cc.ipurlrate_second
          this.uaWhiteList = response.data.data.anti_cc.uawhitelist
          this.uaBlackList = response.data.data.anti_cc.uablacklist
          if (response.data.data.anti_cc.regex === 0) {
            this.regexComputed = false
          } else {
            this.regexComputed = true
          }
      })
    },
    changeProtectCcSetting(param) {
      if (this.firstLoading === true) {
        return
      }
      const domainId = this.$route.params.id
      const typeValue = this.protectCcTypeValue
      const params = {}
      if (this.protectCcTypeValue === 'off') {
        params.status = 'off'
      } else {
        params.status = 'on'
        params.type = typeValue
      }
      params.method = this.protectObjectValue
      params.block_proxy = this.forbitIpValue
      params.iprate_request = this.iprate.iprate_request
      params.iprate_second = this.iprate.iprate_second
      params.ipurlrate_request = this.ipurlrate.ipurlrate_request
      params.ipurlrate_second = this.ipurlrate.ipurlrate_second
      if (this.regexComputed === false) {
        params.regex = 0
      } else {
        params.regex = 1
      }
      params.uawhitelist = this.uaWhiteList
      params.uablacklist = this.uaBlackList
      TaichiPlusResource.changeProtectCcSetting(domainId, params)
        .then(response => {
          if (response.data.status.code === 1) {
            // this.protectCcTypeValue = response.data.data.type
            this.$message({
              showClose: true,
              message: response.data.status.message,
              type: 'success'
            })
            this.uaWhiteList = response.data.data.anti_cc.uawhitelist
            this.uaBlackList = response.data.data.anti_cc.uablacklist
            this.waittingToAddUA = ''
            this.expertSettingLoading = false
          }
        })
        .catch(response => {
          this.expertSettingLoading = false
        })
    },
    addBlackWhiteUa() {
      if (this.waittingToAddUA === '') {
        this.$message({
          showClose: true,
          message: '添加内容不能为空',
          type: 'warning'
        })
        return
      }
      if (
        this.blackWhiteSelectValue === 'blackList' &&
        this.uaBlackListTags.length === 10
      ) {
        this.$message({
          showClose: true,
          message: '黑名单数量达到上限',
          type: 'warning'
        })
        return
      } else if (
        this.blackWhiteSelectValue === 'whiteList' &&
        this.uaWhiteListTags.length === 10
      ) {
        this.$message({
          showClose: true,
          message: '白名单数量达到上限',
          type: 'warning'
        })
        return
      }
      this.firstLoading = false
      const notChineseReg = /[\u4e00-\u9fa5]/
      if (notChineseReg.test(this.waittingToAddUA)) {
        this.$message({
          showClose: true,
          message: 'UserAgent名单不能包含中文',
          type: 'warning'
        })
        return
      }
      let flag = true
      this.uaBlackListTags.forEach((value, index) => {
        if (value.name === this.waittingToAddUA) {
          flag = false
        }
      })
      this.uaWhiteListTags.forEach((value, index) => {
        if (value.name === this.waittingToAddUA) {
          flag = false
        }
      })
      if (flag === false) {
        this.$message({
          showClose: true,
          message: '不能添加已存在的名单',
          type: 'warning'
        })
        return
      }
      if (this.blackWhiteSelectValue === 'blackList') {
        this.uaBlackList.push(this.waittingToAddUA)
        this.changeProtectCcSetting()
      } else {
        this.uaWhiteList.push(this.waittingToAddUA)
        this.changeProtectCcSetting('uawhitelist')
      }
    },
    delUaBlackList(tag) {
      this.$confirm('确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.firstLoading = false
          this.uaBlackList.forEach((value, index) => {
            if (tag.name === value) {
              this.uaBlackList.splice(index, 1)
            }
          })
          this.changeProtectCcSetting()
        }).catch(() => {})
    },
    delUaWhiteList(tag) {
      this.$confirm('确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.firstLoading = false
          this.uaWhiteList.forEach((value, index) => {
            if (tag.name === value) {
              this.uaWhiteList.splice(index, 1)
            }
          })
          this.changeProtectCcSetting()
        }).catch(() => {})
    },
    handleRegexChange() {
      this.firstLoading = false
      this.changeProtectCcSetting()
    },
    blackWhiteChangeFun() {
      if (this.blackWhiteChange === 'black') {
        if (
          this.blackList.length !== 0 &&
          this.blackList[0].group === 'addNewList'
        ) {
          this.blackList.splice(0, 1)
          this.addButtonActive = false
        }
        this.blackWhiteChange = 'white'
      } else {
        if (
          this.whiteList.length !== 0 &&
          this.whiteList[0].group === 'addNewList'
        ) {
          this.whiteList.splice(0, 1)
          this.addButtonActive = false
        }
        this.blackWhiteChange = 'black'
      }
    },
    updateSuffix(a) {
      this.suffixCache = a
    },
    handleRecordOperate(operate, row, index) {
      switch (operate) {
        case 'deleteCancel':
          this.popoverArray1[index].flag = false
          break
        case 'deleteOk':
          this.popoverArray1[index].flag = false
          this.delCcData(row)
          break
      }
    },
    handleRecordOperate2(operate, row, index) {
      switch (operate) {
        case 'deleteCancel':
          this.popoverArray2[index].flag = false
          break
        case 'deleteOk':
          this.popoverArray2[index].flag = false
          this.delCcData(row)
          break
      }
    },
    goToCloudSpeed() {
      const id = this.$route.params.id
      window.location.href = `/console/cloud-speed#/websiteList/console/${id}/perform`
    }
    // goToHWWS() {
    //   const id = this.$route.params.id
    //   window.location.href = `/console/red-guard#/websiteList/console/${id}/basic`
    // }
  },
  computed: {
    ccBlackList() {
      return this.blackList
    },
    ccWhiteList() {
      return this.whiteList
    },
    uaWhiteListTags() {
      const array = []
      if (this.uaWhiteList === undefined) {
        this.uaWhiteList = []
      }
      this.uaWhiteList.forEach((value, index) => {
        array.push({
          name: value
        })
      })
      return array
    },
    uaBlackListTags() {
      const array = []
      if (this.uaBlackList === undefined) {
        this.uaBlackList = []
      }
      this.uaBlackList.forEach((value, index) => {
        array.push({
          name: value
        })
      })
      return array
    }
  },
  created() {
    this.getProtectCcSetting()
    this.getProtectCcData()
    this.getProtectUrlList()
    this.getHwwsStatus()
  },
  mounted() {
    // this.getProtectCcData(this.$route.params.id)
  },
  data() {
    return {
      hwwsStatus: '',
      firstLoading: true,
      expertSettingLoading: false,
      protectCcTableLoading: false,
      urlTagsLoading: false,
      edittingId: -1,
      whiteList: [],
      regexComputed: false,
      blackWhiteChange: 'black',
      addButtonActive: false,
      activeName: 'first',
      newAddUrl: '',
      protectCcCacheType: [
        { label: 'IP', value: 'ip' },
        { label: 'URL', value: 'url' },
        { label: '后缀名', value: 'suffix' }
      ],
      protectCcType: [
        { value: 'off', label: 'OFF' },
        { value: 'default', label: '默认' },
        { value: 'normal', label: '普通' },
        { value: 'strict', label: '严格' },
        { value: 'captcha', label: '验证码' }
      ],
      radioButton: 'black',
      protectCcTypeValue: '',
      urlProtectSwitch: [
        {
          label: 'ON',
          value: 'on'
        },
        {
          label: 'OFF',
          value: 'off'
        }
      ],
      urlProtectSwitchValue: 'off',
      protectObject: [
        { label: '全部', value: 'all' },
        { label: 'GET', value: 'get' },
        { label: 'POST', value: 'post' }
      ],
      protectObjectValue: 'all',
      forbitIp: [{ label: '禁止', value: '1' }, { label: '不禁止', value: '0' }],
      forbitIpValue: '0',
      iprate: { iprate_request: 1000, iprate_second: 3 },
      ipurlrate: { ipurlrate_request: 1000, ipurlrate_second: 3 },
      regex: 0,
      blackWhiteSelect: [
        { label: '黑名单', value: 'blackList' },
        { label: '白名单', value: 'whiteList' }
      ],
      blackWhiteSelectValue: 'blackList',
      uaWhiteList: [],
      uaBlackList: [],
      waittingToAddUA: '',
      tags: [],
      ccTip: [
        '1.默认：该模式下，只在监测到明显的流量异常时才会触发拦截动作，避免误杀',
        '2.普通：根据实时流量，智能匹配防御模型，对应采取预设拦截动作，建议有攻击时开启此模式',
        '3.严格：对一切疑似攻击的流量进行拦截，存在一定误伤，建议普通模式防御效果不佳时开启',
        '4.验证码：对所有访问行为强制验证码验证，100%拦截攻击行为，但对用户体验影响较大',
        '5.IP支持段添加，添加的格式有两种，第一种样式是CIDR格式，例如192.168.0.0/18，第二种样式示例如1.1.2.2-1.1.255.255',
        '6.URL支持三种添加格式，格式示例：http(s)://www.yundun.com/ceshi.html， www.yundun.com/ceshi.html， /ceshi.html',
        '7.白名单中的规则数上限为20条，规则内容YUNDUN不做防御，直接放行',
        '8.黑名单中的规则数上限为20条，规则内容YUNDUN直接拦截'
      ],
      labelPosition: 'rigth',
      whiteList: [],
      blackList: [],
      edittingCache: {},
      popoverArray1: [],
      popoverArray2: [],
      domainName: ''
    }
  }
}
</script>
<style>
div.protect-cc-title-right .el-tag__close.el-icon-close {
  margin:0 0 4px 26px;
}
div.protect-cc-title-right .el-tag .el-icon-close {
  top:2px;
}
.protect-cc-title-right .expert-console-form .el-form-item__label{
  min-width: 270px;
}
</style>
<style scoped>
.clear {
  clear: both;
}

.fr {
  float: right;
}
.fl {
  float: left;
}
.mr {
  margin-right: 16px;
}
.el-form-item__label {
  margin-right: 12px;
}
.protect-cc-title-left {
  width: 150px;
  float: left;
  line-height: 30px;
  font-size: 16px;
  font-weight: 100;
  color: #333333;
  text-align: right;
  margin: 20px 0;
}
.protect-cc-title-right {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  float: left;
  margin:19px 20px 0 24px;
}
.protect-cc {
  padding: 4px 0;
  min-width: 928px;
  margin: 20px;
  background-color: #f7f7f7;
}
.label-fix {
  margin: 12px 0;
  background-color: #f7f7f7;
  padding: 30px 0;
  min-width: 928px;
}
.blackWhiteListTip {
  display: inline-block;
}
.black {
  border-color: #ccc;
}
.protect-cc-body,.url-protect-body {
  padding-left: 174px;
}
.expert-console-form{
  max-width: 750px;
}
.cc-tip {
  line-height: 20px;
  margin: 20px 40px 20px 0;
}
.input-fix {
  width:100px;
}
.form-span {
  display: inline-block;
  line-height: 30px;
  font-size: 14px;
  margin:0 12px;
}
.black-list-input {
  width: 200px;
}
span.el-tag{
  margin: 12px 12px;
}
.black-list {
  float: left;
  width:100px;
}
.list-white-title {
  float: left;
  margin: 9px 16px 0 160px;
  font-size: 14px;
}
.list-black-title {
  float: left;
  margin: 9px 16px 0 120px;
  font-size: 14px;
}
.url-protect-title {
  float:left;
  font-size: 16px;
  height:50px;
  line-height: 50px;
  text-align: center;
  width: 10%;
}
.url-protect-title-right {
  float: left;
  width:60%;
  line-height: 50px;
  padding-left: 20px;
}
.url-protect-title-input {
  max-width: 300px;
  margin-right: 20px;
  margin-top: 36px;
}
.url-label-fix {
  margin:10px auto 10px;
  width:100%;
}
.url-tag {
  width:50%;
  min-height: 100px;
}
.addNewBlackWhiteListBtn {
  position: relative;
  top: 1px;
  left:12px;
}
.yun-prior {
  position: absolute;
  z-index: 50;
  transform: translate(-26px,-10px);
}
.el-icon-delete {
  cursor: pointer;
  font-size: 15px;
}
.url-list-title {
  font-size: 16px;
  line-height: 36px;
}
.protect-cc-title-right a, .protect-cc-title-right .go-other-page {
  font-size: 16px;
  color: rgb(60,151,232);
  cursor: pointer;
}
.cloud-speed-item, .protect-cc.cloud-ids {
  background-color: #f7f7f7;
  margin: 12px 0;
  border-bottom: 1px solid #e7e7e7;
}
.bg-suround {
  background-color: #f7f7f7;
  margin: 12px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #e7e7e7;
}
.bottom-layout {
  margin-bottom: 70px;
}
.surrounder {
  background-color: #f7f7f7;
  padding: 20px 0;
  margin: 12px 0;
  min-width: 948px;
  border-bottom: 1px solid #e7e7e7;
}
div.el-tabs__content {
  border: 0;
}
div.pro-background {
  width: 230px;
  line-height: 57px;
  text-align: right;
  height: 57px;
  background: url('../../../assets/images/Pro.png') no-repeat left;
}
.pro-right-text {
  line-height: 97px;
  float: left;
  margin-left: 30px;
}
div.pro-surround {
  width:100%;
  float:left;
  background-color: rgb(213, 211, 218);
  border: 2px solid rgb(189,184,197);
}
div.single-line {
  height: 2px;
  border-top: 2px solid rgb(189,184,197);
}
.el-form-item_label {
  margin-right: 20px;
}
.cc-protect-title {
  width: 230px;
  text-align: right;
  font-size: 18px;
}
.cc-protect-body {
  margin-left: 30px;
}
.select-layout {
  margin: 20px 20px 0 0;
}
.user-surround {
  width:100%;
  float:left;
  background-color: rgb(247, 247, 247);
  margin-top:12px;
  border-bottom: 1px solid #e7e7e7;
}
</style>
