<template>
<el-dialog title="添加资产"
  :visible.sync="addPropertyVisible"
  :close-on-click-modal="false"
  @close="handleAddPropertyClose">
	<div class="wrapper">
		<el-form :model="propertyForm"
		  :rules="rules"
		  ref="propertyForm"
		  label-width="100px">
			<el-form-item prop="property"
			  label="资产">
				<el-input v-model="propertyForm.property"
				  placeholder="请输入域名/IP/URL" :maxlength="255"></el-input>
			</el-form-item>
			<el-form-item prop="name"
			  label="名称">
				<el-input v-model="propertyForm.name"></el-input>
			</el-form-item>
			<el-form-item prop="industry"
			  label="选择行业">
				<el-select v-model="propertyForm.industry"
				  placeholder="请选择">
					<el-option v-for="industry in propertyForm.industries"
					  :key="industry.value"
					  :label="industry.label"
					  :value="industry.value">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
	</div>
	<div slot="footer">
		<el-button type="primary"
		  @click="handleAddProperty">添加</el-button>
	</div>
</el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import verify from 'common/utils/verify'

export default {
  created() {
    this.$store.watch(
      state => state.property.addProperty.visible,
      visible => {
        this.addPropertyVisible = visible
      }
    )
  },
  data() {
    return {
      addPropertyVisible: false,
      propertyForm: {
        property: '',
        name: '',
        industry: '',
        industries: [
          {
            value: '1',
            label: '游戏'
          },
          {
            value: '2',
            label: '互联网金融'
          },
          {
            value: '3',
            label: '政党机关'
          },
          {
            value: '4',
            label: '电商'
          },
          {
            value: '5',
            label: '新闻媒体'
          }
        ]
      },
      rules: {
        property: [
          { required: true, message: '请输入域名/IP/URL', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (verify.ipWithPort.test(this.propertyForm.property) || verify.haveHttpOrNotUrl.test(this.propertyForm.property) || verify.domainWithPortAndPath.test(this.propertyForm.property)) {
                return callback()
              } else {
                return callback(new Error('格式不正确'))
              }
            },
            trigger: 'blur'
          }
        ],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        industry: [{ required: true, message: '请选择行业' }]
      }
    }
  },
  methods: {
    ...mapActions(['triggerAddPropertyVisible', 'addProperty']),
    handleAddPropertyClose() {
      this.triggerAddPropertyVisible(false)
      this.reset()
    },
    handleAddProperty() {
      this.$refs.propertyForm.validate(valid => {
        if (valid) {
          this.addProperty({
            property_name: this.propertyForm.name,
            property_object: this.propertyForm.property,
            industry_ids: this.propertyForm.industry
          })
        } else {
          return false
        }
      })
    },
    reset() {
      this.$refs.propertyForm.resetFields()
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 80%;
}
</style>
