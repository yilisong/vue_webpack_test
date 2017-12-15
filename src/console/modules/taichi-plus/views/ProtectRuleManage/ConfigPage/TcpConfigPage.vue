<template lang="html">
  <div>
    <ConsolePageLayout title="TCP防护设置">
      <div class="black-white-list outer-surround" v-loading="ccSetLabelLoading">
        <el-row>
          <el-col>
            <div class="wrap-title">
              <h3 class="title-top-second">非网站的IP黑白名单</h3>
              <p class="title-top-third">对四层转发业务进行IP连接控制</p>
              <el-select @change="blackWhiteSwitchFunPre" class="black-white-switch" v-model="unWebsiteRule.black_white_ip_status" placeholder="请选择">
                <el-option v-for="item in switchSelect" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="black-white-table">
              <div class="radio-label-layout">
                <el-radio-group size="small" v-model="radioButton" @change="blackWhiteChangeFun">
                  <el-radio-button label="black">黑名单</el-radio-button>
                  <i class="yun-icon yun-prior"></i>
                  <el-radio-button label="white">白名单</el-radio-button>
                </el-radio-group>
                <el-button class="add-btn" @click="addBlackWhiteItem" :disabled="blackWhiteListAdding">新增</el-button>
              </div>
              <el-table :data="blackWhiteListData" style="width: 100%" class="list-table" v-loading="blackWhiteListLoading">
                <el-table-column label="IP" align="left">
                  <template scope="scope">
                    <!-- 添加数据状态 -->
                    <div v-if="scope.row.type === 'add'">
                        <el-input size="small" v-model.trim="scope.row.ip_string" placeholder="0.0.0.0"></el-input>
                    </div>
                    <!-- 显示状态 -->
                    <div v-else>
                      <!-- 显示且编辑状态 -->
                      <div v-if="editingId === scope.row.id">
                        <el-input size="small" v-model.trim="scope.row.ip_string"></el-input>
                      </div>
                      <!-- 显示且未编辑状态 -->
                      <div v-else>
                        <span>{{scope.row.ip_string}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="right">
                  <template scope="scope">
                    <div v-if="scope.row.type === 'add'">
                      <el-button type="text" @click="cancelAdd">取消</el-button>
                      <el-button type="text" @click="addPlusBlackWhiteList(scope.row)">保存</el-button>
                    </div>
                    <div v-else>
                      <div v-show="editingId === scope.row.id">
                        <el-button type="text" @click="cancelEdit(scope.row)">取消</el-button>
                        <el-button type="text" @click="changeBlackWhiteList(scope.row)">保存</el-button>
                      </div>
                      <div v-show="editingId !== scope.row.id">
                        <el-button type="text" @click="handleEditBegin(scope.row)">编辑</el-button>
                        <span class="shu-xian">|</span>
                        <el-button type="text" @click="confirmDel(scope.row)"><i class="el-icon-delete"></i></el-button>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="cc-protect outer-surround" v-loading="ccSetLabelLoading">
              <div class="wrap-title">
                <h3 class="title-top-second">非网站的CC防护</h3>
                <p class="title-top-third">对四层转发业务进行CC攻击拦截配置</p>
                <el-select @change="ccProtectSwitchPre" class="black-white-switch" v-model="unWebsiteRule.cc_protect_status" placeholder="请选择">
                  <el-option v-for="item in switchSelect" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div style="margin:12px 0;">
                <span class="title-in-form">触发阈值上限</span>
                <el-form label-width="180px" style="display:inline-block">
                  <el-form-item label="TCP并发连接数：">
                    <el-input v-model="unWebsiteRule.total_connections" size="small" @blur="saveUnWebsiteRule"></el-input>
                  </el-form-item>
                  <el-form-item label="新建TCP连接数：">
                    <el-input v-model="unWebsiteRule.total_new_connections" class="input-in-line" size="small"
                     @blur="saveUnWebsiteRule"></el-input>
                    <span>/ 秒数：</span>
                    <el-input v-model="unWebsiteRule.total_new_time" class="input-in-line" size="small" @blur="saveUnWebsiteRule"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div>
                <span class="title-in-form">触发阈值后动作</span>
                <el-form label-width="180px" style="display:inline-block">
                  <el-form-item label="单IP TCP连接阈值：">
                    <el-input v-model="unWebsiteRule.ip_connections" size="small" @blur="saveUnWebsiteRule"></el-input>
                  </el-form-item>
                  <el-form-item label="单IP 新建TCP连接数：">
                    <el-input v-model="unWebsiteRule.ip_new_connections" class="input-in-line" size="small" @blur="saveUnWebsiteRule"></el-input>
                    <span>/ 秒数：</span>
                    <el-input v-model="unWebsiteRule.ip_new_time" class="input-in-line" size="small" @blur="saveUnWebsiteRule"></el-input>
                  </el-form-item>
                  <el-form-item label="超阈值IP阻断时间：">
                    <el-input v-model="unWebsiteRule.block_time" class="input-in-line" size="small" @blur="saveUnWebsiteRule"></el-input>&nbsp;秒
                  </el-form-item>
                  <el-form-item label="屏蔽TCP空连接：">
                    <el-switch @change="tcpLinkSwitch" v-model="unWebsiteRule.block_empty_tcp_status" on-color="#13ce66" off-color="#ccc" on-value="1" off-value="0">
                    </el-switch>
                  </el-form-item>
                  <el-form-item label="仅允许访问地区：">
                      国家：
                      <el-select v-model="allow_country_select" placeholder="请选择" size="small">
                        <el-option v-for="item in countryList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                      <el-button type="primary" @click="saveCountryAndProvince" size="small" class="add-area-btn">添加</el-button><br />
                      <div v-if="allow_country_select === 'CN'">
                        省份：
                        <el-select v-model="allow_province_select" placeholder="请选择" size="small">
                          <el-option v-for="item in this.provinceList" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </div><br />
                      <el-tag v-for="tag in tagsArray" :key="tag.name" :closable="true" @close="confirmDelTags(tag)">
                        {{tag.name}}
                      </el-tag>
                  </el-form-item>
                </el-form>
              </div>
      </div>
    </ConsolePageLayout>
  </div>

</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import TaichiPlusResource from '../../../resource/TaichiPlusResource'
import Verify from 'common/utils/verify'
export default {
  components: {
    ConsolePageLayout
  },
  data() {
    return {
      ccSetLabelLoading: false,
      blackWhiteListLoading: false,
      test:'',
      test2: {},
      radioButton:'black',
      blackWhiteListData: [],
      blackList: [],
      whiteList: [],
      blackWhiteSwitch:'1',
      editingId: -1,
      countryList: [],
      provinceList: [],
      popoverArray1: [],
      unWebsiteRule: {
        cc_protect_status: 0,
        total_connections: 4000,
        total_new_connections: 1000,
        total_new_time: 4,
        ip_connections: 10,
        ip_new_connections: 20,
        ip_new_time: 2,
        block_time: 120,
        block_empty_tcp_status: 0,
        allow_country: [],
        allow_province: [],
        black_white_ip_status: ''
      },
      allow_country_select: '',
      allow_province_select: '',
      edittingCache: {},
      blackWhiteListAdding: false,
      blackListStatusInitFlag: false,
      ccProtectStatusFlag: false,
      switchSelect: [{
        value: '1',
        label: 'ON'
      },{
        value: '0',
        label: 'OFF'
      }]
    }
  },
  computed: {
    tagsArray() {
      const midArray = []
      if (this.unWebsiteRule.allow_country !== null) {
        this.unWebsiteRule.allow_country.forEach((value, index) => {
          // 中国不要，省份直接顶，和外国国家名处于同一层级
          if (value === 'CN') {
            return
          }
          this.countryList.forEach((value2, index) => {
            if (value2.value === value) {
              midArray.push({
                name: value2.label
              })
            }
          })
        })
      }
      if (this.unWebsiteRule.allow_province !== null) {
        this.unWebsiteRule.allow_province.forEach((value, index) => {
          this.provinceList.forEach((value2, index2) => {
            if (value2.value === value) {
              midArray.push({
                name: '中国-' + value2.label
              })
            }
          })
        })
      }
      return midArray
    }
  },
  created() {
    this.getBlackWhiteList()
    this.getCountryList()
    this.getUnWebsiteRule()
    this.getProvinceList()
  },
  methods: {
    confirmDelTags(tag) {
      this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delTags(tag)
        }).catch(() => {
        })
    },
    delTags(tag) {
      const index = tag.name.indexOf('-')
      let paramValue = ''
      if (index !== -1) {
        // 这里面全部是中国的省份
        const provinceName = tag.name.slice(index + 1, tag.name.length)
        this.provinceList.forEach((v, i) => {
          if (v.label === provinceName) {
            paramValue = v.value
          }
        })
        this.unWebsiteRule.allow_province.forEach((v, i) => {
          if (v === paramValue) {
            this.unWebsiteRule.allow_province.splice(i, 1)
          }
        })
        TaichiPlusResource.saveUnWebsiteRule({
          package_id: this.$route.params.id,
          allow_country: this.unWebsiteRule.allow_country,
          allow_province: this.unWebsiteRule.allow_province
        }).then(response => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        }).catch(response => {
          this.getUnWebsiteRule()
        })
      } else {
        // 这里面全是外国国家
        this.countryList.forEach((v, i) => {
          if (v.label === tag.name) {
            paramValue = v.value
          }
        })
        this.unWebsiteRule.allow_country.forEach((v, i) => {
          if (v === paramValue) {
            this.unWebsiteRule.allow_country.splice(i, 1)
          }
        })
        TaichiPlusResource.saveUnWebsiteRule({
          package_id: this.$route.params.id,
          allow_country: this.unWebsiteRule.allow_country,
          allow_province: this.unWebsiteRule.allow_province
        }).then(response => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        }).catch(response => {
          this.getUnWebsiteRule()
        })
      }
    },
    handleEditBegin(row) {
      this.editingId = row.id
      this.edittingCache = JSON.parse(JSON.stringify(row))
    },
    cancelEdit(row) {
      this.editingId = -1
      for (const key in this.edittingCache) {
        row[key] = this.edittingCache[key]
      }
    },
    blackWhiteSwitchFunPre(param) {
      this.blackListStatusInitFlag ? this.blackWhiteSwitchFun(param) : this.blackListStatusInitFlag = true
    },
    blackWhiteSwitchFun(param) {
      this.unWebsiteRule.black_white_ip_status = param
      this.saveUnWebsiteRule()
    },
    tcpLinkSwitch(param) {
      this.unWebsiteRule.block_empty_tcp_status = param
      this.saveUnWebsiteRule()
    },
    ccProtectSwitchPre(param) {
      this.ccProtectStatusFlag ? this.ccProtectSwitch(param) : this.ccProtectStatusFlag = true
    },
    ccProtectSwitch(param) {
      this.unWebsiteRule.cc_protect_status = param
      this.saveUnWebsiteRule()
    },
    changeBlackWhiteList(row) {
      if (row.ip_string === '') {
        this.$message({
          showClose: true,
          message: 'IP不能为空',
          type: 'warning'
        })
        return
      }
      if (!Verify.ipReg.test(row.ip_string)) {
        this.$message({
          showClose: true,
          message: 'IP格式不正确',
          type: 'warning'
        })
        return
      }
      if (Verify.ipReg192.test(row.ip_string) ||
        Verify.ipReg10.test(row.ip_string) ||
        Verify.ipReg172.test(row.ip_string)) {
          this.$message({
            showClose: true,
            message: 'IP不能添加私网IP',
            type: 'warning'
          })
          return
        }
        // 重复性校验开始
        const allList = this.blackList.concat(this.whiteList)
        let flag = 0
        allList.forEach((value, index) => {
          if (row.ip_string === value.ip_string) {
            flag++
          }
        })
        if (flag > 1) {
          this.$message({
            showClose: true,
            message: 'IP已存在',
            type: 'warning'
          })
          return
        }
      TaichiPlusResource.changeBlackWhiteList({
        ip_id: row.id,
        package_id: this.$route.params.id,
        ip_string: row.ip_string,
        type:  this.radioButton === 'black' ? 2 : 1
      }).then(response => {
        this.$message({
          showClose: true,
          message: '保存成功',
          type: 'success'
        })
        this.editingId = -1
        this.getBlackWhiteList()
      })
    },
    saveCountryAndProvince() {
      if (this.allow_country_select === '') {
        this.$message({
          showClose: true,
          message: '国家不能为空',
          type: 'warning'
        })
        return
      }
      if (this.allow_country_select === 'CN' && this.allow_province_select === '') {
        this.$message({
          showClose: true,
          message: '省份不能为空',
          type: 'warning'
        })
        return
      }
      const params = this.unWebsiteRule
      // 避免两个数组为null，初始化
      if (params.allow_country === null) {
        params.allow_country = []
      }
      if (params.allow_province === null) {
        params.allow_province = []
      }
      if (params.allow_province.length + params.allow_country.length >= 20) {
        this.$message({
          showClose: true,
          message: '最多添加20个国家或省份',
          type: 'warning'
        })
        return
      }
      if (this.allow_country_select === 'CN') {
        // 如果国家是中国，只需要存省份，不需要存国家
        params.allow_province.push(this.allow_province_select)
      } else {
        //如果是外国，只需要存国家，不需要存省份
        params.allow_country.push(this.allow_country_select)
      }
      TaichiPlusResource.saveUnWebsiteRule({
        package_id: this.$route.params.id,
        allow_country: params.allow_country,
        allow_province: params.allow_province
      }).then(response => {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        this.allow_country_select = ''
        this.allow_province_select = ''
        this.getUnWebsiteRule()
      }).catch(response => {
        this.getUnWebsiteRule()
      })
    },
    addPlusBlackWhiteList(row) {
      if (row.ip_string === '') {
        this.$message({
          showClose: true,
          message: 'IP不能为空',
          type: 'warning'
        })
        return
      }
      if (!Verify.ipReg.test(row.ip_string)) {
        this.$message({
          showClose: true,
          message: 'IP格式不正确',
          type: 'warning'
        })
        return
      }
      if (Verify.ipReg192.test(row.ip_string) ||
        Verify.ipReg10.test(row.ip_string) ||
        Verify.ipReg172.test(row.ip_string)) {
          this.$message({
            showClose: true,
            message: 'IP不能添加私网IP',
            type: 'warning'
          })
          return
        }
      // 重复性校验开始
      const allList = this.blackList.concat(this.whiteList)
      let flag = 0
      allList.forEach((value, index) => {
        if (row.ip_string === value.ip_string) {
          flag++
        }
      })
      if (flag > 1) {
        this.$message({
          showClose: true,
          message: 'IP已存在',
          type: 'warning'
        })
        return
      }
      const params = {
        package_id: this.$route.params.id,
        ip_string: row.ip_string,
        type: this.radioButton === 'black' ? 2 : 1
      }
      TaichiPlusResource.addPlusBlackWhiteList(params).then(response => {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        this.getBlackWhiteList()
        this.blackWhiteListAdding = false
      })
    },
    blackWhiteChangeFun(tab) {
      if (this.blackWhiteListData[0]) {
        if (this.blackWhiteListData[0].type === 'add') {
          this.blackWhiteListData.splice(0, 1)
          // 取消添加行为，删除原黑白分页的添加单项，将添加开关的状态禁用状态关闭
          this.blackWhiteListAdding = false
        }
      }
      if (this.radioButton === 'black') {
        this.blackWhiteListData = this.blackList
      } else {
        this.blackWhiteListData = this.whiteList
      }
    },
    confirmDel(row) {
      this.$confirm('确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delBlackWhiteList(row)
        }).catch(() => {
        })
    },
    delBlackWhiteList(row) {
      const params = {
        ip_id: row.id,
        package_id:  this.$route.params.id
      }
      TaichiPlusResource.delBlackWhiteList(params).then(response => {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
        this.getBlackWhiteList()
      })
    },
    getBlackWhiteList() {
      this.blackWhiteListLoading = true
      const params = {
        package_id: this.$route.params.id
      }
      TaichiPlusResource.getPlusBlackWhiteList(params).then(response => {
        this.blackList = response.data.data.black_ip_list
        this.whiteList = response.data.data.white_ip_list
        if (this.radioButton === 'black') {
          this.blackWhiteListData = this.blackList
        } else {
          this.blackWhiteListData = this.whiteList
        }
        this.blackWhiteListLoading = false
      }).catch(response => {
        this.blackWhiteListLoading = false
      })
    },
    addBlackWhiteItem() {
      if (this.blackWhiteListData.length > 19) {
        this.$message({
          showClose: true,
          message: '黑白名单数量最多各20个',
          type: 'warning'
        })
        return
      }
      this.blackWhiteListAdding = true
      this.blackWhiteListData.unshift({
        id: -1,
        ip_string: '',
        type: 'add'
      })
    },
    cancelAdd() {
      this.blackWhiteListData.splice(0,1)
      this.blackWhiteListAdding = false
    },
    saveUnWebsiteRule() {
      // 前端数据格式校验开始
      const a = this.unWebsiteRule
      if (isNaN(a.total_connections) || isNaN(a.total_new_connections) ||
    isNaN(a.total_new_time) || isNaN(a.ip_connections) || isNaN(a.ip_new_connections) ||
  isNaN(a.ip_new_time) || isNaN(a.block_time)) {
      this.$message({
        showClose: true,
        message: '配置数据必须为数字',
        type: 'error'
      })
      return
    }
    if (a.total_connections < 1 || a.total_connections > 99999999) {
      this.$message({
        showClose: true,
        message: 'TCP并发连接数可输入范围为1～99999999',
        type: 'error'
      })
      return
    }
    if (a.total_new_connections < 1 || a.total_new_connections > 100000) {
      this.$message({
        showClose: true,
        message: '新建TCP连接数可输入范围为1～100000',
        type: 'error'
      })
      return
    }
    if (a.total_new_time < 1 || a.total_new_time > 20 || a.ip_new_time < 1 ||
    a.ip_new_time > 20) {
      this.$message({
        showClose: true,
        message: '秒数可输入范围为1～20',
        type: 'error'
      })
      return
    }
    if (a.ip_connections < 1 || a.ip_connections > 1000) {
      this.$message({
        showClose: true,
        message: '单IP TCP连接阈值可输入范围为1～1000',
        type: 'error'
      })
      return
    }
    // 这个数值范围被取消，可以任意输入数字
    // if (a.ip_new_connections < 1 || a.ip_new_connections > 100) {
    //   this.$message({
    //     showClose: true,
    //     message: '单IP新建TCP连接数可输入范围为1～100',
    //     type: 'error'
    //   })
    //   return
    // }
    if (a.block_time < 1 || a.block_time > 3600) {
      this.$message({
        showClose: true,
        message: '超阈值IP阻断时间可输入范围为1～3600',
        type: 'error'
      })
      return
    }
      this.ccSetLabelLoading = true
      this.unWebsiteRule.package_id = this.$route.params.id
      TaichiPlusResource.saveUnWebsiteRule(this.unWebsiteRule).then(response => {
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
        this.ccSetLabelLoading = false
      }).catch(response => {
        this.getUnWebsiteRule()
        this.ccSetLabelLoading = false
      })
    },
    getUnWebsiteRule() {
      this.ccSetLabelLoading = true
      TaichiPlusResource.getUnWebsiteRule({
        package_id: this.$route.params.id
      }).then(response => {
        this.unWebsiteRule = response.data.data
        this.ccSetLabelLoading = false
      }).catch(response => {
        this.ccSetLabelLoading = false
      })
    },
    getCountryList() {
      TaichiPlusResource.getCountryList().then(response => {
        response.data.data.forEach((v, i) => {
          this.countryList.push({
            value: v.country_code,
            label:v.country_name
          })
        })
      })
    },
    getProvinceList() {
      TaichiPlusResource.getCountryList({
        country_code: 'CN'
      }).then(response => {
        response.data.data.forEach((v, i) => {
          this.provinceList.push({
            value: v.province_code,
            label:v.province_name
          })
        })
      })
    }
  }
}
</script>

