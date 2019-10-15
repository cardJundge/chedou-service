// 我
import {
  MineModel
} from './models/mine.js'

var mineModel = new MineModel()
Page({
  data: {

  },
  onLoad: function (options) {

  },
  editInfo() {
    wx.navigateTo({
      url: './edit-info/edit-info',
    })
  },

  modifyPwd() {
    wx.navigateTo({
      url: '../login/modify/modify',
    })
  },

  toLogout() {
    wx.showModal({
      title: '提示',
      content: '确定退出登录吗',
      success: function (res) {
        if (res.cancel) {
        } else {
         mineModel.logout(res=> {
           if(res.data.status == 1) {
             wx.reLaunch({
               url: '../login/login',
             })
           } else {
             wx.showToast({
               title: res.data.msg,
             })
           }
         })
        }
      }
    })
  }
})