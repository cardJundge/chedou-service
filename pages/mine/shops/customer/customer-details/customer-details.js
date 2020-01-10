// 客户管理详情
Page({

  data: {
    schedule: [
      { title: '购买项目', date: '2020 1-10 11:36', content: 'xxxxx'  },
      { title: '扫码进入', date: '2020 1-10 10:36', content: '' }
    ]
  },

  onLoad: function (options) {

  },

  toEditTags() {
    this.setData({
      tagsModalShow: true
    })
  },
})