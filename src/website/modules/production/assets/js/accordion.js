import $ from 'jquery'

export default className => {
  const parent = $(className)
  const paramLis = parent.find('.a-param')
  paramLis.click(function() {
    $(this).addClass('active').siblings().removeClass('active')
  })
}
