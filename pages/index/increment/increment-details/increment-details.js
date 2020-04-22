// 增值服务-详情
import {
  IndexModel
} from '../../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    tabList: ['增值服务包'],
    isActive: 0,
    hasPackage: false
  },

  onLoad(options) {
    this.data.listId = options.listId
    this.data.moduleId = options.moduleId
    // 获取增值服务详情
    this.getIncrementDetails()
  },

  getIncrementDetails() {
    indexModel.getBusinessDetail('added', this.data.listId, this.data.moduleId, res=> {
      if (res.data.status == 1) {
        this.setData({
          incrementDetailsData: res.data.data
        })
        if (res.data.data.status == 0) {
          this.setData({
            hasPackage: false
          })
        } else {
          this.setData({
            hasPackage: true
          })
        }
      }
    })
  },

  // 增值服务包使用详情
  toPackDetails() {
    wx.navigateTo({
      url: './pack-details/pack-details',
    })
  }
})