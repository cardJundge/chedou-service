// 添加自定义模块任务流
import dateTimePicker from '../../../../dist/dateTimePicker.js'
var app = getApp()
import {
  IndexModel
} from '../../models/index.js'
import {
  PersonnelModel
} from '../../../personnel/models/personnel.js'

var personnelModel = new PersonnelModel()
var indexModel = new IndexModel()
Page({
  data: {
    taskList: [],
    imageList: [],
    field: []
    // field: [{
    //   name: '图片',
    //   type: 'image',
    //   required: 0
    // }]
  },

  onLoad(options) {
    this.setData({
      moduleId: options.moduleId,
      imgUrl: app.globalData.imgUrl
    })
    this.getModuleField()
    this.getTaskList()
    var datetimeObj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear)
    this.setData({
      dateTimeArray: datetimeObj.dateTimeArray,
      dateTime: datetimeObj.dateTime
    })
  },

  onShow() {
    if (this.data.fixedLossAdd) {
      this.data.field.forEach((item, index) => {
        if (item.name == this.data.locationName) {
          item.value = this.data.fixedLossAdd
        }
      })
      this.setData({
        field: this.data.field
      })
    }
  },

  // 获取作业员列表
  getTaskList() {
    let params = {
      keywords: '',
      module_id: this.data.moduleId
    }
    personnelModel.getTaskList(params,res => {
      if (res.data.status == 1) {
        res.data.data.forEach((item, index) => {
          this.data.taskList.push(item.nickname)
        })
        console.log(this.data.taskList)
        this.setData({
          taskAllList: res.data.data,
          taskList: this.data.taskList
        })
        
      }
    })
  },

  // 获取模块字段
  getModuleField() {
    let params = {
      id: this.data.moduleId
    }
    indexModel.getModuleField(params, res => {
      if (res.data.status == 1) {
        this.setData({
          field: res.data.data.field
        })
      }
    })
  },

  // 去上传图片
  // toUploadImg(e) {
  //   let name = e.currentTarget.dataset.name
  //   this.setData({
  //     imageName: name
  //   })
  // },

  // 删除图片
  delImage(e) {
    let name = e.currentTarget.dataset.name,
    picIndex = e.currentTarget.dataset.index
    this.data.field.forEach((item, index) => {
      if (item.name == name) {
        item.value.splice(picIndex, 1)
      }
    })
    this.setData({
      field: this.data.field
    })
  },

  // 上传图片
  uploadImg(e) {
    let name = e.currentTarget.dataset.name
    this.data.imageList = []
    wx.chooseImage({
      count: 9,
      // 可以指定是原图还是压缩图
      sizeType: ['compressed'],
      // 可以指定来源是相册还是相机
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.hostName + '/api/auth/upload',
            filePath: res.tempFilePaths[i],
            name: 'file',
            success: (res) => {
              let data = JSON.parse(res.data)
              console.log(data)
              if (data.status == 1) {
                this.data.imageList.push(data.data.filename)
                this.data.field.forEach((item, index) => {
                  if (item.name == name) {
                    item.value = this.data.imageList
                  }
                })
                this.setData({
                  field: this.data.field
                })
              } else {
                wx.showToast({
                  title: data.msg ? data.msg : '操作超时',
                  icon: 'none'
                })
              }
            },
            fail: (err) => { }
          })
        }
      }
    })

  },

  // 获取所有文本框、数字型内容
  getInputInfo(e) {
    let name = e.currentTarget.dataset.name
    this.data.field.forEach((item, index) => {
      if (item.name == name) {
        item.value = e.detail.value
      }
    })
    this.setData({
      field: this.data.field
    })
  },

  // 位置型
  tochooseLocation(e) {
    this.data.locationName = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../../survey/survey-location/survey-location',
    })
  },

  // 下拉选择
  optionSelect(e) {
    let name = e.currentTarget.dataset.name
    this.data.field.forEach((item, index) => {
      if (item.name == name) {
        item.value = item.option[e.detail.value]
      }
    })
    this.setData({
      field: this.data.field
    })
  },

  // 选择日期时间
  datetimeChange(e) {
    console.log(e)
    let arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray,
      name = e.currentTarget.dataset.name

    this.data.field.forEach((item, index) => {
      if (item.name == name) {
        item.value = dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
      }
    })
    this.setData({
      field: this.data.field
    })
  },

  datetimeColumnChange(e) {
    console.log(e)
    let arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray,
      name = e.currentTarget.dataset.name

    arr[e.detail.column] = e.detail.value
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])
    this.data.field.forEach((item, index) => {
      if (item.name == name) {
        item.value = dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[3]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
      }
    })
    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr,
      field: this.data.field
    })
  },

  // 选择日期
  dateChange(e) {
    console.log(e)
    let name = e.currentTarget.dataset.name
    this.data.field.forEach((item, index) => {
      if (item.name == name) {
        item.value = e.detail.value
      }
    })
    this.setData({
      field: this.data.field
    })
  },

  // 选择时间
  timeChange(e) {
    let name = e.currentTarget.dataset.name
    this.data.field.forEach((item, index) => {
      if (item.name == name) {
        item.value = e.detail.value
      }
    })
    this.setData({
      field: this.data.field
    })
  },

  // 开始时间 截止时间
  datetimeFixedChange(e) {
    let arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray,
      name = e.currentTarget.dataset.name

    if (name == '开始时间') {
      this.data.startDatetime = dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
    } else if (name == '截止时间') {
      this.data.endDatetime = dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
    }

    this.setData({
      startDatetime: this.data.startDatetime,
      endDatetime: this.data.endDatetime
    })
  },
  datetimeFixedColumnChange(e) {
    console.log(e)
    let arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray,
      name = e.currentTarget.dataset.name

    arr[e.detail.column] = e.detail.value
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])
    if (name == '开始时间') {
      this.data.startDatetime = dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
    } else if (name == '截止时间') {
      this.data.endDatetime = dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
    }

    this.setData({
      startDatetime: this.data.startDatetime,
      endDatetime: this.data.endDatetime
    })
  },

  // 执行人选择
  taskSelect(e) {
    this.setData({
      taskName: this.data.taskList[e.detail.value]
    })
    this.data.taskAllList.forEach((item, index) => {
      console.log(item)
      if(item.nickname == this.data.taskName) {
        console.log(item)
        this.data.taskId = item.id
        this.data.groupId = item.group_id
      }
    })
  },

  // 确定按钮
  onConfirm() {
    this.data.taskFlowList = {}
    this.data.taskFlowList.field = []
    this.data.taskFlowList['module_id'] = this.data.moduleId
    this.data.field.forEach((item, index) => {
      if(item.required == 1 && !item.value) {
        return wx.showToast({
          title: '必填项内容不能为空',
          icon: 'none'
        })
      } else if (item.value){
        this.data.taskFlowList.field.push({
          name: item.name,
          key: item.key,
          value: item.value,
          type: item.type
        })
      }
    })
    if (!this.data.startDatetime) {
      return wx.showToast({
        title: '必填项内容不能为空',
        icon: 'none'
      })
    } else {
      this.data.taskFlowList['start_date'] = this.data.startDatetime
    }

    if (!this.data.endDatetime) {
      return wx.showToast({
        title: '必填项内容不能为空',
        icon: 'none'
      })
    } else {
      this.data.taskFlowList['end_date'] = this.data.endDatetime
    }

    if(!this.data.taskName) {
      return wx.showToast({
        title: '必填项内容不能为空',
        icon: 'none'
      })
    } else {
      this.data.taskFlowList['task_id'] = this.data.taskId
      this.data.taskFlowList['group_id'] = this.data.groupId
    }

    console.log(this.data.taskFlowList)
    let params = this.data.taskFlowList
    indexModel.addTaskflow(params, res=> {
      if(res.data.status == 1) {
        wx.showToast({
          title: '任务流添加成功',
          icon: 'none'
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        
      }
    })
  }
})