// 自定义模块列表
var app = getApp()
import {
  IndexModel
} from '../models/index.js'
import {
  PersonnelModel
} from '../../personnel/models/personnel.js'

var personnelModel = new PersonnelModel()

var indexModel = new IndexModel()
Page({
  data: {
    taskflowList: [{}],
    proportion: 80,
    noData: false
  },

  onLoad(options) {
    console.log(options)
    this.setData({
      moduleId: options.moduleId
    })
  },

  onShow() {
    this.setData({
      spinShow: true
    })
    this.getTaskList()
  },

  // 获取作业员列表
  getTaskList() {
    let params = {
      keywords: ''
    }
    personnelModel.getTaskList(params, res => {
      if (res.data.status == 1) {
        this.setData({
          taskList: res.data.data
        })
        this.getTaskflowList()
      }
    })
  },

  getTaskflowList() {
    let params = {
      module_id: this.data.moduleId
    }
    indexModel.getTaskflowList(params, res => {
      if (res.data.status == 1) {
        if (res.data.data.data.length == 0) {
          this.setData({
            noData: true
          })
        } else {
          this.setData({
            noData: false
          })
          res.data.data.data.forEach((item, index) => {
            this.data.taskList.forEach((item1, index1) => {
              if (item.task_id == item1.id) {
                item.taskName = item1.nickname
              }
            })
            if (item.norm) {
              let tempArr = []
              item.norm.forEach((item2, index2) => {
                if (item2.record && item2.record.content.length != 0) {
                  tempArr.push(item2)
                }
              })
              item.showType = 'norm'
              item.percentage = Math.floor(tempArr.length / item.norm.length * 100)
              if(item.percentage == 100 && item.approval) {
                item.showType = 'approval'
                item.approval.forEach((item2, index2) => {
                  if (!item2.record || item2.record.content.length < item.approval.length) {
                    item.approvalName = '未审核'
                  } else {
                    item.approvalName = '已审核'
                    if(item.comment) {
                      item.showType = 'comment'
                      item.comment.forEach((item3, index3) => {
                        if (!item3.record || item3.record.content.length < item.comment.length) {
                          item.commentName = '未评价'
                        } else {
                          item.commentName = '已评价'
                        }
                      })
                    }
                  }
                })
              }
              if (item.percentage == 100 && item.comment && !item.approval) {
                item.showType = 'comment'
                item.comment.forEach((item2, index2) => {
                  if (!item2.record || item2.record.content.length < item.comment.length) {
                    item.commentName = '未评价'
                  } else {
                    item.commentName = '已评价'
                  }
                })
              }
            }

            if (!item.norm && item.approval) {
              item.showType = 'approval'
              item.approval.forEach((item2, index2) => {
                if (!item2.record || item2.record.content.length < item.approval.length) {
                  item.approvalName = '未审核'
                } else {
                  item.approvalName = '已审核'
                  if (item.comment) {
                    item.showType = 'comment'
                    item.comment.forEach((item3, index3) => {
                      if (!item3.record || item3.record.content.length < item.comment.length) {
                        item.commentName = '未评价'
                      } else {
                        item.commentName = '已评价'
                      }
                    })
                  }
                }
              })
            }

            if (!item.norm && !item.approval && item.comment) {
              item.showType = 'comment'
              item.comment.forEach((item3, index3) => {
                if (!item3.record || item3.record.content.length < item.comment.length) {
                  item.commentName = '未评价'
                } else {
                  item.commentName = '已评价'
                }
              })
            }
          })
        }
        this.setData({
          taskflowList: res.data.data.data,
          spinShow: false
        })
        console.log(this.data.taskflowList)
      }
    })
  },

  toTaskflowDetail(e) {
    let listId = e.currentTarget.dataset.id,
    taskname = e.currentTarget.dataset.taskname
    wx.navigateTo({
      url: './taskflow-details/taskflow-details?listId=' + listId + '&taskname=' + taskname,
    })
  },

  // 添加任务流
  addTaskflow() {
    wx.navigateTo({
      url: './add-taskflow/add-taskflow?moduleId=' + this.data.moduleId,
    })
  }
})