// 打卡统计
import dateTimePicker from '../../dist/dateTimePicker.js'
Page({
  data: {

  },

  onLoad(options) {
    this.setData({
      dateObj: dateTimePicker.getNowDate()
    })
  },

  // 选择日期
  dateChange(e) {
    this.setData({
      dateObj: e.detail.value
    })
  },

  // 查看人员位置
  toPlace() {
    wx.navigateTo({
      url: './place/place',
    })
  },

  toPersonnel() {
    wx.navigateTo({
      url: './personnel/personnel',
    })
  },

  // 审批请假
  toApprovalLeave() {
    wx.navigateTo({
      url: './leave/leave',
    })
  }
})