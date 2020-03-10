// 添加商品/服务
import WxValidate from '../../../../../dist/WxValidate.js'
import {
  MineModel
} from './../../../models/mine.js'

var app = getApp()
var mineModel = new MineModel()

Page({

  data: {
    formData: {
      serviceName: '',
      servicePrice: '',
      serviceIntro: '',
    },
    imageList: [],
    serviceType: ["购买", "预约"],
    hasCate: false
  },

  onLoad: function(options) {
    console.log(options.data)
    this.initValidate()
    this.getClassification()
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
  },

  // 获取分类
  getClassification() {
    mineModel.getClassificationList(res => {
      if (res.data.status == 1) {
        var cateList = res.data.data
        var id
        var cateArr = cateList.map((item, index) => {
          if(index == 0) {
            id = item.id
          }
          return item.name
        })
        
        this.setData({
          multiIndex: [0, 0],
          cateList,
          cateArr
        })
        this.getChild(id)
      }
    })
  },

  // 获取分类下的二级分类
  getChild(id) {
    this.data.cateList.forEach((item, index) => {
      if(item.id == id) {
        var childList = item.child
        var childArr = childList.map(item => {
          return item.name
        })
        this.setData({
          multiArray: [this.data.cateArr, childArr],
          childList,
          childArr
        })
      }
    })
  },

  // ---------------->???
  bindMultiPickerChange(e) {
    console.log(e.detail.value)
    this.setData({
      hasCate: true,
      multiIndex: e.detail.value
    })
    this.data.childList.forEach((item, index) => {
      if(index == e.detail.value[1]) {
        this.data.cateId = item.id
      }
    })
  },

  bindMultiPickerColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        this.data.cateList.forEach((item, index) => {
          if(index == e.detail.value) {
            this.getChild(item.id)
          }
        })
    }
  },

  // -------------------->???

  serviceTypeChange(e) {
    this.setData({
      serviceTypeIndex: e.detail.value
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
            fail: (err) => {}
          })
        }
      }
    })

  },

  formSubmit(e) {
    let data = e.detail.value
    // let cateId = this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]]
    console.log(data)
    if (!this.WxValidate.checkForm(data)) {
      const error = this.WxValidate.errorList[0]
      return wx.showToast({
        title: error.msg,
        icon: 'none'
      })
    } else if (!this.data.serviceTypeIndex) {
      return wx.showToast({
        title: '请选择商品/服务类型',
        icon: 'none'
      })
    }else if (!this.data.cateId) {
      return wx.showToast({
        title: '请选择商品/服务分类',
        icon: 'none'
      })
    } else {
      let params = {
        name: data.serviceName,
        price: data.servicePrice,
        intro: data.serviceIntro,
        type: this.data.serviceTypeIndex,
        cate_id: this.data.cateId,
        pic: this.data.imageList.toString()
      }
      mineModel.addService(params, res => {
        if (res.data.status == 1) {
          wx.showToast({
            title: '添加成功',
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },

  // 大图预览
  previewImage(e) {
    console.log(e.currentTarget.dataset)
    let imgArr = []
    let imgIndex = e.currentTarget.dataset.index
    this.data.imageList.forEach((item, index) => {
      imgArr.push(this.data.imgUrl + item)
    })
    wx.previewImage({
      urls: imgArr,
      current: imgArr[imgIndex]
    })
  },

  // 删除图片
  delImg(e) {
    let imageList = this.data.imageList
    let imgIndex = e.currentTarget.dataset.index
    imageList.splice(imgIndex, 1)
    this.setData({
      imageList: imageList
    })
  }
})