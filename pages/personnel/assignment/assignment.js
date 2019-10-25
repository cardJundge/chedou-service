// 分配作业员
import {
  PersonnelModel
} from '../models/personnel.js'
import {
  IndexModel
} from '../../index/models/index.js'

var indexModel = new IndexModel()
var personnelModel = new PersonnelModel()
Page({
  data: {
    taskList: []
  },
  onLoad: function (options) {
    this.data.listId = options.listId
    this.data.keyName = options.keyName
    this.getAllModule()
  },

  // 获取系统所有模块
  getAllModule() {
    indexModel.getAllModule(res => {
      if (res.data.status == 1) {
        res.data.data.forEach((item, index) => {
          if (item.key == this.data.keyName) {
            this.data.moduleId = item.id
            this.getTaskList()
          }
        })
      }
    })
  },

  getTaskList() {
    let params = {
      keywords: this.data.keyWords ? this.data.keyWords : '',
      module_id: this.data.moduleId
    }
    personnelModel.getTaskList(params, res=> {
      if(res.data.status == 1) {
        this.setData({
          taskList: res.data.data
        })
      }
    })
  },

  taskChange(e) {
    this.data.taskId = e.detail.value
  },

  submitAssignment() {
    let params = {
      task_id: this.data.taskId,
      key: this.data.keyName,
      id: this.data.listId
    }
    indexModel.assignmentTask(params, res=> {

    })
  },

  search(e) {
    this.data.keyWords = e.detail.value
  }
})