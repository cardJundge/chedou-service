// 添加商品/服务
import WxValidate from '../../../../../dist/WxValidate.js'
var app = getApp()

Page({

  data: {
   formData: {
     serviceName: '',
     servicePrice: '',
     serviceIntro: '',
   },
    imageList: [],
    serviceType: ["预约", "购买"]
  },

  onLoad: function (options) {
    this.initValidate()
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
  },

  initValidate() {
    const rules = {
      serviceName: {
        required: true
      },
      servicePrice: {
        required: true,
        digits: true
      },
      serviceIntro: {
        required: true
      }
    }
    const messages = {
      serviceName: {
        required: '请输入商品/服务名称'
      },
      servicePrice: {
        required: '请输入商品/服务价格',
        digits: '商品/服务价格只能为数字'
      },
      serviceIntro: {
        required: '请输入商品/服务简介'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  serviceTypeChange(e) {
    console.log(e)
    this.setData({
      serviceTypeIndex: e.detail.value
    })
  },

  // 上传店铺照片
  uploadImg() {
    wx.chooseImage({
      count: 9,
      // 可以指定是原图还是压缩图
      sizeType: ['compressed'],
      // 可以指定来源是相册还是相机
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        let imageList = []
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.hostName + '/api/auth/upload',
            filePath: res.tempFilePaths[i],
            name: 'file',
            success: (res) => {
              let data = JSON.parse(res.data)
              console.log(data)
              if (data.status == 1) {
                imageList.push(data.data.filename)
                this.setData({
                  imageList: imageList
                })
              } else {
                wx.showToast({
                  title: data.msg ? data.msg : '操作超时',
                  icon: 'none'
                })
              }
            },
            fail: (err) => {
            }
          })
        }
      }
    })

  },

  formSubmit(e) {
    let data = e.detail.value
    console.log(data)
    if (!this.WxValidate.checkForm(data)) {
      const error = this.WxValidate.errorList[0]
      return wx.showToast({
        title: error.msg,
        icon: 'none'
      })
    }
  }
})