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
      moduleId: options.moduleId,
      moduleName: options.moduleName
    })
    wx.setNavigationBarTitle({
      title: options.moduleName 
    })
  },

  onShow() {
    this.setData({
      spinShow: true
    })
    this.getTaskflowList()
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
            if (item.norm) {
              let tempArr1 = []
              item.norm.forEach((item1, index1) => {
                if (item1.record) {
                  tempArr1.push(item1)
                }
              })
              item.showType = 'norm'
              item.percentage = Math.floor(tempArr1.length / item.norm.length * 100)

              if (item.percentage == 100 && item.approval) {
                item.showType = 'approval'
                let tempArr2 = []
                item.approval.forEach((item2, index2) => {
                  if (item2.record) {
                    tempArr2.push(item2)
                  }
                  if (tempArr2.length < item.approval.length) {
                    item.approvalName = '未审批'
                  } else {
                    item.approvalName = '已审批'

                    if (item.comment) {
                      item.showType = 'comment'
                      let tempArr3 = []
                      item.comment.forEach((item3, index3) => {
                        if (item3.record) {
                          tempArr3.push(item3)
                        }
                        if (tempArr3.length < item.comment.length) {
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
                let tempArr2 = []
                item.comment.forEach((item2, index2) => {
                  if (item2.record) {
                    tempArr2.push(item2)
                  }
                  if (tempArr2.length < item.comment.length) {
                    item.commentName = '未评价'
                  } else {
                    item.commentName = '已评价'
                  }
                })
              }
            }

            if (!item.norm && item.approval) {
              let tempArr2 = []
              item.showType = 'approval'
              item.approval.forEach((item2, index2) => {
                if (item2.record) {
                  tempArr2.push(item2)
                }
                if (tempArr2.length < item.approval.length) {
                  item.approvalName = '未审批'
                } else {
                  item.approvalName = '已审批'

                  if (item.comment) {
                    let tempArr3 = []
                    item.showType = 'comment'
                    item.comment.forEach((item3, index3) => {
                      if (item3.record) {
                        tempArr3.push(item3)
                      }
                      if (tempArr3.length < item.comment.length) {
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
              let tempArr3 = []
              item.showType = 'comment'
              item.comment.forEach((item3, index3) => {
                if (item3.record) {
                  tempArr3.push(item3)
                }
                if (tempArr3.length < item.comment.length) {
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

  // 进入任务流详情
  toTaskflowDetail(e) {
    let listId = e.currentTarget.dataset.id,
      taskname = e.currentTarget.dataset.taskname
    wx.navigateTo({
      url: './taskflow-details/taskflow-details?listId=' + listId + '&taskname=' + taskname + '&moduleName=' + this.data.moduleName,
    })
  },

  // 添加任务流
  addTaskflow() {
    wx.navigateTo({
      url: './add-taskflow/add-taskflow?moduleId=' + this.data.moduleId,
    })
  }
})