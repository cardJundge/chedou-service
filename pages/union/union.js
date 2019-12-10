// 联盟
import {
  UnionModel
} from './models/union.js'
var unionModel = new UnionModel()
Page({
  data: {
    someUnion: true
  },
  onLoad: function(options) {
  },

  onShow: function() {
    this.getMyUnionList()
  },

  // 获取联盟列表
  getMyUnionList() {
    unionModel.myUnionList(res=> {
      if(res.data.status == 1) {

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
  toUnionDetails() {
    wx.navigateTo({
      url: './union-details/union-details'
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