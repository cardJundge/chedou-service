// 我的商铺/开通商铺
Page({

  data: {
    isOpen: true,
    shareShow: false
  },

  onLoad: function (options) {
    if(this.data.isOpen) {
      wx.setNavigationBarTitle({
        title: '我的商铺'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '开通商铺'
      })
    }
  },

  // 商铺管理
  toShopsManagement() {
    wx.navigateTo({
      url: './shops-management/shops-management',
    })
  },

  // 推广商铺
  toShareShops() {
    this.setData({
      shareShow: true
    })
  }
})