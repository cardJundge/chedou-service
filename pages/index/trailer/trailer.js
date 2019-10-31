// 救援
Page({
  data: {
    key: 'trailer'
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