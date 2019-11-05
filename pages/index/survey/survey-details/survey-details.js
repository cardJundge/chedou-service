// 查勘定损详情
var app = getApp()
import {
  IndexModel
} from '../../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    // isJobNo: false,
    isSurveyTime: false, // 查勘日期(平安有)
    isDispatchedWorkers: true, // 派工人(太平、平安没有)
    isDispatchingTime: true, // 派工时间（太平没有)
    isReportTime: false, // 报案时间(太平有)
    isFixedLossAdd: false, //出险/定损地点(太平、平安有)
    isreportType: false, //案件类型（太平有）
    isRegion: true, // 区域（太平没有）
    isTimeSlot: false, // 派工时间段(平安有)
    isPolicyNo: true, // 保单号(平安、太平没有)
    isPolicyMechanism: true, // 承保机构（平安、太平没有）
    // --------------------------------------------------
    surveyList: [],
    showBottomOperation: false,
    showQrCode: false,
    serviceOperation: false,
  },
  onLoad: function(options) {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    this.data.listId = options.listId
  },

  onShow() {
    this.getDetails()
  },

  // 接单
  toReceipt() {
    let key = 'survey'
    let id = this.data.listId
    indexModel.businessReceipt(id, key, res=> {
      if(res.data.status == 1) {
        // let surveyList = this.data.surveyList
        // let string = 'surveyList.status'
        // this.setData({
        //   [string]: 4
        // })
        this.getDetails()
      } else {
        wx.showToast({
          title: res.data.msg ? res.data.msg : '请求超时',
        })
      }
    })
  },

  // 查勘定损详情请求
  getDetails() {
    let key = 'survey'
    let id = 1
    indexModel.getBusinessDetail(key, this.data.listId, id, res => {
      if (res.data.status == 1) {
        this.setData({
          surveyList: res.data.data,
          schedule: res.data.schedule.reverse()
        })
        res.data.schedule.forEach((item, index) => {
          if(item.title.match('到达现场')) {
            this.setData({
              serviceOperation: true
            })
          }
        })
        this.getInsuranceList()
      }
    })
  },

  // 获取保险公司列表
  getInsuranceList() {
    indexModel.getInsurance(res => {
      if (res.data.status == 1) {
        res.data.data.forEach((item, index) => {
          if (this.data.surveyList.insurance_id == item.id) {
            this.data.surveyList.insuranceName = item.name
            this.setData({
              surveyList: this.data.surveyList
            })
            if (item.name == '中国平安') {
              this.setData({
                // isJobNo: true,
                isSurveyTime: true,
                isDispatchedWorkers: false,
                isDispatchingTime: true,
                isReportTime: false,
                isFixedLossAdd: true,
                isreportType: false,
                isRegion: true,
                isTimeSlot: true,
                isPolicyNo: false,
                isPolicyMechanism: false,
              })
            } else if (item.name == '中国太平') {
              this.setData({
                // isJobNo: true,
                isSurveyTime: false,
                isDispatchedWorkers: false,
                isDispatchingTime: false,
                isReportTime: true,
                isFixedLossAdd: true,
                isreportType: true,
                isRegion: false,
                isTimeSlot: false,
                isPolicyNo: false,
                isPolicyMechanism: false,
              })
            } else {
              this.setData({
                // isJobNo: false,
                isSurveyTime: false,
                isDispatchedWorkers: true,
                isDispatchingTime: true,
                isReportTime: false,
                isFixedLossAdd: false,
                isreportType: false,
                isRegion: true,
                isTimeSlot: false,
                isPolicyNo: true,
                isPolicyMechanism: true,
              })
            }
          }
        })
      }
    })
  },

  // 更多操作
  operation() {
    this.setData({
      showBottomOperation: true
    })
  },

  // 出现二维码格式
  showQrCode() {
    this.generateQrCode()
    this.setData({
      showQrCode: true,
    })
  },

  // 生成评价二维码
  generateQrCode() {
    wx.request({
      url: app.globalData.hostName + '/api/work/QRCode',
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + app.globalData.userInfo.api_token 
      }, // 默认值
      data: {
        id: this.data.listId
      },
      responseType: 'arraybuffer',
      success: (res)=> {      
        this.setData({
          qrImg: wx.arrayBufferToBase64(res.data)
        })
      }
    })
  },

  // 去分配作业员
  toAssignmentTask() {
    wx.navigateTo({
      url: '../../../personnel/assignment/assignment?listId=' + this.data.listId + '&keyName=' + 'survey',
    })
  },

  // 到达现场
  toScene() {
    wx.showLoading({
      title: '加载中...',
    })
    let params = {
      key: 'survey',
      id: this.data.listId
    }
    indexModel.toScene(params, res=> {
      wx.hideLoading()
      if(res.data.status == 1) {
        this.getDetails()
      } else {
        wx.showToast({
          title: res.data.msg ? res.data.msg : '请求超时',
        })
      }
    })
  },

  // 结案
  toFinishCase() {
    wx.showLoading({
      title: '结案中...',
    })
    let params = {
      key: 'survey',
      id: this.data.listId
    }
    indexModel.finishCase(params, res=> {
      wx.hideLoading()
      if(res.data.status == 1) {
        this.getDetails()
      } else {
        wx.showToast({
          title: res.data.msg ? res.data.msg : '请求超时',
        })
      }
    })
  },

  // 操作---》编辑案件
  editEvent() {
    this.setData({
      showBottomOperation: false
    })
    let data = JSON.stringify(this.data.surveyList)
    wx.navigateTo({
      url: '../add-survey/add-survey?data=' + data,
    })
  },

  // 操作---->删除案件
  delEvent() {
    wx.showModal({
      title: '提示',
      content: '确定删除该案件吗？',
      success: res=> {
        if(res.confirm) {
          let params = {
            key: 'survey',
            id: this.data.listId
          }
          indexModel.delBusiness(params, res=> {
            if(res.data.status == 1) {
              this.setData({
                showBottomOperation: false
              })
              wx.navigateBack({
                delta: 1
              }) 
            } else {
              wx.showToast({
                title: res.data.msg ? res.data.msg : '操作超时',
              })
            }
          })
        }
      }
    })
  },

  // 添加进度
  toAddDetails() {
    wx.navigateTo({
      url: '../add-detailed/add-detailed?id=' + this.data.listId,
    })
  }

})