import { Message } from 'element-ui'

function judgeEmpty(data, info) {
  let result = true

  for (const item in data) {
    if (data[item] === '') {
      result = false
      return Message.error(info[item] + '不能为空')
    } else {
      result = true
    }
  }
  return result
}

function dataSwitch(key, data) {
  for (const item in data) {
    key === item ? (data[item] = true) : (data[item] = false)
  }
}
export { judgeEmpty, dataSwitch }
