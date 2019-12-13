// 申请加入详情
import {
  UnionModel
} from './../../models/union.js'
var unionModel = new UnionModel()
var app = getApp()
Page({
  data: {

  },

  onLoad: function (options) {
    console.log(options)
    let unionInfo = JSON.parse(options.data)
    this.setData({
      unionInfo: unionInfo,
      imgUrl: app.globalData.imgUrl
    })
  },

  toApply() {
    let params = {
      id: this.data.unionInfo.id,
      service_id: app.globalData.userInfo.id
    }
    unionModel.applyJoinUnion(params, res=> {
      if(res.data.status == 1) {
        wx.showToast({
          title: '申请成功，等待审核'
        })
      } else {
        if (res.data.msg.match('Token已过期或失效')) {
        } else {
          wx.showToast({
            title: res.data.msg ? res.data.msg : '请求超时',
            icon: 'none'
          })
        }
      }
    })
  }
})