// 车务调查详情
import {
  PersonnelModel
} from '../../../personnel/models/personnel.js'
import {
  IndexModel
} from '../../models/index.js'
var app = getApp()

var personnelModel = new PersonnelModel()
var indexModel = new IndexModel()
Page({
  data: {
    diseaseStep: ['全部任务', '基本信息', '相关资料', '调查结论'],
    first: 0,
    currentTab: 0,
    taskList: [],  //任务列表
    titleShow: false,
    compensationshow: false,
    compensationList: ['正常赔付','拒绝处理','减损处理','其他'],
    compensationName: '',
    reportList: ['是', '否'],
    reportName: ''
  },

  onLoad: function (options) {
    this.data.listId = options.listId
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
  },

  onShow: function () {
    this.getVehicleDetails()
  },

  // 获取作业员信息
  getPersonnelList() {
    let params = {}
    personnelModel.getTaskList(params, res => {
      if (res.data.status == 1) {
        res.data.data.forEach((item, index) => {
          if (item.id == this.data.vehicleList.task_id) {
            this.setData({
              personName: item.nickname,
              personMobile: item.mobile
            })
          }
        })
      }
    })
  },

  // 获取车务调查详情
  getVehicleDetails() {
    let key = 'traffic'
    let id = this.data.listId
    let type = 9
    indexModel.getBusinessDetail(key, id, type, res => {
      if(res.data.status == 1) {
        this.setData({
          vehicleList: res.data.data,
          taskList: res.data.trafficTask,
          spinShow: false
        })
        this.getPersonnelList()
        this.getVehicleData()
      }
    })
  },

  // 获取疾病调查相关资料
  getVehicleData() {
    let params = {
      listId: this.data.listId,
      type: 1
    }
    indexModel.getRelatedData(params, res => {
      if (res.data.status == 1) {
        res.data.data.forEach((item, index) => {
          item.picture = item.picture.split(',')
        })
        this.setData({
          vehicleData: res.data.data
        })
      }
    })
  },

  //头部选择
  selectDiseaseStep(e) {
    this.setData({
      first: e.currentTarget.id
    })
  },

  //添加任务
  toAddTask() {
    this.setData({
      titleShow: true
    })
  },

  //组件返回的添加任务内容
  getTasksList(e) {
    let params = {
      title: e.detail.title,
      address: e.detail.address,
      traffic_id: this.data.listId
    }
    indexModel.addTask(params, res => {
      if (res.data.status == 1) {
        this.getVehicleDetails()
      }
    })
  },

  //任务详情
  toTaskDetail(e) {
    let vehId = this.data.listId
    let vehTaskId = e.currentTarget.dataset.vehtaskid
    let vehName = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../task-details/task-details?vehId=' + vehId + '&vehTaskId=' + vehTaskId + '&vehName=' + vehName + '&personName=' + this.data.personName,
    })
  },

  //选择赔付意见
  compensationChange(e) {
   this.setData({
     compensationName: this.data.compensationList[e.detail.value]
   })
  },

  // 选择是否举报
  reportChange(e) {
    this.setData({
      reportName: this.data.reportList[e.detail.value]
    })
  },

  // 分配作业员
  toAssignment() {
    wx.navigateTo({
      url: '../../../personnel/assignment/assignment?listId=' + this.data.listId + '&keyName=' + 'traffic',
    })
  },

  //打电话
  phoneCall(e) {
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        if (res.platform == 'ios') {
          wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone,
            success: res => {

            }
          })
        } else if (res.platform == 'android') {
          wx.showModal({
            title: '提示',
            content: e.currentTarget.dataset.phone,
            confirmText: "呼叫",
            success: res => {
              if (res.confirm) {
                wx.makePhoneCall({
                  phoneNumber: e.currentTarget.dataset.phone,
                  success: res => {

                  }
                })
              }
            }
          })
        }
      }
    })
  },

  // 相关资料预览
  previewImage(e) {
    let imgArr = []
    let imgIndex = e.currentTarget.dataset.index
    let listId = e.currentTarget.dataset.id
    this.data.vehicleData[listId].picture.forEach((item, index) => {
      imgArr.push(this.data.imgUrl + item)
    })
    wx.previewImage({
      urls: imgArr,
      current: imgArr[imgIndex]
    })
    console.log(imgArr, imgArr[imgIndex])
  }
})