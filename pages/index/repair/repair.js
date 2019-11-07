// 维修列表
Page({
  data: {
    key: 'push'
  },
  onLoad(options) {

  },
  onShow() {
    this.setData({
      businessList: [],
      page: 1
    })
    this.selectComponent("#businessListId").getBusinessList()
  }
})