<style scope>
.outer-surround {
   background-color: #f7f7f7;
   padding-bottom: 20px;
 }
 .yun-prior {
   position: absolute;
   z-index: 50;
   transform: translate(-26px,-10px);
 }
 .title-top-second {
   /*margin: 26px 0 18px 26px;*/
   display: inline-block;
   height: 70px;
   line-height: 70px;
   color: #333333;
   text-align: right;
   width: 170px;
   font-weight: normal;
   font-size: 14px;
 }
 .title-top-third {
   display: inline-block;
   margin-left: 20px;
   font-weight: 330;
 }
 .black-white-table {
   margin-left: 190px;
   /*width: 700px;*/
   margin-right: 12px;
 }
 .list-table {
   margin-top: -1px;
   z-index: 1000;
 }
 .el-button.add-btn {
   margin: 0 0 0 8px;
 }
 .black-white-switch {
   float: right;
   margin: 22px 12px 12px 0;
 }
 .title-in-form {
   width: 170px;
   font-weight: 330;
   text-align: right;
   display: inline-block;
   float: left;
   margin-top: 6px;
   font-size: 14px;
 }
 .input-in-line.el-input {
   width: 100px;
 }
 .cc-protect {
   margin-top: 20px;
 }
 span.el-tag {
   margin-right: 12px;
 }
 .radio-label-layout {
   margin:12px 0 12px 0;
 }
 .wrap-title {
   border-bottom: 1px solid #e7e7e7;
 }
 label.el-radio-button {
   span {
     width:84px;
   }
 }
 .el-radio-button__orig-radio:checked+span.el-radio-button__inner {
   background-color: #eaf4fc;
   color: #333;
 }
 .el-radio-button--small span.el-radio-button__inner {
   padding-top: 9px;
 }
 .shu-xian {
   margin: 0 9px;
 }
 label.el-form-item__label {
   font-size: 12px;
   font-weight: 330;
 }
 /*.el-button.add-area-btn {
   margin-left: 8px;
 }*/
</style>
