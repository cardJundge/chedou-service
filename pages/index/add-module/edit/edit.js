// 编辑模块
var app = getApp()
import {
  IndexModel
} from '../../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    moduleName: '',
    secondBoxShow: true,
    normBoxShow: false,
    approvalBoxShow: false,
    commentBoxShow: false
  },

  onLoad(options) {
    this.data.moduleId = options.moduleId
    this.getModuleField()
  },

  // 获取模块所有字段
  getModuleField() {
    let params = {
      id: this.data.moduleId
    }
    indexModel.getModuleField(params, res => {
      if (res.data.status == 1) {
        this.setData({
          allData: res.data.data,
          moduleIcon: res.data.data.icon
        })
      }
    })
  },

   // 选择图标
   toSelectIcon() {
    wx.navigateTo({
      url: '../first/icon/icon?selected=' + this.data.moduleIcon,
    })
  },

  // --
  openSecondBox() {
    this.setData({
      secondBoxShow: !this.data.secondBoxShow
    })
  },

  // ---
  openNormBox() {
    this.setData({
      normBoxShow: !this.data.normBoxShow
    })
  },

  // ---
  openApprovalBox() {
    this.setData({
      approvalBoxShow: !this.data.approvalBoxShow
    })
  },

  // --
  openCommentBox() {
    this.setData({
      commentBoxShow: !this.data.commentBoxShow
    })
  },

  // 编辑任务流基本信息
  toEditField() {
    wx.navigateTo({
      url: '../second/second',
    })
  }
})