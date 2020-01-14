// 添加分类
Page({

  data: {

  },

  onLoad: function (options) {

  },

  getClassificationName(e) {
    console.log(e)
    this.data.classificationName = e.detail.value
  },

  toConfirm() {
    if (!this.data.classificationName) {
      return wx.showToast({
        title: '请输入分类名称',
        icon: 'none'
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})