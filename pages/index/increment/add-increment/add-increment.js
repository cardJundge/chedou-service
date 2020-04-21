// 增值服务添加客户
import {
  IndexModel
} from '../../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    servicePack: ['增值服务包1','增值服务包2'],
    packVal: '',
    clientName: '',
    clientMobile: ''
  },

  onLoad(options) {

  },

  // 获取用户姓名
  getInputName(e) {
    this.setData({
      clientName: e.detail.value
    })
  },

  // 获取用户电话
  getInputMobile(e) {
    this.setData({
      clientMobile: e.detail.value
    })
  },

  packSelect(e) {
    this.setData({
      packVal: this.data.servicePack[e.detail.value]
    })
  },

  // 确定按钮
  onConfirm() {
    let params = {    

    }
    wx.navigateBack({
      delta: 1
    })
  }
})