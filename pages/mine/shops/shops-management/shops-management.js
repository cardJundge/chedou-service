// 商铺管理
import WxValidate from '../../../../dist/WxValidate.js'
var app = getApp()
Page({

  data: {
    formData: {
      shopsName: '',
      shopsShortName: '',
      phoneNumber: '',
      shopsAddress: ''
    },
    imageList: []
  },

  onLoad: function (options) {
    this.initValidate() // 验证规则函数
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
  },

  initValidate() {
    const rules = {
      shopsName: {
        required: true
      },
      shopsShortName: {
        required: true
      },
      phoneNumber: {
        required: true,
        tel: true
      },
      shopsAddress: {
        required: true
      }
    }
    const messages = {
      shopsName: {
        required: '请输入商铺名称'
      },
      shopsShortName: {
        required: '请输入商铺简称'
      },
      phoneNumber: {
        required: '请输入服务电话',
        tel: '请输入正确的服务电话'
      },
      shopsAddress: {
        required: '请输入商铺地址'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  // 获取商铺名称
  // getShopsName(e) {
  //   console.log(e.detail.value)
  //   this.data.formData.shopsName = e.detail.value
  // },

  // 获取商铺简称
  // getShopsShortName(e) {
  //   console.log(e.detail.value)
  //   this.data.formData.shopsShortName = e.detail.value
  // },

  // 获取服务商电话
  // getPhoneNumber(e) {
  //   console.log(e.detail.value)
  //   this.data.formData.phoneNumber = e.detail.value
  // },

  // 获取商铺位置
  // getShopsAddress(e) {
  //   console.log(e.detail.value)
  //   this.data.formData.shopsAddress = e.detail.value
  // },

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
    } else if(this.data.imageList.length == 0){
      return wx.showToast({
        title: '请上传商铺照片',
        icon: 'none'
      })
    } else {
      let params = {
        
      }
    }
  }
})