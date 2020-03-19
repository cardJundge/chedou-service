// 添加模块---》第一步
Page({
  data: {
    moduleName: ''
  },

  onLoad(options) {

  },


  // 下一步
  nextStep() {
    if(this.data.moduleName == '') {
      return wx.showToast({
        title: '请输入模块名称',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../second/second',
      })
    }
  },

  getModuleName(e) {
    this.setData({
      moduleName: e.detail.value
    })
  }
})