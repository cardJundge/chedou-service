// 明细
var test = getApp().globalData.hostName
var app = getApp()
Page({
  data: {
    hasMoreData: false,
    hasRecord: false,
    page: 1,
    pageSize: 20,
    beanList: []
  },
  onLoad: function (options) {
   var that = this
    wx.request({
      url: test + '/api/index/detail',
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + app.globalData.userInfo.api_token 
      }, // 默认值
      success: res=> {
        if(res.data.status == 1) {
          var beanList = that.data.beanList
          var beanInfo = res.data.data
          if (beanInfo.length == 0) {
            that.setData({
              hasRecord: false
            })
          } else {
            that.setData({
              hasRecord: true
            })
            if (beanInfo.length < that.data.pageSize) {
              that.setData({
                beanList: beanList.concat(beanInfo),
                hasMoreData: false
              })
            } else {
              that.setData({
                beanList: beanList.concat(beanInfo),
                pageSize: that.data.pageSize + 1,
                hasMoreData: false
              })
            }
          }
         
        }
        console.log("明细列表",res.data)
      }
    })
  },
  // 返回上一级
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onReachBottom: function () {
    var that = this
    if (that.data.hasMoreData) {
      that.onLoad()
    } else {
    }
  }
})