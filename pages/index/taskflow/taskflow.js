// 自定义模块列表
var app = getApp()
import {
  IndexModel
} from '../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    taskflowList: [{}],
    proportion: 80
  },

  onLoad(options) {
    console.log(options)
    this.setData({
      moduleId: options.moduleId
    })
    this.gettaskFlowList()
  },

  gettaskFlowList() {
    let params = {
      module_id: this.data.moduleId
    }
    indexModel.getTaskflowList(params, res=> {
      console.log(res)
    })
  },

  toTaskflowDetail() {
    wx.navigateTo({
      url: './taskflow-details/taskflow-details',
    })
  },

  // 添加任务流
  addTaskflow() {
    wx.navigateTo({
      url: './add-taskflow/add-taskflow',
    })
  }
})