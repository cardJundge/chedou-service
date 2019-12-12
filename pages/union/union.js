// 联盟
import {
  UnionModel
} from './models/union.js'
var unionModel = new UnionModel()
var app = getApp()
Page({
  data: {
    someUnion: true,
    myUnionList: [],
    spinShow: true,
  },
  onLoad: function(options) {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
  },

  onShow: function() {
    this.getMyUnionList()
  },

  // 获取我的联盟列表
  getMyUnionList() {
    let params = {
      type: 1
    }
    unionModel.getUnionList(params, res=> {
      this.setData({
        spinShow: false
      })
      if(res.data.status == 1) {
        if (res.data.data.length == 0) {
          this.setData({
            someUnion: false
          })
        } else {
          res.data.data.forEach((item, index) => {
            item.module = item.module.split(',')
          })
          this.setData({
            myUnionList: res.data.data,
            someUnion: true
          })
        }
      } else {

      }
    })
  },

  // 打开底部选项框
  openUnionSheet() {
    wx.showActionSheet({
      itemList: ['创建联盟', '申请加入联盟'],
      success: (res)=> {
        console.log(res.tapIndex);
        if (res.tapIndex === 0) {
          this.establishUnion()
        } else if (res.tapIndex === 1) {
          this.applyUnion()
        }
      }
    })
  },

  // 申请加入
  applyUnion() {
    wx.navigateTo({
      url: './join/join',
    })
  },

  // 创建联盟
  establishUnion() {
    wx.navigateTo({
      url: './establish/establish',
    })
  },

  // 进入联盟详情
  toUnionDetails(e) {
    let items = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: './union-details/union-details?data=' + items
    })
  },

  // 进入通知列表
  toNoticeList() {
    wx.navigateTo({
      url: './notice/notice',
    })
  },

  // 搜索
  search(e) {
    console.log(e)
  }
})