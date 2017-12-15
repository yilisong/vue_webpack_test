export default function() {
  this.fetchGet('CloudDns.Member.Line.getMemberLines').then(result => {
    if (result.ok) {
      result.json().then(res => {
        const memberLines = []
        res.data.forEach((v, i) => {
          // label选项级联数据获取！
          const obj = {
            value: v.name,
            label: v.desc
          }
          this.viewTypeOptions2.push(obj)
          // 第一层数据结构
          if (v.parent_id === '0') {
            // if (v.desc !== '电信' && v.desc !== '联通' && v.desc !== '移动' && v.desc !== '搜索引擎') {
            //   memberLines.push({
            //     value: v.name,
            //     label: v.desc,
            //     id: v.id
            //   })
            // } else {
            //   memberLines.push({
            //     value: v.name,
            //     label: v.desc,
            //     id: v.id,
            //     children:[]
            //   })
            // }
            memberLines.push({
              value: v.name,
              label: v.desc,
              id: v.id
            })
          }
        })
        const secondFloorLines = []
        // 第二层：
        res.data.forEach((v2, i2) => {
          memberLines.forEach((v, i) => {
            if (v2.parent_id === v.id) {
              secondFloorLines.push(v2)
              if (v.children === undefined) {
                v.children = []
                v.children.push({
                  value: v2.name,
                  label: v2.desc,
                  id: v2.id
                })
              } else {
                v.children.push({
                  value: v2.name,
                  label: v2.desc,
                  id: v2.id
                })
              }
            }
          })
        })
        //动态生成第三层数组
        secondFloorLines.forEach((v2pro, index) => {
          res.data.forEach((v3, i3) => {
            if (v3.parent_id === v2pro.id) {
              memberLines.forEach((v, i) => {
                if (v.id === v2pro.parent_id) {
                  v.children.forEach((v2, i2) => {
                    if (v2.children === undefined) {
                      v2.children = []
                    }
                    if (v2.id === v2pro.id) {
                      v2.children.push({
                        value: v3.name,
                        label: v3.desc
                      })
                    }
                  })
                }
              })
            }
          })
        })
        this.viewTypeOptions = memberLines
      })
    }
  })
}
