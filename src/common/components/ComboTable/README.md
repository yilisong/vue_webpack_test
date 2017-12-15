# ComboTable

> ComboTable Component based on element ui

## Usage

```html
<template lang="html">
  <ComboTable :total="total" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getTableData" @on-current-change="getTableData">
    <div slot="headerLeft">
      <el-button type="primary">Button1</el-button>
    </div>
    <div slot="headerRight">
      <el-button type="primary">Button2</el-button>
    </div>
    <div slot="body">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="..." label="..."></el-table-column>
      </el-table>
    </div>
  </ComboTable>
</template>

<script>
import ComboTable from 'common/components/ComboTable/ComboTable'

export default {
  components: {
    ComboTable
  },
  methods: {
    getTableData(current, size) {
      // async operation
      this.tableData = ?
      this.total = ?
    }
  },
  created() {
    this.getTableData()
  },
  data() {
    return {
      pageSizes: [5, 10, 20],
      pageSize: 5
      tableData: [],
      total: 0
    }
  }
}
</script>
```

## API

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 Yundun
