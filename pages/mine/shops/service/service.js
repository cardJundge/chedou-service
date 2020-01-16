// 商品/服务
import {
  MineModel
} from './../../models/mine.js'

var app = getApp()
var mineModel = new MineModel()
Page({

  data: {
    noService: false
  },

  onLoad: function (options) {

  },

  // 去添加商品/服务管理
  toAddService() {
    wx.navigateTo({
      url: './add-service/add-service',
    })
  },

  // 删除商品/服务管理
  toDelService() {
    wx.showModal({
      title: '提示',
      content: '',
      success: res=> {
        if(res.confirm) {

        }
      }
    })
  },

  // 编辑商品/服务管理
  toEditService() {
    wx.navigateTo({
      url: './add-service/add-service',
    })
  }
})