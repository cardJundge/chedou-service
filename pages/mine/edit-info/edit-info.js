// 修改基本信息
import {
  MineModel
} from '../models/mine.js'

var mineModel = new MineModel()
var app = getApp()

Page({
  data: {
    avatarUrl: '',
    companyName: '',
    basicUserInfo: {}
  },
  onLoad: function (options) {
    this.setData({
      basicUserInfo: app.globalData.userInfo
    })
  },

  companyInput(e) {

    this.setData({
      companyName: e.detail.value
    })
    console.log(e.detail.value, this.data.companyName)
  },

  // 上传图片
  uploadAvatar() {
    var that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.hostName + '/api/auth/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          success(res1) {
            let data = JSON.parse(res1.data)
            that.setData({
              avatarUrl: app.globalData.imgUrl + data.data.filename,
              avatar: data.data.filename
            })
          }
        })
      }
    })
  },

  // 确定==》修改信息
  onConfirm() {
    mineModel.modifyInfo(this.data.avatar, this.data.companyName, res=> {
      if(res.data.status == 1) {
        wx.showToast({
          title: '修改成功',
        })
      } else {
        wx.showToast({
          title: res.data.msg ? res.data.msg : '请求超时',
          icon: 'none'
        })
      }
    })
  }
})