// 商品/服务
Page({

  data: {
    noService: false
  },

  onLoad: function (options) {

  },

  toAddService() {
    wx.navigateTo({
      url: './add-service/add-service',
    })
  }
})