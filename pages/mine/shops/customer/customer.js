// 客户管理
Page({

  data: {
    someOne: true,
    tagsModalShow: false
  },

  onLoad: function (options) {

  },

  toEditTags() {
    this.setData({
      tagsModalShow: true
    })
  }
})