// 自定义模块详情
Page({
  data: {
    tabList: ['任务标准', '管理者审批', '客户评价'],
    isActive: 0
  },

  onLoad(options) {

  },

  changeTab(e) {
    console.log(e)
    this.setData({
      isActive: e.currentTarget.dataset.index
    })
  },
})