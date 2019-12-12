// 申请加入详情
Page({
  data: {

  },

  onLoad: function (options) {
    let unionInfo = JSON.parse(options.data)
    this.setData({
      unionInfo: unionInfo,
      imgUrl: app.globalData.imgUrl
    })
  }
})