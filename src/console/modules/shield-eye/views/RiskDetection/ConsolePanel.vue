<template>
<console-page-layout :title="`控制台 - ${$route.query.domain}`">
  <div class="block">
    <el-row :gutter="20">
      <el-col class="title"
        :span="3">
        篡改监控
      </el-col>
      <el-col class="sub-title"
        :span="15">
        实时监测整个网站中所包含的异常链接，如黑链、无响应链接等异常链接
      </el-col>
      <el-col :span="6">
        <el-select v-model="tamper.status"
           class="pull-right"
          :placeholder="switcher.get(this.tamper.status)"
          @change="handleStatusChange({
                     setting_group: 'tamper',
                     status: tamper.status
                     })">
          <el-option :label="switcher.get(0)"
            :value="0"></el-option>
          <el-option :label="switcher.get(1)"
            :value="1"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <template v-if="!isIp">
    <hr class="separator" />
    <el-row :gutter="20">
      <el-col class="title"
        :span="3">
        源服务器IP
      </el-col>
      <el-col :span="8">
        <el-input v-model="tamper.sourceIp"
          @blur="verify.ipReg.test(tamper.sourceIp) ? handleContentChange({
          setting_group: 'tamper',
          source_ip: tamper.sourceIp
          }) : messageEmitter('源IP格式错误')"></el-input>
      </el-col>
    </el-row>
    <el-row class="end-row" :gutter="20">
      <el-col class="title"
        :span="3">
        篡改处理方式
      </el-col>
      <el-col :span="15">
        <el-radio-group v-model="tamper.mode"
          @change="handleContentChange({
          setting_group: 'tamper',
          source_ip: tamper.sourceIp,
          pattern: tamper.mode
          })">
          <el-radio :label="0">不处理</el-radio>
          <template v-if="!tamper.useRedGuard || !tamper.useMirror">
            <el-tooltip effect="light" placement="top-start">
              <div slot="content">
                <template v-if="!tamper.useRedGuard && !tamper.useMirror">
                  请开启
                  <a href="/console/red-guard">红网卫士</a>, 并创建
                  <a href="/console/double-mirror">替身镜像</a>
                </template>
                <template v-else-if="!tamper.useRedGuard">
                  请开启
                  <a href="/console/red-guard">红网卫士</a>
                </template>
                <template v-else-if="!tamper.useMirror">
                  请创建
                  <a href="/console/double-mirror">替身镜像</a>
                </template>
              </div>
              <el-radio :label="1" disabled>联动安全替身</el-radio>
            </el-tooltip>
          </template>
          <template v-else>
            <el-radio :label="1">联动安全替身</el-radio>
          </template>
        </el-radio-group>
      </el-col>
    </el-row>
    </template>
  </div>
  <div class="block">
    <el-row :gutter="20">
      <el-col class="title"
        :span="3">
        敏感词监控
      </el-col>
      <el-col class="sub-title"
        :span="15">
        实时监测整个网站中存在的敏感信息
      </el-col>
      <el-col :span="6">
        <el-select v-model="sensitiveWord.status"
           class="pull-right"
          :placeholder="switcher.get(this.sensitiveWord.status)"
          @change="handleStatusChange({
                     setting_group: 'sensitive_word',
                     status: sensitiveWord.status
                     })">
          <el-option :label="switcher.get(0)"
            :value="0"></el-option>
          <el-option label="默认词库模式"
            :value="1"></el-option>
          <el-option label="自定义词库模式"
            :value="2"></el-option>
          <el-option label="混合词库模式"
            :value="3"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <hr class="separator" />
    <el-row :gutter="20">
      <el-col :push="3"
        :span="21">
        <Tip :content="sensitiveWord.tipContent" />
      </el-col>
    </el-row>
    <el-row class="end-row" :gutter="20">
      <el-col class="title"
        :span="3">
        自定义敏感词
      </el-col>
      <el-col :span="21">
        <el-input type="textarea"
          :rows="2"
          :max="320"
          placeholder="请输入需要监控的敏感词，多个敏感词使用逗号分割，最多320个字符"
          @blur="handleContentChange({
          setting_group: 'sensitive_word',
          customer_word: sensitiveWord.customWord
          })"
          v-model="sensitiveWord.customWord">
        </el-input>
      </el-col>
    </el-row>
  </div>
  <div class="block">
    <el-row :gutter="20">
      <el-col class="title"
        :span="3">
        关键词
      </el-col>
      <el-col class="sub-title"
        :span="15">
        实时监测整个网站中的关键词是否缺失
      </el-col>
      <el-col :span="6">
        <el-select v-model="keyword.status"
           class="pull-right"
          :placeholder="switcher.get(this.keyword.status)"
          @change="handleStatusChange({
                     setting_group: 'keyword',
                     status: keyword.status
                     })">
          <el-option :label="switcher.get(0)"
            :value="0"></el-option>
          <el-option :label="switcher.get(1)"
            :value="1"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <hr class="separator" />
    <el-row class="end-row" :gutter="20">
      <el-col class="title"
        :span="3">
        关键词列表
      </el-col>
      <el-col :span="21">
        <el-button class="add-keyword"
          type="primary"
          @click="keyword.content = mutateKeywordContent({ type:'ADD' })">新增</el-button>
        <el-table :data="keyword.content"
          style="width: 100%">
          <el-table-column label="指定URL：（多个URL用|分开）"
            align="left">
            <template scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="keyword.added.url" placeholder="以/开头"></el-input>
              </template>
            <template v-else>
                {{ scope.row.url }}
              </template>
            </template>
          </el-table-column>
          <el-table-column label="关键词：（多个关键词用|分开)"
            align="left">
            <template scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="keyword.added.keyword"></el-input>
              </template>
            <template v-else>
                {{ scope.row.key_word }}
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作"
            width="300"
            align="right">
            <template scope="scope">
              <template v-if="scope.row.edit">
                <el-button type="text" @click="handleUpdateKeyword({ type:'EDIT_SAVE', id: scope.row.id })">保存</el-button>
                <el-button type="text" @click="keyword.content = mutateKeywordContent({ type: 'EDIT_CANCEL', id: scope.row.id })">取消</el-button>
              </template>
              <template v-else>
                <el-button type="text" @click="keyword.content = mutateKeywordContent({ type: 'EDIT', id: scope.row.id })">编辑</el-button>
                <el-button type="text" @click="handleDeleteKeyword(scope.row.id)">删除</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
  <div class="block">
    <el-row :gutter="20">
      <el-col class="title"
        :span="3">
        异常状态码
      </el-col>
      <el-col class="sub-title"
        :span="15">
        实时监测整个网站中的异常状态码，支持用户自定义
      </el-col>
      <el-col :span="6">
        <el-select v-model="abnormalStatusCode.status"
           class="pull-right"
          :placeholder="switcher.get(this.abnormalStatusCode.status)"
          @change="handleStatusChange({
                     setting_group: 'abnormal_status_code',
                     status: abnormalStatusCode.status
                     })">
          <el-option :label="switcher.get(0)"
            :value="0"></el-option>
          <el-option :label="switcher.get(1)"
            :value="1"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <hr class="separator" />
    <el-row :gutter="20">
      <el-col :push="3"
        :span="21">
        <Tip :content="abnormalStatusCode.tipContent" />
      </el-col>
    </el-row>
    <el-row class="end-row" :gutter="20">
      <el-col class="title"
        :span="3">
        异常响应码
      </el-col>
      <el-col :span="21">
        <ul class="status-code">
          <li>
            <el-checkbox v-model="abnormalStatusCode.checked">自定义异常响应码</el-checkbox>
          </li>
          <li v-show="abnormalStatusCode.checked">
            <el-input class="status-code-input"
              v-model="abnormalStatusCode.addedStatusCode"
              placeholder="如：502|500|404"></el-input>
            <el-button class="status-code-btn"
              type="primary"
              @click="handleAddAbnormalStatusCode">新增</el-button>
          </li>
          <li v-show="abnormalStatusCode.checked">
            <el-tag class="status-code-tag"
              v-for="code in abnormalStatusCode.statusCode"
              :key="code"
              :closable="true"
              :close-transition="false"
              @close="handleDeleteAbnormalStatusCode"
              type="gray">
              {{code}}
            </el-tag>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import { mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import verify from 'common/utils/verify'

export default {
  components: {
    ConsolePageLayout,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  methods: {
    ...mapActions([
      'getRiskSettingInfo',
      'saveRiskSettingStatus',
      'saveRiskSettingContent',
      'mutateRiskSettingKeywordInfo'
    ]),
    messageEmitter(message, type = 'warning') {
      this.$message({
        message,
        type
      })
    },
    async initialize(callback = () => {}) {
      this.detectionId = this.$route.query.id

      try {
        await this.getRiskSettingInfo(this.detectionId)
        this.tamper.status = parseInt(this.settingInfo.tamper.status, 10)
        this.tamper.sourceIp = this.settingInfo.tamper.content.source_ip
        this.tamper.mode = parseInt(this.settingInfo.tamper.content.pattern, 10)
        this.tamper.useRedGuard = parseInt(this.settingInfo.tamper.use_hwws, 10)
        this.tamper.useMirror = parseInt(this.settingInfo.tamper.use_mirror, 10)
        this.sensitiveWord.status = parseInt(this.settingInfo.sensitive_word.status, 10)
        this.sensitiveWord.customWord = this.settingInfo.sensitive_word.content.customer_word
        this.keyword.status = parseInt(this.settingInfo.keyword.status, 10)
        this.keyword.content = this.mutateKeywordContent({
          keyword: this.settingInfo.keyword,
          type: 'INITIAL'
        })
        this.abnormalStatusCode.status = parseInt(this.settingInfo.abnormal_status_code.status, 10)
        this.abnormalStatusCode.statusCode = this.settingInfo.abnormal_status_code.content.status_code
        callback()
      } catch (err) {}
    },
    mutateKeywordContent({ keyword = this.keyword, type, id }) {
      let { content } = cloneDeep(keyword)

      switch (type) {
        case 'INITIAL':
          content.forEach(row => {
            row.edit = false
          })
          break
        case 'EDIT':
          content.forEach(row => {
            if (row.id === id) {
              row.edit = true
              this.keyword.added.url = row.url
              this.keyword.added.keyword = row.key_word
              return false
            }
          })
          break
        case 'EDIT_SAVE':
          content.forEach(row => {
            if (row.id === id) {
              row.edit = false
              row.url = this.keyword.added.url
              row.key_word = this.keyword.added.keyword
              return false
            }
          })
          break
        case 'EDIT_CANCEL':
          content.forEach((row, index) => {
            if (row.id === id) {
              if (row.add) {
                content.splice(index, 1)
              } else {
                row.edit = false
                this.keyword.added.url = ''
                this.keyword.added.keyword = ''
              }
              return false
            }
          })
          break
        case 'DELETE':
          content.forEach((row, index) => {
            if (row.id === id) {
              content.splice(index, 1)
              return false
            }
          })
          break
        case 'ADD': {
          let editing = false

          content.forEach(row => {
            if (row.edit) {
              editing = true
              return false
            }
          })

          if (!editing)
            content = [
              {
                id: parseInt(Math.random() * 100, 10),
                url: '',
                key_word: '',
                add: true,
                edit: true
              },
              ...content
            ]
          break
        }
      }

      return content
    },
    async handleUpdateKeyword({ type, id }) {
      const content = this.mutateKeywordContent({ type, id })
      const vm = this
      this.handleContentChange(
        {
          setting_group: 'keyword',
          content
        },
        () => {
          vm.keyword.added.url = ''
          vm.keyword.added.keyword = ''
        }
      )
    },
    async handleStatusChange(params) {
      if (this.init) return

      try {
        await this.saveRiskSettingStatus({
          detection_id: this.detectionId,
          ...params
        })

        this.initialize()
      } catch (err) {
        this.initialize()
      }
    },
    async handleContentChange(params, afterInit = () => {}) {
      if (this.init) return

      try {
        await this.saveRiskSettingContent({
          detection_id: this.detectionId,
          ...params
        })

        this.initialize(afterInit)
      } catch (err) {}
    },
    handleDeleteKeyword(id) {
      const vm = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.handleUpdateKeyword({ type: 'DELETE', id })
      })
    },
    async updateAbnormalStatusCode({ type, tag }) {
      const { abnormalStatusCode } = this
      const statusCode = cloneDeep(abnormalStatusCode.statusCode)
      const addedStatusCode = cloneDeep(abnormalStatusCode.addedStatusCode).split('|')
      let gather = []

      switch (type) {
        case 'ADD':
          gather = statusCode.concat(addedStatusCode)
          break
        case 'DELETE':
          statusCode.splice(statusCode.indexOf(tag), 1)
          gather = statusCode
          break
      }

      const vm = this
      this.handleContentChange(
        {
          setting_group: 'abnormal_status_code',
          status_code: gather
        },
        () => {
          vm.abnormalStatusCode.addedStatusCode = ''
        }
      )
    },
    handleAddAbnormalStatusCode() {
      this.updateAbnormalStatusCode({ type: 'ADD' })
    },
    handleDeleteAbnormalStatusCode(tag) {
      this.updateAbnormalStatusCode({ type: 'DELETE', tag })
    }
  },
  created() {
    this.isIp = verify.ipReg.test(this.$route.query.domain)

    const vm = this
    this.initialize(() => {
      vm.$nextTick(() => {
        vm.init = false
      })
    })
  },
  computed: {
    settingInfo() {
      return this.$store.state.detection.riskCount.settingInfo
    }
  },
  data() {
    return {
      verify,
      isIp: false,
      switcher: new Map([[0, 'OFF'], [1, 'ON']]),
      init: true,
      tamper: {
        status: '',
        sourceIp: '',
        mode: '',
        useRedGuard: false,
        useMirror: false
      },
      sensitiveWord: {
        status: '',
        customWord: '',
        tipContent: [
          '默认词库模式：采用系统自带词库',
          '自定义词库模式：需要输入自定义敏感词，并且系统仅对自定义敏感词进行检测',
          '混合词库模式：系统将对系统默认词库和自定义词库进行检测'
        ]
      },
      keyword: {
        status: '',
        content: [],
        added: {
          url: '',
          keyword: ''
        }
      },
      abnormalStatusCode: {
        status: '',
        checked: false,
        addedStatusCode: '',
        statusCode: [],
        tipContent: ['异常响应码：可自定义异常响应码，如为空系统默认非2xx和3xx返回码为异常响应码', '多个异常响应码请用“|”隔开']
      }
    }
  }
}
</script>

<style scoped>
.block {
  background-color: #F7F7F7;
  margin: 20px 0;
  padding: 20px;
}

.end-row {
  margin-bottom: 0 !important;
}

.title {
  color: #000;
  font-size: 16px;
  text-align: right;
}

.sub-title {
  color: #757575;
  font-size: 14px;
}

.add-keyword {
  margin-bottom: 10px;
}

.status-code {
  li {
    margin-bottom: 10px;
  }

  .status-code-input {
    width: 200px;
  }

  .status-code-btn {
    margin-left: 5px;
  }

  .status-code-tag:not(:first-child) {
    margin-left: 10px;
  }
}
</style>

<style>
.el-row {
  margin-bottom: 20px;
}
</style>
