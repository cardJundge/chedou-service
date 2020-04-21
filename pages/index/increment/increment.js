// 增值服务
import {
  IndexModel
} from '../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    incrementList: [{name: '客户姓名', mobile: '13911111111', case_no: '547687646546548'}]
  },

  onLoad(options) {
    // 获取增值服务列表
    this.getIncrementList() 
  },

  getIncrementList() {

  },

  addIncrement() {
    wx.navigateTo({
      url: './add-increment/add-increment',
    })
  },

  toIncrementDetails() {
    wx.navigateTo({
      url: './increment-details/increment-details',
    })
  },

  // 搜索业务
  search() {

  }
})