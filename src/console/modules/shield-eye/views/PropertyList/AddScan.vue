<template>
  <el-dialog :title="modify ? '扫描配置' : '添加扫描'" class="add-scan" :visible.sync="addScanVisible" :close-on-click-modal="false" @open="handleAddScanOpen" @close="handleAddScanClose">
    <div class="step">
      <el-steps :active="step" :align-center="true" :center="true" finish-status="success">
        <el-step title="扫描配置"></el-step>
        <el-step title="扫描计划"></el-step>
        <el-step title="通知告警"></el-step>
      </el-steps>
    </div>
    <hr class="outer-separator" />
    <div class="wrapper">
      <div v-show="step === 0">
        <el-form :model="scanForm" :rules="rules" ref="scanFormStepOne" label-width="100px">
          <el-form-item label="扫描对象">
            <span v-if="info">{{ info.property_object }}</span>
            <span class="specify-scan-ip" v-show="this.isPropertyId"><el-checkbox v-model="scanForm.scanIpTrigger">指定IP</el-checkbox></span>
          </el-form-item>
          <div v-show="scanForm.scanIpTrigger">
            <el-form-item prop="scanIp" label="扫描IP">
              <el-input class="scan-ip" v-model="scanForm.scanIp" placeholder="输入源站IP地址，如1.1.1.1"></el-input>
            </el-form-item>
          </div>
          <el-form-item prop="protocol" label="扫描协议" required>
            <el-radio-group v-model="scanForm.protocol">
              <el-radio :label="0">HTTP</el-radio>
              <el-radio :label="1">HTTPS</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="mode" label="扫描模式" required>
            <el-radio-group v-model="scanForm.mode">
              <el-radio-button :label="1">快速</el-radio-button>
              <el-radio-button :label="2">标准</el-radio-button>
              <el-radio-button :label="3">全面</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="step === 1">
        <el-form :model="scanForm" :rules="rules" ref="scanFormStepTwo" label-width="100px">
          <el-form-item prop="plan" label="执行方式" required>
            <el-radio-group v-model="scanForm.plan">
              <el-radio :label="0">立即</el-radio>
              <el-radio :label="1">计划</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="scanForm.plan === 1">
            <el-form-item prop="interval" label="执行频率" required>
              <el-radio-group v-model="scanForm.interval">
                <el-radio :label="0">每周</el-radio>
                <el-radio :label="1">每月</el-radio>
                <el-radio :label="2">每季度</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="startDateTime" label="开始时间" required>
              <el-date-picker v-model="scanForm.startDateTime" :disabled="modify" @change="handleStartDateTimeChange" type="datetime" placeholder="选择开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="runNumber" label="执行次数" required>
              <el-input-number v-model="scanForm.runNumber" :min="1" :max="scanNumber"></el-input-number>
              <label>上限为所选套餐剩余次数</label>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div v-show="step === 2">
        <el-form :model="scanForm" :rules="rules" ref="scanFormStepThree" label-width="100px">
          <el-form-item prop="noticeTypes" label="通知方式">
            <el-checkbox-group v-model="scanForm.noticeTypes">
              <el-checkbox label="0">邮件</el-checkbox>
              <el-checkbox label="1">短信</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item prop="selectedNoticeMemberUid" label="消息接收人">
            <el-select v-model="scanForm.selectedNoticeMemberUid" multiple filterable placeholder="请选择">
              <el-option v-for="noticeMemberItem in noticeMemberList" :key="noticeMemberItem.uid" :label="noticeMemberItem.name" :value="noticeMemberItem.uid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="notDisturbTime" label="免打扰时间">
            <el-time-picker is-range format="HH:mm" v-model="scanForm.notDisturbTimeRaw" @change="handleNotDisturbTimeChange" placeholder="请选择免打扰时间范畴">
            </el-time-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <div class="agreement" v-show="step === 2">
        <el-checkbox v-model="scanForm.agreement">
          同意
          <a target="_blank" href="/static/pdf/scan_agreement.pdf">扫描协议</a>
        </el-checkbox>
      </div>
      <div class="operation">
        <span class="scan-number">
          剩余扫描次数：{{ scanNumber }}
        </span>
        <el-button type="primary" @click="prevStep" v-if="step !== 0">上一步</el-button>
        <el-button type="primary" @click="nextStep" v-if="step !== 2">下一步</el-button>
        <el-button type="primary" @click="handleAddScan" v-if="step === 2">{{ modify ? '保存' : '添加'}}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import verify from 'common/utils/verify'
