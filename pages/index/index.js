//首页
Page({
  data: {
    isAddModule: false
  },
  onLoad: function () {
    
  },
  // 进入数据统计详情
  toDataDetails() {
    wx.navigateTo({
      url: './data-details/data-details',
    })
  },

  // 添加模块
  addModule() {
    this.setData({
      isAddModule: true
    })
  }
})
