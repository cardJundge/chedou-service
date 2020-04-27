// 请假审批
Page({
  data: {
    leaveShow: false
  },

  onLoad(options) {

  },
  
  // 拒绝请假
  toRejectLeave() {
    this.setData({
      leaveShow: true
    })
  }
})