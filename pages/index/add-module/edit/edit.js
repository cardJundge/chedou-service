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
    taskInputBoxShow: false,
    approvalBoxShow: false,
    evaluateBoxShow: false
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
          moduleName: res.data.data.name,
          fieldData: res.data.data.field,
          taskInputData: res.data.data.norm,
          approvalData: res.data.data.approval,
          evaluateData: res.data.data.comment,
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
  openTaskInputBox() {
    this.setData({
      taskInputBoxShow: !this.data.taskInputBoxShow
    })
  },

  // ---
  openApprovalBox() {
    this.setData({
      approvalBoxShow: !this.data.approvalBoxShow
    })
  },

  // --
  openEvaluateBox() {
    this.setData({
      evaluateBoxShow: !this.data.evaluateBoxShow
    })
  },

  // 编辑任务流基本信息
  toEditField() {
    let data = JSON.stringify(this.data.fieldData)
    wx.navigateTo({
      url: '../second/second?flag=' + 'edit' + '&fieldData=' + data,
    })
  },

  // 编辑员工管理项
  toEditTaskInput() {
    let data = JSON.stringify(this.data.taskInputData)
    wx.navigateTo({
      url: '../third/task-input/task-input?taskInputData=' + data,
    })
  },

  // 编辑审核管理项
  toEditApproval() {
    let data = JSON.stringify(this.data.approvalData)
    wx.navigateTo({
      url: '../third/approval/approval?approvalData=' + data,
    })
  },

  // 编辑评价管理项
  toEditEvaluate() {
    let data = JSON.stringify(this.data.evaluateData)
    wx.navigateTo({
      url: '../third/evaluate/evaluate?evaluateData=' + data,
    })
  },

  // 获取要编辑的标题
  getModuleName(e) {
    this.setData({
      moduleName: e.detail.value
    })
  },

  // 提交
  onConfirm() {
    let params = {
      id: this.data.moduleId,
      name: this.data.moduleName,
      icon: this.data.moduleIcon,
      field: this.data.fieldData
    }
    if (this.data.taskInputData) {
      params.norm = this.data.taskInputData
    }
    if (this.data.approvalData) {
      params.approval = this.data.approvalData
    }

    if (this.data.evaluateData) {
      params.comment = this.data.evaluateData
    }

    indexModel.editModule(params, res=> {
      if (res.data.status == 1) {
        wx.switchTab({
          url: '../../index',
        })
      }
    })
  }
})