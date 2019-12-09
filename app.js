//app.js
App({
  onLaunch: function () {
    console.log('onLaunch')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
   
  },
  globalData: {
    userInfo: null,
    hostName: 'http://192.168.1.108',
    // hostName: 'https://api.feecgo.com',
    // imgUrl: 'https://feecgo.com/uploads/',
    imgUrl: 'https://cdn.feecgo.com/uploads/',
    clound: "https://6368-chedou-service-1257955119/images/"
  }
})