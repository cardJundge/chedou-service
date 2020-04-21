// 增值服务-详情
import {
  IndexModel
} from '../../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    tabList: ['增值服务包'],
    isActive: 0,
    hasPackage: true
  },

  onLoad(options) {
    // 获取增值服务详情
    this.getIncrementDetails()
  },

  getIncrementDetails() {},

  // 增值服务包使用详情
  toPackDetails() {
    wx.navigateTo({
      url: './pack-details/pack-details',
    })
  },

  // 保存图片
  toSaveImage() {
    wx.saveImageToPhotosAlbum({
      filePath: '/images/logo.png',
      success: res => {
        console.log(res)
        wx.showToast({
          title: '已保存到相册'
        })
      },
      fail: err => {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          fail: err1 => {
            wx.showModal({
              title: '提示',
              content: '是否前往设置页面授权保存到相册',
              success: res2 => {
                if (res2.confirm) {
                  wx.openSetting({
                    success: res3 => {
                      if (res3.authSetting['scope.writePhotosAlbum']) {
                        console.log("设置保存到相册授权成功")
                      }
                    },
                    fail: err3 => {
                      wx.showToast({
                        title: '请前往设置页面设置保存相册授权',
                        icon: 'none'
                      })
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  }
})