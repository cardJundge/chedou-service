// 调查
Page({
  data: {
    key: 'hurt'
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