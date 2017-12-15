<template>
<ComboTable :total="riskLogTotal"
  :page-size="pageSize"
  :page-sizes="pageSizes"
  @on-size-change="handleRiskLogListChange"
  @on-current-change="handleRiskLogListChange">
	<div slot="headerLeft">
		风险类型:
		<el-select v-model="riskType"
		  @change="handleSearchType"
		  size="small">
			<el-option label="全部"
			  :value="-1"></el-option>
			<el-option label="篡改"
			  :value="0"></el-option>
			<el-option label="敏感词"
			  :value="1"></el-option>
			<el-option label="关键字"
			  :value="2"></el-option>
			<el-option label="异常状态码"
			  :value="3"></el-option>
			</el-option>
		</el-select>
		<span class="vertical-separator">|</span>
		<el-date-picker v-model="datetime"
		  type="datetimerange"
		  size="small"
      format="yyyy-MM-dd"
      :picker-options="pickerOptions"
		  @change="handleSearchDateTime"
		  placeholder="选择时间范围">
		</el-date-picker>
	</div>
	<div slot="body">
		<el-table :data="riskLogList"
		  style="width: 100%">
			<el-table-column prop="risk_url"
			  label="URL"
			  width="300">
			</el-table-column>
			<el-table-column prop="risk_type"
			  label="类型"
			  align="center">
				<template scope="scope">
          {{ codemap.type.get(scope.row.risk_type) }}
        </template>
			</el-table-column>
			<el-table-column prop="risk_detail"
			  label=" 详情"
			  align="center">
			</el-table-column>
			<el-table-column prop="first_time"
			  label="首次出现时间"
        width="130"
			  align="center">
			</el-table-column>
			<el-table-column prop="last_time"
        align="center"
        width="130"
			  label="最近出现时间">
			</el-table-column>
			<el-table-column label="快照"
			  align="right">
				<template scope="scope">
          <template v-if="scope.row.risk_image_url">
            <a :href="scope.row.risk_image_url" target="_blank">查看</a>
          </template>
          <template v-else>
            <el-button type="text" size="small" disabled>查看</el-button>
          </template>
        </template>
			</el-table-column>
		</el-table>
	</div>
</ComboTable>
</template>

<script>
import ComboTable from 'common/components/ComboTable/ComboTable'
import ListQuery from '../../../constants/ListQuery'
import { mapActions } from 'vuex'

export default {
  components: {
    ComboTable
  },
  methods: {
    ...mapActions(['getRiskLogList']),
    handleSearchDateTime(datetimeRange) {
      this.search.datetime = datetimeRange ? `${datetimeRange.replace(' - ', '~')}|-4` : ''

      this.getRiskLogList({
        property_object: this.search.property,
        days: this.search.datetime,
        risk_type: this.riskType,
        ...ListQuery
      })
    },
    handleSearchType() {
      this.getRiskLogList({
        property_object: this.search.property,
        days: this.search.datetime,
        risk_type: this.riskType,
        ...ListQuery
      })
    },
    handleRiskLogListChange(current, size) {
      this.getRiskLogList({
        property_object: this.search.property,
        days: this.search.datetime,
        risk_type: this.riskType,
        page: current,
        per_page: size
      })

      this.pageSize = size
    }
  },
  computed: {
    riskLogList() {
      return this.$store.state.detection.riskLog.list
    },
    riskLogTotal() {
      return this.$store.state.detection.riskLog.total
    }
  },
  created() {
    this.property = this.$route.query.property

    this.getRiskLogList({
      property_object: this.property,
      ...ListQuery
    })
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近三十天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 29)
              picker.$emit('pick', [start, end])
            }
          }
        ],
        disabledDate(time) {
          return (
            time.getTime() <= Date.now() - 3600 * 1000 * 24 * 30 || time.getTime() >= Date.now()
          )
        }
      },
      codemap: {
        type: new Map([['0', '篡改'], ['1', '敏感词'], ['2', '关键字'], ['3', '异常状态码']])
      },
      pageSizes: [10, 20],
      pageSize: 10,
      search: {
        property: '',
        datetime: ''
      },
      property: '',
      datetime: '',
      riskType: -1
    }
  }
}
</script>
