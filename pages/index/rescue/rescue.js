// 救援
Page({
  data: {
    key: 'rescue'
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