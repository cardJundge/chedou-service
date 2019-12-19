// 添加案件相关资料
var imgId = 0
var relatedId = 0
import {
  IndexModel
} from '../../models/index.js'

var app = getApp()
var indexModel = new IndexModel()
// import {
//   Personalcenter
// } from "../../../mine/personalcenter/personalcentermode.js"
// var personalcenter = new Personalcenter()
// import {
//   Investigationmode
// } from '../investigationmode.js'
// var investigation = new Investigationmode()


Page({
  data: {
    relatedInfoList: [{
      id: relatedId++,
      title: '',
      picture: []
    }],
    imagecell: [],
    fileNameTemp: '',
    picture: [], //最终上传的图片地址
    // itempic: [], //每一项的图片
    title: [],
    // itemtitle:[],
    type: 1
  },

  onLoad: function(options) {
    this.data.vehicleId = options.vehicleId
  },

  //添加相关资料
  addRelated() {
    this.data.relatedInfoList.push({
      id: relatedId++,
      title: '',
      picture: []
    })

    this.setData({
      relatedInfoList: this.data.relatedInfoList,
    })
  },

  //选择照片
  chooseImg(e) {
    this.data.imagecell = []
    var index = e.currentTarget.dataset.index
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        var tempPicLength = res.tempFilePaths.length
        if (tempPicLength + this.data.imagecell.length > 9) {
          res.tempFilePaths = res.tempFilePaths.slice(0, 9 - this.data.imagecell.length)
        }

        for (let i in res.tempFilePaths) {
          this.data.imagecell.push({
            id: imgId++,
            path: res.tempFilePaths[i]
          })
        }

        this.data.relatedInfoList[index].picture = this.data.relatedInfoList[index].picture.concat(this.data.imagecell)
        this.setData({
          relatedInfoList: this.data.relatedInfoList,
        })
        // console.log("ddd", this.data.relatedInfoList)
      }
    })
  },

  //确定按钮 提交相关资料
  addRelatedInfo() {
    this.uploadimg(0, 0)
  },

  //上传图片递归
  uploadimg(i, j) {
    wx.showLoading({
      title: '添加中..',
    })
    if (i < this.data.relatedInfoList.length) {
      if (j < this.data.relatedInfoList[i].picture.length) {
        this.upp(i, j, res => {
          this.uploadimg(i, j + 1)
        })
      } else {
        // this.data.itempic.push(this.data.fileNameTemp)
        this.data.picture.push(this.data.fileNameTemp)
        this.data.fileNameTemp = ''
        // this.data.itempic = []
        this.uploadimg(i + 1, 0)
      }
    } else {
      // this.data.pic = this.data.fileNameTemp.substr(1, this.data.fileNameTemp.length)
      // console.log("eee", this.data.picture)
      for (var item in this.data.picture) {
        this.data.picture[item] = (this.data.picture[item]).substr(1)
      }

      this.data.title = []
      this.data.relatedInfoList.forEach((item, index) => {
        this.data.title.push(item.title)
        // this.data.title.push(this.data.itemtitle)
        // this.data.itemtitle = []
      })

      let params = {
        case_id: this.data.vehicleId,
        title: this.data.title,
        picture: this.data.picture,
        type: this.data.type
      }
      indexModel.addRelatedInfo(params, res => {
        this.data.picture = []
        if (res.data.status == 1) {
          wx.showToast({
            title: '资料添加成功！',
          })
          wx.hideLoading()
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },

  //上传照片
  upp(i, j, callback) {
    this.data.mediaSrc = this.data.relatedInfoList[i].picture[j].path
    wx.uploadFile({
      url: app.globalData.hostName + '/api/auth/upload',
      filePath: this.data.mediaSrc,
      name: 'file',
      success: (res) => {
        let data = JSON.parse(res.data)
        if (data.status == 1) {
          this.data.fileName = data.data.filename
          this.data.fileNameTemp = this.data.fileNameTemp + ',' + this.data.fileName
          callback(this.data.fileNameTemp)
        } else {
          
        }
      }
    })
    // personalcenter.upFace("/api/auth/upload", this.data.mediaSrc, res => {
    //   console.log(res)
    //   var jsonStr = res.data
    //   jsonStr = jsonStr.replace(" ", "")
    //   jsonStr = jsonStr.replace(/\ufeff/g, "") //重点
    //   res.data = JSON.parse(jsonStr)
    //   if (res.data.status == 1) {
    //     this.data.fileName = res.data.data.filename
    //     // console.log(this.data.fileName)

    //     this.data.fileNameTemp = this.data.fileNameTemp + ',' + this.data.fileName
    //     callback(this.data.fileNameTemp)

    //   } else if (res.data.status == -2) {
    //     wx.hideLoading()
    //     wx.showModal({
    //       title: '文件大于2M',
    //       content: '',
    //     })
    //   }
    // })
  },

  getInputTitle(e) {
    var index = e.currentTarget.dataset.titleindex
    this.data.relatedInfoList[index].title = e.detail.value
  }

})