import moment from 'moment'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  props: {
    modify: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.$store.watch(
      state => state.scan.addScan.visible,
      visible => {
        this.addScanVisible = visible
      }
    )
  },
  data() {
    return {
      step: 0,
      addScanVisible: false,
      isPropertyId: false,
      scanForm: {
        scanIp: '',
        scanIpTrigger: false,
        protocol: '',
        mode: '',
        plan: 0,
        interval: '',
        startDateTime: '',
        runNumber: 1,
        noticeTypes: [],
        selectedNoticeMemberUid: [],
        notDisturbTimeRaw: '',
        notDisturbTime: ['', ''],
        agreement: 0
      },
      rules: {
        scanIp: [{ pattern: verify.ipReg, message: '格式不正确', trigger: 'blur' }],
        protocol: [{ required: true, message: '请选择扫描协议' }],
        mode: [{ required: true, message: '请选择扫描模式' }],
        startDateTime: [
          {
            validator: (rule, value, callback) => {
              if (this.modify) return callback()
              if (this.scanForm.plan === 1) {
                if (!value) {
                  return callback(new Error('请选择开始时间'))
                }

                const selectDateTime = moment(value).format('x')
                const currentDateTime = moment().format('x')

                if (selectDateTime <= currentDateTime) {
                  return callback(new Error('所选时间必须大于当前时间'))
                }

                return callback()
              } else {
                return callback()
              }
            }
          }
        ],
        interval: [
          {
            validator: (rule, value, callback) => {
              if (this.scanForm.plan === 1) {
                if ([0, 1, 2].indexOf(this.scanForm.interval) !== -1) {
                  return callback()
                } else {
                  return callback(new Error('请选择执行频率'))
                }
              } else {
                return callback()
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    info() {
      return this.$store.state.scan.addScan.info
    },
    settingInfo() {
      return this.$store.state.scan.addScan.settingInfo
    },
    noticeMemberList() {
      return this.$store.state.property.noticeMemberList
    },
    ...mapGetters(['scanNumber'])
  },
  methods: {
    ...mapActions([
      'triggerAddScanVisible',
      'getNoticeMemberList',
      'addScanTask',
      'getScanSettingInfo',
      'saveCycleScan'
    ]),
    settingInfoInit() {
      this.scanForm.agreement = parseInt(this.settingInfo.is_agree, 10)
      this.scanForm.mode = parseInt(this.settingInfo.scan_pattern, 10)
      this.scanForm.scanIpTrigger = this.settingInfo.scan_ip ? true : false
      this.scanForm.scanIp = this.settingInfo.scan_ip
      this.scanForm.protocol = parseInt(this.settingInfo.scan_agreement, 10)
      this.scanForm.plan = parseInt(this.settingInfo.is_plan, 10)
      this.scanForm.interval = parseInt(this.settingInfo.plan_interval, 10)
      this.scanForm.startDateTime = this.settingInfo.start_run_time
      this.scanForm.runNumber = parseInt(this.settingInfo.total_number - this.settingInfo.use_number, 10)
      this.scanForm.noticeTypes = this.settingInfo.notice_type
      this.scanForm.selectedNoticeMemberUid = this.settingInfo.notice_member_list

      // not disturb time convertion
      const notDisturbTimeStart = new Date()
      const notDisturbTimeEnd = new Date()
      notDisturbTimeStart.setHours(this.settingInfo.not_disturb_time[0].split(':')[0])
      notDisturbTimeStart.setMinutes(this.settingInfo.not_disturb_time[0].split(':')[1])
      notDisturbTimeEnd.setHours(this.settingInfo.not_disturb_time[1].split(':')[0])
      notDisturbTimeEnd.setMinutes(this.settingInfo.not_disturb_time[1].split(':')[1])
      this.scanForm.notDisturbTimeRaw = [notDisturbTimeStart, notDisturbTimeEnd]
    },
    async handleAddScanOpen() {
      this.isPropertyId = !verify.ipReg.test(this.info.property_object)
      if (this.modify) {
        try {
          await axios.all([this.getScanSettingInfo(this.info.id), this.getNoticeMemberList()])
          this.settingInfoInit()
        } catch (err) {}
      } else {
        this.getNoticeMemberList()
      }
    },
    handleAddScanClose() {
      this.triggerAddScanVisible({
        visible: false,
        info: null
      })
      this.reset()
    },
    validateForm(step, callback = () => {}) {
      const formStep = this.getFormStep(step)
      this.$refs[formStep].validate(valid => {
        if (valid) {
          callback()
          return true
        } else {
          return false
        }
      })
    },
    handleNotDisturbTimeChange(time) {
      if (time) this.scanForm.notDisturbTime = time.split(' - ')
      else this.scanForm.notDisturbTime = ['', '']
    },
    handleStartDateTimeChange(datetime) {
      this.scanForm.startDateTime = datetime
    },
    handleAddScan() {
      const agreement = this.scanForm.agreement ? 1 : 0

      const selectedNoticeMember = []
      this.scanForm.selectedNoticeMemberUid.forEach(uid => {
        this.noticeMemberList.forEach(member => {
          if (member.uid === uid) {
            selectedNoticeMember.push(member)
          } else return false
        })
      })

      const params = {
        scan_ip: this.scanForm.scanIp,
        scan_agreement: this.scanForm.protocol,
        scan_pattern: this.scanForm.mode,
        is_plan: this.scanForm.plan,
        run_number: this.scanForm.runNumber,
        start_run_time: this.scanForm.startDateTime,
        plan_interval: this.scanForm.interval,
        notice_type: this.scanForm.noticeTypes,
        notice_member_list: selectedNoticeMember,
        not_disturb_time: this.scanForm.notDisturbTime,
        is_agree: agreement
      }

      this.validateForm(this.step, () => {
        this.modify
          ? this.saveCycleScan({
              scan_task_id: this.settingInfo.scan_task_id,
              ...params
            })
          : this.addScanTask({
              property_id: this.info.id,
              ...params
            })
      })
    },
    getFormStep(step) {
      switch (step) {
        case 0:
          return 'scanFormStepOne'
        case 1:
          return 'scanFormStepTwo'
        case 2:
          return 'scanFormStepThree'
      }
    },
    reset() {
      this.$refs.scanFormStepOne.resetFields()
      this.$refs.scanFormStepTwo.resetFields()
      this.$refs.scanFormStepThree.resetFields()
      this.step = 0
      this.scanForm.agreement = 0
      this.scanForm.scanIpTrigger = 0
      this.scanForm.notDisturbTimeRaw = ''
    },
    nextStep() {
      this.validateForm(this.step, () => {
        this.step++
      })
    },
    prevStep() {
      this.step--
    }
  }
}
</script>

<style>
.el-picker-panel__link-btn {
  display: none;
}
</style>

<style scoped>
.specify-scan-ip {
  margin-left: 20px;
}

.scan-ip {
  width: 40%;
}

.dialog-footer {
  text-align: left;
  clear: fix;

  .agreement {
    float: left;
    margin-left: 25px;
  }

  .scan-number {
    margin-right: 10px;
  }

  .operation {
    float: right;
  }
}
</style>
