// 创建联盟
import {
  UnionModel
} from '../models/union.js'
import {
  IndexModel
} from '../../index/models/index.js'
import {
  PersonnelModel
} from '../../personnel/models/personnel.js'

var personnelModel = new PersonnelModel()
var indexModel = new IndexModel()
var unionModel = new UnionModel()
var app = getApp()
Page({
  data: {
    moduleArray: [],
    bottomSpin: true,
    isAddModule: false,
    businessArray: [],
    unionName: ''
  },
  onLoad: function (options) {
    this.getModule()
    this.data.hostName = app.globalData.hostName
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
  },

  // 获取服务商拥有的模块
  getModule() {
    personnelModel.getModule(res => {
      if (res.data.status == 1) {
        let module = []
        res.data.data.forEach((item, index) => {
          item.img = '/images/index/' + item.key + '.png'
          module.push(item.name)
        })
        module = module.join(',')
        let modules = res.data.data.reverse()
        this.setData({
          businessArray: modules,
          module: module
        })


      }
    })
  },

  // 添加模块按钮
  okEvent() {
    this.getModule()
  },

  addModule() {
    this.setData({
      isAddModule: true
    })
    indexModel.getAllModule(res => {
      if (res.data.status == 1) {
        this.setData({
          bottomSpin: false
        })
        res.data.data.forEach((item, index) => {
          item.selected = false
          item.img = '/images/index/' + item.key + '.png'
          this.data.businessArray.forEach((its, ins) => {
            if (item.id == its.id) {
              item.selected = true
            }
          })
        })
        this.setData({
          moduleArray: res.data.data
        })
      }
    })
  },

  selectImg() {
    wx.chooseImage({
      count: 1,
      // 可以指定是原图还是压缩图
      sizeType: ['compressed'],
      // 可以指定来源是相册还是相机
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.showLoading({
          title: '上传中...',
        })
        const tempFilePaths = res.tempFilePaths
          // this.upload()
          wx.uploadFile({
            url: this.data.hostName + '/api/auth/upload',
            filePath: tempFilePaths[0],
            name: 'file',
            success: (res) => {
              console.log('联盟logo上传',res)
              wx.hideLoading()
              let data = JSON.parse(res.data)
              if (data.status == 1) {
                this.setData({
                  imgLogo: data.data.filename
                })
              } else {
                wx.showToast({
                  title: data.msg ? data.msg : '操作超时',
                  icon: 'none'
                })
              }
            },
            fail: (err) => {
              wx.hideLoading()
            }
          })
      },
    })
  },

  getUnionName(e) {
    this.setData({
      unionName: e.detail.value
    })
  },

  getUnionIntro(e) {
    this.setData({
      unionIntro: e.detail.value
    })
  },

  onConfirm() {
    if (!this.data.imgLogo) {
      return wx.showToast({
        title: '联盟logo不能为空',
        icon: 'none'
      })
    }else if (!this.data.unionName) {
      return wx.showToast({
        title: '联盟名称不能为空',
        icon: 'none'
      })
    } else if (!this.data.unionIntro) {
      return wx.showToast({
        title: '联盟简介不能为空',
        icon: 'none'
      })
    } else if (!this.data.module) {
      return wx.showToast({
        title: '主导业务不能为空',
        icon: 'none'
      })
    }
    let params = {
      name: this.data.unionName,
      logo: this.data.imgLogo,
      intro: this.data.unionIntro,
      audit: 1,
      module: this.data.module
    }

    unionModel.createUnion(params, res=> {
      if(res.data.status == 1) {
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

    console.log(params)
  }
})