// 登录
Page({
  data: {

  },
  onLoad: function (options) {

  },

  // 去注册
  toRegister() {
    wx.navigateTo({
      url: './register/register',
    })
  },
  // 忘记密码
  toForget() {
    wx.navigateTo({
      url: './forget/forget',
    })
  },
  // 去登录
  formSubmit(e) {
    console.log(e)
    wx.switchTab({
      url: '../index/index',
    })
  }
})