// 增值服务
Page({
  data: {
    incrementList: [{name: '客户姓名', mobile: '13911111111', case_no: '547687646546548'}]
  },

  onLoad(options) {

  },

  addIncrement() {
    wx.navigateTo({
      url: './add-increment/add-increment',
    })
  },

  toIncrementDetails() {
    wx.navigateTo({
      url: './increment-details/increment-details',
    })
  }
})