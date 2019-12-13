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
    this.setData({
      imgUrl: app.globalData.imgUrl,
      serviceId: app.globalData.userInfo.id
    })
    if (options.data) {
      this.getMemberList(options.data)
      this.data.unionId = options.data
    }
  },

  // 获取联盟成员列表
  getMemberList(params) {
    unionModel.getMemberList(params, res=> {
      if(res.data.status == 1) {
        res.data.data.module = res.data.data.module.split(',')
        this.setData({
          unionInfo: res.data.data,
          memberList: res.data.data.service
        })
      } else {

      }
    })
  },

  // 进入成员详细信息
  toMemberList() {
    wx.navigateTo({
      url: '../member/member?data=' + this.data.unionId,
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
  },

  // 删除或退出联盟
  signOutUnion() {
    let params = {
      league_id: this.data.unionInfo.id,
      service_id: app.globalData.userInfo.id
    }
    unionModel.signOutUnion(params, res=> {
      if(res.data.status == 1) {
        wx.showToast({
          title: '退出成功',
        })
        wx.navigateBack({
          delta: 1
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