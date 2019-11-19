// 查勘定损

Page({
  data: {
    key: 'survey'
  },
  onLoad(options) {
    
  },
  onShow() {
    this.setData({
      businessList: [],
      page: 1,
      spinShow: true
    })
    this.selectComponent("#businessListId").getBusinessList()
  }
})