// 创建模块===》开始页面
Page({
  data: {

  },

  onLoad(options) {
    this.setData({
      businessArray: JSON.parse(options.data)
    })
  },

  // 进入系统模块详情
  toSystemItemList(e) {
    let key = e.currentTarget.dataset.key
    if (key == 'survey') {
      wx.navigateTo({
        url: '../../survey/survey',
      })
    } else if (key == 'sickness') {
      wx.navigateTo({
        url: '../../sickness/sickness',
      })
    } else if (key == 'traffic') {
      wx.navigateTo({
        url: '../../vehicle/vehicle',
      })
    }
  },

  // 进入自建模块详情
  toDefineItemList(e) {
    let id = e.currentTarget.dataset.id,
    name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../../taskflow/taskflow?moduleId=' + id + '&moduleName=' + name,
    })
  },

  // 添加模块
  toAddModule() {
    wx.navigateTo({
      url: '../first/first',
    })
  }
})