<template>
<el-dialog :title="modify ? '监测配置' : '添加监测'"
  :visible.sync="addDetectionVisibile"
  :close-on-click-modal="false"
  @open="handleAddDetectionOpen"
  @close="handleAddDetectionClose">
  <div class="step">
    <el-steps :active="step"
      :align-center="true"
      :center="true"
      finish-status="success">
      <el-step title="监测配置"></el-step>
      <el-step title="监测详情"></el-step>
      <el-step title="通知告警"></el-step>
    </el-steps>
  </div>
  <hr class="outer-separator" />
  <div class="wrapper">
    <div v-show="step === 0">
      <el-form :model="detectionForm"
        :rules="rules"
        ref="detectionFormStepOne"
        label-width="100px">
        <el-form-item label="扫描对象">
          <span v-if="info">{{info.property_object}}</span>
        </el-form-item>
        <el-form-item prop="meal"
          label="已选套餐"
          required>
          <el-select v-model="detectionForm.meal"
            class="meal-select"
            placeholder="请选择"
            @change="handleMealChange">
            <el-option v-for="meal in riskMealList"
              :key="meal.id"
              :label="`${meal.product_meal_name} (到期时间：${meal.expiry_time})`"
              :value="meal.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="page"
          label="监测页面"
          v-show="detectionForm.meal"
          required>
          <el-radio-group v-model="detectionForm.page">
            <el-radio-button v-for="(page, key) in detectionForm.pageList" :key="key" :label="page.value">{{ page.title }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="mode"
          label="监测模式"
          v-show="detectionForm.page === 1">
          <el-radio-group v-model="detectionForm.mode">
            <el-radio-button :label="1">快速</el-radio-button>
            <el-radio-button :label="2">标准</el-radio-button>
            <el-radio-button :label="3">全面</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="customPage"
          label="自定义"
          v-show="detectionForm.page === 2">
          <el-input type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入自定义网址，URL以／开头，多个URL请用回车分隔"
            v-model="detectionForm.customPage">
          </el-input>
        </el-form-item>
        <el-form-item prop="frequency"
          label="监测频率"
          v-show="detectionForm.page === 0 || detectionForm.page === 2"
          required>
          <el-radio-group v-model="detectionForm.frequency">
            <el-radio-button v-for="(frequency, key) in detectionForm.frequencyList" :key="key" :label="frequency.value">{{ frequency.title}} </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="step === 1"
      class="base-setting">
      <div class="title">
        勾选需开启的监控项
      </div>
      <el-form :model="detectionForm"
        :rules="rules"
        class="content"
        ref="detectionFormStepTwo"
        label-width="20px">
        <el-form-item prop="tamper"
          required>
          <el-checkbox v-model="detectionForm.tamper">篡改监控</el-checkbox>
        </el-form-item>
        <el-form-item prop="sensitiveWord"
          required>
          <el-checkbox v-model="detectionForm.sensitiveWord">敏感词监控</el-checkbox>
        </el-form-item>
        <el-form-item prop="keyword"
          required>
          <el-checkbox v-model="detectionForm.keyword"
            disabled>关键词 (请在添加后，前往监测控制台开启功能)</el-checkbox>
        </el-form-item>
        <el-form-item prop="exceptionStatus"
          required>
          <el-checkbox v-model="detectionForm.exceptionStatus">异常状态码监控</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="step === 2">
      <el-form :model="detectionForm"
        :rules="rules"
        ref="detectionFormStepThree"
        label-width="100px">
        <el-form-item prop="noticeTypes"
          label="通知方式">
          <el-checkbox-group v-model="detectionForm.noticeTypes">
            <el-checkbox label="0">邮件</el-checkbox>
            <el-checkbox label="1">短信</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="selectedNoticeMemberUid"
          label="消息接收人">
          <el-select v-model="detectionForm.selectedNoticeMemberUid"
            multiple
            filterable
            placeholder="请选择">
            <el-option v-for="noticeMemberItem in noticeMemberList"
              :key="noticeMemberItem.uid"
              :label="noticeMemberItem.name"
              :value="noticeMemberItem.uid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="notDisturbTime"
          label="免打扰时间">
          <el-time-picker is-range
            format="HH:mm"
            v-model="detectionForm.notDisturbTimeRaw"
            @change="handleNotDisturbTimeChange"
            placeholder="请选择免打扰时间范畴">
          </el-time-picker>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <div slot="footer">
    <el-button type="primary"
      @click="prevStep"
      v-if="step !== 0">上一步</el-button>
    <el-button type="primary"
      @click="nextStep"
      v-if="step !== 2">下一步</el-button>
    <el-button type="primary"
      @click="handleAddDetection"
      v-if="step === 2">{{ modify ? '保存' : '添加'}}</el-button>
  </div>
</el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import verify from 'common/utils/verify'
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
      state => state.detection.addDetection.visible,
      visible => {
        this.addDetectionVisibile = visible
      }
    )
  },
  data() {
    return {
      step: 0,
      addDetectionVisibile: false,
      meals: [],
      detectionForm: {
        meal: null,
        page: '',
        pageList: [],
        mode: '',
        frequency: '',
        frequencyList: [],
        tamper: false,
        sensitiveWord: false,
        keyword: false,
        exceptionStatus: false,
        noticeTypes: [],
        selectedNoticeMemberUid: [],
        notDisturbTimeRaw: '',
        notDisturbTime: ['', '']
      },
      rules: {
        meal: [{ required: true, message: '请选择套餐' }],
        page: [{ required: true, message: '请选择监测页面' }],
        frequency: [{ required: true, message: '请选择监测频率' }]
      }
    }
  },
  computed: {
    info() {
      return this.$store.state.detection.addDetection.info
    },
    detailInfo() {
      return this.$store.state.detection.addDetection.detailInfo
    },
    noticeMemberList() {
      return this.$store.state.property.noticeMemberList
    },
    riskMealList() {
      return this.$store.state.detection.riskMealList
    }
  },
  methods: {
    ...mapActions([
      'triggerAddDetectionVisible',
      'getNoticeMemberList',
      'getRiskMealList',
      'addRiskDetection',
      'saveRiskDetection',
      'getRiskDetectionInfo'
    ]),
    settingInfoInit() {
      this.detectionForm.meal = this.detailInfo.detection_meal_id
      this.detectionForm.mode = parseInt(this.detailInfo.detection_pattern, 10)
      this.detectionForm.customPage = this.detailInfo.custom_page
      this.detectionForm.frequency = parseInt(this.detailInfo.detection_frequency, 10)
      this.detectionForm.page = parseInt(this.detailInfo.detection_page, 10)
      this.detectionForm.noticeTypes = this.detailInfo.notice_type

      this.detailInfo.base_setting.forEach(setting => {
        if (setting === '0') {
          this.detectionForm.tamper = true
          return false
        }
      })
      this.detailInfo.base_setting.forEach(setting => {
        if (setting === '1') {
          this.detectionForm.sensitiveWord = true
          return false
        }
      })
      this.detailInfo.base_setting.forEach(setting => {
        if (setting === '2') {
          this.detectionForm.keyword = true
          return false
        }
      })
      this.detailInfo.base_setting.forEach(setting => {
        if (setting === '3') {
          this.detectionForm.exceptionStatus = true
          return false
        }
      })
      this.detectionForm.selectedNoticeMemberUid = this.detailInfo.notice_member_list

      const notDisturbTimeStart = new Date()
      const notDisturbTimeEnd = new Date()
      notDisturbTimeStart.setHours(this.settingInfo.not_disturb_time[0].split(':')[0])
      notDisturbTimeStart.setMinutes(this.settingInfo.not_disturb_time[0].split(':')[1])
      notDisturbTimeEnd.setHours(this.settingInfo.not_disturb_time[1].split(':')[0])
      notDisturbTimeEnd.setMinutes(this.settingInfo.not_disturb_time[1].split(':')[1])
      this.detectionForm.notDisturbTimeRaw = [notDisturbTimeStart, notDisturbTimeEnd]
    },
    handleMealChange(id) {
      const vm = this

      this.riskMealList.forEach(meal => {
        if (meal.id === id) {
          vm.detectionForm.frequencyList = meal.meal_detail.frequency
          vm.detectionForm.pageList = meal.meal_detail.detection_page
          return false
        }
      })
    },
    async handleAddDetectionOpen() {
      if (this.modify) {
        try {
          await axios.all([
            this.getRiskDetectionInfo(this.info.id),
            this.getRiskMealList(this.info.id),
            this.getNoticeMemberList()
          ])
          this.settingInfoInit()
        } catch (err) {}
      } else {
        this.getRiskMealList()
        this.getNoticeMemberList()
      }
    },
    handleAddDetectionClose() {
      this.triggerAddDetectionVisible({
        visible: false,
        info: null
      })
      this.reset()
    },
    validateForm(step, callback = () => {}) {
      const formStep = this.getFormStep(step)
      const vm = this
      this.$refs[formStep].validate(valid => {
        if (valid) {
          callback(vm)
          return true
        } else {
          return false
        }
      })
    },
    handleNotDisturbTimeChange(time) {
      if (time) this.detectionForm.notDisturbTime = time.split(' - ')
    },
    handleAddDetection() {
      const baseSetting = []
      this.detectionForm.tamper && baseSetting.push(0)
      this.detectionForm.sensitiveWord && baseSetting.push(1)
      this.detectionForm.keyword && baseSetting.push(2)
      this.detectionForm.exceptionStatus && baseSetting.push(3)

      const selectedNoticeMember = []
      this.detectionForm.selectedNoticeMemberUid.forEach(uid => {
        this.noticeMemberList.forEach(member => {
          if (member.uid === uid) {
            selectedNoticeMember.push(member)
          } else return false
        })
      })

      const params = {
        detection_meal_id: this.detectionForm.meal,
        detection_page: this.detectionForm.page,
        detection_pattern: this.detectionForm.mode,
        custom_page: this.detectionForm.customPage,
        detection_frequency: this.detectionForm.frequency,
        base_setting: baseSetting,
        notice_type: this.detectionForm.noticeTypes,
        notice_member_list: selectedNoticeMember,
        not_disturb_time: this.detectionForm.notDisturbTime
      }

      this.validateForm(this.step, vm => {
        this.modify
          ? vm.saveRiskDetection({
              detection_id: vm.detailInfo.id,
              ...params
            })
          : vm.addRiskDetection({
              property_id: vm.info.id,
              ...params
            })
      })
    },
    getFormStep(step) {
      switch (step) {
        case 0:
          return 'detectionFormStepOne'
        case 1:
          return 'detectionFormStepTwo'
        case 2:
          return 'detectionFormStepThree'
      }
    },
    reset() {
      this.$refs.detectionFormStepOne.resetFields()
      this.$refs.detectionFormStepTwo.resetFields()
      this.$refs.detectionFormStepThree.resetFields()
      this.step = 0
      this.detectionForm.notDisturbTimeRaw = ''
    },
    nextStep() {
      this.validateForm(this.step, vm => {
        vm.step++
      })
    },
    prevStep() {
      this.step--
    }
  }
}
</script>

<style scoped>
.base-setting {
  clear: fix;

  .title, .content {
    float: left;
  }
}

.meal-select {
  width: 90%;
}
</style>
