// 联盟详情
import {
  UnionModel
} from './../models/union.js'
var unionModel = new UnionModel()
var app = getApp()
Page({
  data: {
    unionInfo: [],
    memberList: []
  },
  onLoad: function (options) {
    let unionInfo = JSON.parse(options.data)
    this.setData({
      unionInfo: unionInfo,
      imgUrl: app.globalData.imgUrl
    })
    if(unionInfo) {
      this.getMemberList(unionInfo.id)
    }
  },

  // 获取联盟成员列表
  getMemberList(params) {
    unionModel.getMemberList(params, res=> {
      if(res.data.status == 1) {
        this.setData({
          memberList: res.data.dta
        })
      } else {

      }
    })
  },

  // 进入成员详细信息
  toMemberList() {
    wx.navigateTo({
      url: '../member/member',
    })
  },

  // 审核
  toExamine() {
    wx.showActionSheet({
      itemList: ['无需审核直接加入', '需要盟主审核'],
      success: (res) => {
        console.log(res.tapIndex);
        if (res.tapIndex === 0) {
          this.establishUnion()
        } else if (res.tapIndex === 1) {
          this.applyUnion()
        }
      }
    })
  }
})