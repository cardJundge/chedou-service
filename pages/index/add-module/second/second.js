// 添加模块---》第二步
Page({
  data: {

  },

  onLoad(options) {

  },

  // 选择类型
  toSelectType() {
    wx.navigateTo({
      url: './select/select',
    })
  }
})