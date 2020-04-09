// 创建模块===》开始页面
Page({
  data: {
   
  },

  onLoad(options) {
    this.setData({
      businessArray: JSON.parse(options.businessArray)
    })
  },

  // 自定义模块添加
  addDefineModule() {
    wx.navigateTo({
      url: '../first/first',
    })
  }
})